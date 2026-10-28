
import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    StatusBar,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';

import Logo from '../../components/Logo';
import { colors } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';

export default function LoginScreen({ navigation, route }) {
    const languageCode = route?.params?.languageCode || 'en';
    const languageName = route?.params?.language || 'English';

    const [role, setRole] = useState('Learner');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    async function handleLogin() {
        setError('');

        if (loading) {
            return;
        }

        // Validate required fields.
        if (!email.trim() || !password) {
            setError('Please enter your email address and password.');
            return;
        }

        // Validate email.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            setLoading(true);

            // 1. Authenticate the user with Supabase.
            const { data, error: loginError } =
                await supabase.auth.signInWithPassword({
                    email: email.trim().toLowerCase(),
                    password,
                });

            if (loginError) {
                throw loginError;
            }

            if (!data.user) {
                throw new Error(
                    'Unable to sign in. Please try again.'
                );
            }

            // 2. Retrieve the user's profile.
            const {
                data: profile,
                error: profileError,
            } = await supabase
                .from('profiles')
                .select(
                    'id, full_name, email, role, account_status, preferred_language'
                )
                .eq('id', data.user.id)
                .single();

            if (profileError || !profile) {
                // Avoid leaving an authenticated user without a profile.
                await supabase.auth.signOut();

                throw new Error(
                    'Your account was authenticated, but your profile could not be loaded. Please contact your administrator.'
                );
            }

            // 3. Verify account status.
            if (profile.account_status !== 'active') {
                await supabase.auth.signOut();

                throw new Error(
                    'Your account is not active. Please contact your administrator.'
                );
            }

            // 4. Verify that the selected role matches the database role.
            const expectedRole =
                role === 'Learner' ? 'learner' : 'teacher';

            if (profile.role !== expectedRole) {
                await supabase.auth.signOut();

                throw new Error(
                    `This account is not registered as a ${role.toLowerCase()}. Please select the correct account type.`
                );
            }

            // 5. Save the language selected on the Language screen.
            // If the user did not arrive with a language selection,
            // preserve their existing saved language.
            if (route?.params?.languageCode) {
                const { error: languageError } = await supabase
                    .from('profiles')
                    .update({
                        preferred_language: languageCode,
                    })
                    .eq('id', data.user.id);

                if (languageError) {
                    console.error(
                        'Could not update preferred language:',
                        languageError
                    );

                    // Login can continue if only saving the language fails.
                    // The existing profile language remains unchanged.
                }
            }

            // 6. Navigate according to the user's verified role.
            if (profile.role === 'learner') {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'LearnerDashboard',
                        },
                    ],
                });
            } else if (profile.role === 'teacher') {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'TeacherDashboard',
                        },
                    ],
                });
            } else {
                await supabase.auth.signOut();

                throw new Error(
                    'Your account role is not supported by this app.'
                );
            }
        } catch (loginError) {
            console.error('Login error:', loginError);

            const message =
                loginError.message?.toLowerCase() || '';

            if (
                message.includes('invalid login credentials')
            ) {
                setError(
                    'Incorrect email address or password. Please try again.'
                );
            } else if (
                message.includes('email not confirmed')
            ) {
                setError(
                    'Please confirm your email address before logging in.'
                );
            } else {
                setError(
                    loginError.message ||
                    'Login failed. Please try again.'
                );
            }
        } finally {
            setLoading(false);
        }
    }

    // Forgot password: send a recovery email through Supabase.
    async function handleForgotPassword() {
        setError('');

        if (resetLoading) {
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
            setError(
                'Enter your email address above before resetting your password.'
            );
            return;
        }

        try {
            setResetLoading(true);

            const { error: resetError } =
                await supabase.auth.resetPasswordForEmail(
                    normalizedEmail
                );

            if (resetError) {
                throw resetError;
            }

            Alert.alert(
                'Check your email',
                'If an account exists for this email address, Supabase will send a password reset link. Follow the instructions in the email.'
            );
        } catch (resetError) {
            console.error(
                'Password reset error:',
                resetError
            );

            setError(
                resetError.message ||
                'Unable to request a password reset. Please try again.'
            );
        } finally {
            setResetLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={colors.screenBackground}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <Logo />

                    <Pressable
                        style={styles.languageButton}
                        onPress={() =>
                            navigation.navigate('Language')
                        }
                        accessibilityRole="button"
                        accessibilityLabel="Change language"
                    >
                        <Image
                            source={require('../../assets/images/globe (1).png')}
                            style={styles.languageIcon}
                            resizeMode="contain"
                        />

                        <Text style={styles.language}>
                            {languageCode.toUpperCase()}
                        </Text>
                    </Pressable>
                </View>

                {/* Introduction */}
                <Text style={styles.heading}>
                    Welcome back
                </Text>

                <Text style={styles.description}>
                    Your next small step can lead to
                    {'\n'}
                    something great.
                </Text>

                {/* Role selector */}
                <Text style={styles.label}>I am a</Text>

                <View style={styles.roleContainer}>
                    {['Learner', 'Teacher'].map((item) => (
                        <Pressable
                            key={item}
                            style={[
                                styles.roleButton,
                                role === item && styles.activeRole,
                            ]}
                            onPress={() => {
                                setRole(item);
                                setError('');
                            }}
                        >
                            <Text
                                style={[
                                    styles.roleText,
                                    role === item &&
                                        styles.activeRoleText,
                                ]}
                            >
                                {item}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Email */}
                <Text style={styles.label}>Email address</Text>

                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={require('../../assets/images/mail.png')}
                        resizeMode="contain"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        placeholderTextColor={colors.placeholder}
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            setError('');
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Password */}
                <Text style={styles.label}>Password</Text>

                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={require('../../assets/images/lock-keyhole.png')}
                        resizeMode="contain"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor={colors.placeholder}
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            setError('');
                        }}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Pressable
                        onPress={() =>
                            setShowPassword(!showPassword)
                        }
                        style={styles.eyeIcon}
                        accessibilityRole="button"
                        accessibilityLabel={
                            showPassword
                                ? 'Hide password'
                                : 'Show password'
                        }
                    >
                        <Ionicons
                            name={
                                showPassword
                                    ? 'eye-off-outline'
                                    : 'eye-outline'
                            }
                            size={22}
                            color="#718078"
                        />
                    </Pressable>
                </View>

                {/* Forgot password */}
                <Pressable
                    style={styles.forgotContainer}
                    onPress={handleForgotPassword}
                    disabled={resetLoading}
                >
                    {resetLoading ? (
                        <ActivityIndicator
                            size="small"
                            color={colors.primary}
                        />
                    ) : (
                        <Text style={styles.forgotText}>
                            Forgot password?
                        </Text>
                    )}
                </Pressable>

                {/* Error message */}
                {error ? (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                ) : null}

                {/* Login button */}
                <Pressable
                    style={[
                        styles.primaryButton,
                        loading && { opacity: 0.7 },
                    ]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator
                            color={colors.white}
                        />
                    ) : (
                        <>
                            <Text style={styles.primaryButtonText}>
                                Log in
                            </Text>

                            <Text style={styles.arrow}>
                                →
                            </Text>
                        </>
                    )}
                </Pressable>

                {/* Register link */}
                <Pressable
                    style={styles.registerLink}
                    onPress={() =>
                        navigation.navigate('Register', {
                            language: languageName,
                            languageCode,
                        })
                    }
                >
                    <Text style={styles.registerText}>
                        <Text style={styles.mutedText}>
                            New here?{' '}
                        </Text>

                        Create an account
                    </Text>
                </Pressable>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    <Image
                        style={styles.footerIcon}
                        source={require('../../assets/images/shield-check.png')}
                        resizeMode="contain"
                    />

                    <Text style={styles.footer}>
                        A safe space to learn and ask questions.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.homeIndicator} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.screenBackground,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 42,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 38,
    },
    languageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    language: {
        color: colors.heading,
        fontSize: 13,
        fontWeight: '500',
    },
    languageIcon: {
        width: 14,
        height: 14,
    },
    heading: {
        color: colors.heading,
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: -0.6,
        marginBottom: 8,
    },
    description: {
        color: colors.body,
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 18,
    },
    label: {
        color: colors.heading,
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 8,
        marginTop: 13,
    },
    roleContainer: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: colors.mutedGreen,
        borderRadius: 14,
        padding: 4,
        marginBottom: 5,
    },
    roleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 37,
        borderRadius: 10,
    },
    activeRole: {
        backgroundColor: colors.white,
    },
    roleText: {
        color: '#718078',
        fontSize: 13,
    },
    activeRoleText: {
        color: colors.primaryDark,
        fontWeight: '700',
    },
    inputContainer: {
        minHeight: 52,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
        height: 19,
        width: 19,
    },
    input: {
        flex: 1,
        height: 52,
        color: colors.heading,
        fontSize: 13,
    },
    eyeIcon: {
        paddingLeft: 8,
        paddingVertical: 8,
    },
    forgotContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 17,
        marginBottom: 16,
        minHeight: 18,
        minWidth: 120,
    },
    forgotText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    errorText: {
        color: '#B42318',
        fontSize: 12,
        marginBottom: 10,
    },
    primaryButton: {
        minHeight: 52,
        borderRadius: 14,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '700',
    },
    arrow: {
        color: colors.white,
        fontSize: 22,
        marginLeft: 10,
    },
    registerLink: {
        alignItems: 'center',
        marginTop: 24,
        minHeight: 18,
    },
    registerText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    mutedText: {
        color: colors.body,
        fontWeight: '400',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22,
        gap: 7,
    },
    footer: {
        color: colors.body,
        fontSize: 13,
        textAlign: 'center',
    },
    footerIcon: {
        width: 14,
        height: 14,
    },
    homeIndicator: {
        position: 'absolute',
        bottom: 8,
        alignSelf: 'center',
        width: 104,
        height: 4,
        borderRadius: 5,
        backgroundColor: colors.heading,
    },
});
