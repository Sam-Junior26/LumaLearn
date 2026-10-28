import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    StatusBar,
    Image,
    ScrollView,
} from 'react-native';

import Logo from '../../components/Logo';
import { colors } from '../../styles/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function WelcomeScreen({ navigation }) {
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
                <View style={styles.logoRow}>
                    <Logo />
                </View>

                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../../assets/images/Welcome illustration.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        ✧ Your learning companion
                    </Text>
                </View>

                <Text style={styles.heading}>
                    Big dreams.
                    {'\n'}
                    Brighter futures.
                </Text>

                <Text style={styles.description}>
                    Learn at your pace, ask questions freely, and
                    build confidence in your own language.
                </Text>

                <Pressable
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.primaryButtonText}>
                        Get started
                    </Text>

                    <Text style={styles.arrow}>→</Text>
                </Pressable>

                <Pressable
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.secondaryButtonText}>
                        I already have an account
                    </Text>
                </Pressable>

                <View style={styles.footerContainer}>
                    <Image
                        source={require('../../assets/images/wifi-off.png')}
                        style={styles.footerIcon}
                        resizeMode="contain"
                    />

                    <Text style={styles.footer}>
                        Data-friendly. Download lessons to learn offline.
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
        paddingBottom: 35,
    },

    logoRow: {
        marginBottom: 20,
    },

    illustrationContainer: {
        width: 342,
        height: 254,
        borderRadius: 28,
        backgroundColor: colors.lightGreen,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 19,
    },

    illustration: {
        width: '100%',
        height: '100%',
    },

    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5F3E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 12,
    },

    badgeText: {
        color: colors.primaryDark,
        fontSize: 11,
        fontWeight: '500',
    },

    heading: {
        color: colors.heading,
        fontSize: 32,
        fontWeight: '800',
        lineHeight: 31,
        letterSpacing: -0.7,
        marginBottom: 10,
    },

    description: {
        color: colors.body,
        fontSize: 15,
        lineHeight: 19,
        marginBottom: 18,
    },

    primaryButton: {
        height: 52,
        width: 342,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
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

    secondaryButton: {
        height: 52,
        width: 342,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },

    secondaryButtonText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: '600',
    },

    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        gap: 6,
    },

    footer: {
        color: colors.body,
        fontSize: 11,
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
