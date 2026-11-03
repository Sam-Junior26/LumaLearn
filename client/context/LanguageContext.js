import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';
import { useAuth } from './AuthContext';
import {
    DEFAULT_LANGUAGE,
    findLanguageByDbCode,
} from '../config/languages';
import { setTargetLanguage } from '../services/translationService';

const STORAGE_KEY = 'luma:language';
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const { user } = useAuth();
    const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);
    const [ready, setReady] = useState(false);

    // True when the language was chosen before logging in and still has to be
    // written to the profile once there is a user.
    const pendingSync = useRef(false);

    const apply = useCallback(async (lang) => {
        await setTargetLanguage(lang.deepl);
        setLanguageState(lang);
    }, []);

    // 1. Restore the last language used on this device.
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) await apply(findLanguageByDbCode(stored));
            } catch (e) {
                console.log('Language restore error:', e?.message);
            } finally {
                setReady(true);
            }
        })();
    }, [apply]);

    // 2. When a user signs in, sync with their profile.
    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                if (pendingSync.current) {
                    pendingSync.current = false;
                    await supabase
                        .from('profiles')
                        .update({ preferred_language: language.dbCode })
                        .eq('id', user.id);
                    return;
                }

                const { data } = await supabase
                    .from('profiles')
                    .select('preferred_language')
                    .eq('id', user.id)
                    .maybeSingle();

                if (data?.preferred_language) {
                    const lang = findLanguageByDbCode(data.preferred_language);
                    await AsyncStorage.setItem(STORAGE_KEY, lang.dbCode);
                    await apply(lang);
                }
            } catch (e) {
                console.log('Language profile sync error:', e?.message);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    /** Change the app language. Saves locally and, if logged in, to the profile. */
    const setLanguage = useCallback(
        async (dbCode) => {
            const lang = findLanguageByDbCode(dbCode);
            await AsyncStorage.setItem(STORAGE_KEY, lang.dbCode);
            await apply(lang);

            if (user) {
                const { error } = await supabase
                    .from('profiles')
                    .update({ preferred_language: lang.dbCode })
                    .eq('id', user.id);
                if (error) throw error;
            } else {
                pendingSync.current = true;
            }
            return lang;
        },
        [apply, user]
    );

    return (
        <LanguageContext.Provider value={{ language, setLanguage, ready }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) {
        throw new Error('useLanguage must be used inside a LanguageProvider');
    }
    return ctx;
}