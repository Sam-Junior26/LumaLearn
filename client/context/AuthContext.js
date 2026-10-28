import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getSession() {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.log('Session error:', error.message);
                }

                setSession(data?.session ?? null);
                setUser(data?.session?.user ?? null);
            } catch (error) {
                console.log('Session error:', error.message);
            } finally {
                setLoading(false);
            }
        }

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function signOut() {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.log('Sign out error:', error.message);
                return { error };
            }

            console.log('User signed out successfully');

            return { error: null };
        } catch (error) {
            console.log('Unexpected sign out error:', error.message);
            return { error };
        }
    }


    return (
        <AuthContext.Provider value={{ session, user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider');
    }

    return context;
}