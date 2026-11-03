import React, { useEffect, useState } from 'react';
import {
    Alert,
    Text as RNText,
    TextInput as RNTextInput,
} from 'react-native';
import {
    getCached,
    getTargetLanguage,
    needsTranslation,
    subscribe,
    translate,
    translateMany,
} from '../services/translationService';
import { useLanguage } from '../context/LanguageContext';

/**
 * Translates a single English string into the active app language.
 * Returns the English text immediately, then swaps in the translation.
 */
export function useTranslated(text, enabled = true) {
    const { language } = useLanguage(); // re-render when the language changes
    const active = enabled && !!language.deepl && needsTranslation(text);

    const [value, setValue] = useState(() =>
        active ? getCached(text) ?? text : text
    );

    useEffect(() => {
        if (!active) {
            setValue(text);
            return undefined;
        }

        let cancelled = false;
        const cached = getCached(text);
        if (cached !== undefined) {
            setValue(cached);
        } else {
            setValue(text);
            translate(text).then((result) => {
                if (!cancelled) setValue(result);
            });
        }

        // The cache can be filled by another component's batch.
        const unsubscribe = subscribe(() => {
            const hit = getCached(text);
            if (!cancelled && hit !== undefined) setValue(hit);
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, [text, active, language.deepl]);

    return value;
}

function Translated({ children }) {
    return useTranslated(children);
}

// Joins children into one string when they are only strings/numbers, so a
// sentence like {'Hello '}{name} is translated as a whole.
function flattenChildren(children) {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    if (
        Array.isArray(children) &&
        children.every((c) => typeof c === 'string' || typeof c === 'number')
    ) {
        return children.join('');
    }
    return null;
}

/**
 * Drop-in replacement for React Native's <Text>.
 * Pass translate={false} for text that must stay as-is (user input, names...).
 */
export function Text({ children, translate: shouldTranslate = true, ...props }) {
    const flat = flattenChildren(children);
    const translated = useTranslated(flat ?? '', shouldTranslate && flat !== null);

    if (flat !== null) {
        return <RNText {...props}>{shouldTranslate ? translated : children}</RNText>;
    }

    // Mixed children (nested <Text>, icons...): translate each string piece.
    return (
        <RNText {...props}>
            {shouldTranslate
                ? React.Children.map(children, (child) =>
                      typeof child === 'string' ? <Translated>{child}</Translated> : child
                  )
                : children}
        </RNText>
    );
}

/** Drop-in <TextInput> that translates the placeholder. */
export const TextInput = React.forwardRef(function TextInput(
    { placeholder, ...props },
    ref
) {
    const translatedPlaceholder = useTranslated(placeholder ?? '', !!placeholder);
    return (
        <RNTextInput
            ref={ref}
            placeholder={placeholder ? translatedPlaceholder : undefined}
            {...props}
        />
    );
});

/** Drop-in for Alert.alert that translates title, message and button labels. */
export async function alertT(title, message, buttons, options) {
    if (!getTargetLanguage()) {
        Alert.alert(title, message, buttons, options);
        return;
    }

    const labels = (buttons || []).map((b) => b.text || '');
    const [t, m, ...btnTexts] = await translateMany([
        title || '',
        message || '',
        ...labels,
    ]);

    Alert.alert(
        t,
        message ? m : undefined,
        buttons ? buttons.map((b, i) => ({ ...b, text: btnTexts[i] })) : undefined,
        options
    );
}