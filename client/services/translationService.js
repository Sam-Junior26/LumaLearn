import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Client-side translation layer.
 *
 * - Calls the DeepL REST API directly (key from EXPO_PUBLIC_DEEPL_API_KEY).
 * - Requests made in the same ~60ms window are batched into one call.
 * - Results are cached in memory and in AsyncStorage per target language,
 *   so each string is only translated once per device.
 */

const STORAGE_PREFIX = 'luma:translations:v1:';
const BATCH_DELAY_MS = 60;
const MAX_BATCH = 50; // DeepL accepts up to 50 texts per request
const MAX_PERSISTED = 4000; // cap stored entries per language
const FAILURE_COOLDOWN_MS = 30000;

const DEEPL_KEY = process.env.EXPO_PUBLIC_DEEPL_API_KEY || '';
// Free-plan keys end in ":fx" and use a different host.
const DEEPL_URL = DEEPL_KEY.endsWith(':fx')
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate';

async function callDeepL(lang, texts) {
    const response = await fetch(DEEPL_URL, {
        method: 'POST',
        headers: {
            Authorization: `DeepL-Auth-Key ${DEEPL_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: texts,
            source_lang: 'EN',
            target_lang: lang,
            preserve_formatting: true,
        }),
    });
    if (!response.ok) {
        // 456 = DeepL quota used up, 429 = too many requests
        throw new Error(`DeepL error ${response.status}`);
    }
    const data = await response.json();
    return data.translations.map((t) => t.text);
}

let targetLang = null; // DeepL code, e.g. "ZU". null = no translation.
const memory = new Map(); // text -> translation (for current targetLang)
const inFlight = new Map(); // text -> Promise<string>
let queue = []; // [{ text, resolve }]
let flushTimer = null;
let persistTimer = null;
let cooldownUntil = 0;
const listeners = new Set();

const HAS_LETTERS = /[A-Za-z]/;

export function needsTranslation(text) {
    return typeof text === 'string' && HAS_LETTERS.test(text);
}

export function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function emit() {
    listeners.forEach((l) => l());
}

export async function setTargetLanguage(deeplCode) {
    if (deeplCode === targetLang) return;
    targetLang = deeplCode || null;
    memory.clear();
    inFlight.clear();
    queue = [];

    if (targetLang) {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_PREFIX + targetLang);
            if (raw && targetLang) {
                const saved = JSON.parse(raw);
                Object.keys(saved).forEach((k) => memory.set(k, saved[k]));
            }
        } catch (e) {
            console.log('Translation cache load error:', e?.message);
        }
    }
    emit();
}

export function getTargetLanguage() {
    return targetLang;
}

/** Synchronous cache lookup. Returns undefined when not cached yet. */
export function getCached(text) {
    return memory.get(text);
}

function persistSoon() {
    if (persistTimer || !targetLang) return;
    const lang = targetLang;
    persistTimer = setTimeout(async () => {
        persistTimer = null;
        try {
            let entries = Array.from(memory.entries());
            if (entries.length > MAX_PERSISTED) {
                entries = entries.slice(entries.length - MAX_PERSISTED);
            }
            await AsyncStorage.setItem(
                STORAGE_PREFIX + lang,
                JSON.stringify(Object.fromEntries(entries))
            );
        } catch (e) {
            console.log('Translation cache save error:', e?.message);
        }
    }, 1500);
}

async function flush() {
    flushTimer = null;
    const lang = targetLang;
    const batch = queue.splice(0, MAX_BATCH);
    if (queue.length) flushTimer = setTimeout(flush, BATCH_DELAY_MS);
    if (!batch.length) return;

    const settle = (translations) => {
        batch.forEach((item, i) => {
            const result = translations?.[i];
            if (lang === targetLang && typeof result === 'string' && result) {
                memory.set(item.text, result);
                inFlight.delete(item.text);
                item.resolve(result);
            } else {
                inFlight.delete(item.text);
                item.resolve(item.text); // fall back to the original English
            }
        });
        if (translations) {
            persistSoon();
            emit();
        }
    };

    if (!lang || !DEEPL_KEY || Date.now() < cooldownUntil) {
        settle(null);
        return;
    }

    try {
        settle(await callDeepL(lang, batch.map((b) => b.text)));
    } catch (e) {
        console.log('Translation request failed:', e?.message);
        cooldownUntil = Date.now() + FAILURE_COOLDOWN_MS;
        settle(null);
    }
}

/** Translate one string. Always resolves (falls back to the input text). */
export function translate(text) {
    if (!targetLang || !needsTranslation(text)) return Promise.resolve(text);

    const cached = memory.get(text);
    if (cached !== undefined) return Promise.resolve(cached);

    const existing = inFlight.get(text);
    if (existing) return existing;

    const promise = new Promise((resolve) => {
        queue.push({ text, resolve });
        if (!flushTimer) flushTimer = setTimeout(flush, BATCH_DELAY_MS);
    });
    inFlight.set(text, promise);
    return promise;
}

export function translateMany(texts) {
    return Promise.all(texts.map((t) => translate(t)));
}