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

import { useRoute } from '@react-navigation/native';
import Logo from '../../components/Logo';
import { colors } from '../../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';

export default function RegisterScreen({ navigation }) {
    const route = useRoute();

    // Language selected on LanguageScreen.
    const languageCode = route.params?.languageCode || 'en';

    const [role, setRole] = useState('Learner');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        setError('');

        if (loading) {
            return;
        }

        // Validate required fields.
        if (!fullName.trim() || !email.trim() || !password) {
            setError('Please complete all required fields.');
            return;
        }

        // Validate email.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        // Validate password.
        if (password.length < 8 || !/\d/.test(password)) {
            setError(
                'Use at least 8 characters, including a number.'
            );
            return;
        }

        // Validate terms.
        if (!acceptedTerms) {
            setError(
                'Please agree to the terms and privacy policy.'
            );
            return;
        }

        // Users cannot assign themselves privileged roles.
        if (role === 'Teacher') {
            setError(
                'Teacher accounts require administrator approval. ' +
                'Please register as a learner or contact your administrator.'
            );
            return;
        }

        try {
            setLoading(true);

            // Create the user in Supabase Authentication.
            const { data, error: signUpError } =
                await supabase.auth.signUp({
                    email: email.trim().toLowerCase(),
                    password: password,

                    options: {
                        data: {
                            full_name: fullName.trim(),
                            preferred_language: languageCode,
                        },
                    },
                });

            if (signUpError) {
                throw signUpError;
            }

            if (!data.user) {
                throw new Error(
                    'Your account could not be created. Please try again.'
                );
            }

            /*
             * Your Supabase handle_new_user() trigger should create
             * the corresponding public.profiles record.
             *
             * It must read:
             * full_name
             * preferred_language
             *
             * from the user's authentication metadata.
             */

            if (!data.session) {
                // Email confirmation is enabled in Supabase.
                Alert.alert(
                    'Check your email',
                    'Your account has been created. Please check your email ' +
                    'to confirm your account before logging in.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('Login', {
                                    language: route.params?.language,
                                    languageCode: languageCode,
                                });
                            },
                        },
                    ]
                );

                return;
            }

            // Account created and user signed in.
            Alert.alert(
                'Registration successful',
                'Welcome to Thuto AI! Your account has been created.',
                [
                    {
                        text: 'Continue',
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [
                                    {
                                        name: 'LearnerDashboard',
                                    },
                                ],
                            });
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Registration error:', error);

            const errorMessage =
                error.message?.toLowerCase() || '';

            if (
                errorMessage.includes('already registered') ||
                errorMessage.includes('already exists') ||
                errorMessage.includes('user already registered')
            ) {
                setError(
                    'An account with this email already exists. Please log in.'
                );
            } else {
                setError(
                    error.message ||
                    'Registration failed. Please try again.'
                );
            }
        } finally {
            setLoading(false);
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
                <View style={styles.logoRow}>
                    <Logo />
                </View>

                <Text style={styles.heading}>
                    Let’s grow together.
                </Text>

                <Text style={styles.description}>
                    Create your free account. A little curiosity
                    {'\n'}
                    is all you need to begin.
                </Text>

                {/* Account role */}
                <View style={styles.roleContainer}>
                    {['Learner', 'Teacher'].map((item) => (
                        <Pressable
                            key={item}
                            style={[
                                styles.roleButton,
                                role === item && styles.activeRole,
                            ]}
                            onPress={() => setRole(item)}
                        >
                            <Text
                                style={[
                                    styles.roleText,
                                    role === item && styles.activeRoleText,
                                ]}
                            >
                                {item === 'Learner'
                                    ? 'I’m a learner'
                                    : 'I’m a teacher'}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Full name */}
                <Text style={styles.label}>Full name</Text>

                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={require('../../assets/images/Vector.png')}
                        resizeMode="contain"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        placeholderTextColor={colors.placeholder}
                        value={fullName}
                        onChangeText={setFullName}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
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
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Password */}
                <Text style={styles.label}>Create password</Text>

                <View style={styles.inputContainer}>
                    <Image
                        style={styles.inputIcon}
                        source={require('../../assets/images/lock-keyhole.png')}
                        resizeMode="contain"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Create a password"
                        placeholderTextColor={colors.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Pressable
                        onPress={() => setShowPassword(!showPassword)}
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

                <Text style={styles.hint}>
                    Use at least 8 characters, including a number.
                </Text>

                {/* Terms and conditions */}
                <Pressable
                    style={styles.termsContainer}
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                >
                    <View
                        style={[
                            styles.checkbox,
                            acceptedTerms && styles.checkedCheckbox,
                        ]}
                    >
                        {acceptedTerms && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </View>

                    <Text style={styles.termsText}>
                        I agree to the Terms of use and Privacy policy.
                        My school or guardian has approved my account.
                    </Text>
                </Pressable>

                {/* Validation errors */}
                {error ? (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                ) : null}

                {/* Register button */}
                <Pressable
                    style={[
                        styles.primaryButton,
                        loading && { opacity: 0.7 },
                    ]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.white} />
                    ) : (
                        <>
                            <Text style={styles.primaryButtonText}>
                                Create account
                            </Text>

                            <Text style={styles.arrow}>→</Text>
                        </>
                    )}
                </Pressable>

                {/* Login link */}
                <Pressable
                    style={styles.loginLink}
                    onPress={() =>
                        navigation.navigate('Login', {
                            language: route.params?.language,
                            languageCode: languageCode,
                        })
                    }
                >
                    <Text style={styles.loginText}>
                        <Text style={styles.mutedText}>
                            Already have an account?{' '}
                        </Text>
                        Log in
                    </Text>
                </Pressable>
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
    logoRow: {
        marginBottom: 21,
    },
    heading: {
        color: colors.heading,
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.6,
        marginBottom: 5,
    },
    description: {
        color: colors.body,
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 19,
    },
    roleContainer: {
        flexDirection: 'row',
        backgroundColor: colors.mutedGreen,
        borderRadius: 14,
        padding: 4,
        marginBottom: 4,
        height: 45,
        width: '100%',
    },
    roleButton: {
        flex: 1,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
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
    label: {
        color: colors.heading,
        fontSize: 13,
        fontWeight: '700',
        marginTop: 12,
        marginBottom: 7,
    },
    inputContainer: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 12,
    },
    inputIcon: {
        width: 17,
        height: 17,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: colors.heading,
    },
    eyeIcon: {
        paddingLeft: 8,
        paddingVertical: 8,
    },
    hint: {
        color: colors.body,
        fontSize: 11,
        marginTop: 7,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 17,
        marginBottom: 13,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        marginRight: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCheckbox: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkmark: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '800',
    },
    termsText: {
        flex: 1,
        color: colors.body,
        fontSize: 11,
        lineHeight: 13,
    },
    errorText: {
        color: '#B42318',
        fontSize: 12,
        marginBottom: 10,
    },
    primaryButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
    loginLink: {
        alignItems: 'center',
        marginTop: 14,
    },
    loginText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    mutedText: {
        color: colors.body,
        fontWeight: '400',
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

