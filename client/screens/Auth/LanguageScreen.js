import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';

import { Text } from '../../components/TText';
import { colors } from '../../styles/theme';
import { LANGUAGES } from '../../config/languages';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageScreen({ navigation }) {
    const { user } = useAuth();
    const { language, setLanguage } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState(language.code);
    const [loading, setLoading] = useState(false);

    const selected = LANGUAGES.find(
        (item) => item.code === selectedLanguage
    );

    function finish() {
        if (user) {
            // Logged in (e.g. opened from Settings): go back to where we came from.
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate('LearnerDashboard');
            }
        } else {
            // Not logged in yet: Login saves the choice to the profile.
            navigation.navigate('Login', {
                language: selected.name,
                languageCode: selected.dbCode,
            });
        }
    }

    async function handleContinue() {
        if (!selected) {
            Alert.alert('Error', 'Please select a language.');
            return;
        }

        setLoading(true);

        try {
            // Saves on this device, and to the profile when logged in.
            // The whole app (except Login/Register) switches language immediately.
            await setLanguage(selected.dbCode);

            if (!selected.deepl && selected.dbCode !== 'en') {
                Alert.alert(
                    `${selected.name} saved`,
                    `Automatic translation isn't available for ${selected.name} yet, so the app will stay in English for now.`,
                    [{ text: 'OK', onPress: finish }]
                );
            } else {
                finish();
            }
        } catch (error) {
            console.error('Language selection error:', error);

            Alert.alert(
                'Unable to save language',
                error.message ||
                    'Something went wrong. Please try again.'
            );
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
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <Text style={styles.backArrow}>←</Text>
                    </Pressable>

                    <Text style={styles.headerTitle}>
                        Your language
                    </Text>
                </View>

                {/* Introduction */}
                <Text style={styles.heading}>
                    Learning feels better
                    {'\n'}
                    in your language.
                </Text>

                <Text style={styles.description}>
                    Choose the language for your app and tutor. You
                    {'\n'}
                    can change it at any time.
                </Text>

                {/* Language options */}
                <View style={styles.languageList}>
                    {LANGUAGES.map((language) => {
                        const isSelected =
                            selectedLanguage === language.code;

                        return (
                            <Pressable
                                key={language.code}
                                style={[
                                    styles.languageCard,
                                    isSelected && styles.selectedCard,
                                ]}
                                onPress={() =>
                                    setSelectedLanguage(language.code)
                                }
                                accessibilityRole="radio"
                                accessibilityState={{
                                    selected: isSelected,
                                }}
                            >
                                <View
                                    style={[
                                        styles.languageCode,
                                        isSelected && styles.selectedCode,
                                    ]}
                                >
                                    <Text translate={false} style={styles.codeText}>
                                        {language.code}
                                    </Text>
                                </View>

                                <View style={styles.languageInfo}>
                                    <Text translate={false} style={styles.languageName}>
                                        {language.name}
                                    </Text>

                                    {language.subtitle !== '' && (
                                        <Text
                                            translate={false}
                                            style={
                                                styles.languageSubtitle
                                            }
                                        >
                                            {language.subtitle}
                                        </Text>
                                    )}
                                </View>

                                <View
                                    style={[
                                        styles.radioButton,
                                        isSelected &&
                                            styles.selectedRadio,
                                    ]}
                                >
                                    {isSelected && (
                                        <Text style={styles.checkmark}>
                                            ✓
                                        </Text>
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Continue button */}
                <Pressable
                    style={[
                        styles.continueButton,
                        loading && styles.disabledButton,
                    ]}
                    onPress={handleContinue}
                    disabled={loading}
                    accessibilityRole="button"
                >
                    {loading ? (
                        <ActivityIndicator color={colors.white} />
                    ) : (
                        <>
                            <Text style={styles.continueText}>
                                Continue in {selected?.name}
                            </Text>

                            <Text style={styles.continueArrow}>
                                →
                            </Text>
                        </>
                    )}
                </Pressable>

                <Text style={styles.footer}>
                    Lessons follow the South African CAPS curriculum.
                </Text>
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
        paddingBottom: 38,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 27,
    },
    backButton: {
        width: 28,
        height: 30,
        justifyContent: 'center',
        marginRight: 8,
    },
    backArrow: {
        color: colors.heading,
        fontSize: 24,
        fontWeight: '300',
    },
    headerTitle: {
        color: colors.heading,
        fontSize: 21,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    heading: {
        color: colors.heading,
        fontSize: 27,
        fontWeight: '800',
        letterSpacing: -0.5,
        lineHeight: 28,
        marginBottom: 7,
    },
    description: {
        color: colors.body,
        fontSize: 14,
        lineHeight: 17,
        marginBottom: 16,
    },
    languageList: {
        gap: 12,
    },
    languageCard: {
        minHeight: 63,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: 11,
        paddingVertical: 7,
    },
    selectedCard: {
        backgroundColor: colors.lightGreen,
        borderColor: colors.primary,
        borderWidth: 1.4,
    },
    languageCode: {
        width: 35,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.mutedGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedCode: {
        backgroundColor: colors.white,
    },
    codeText: {
        color: colors.heading,
        fontSize: 11,
        fontWeight: '800',
    },
    languageInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    languageName: {
        color: colors.heading,
        fontSize: 14,
        fontWeight: '700',
    },
    languageSubtitle: {
        color: colors.body,
        fontSize: 11,
        marginTop: 3,
    },
    radioButton: {
        width: 21,
        height: 21,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadio: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkmark: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '800',
    },
    continueButton: {
        minHeight: 52,
        width: '100%',
        borderRadius: 14,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    disabledButton: {
        opacity: 0.7,
    },
    continueText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '700',
    },
    continueArrow: {
        color: colors.white,
        fontSize: 21,
        marginLeft: 10,
    },
    footer: {
        color: colors.body,
        fontSize: 11,
        textAlign: 'center',
        marginTop: 10,
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