// Languages offered in LumaLearn.
//
// These match the profiles.preferred_language check constraint in Supabase:
// ('en', 'zu', 'st', 'xh', 'tn'). Do not add a language here unless that
// constraint allows its `dbCode`, otherwise saving it to the profile fails.
//
// `code`   – short code shown in the UI
// `dbCode` – value stored in profiles.preferred_language
// `deepl`  – DeepL target language code (null = keep the UI in English)
export const LANGUAGES = [
    { code: 'EN', name: 'English', subtitle: '', dbCode: 'en', deepl: null },
    { code: 'ZU', name: 'isiZulu', subtitle: 'Zulu', dbCode: 'zu', deepl: 'ZU' },
    { code: 'XH', name: 'isiXhosa', subtitle: 'Xhosa', dbCode: 'xh', deepl: 'XH' },
    { code: 'ST', name: 'Sesotho', subtitle: 'Southern Sotho', dbCode: 'st', deepl: 'ST' },
    { code: 'TN', name: 'Setswana', subtitle: 'Tswana', dbCode: 'tn', deepl: 'TN' },
    { code: 'TS', name: 'Tsonga', subtitle: 'Xitsonga', dbCode: 'ts', deepl: 'TS' },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

export function findLanguageByDbCode(dbCode) {
    return LANGUAGES.find((l) => l.dbCode === dbCode) || DEFAULT_LANGUAGE;
}