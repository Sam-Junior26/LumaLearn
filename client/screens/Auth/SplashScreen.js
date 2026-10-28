import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Pressable,
    Image
} from 'react-native';

import { colors } from '../../styles/theme';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Welcome');
        }, 3000);

        return () => clearTimeout(timer);

    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={colors.splashBackground}
            />

            <Text style={styles.topText}>
                LEARN TOGETHER. GROW TOGETHER.
            </Text>

            <View style={styles.centerContent}>
                <View style={styles.logoBox}>
                    <Image
                        source={require('../../assets/images/App emblem.png')}
                        style={styles.bookIcon}
                        resizeMode="contain"
                    />

                    <View style={styles.bookSpine} />
                </View>

                <Text style={styles.title}>LumaLearn</Text>

                <Text style={styles.subtitle}>
                    A world of learning.
                    {'\n'}
                    In your language.
                </Text>
            </View>

            <View style={styles.bottomContent}>
                <Pressable
                    style={styles.indicators}
                    onPress={() => navigation.replace('Welcome')}
                >
                    <View style={styles.activeIndicator} />
                    <View style={styles.indicator} />
                    <View style={styles.indicator} />
                </Pressable>

                <Text style={styles.quote}>
                    "I am because we are."
                    {'\n'}
                    Made for every learner.
                </Text>
            </View>

            <View style={styles.homeIndicator} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.splashBackground,
        paddingHorizontal: 24,
        paddingTop: 56,
        paddingBottom: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 28,
    },

    topText: {
        color: '#E5F1E9',
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
        marginTop: 0,
    },

    centerContent: {
        alignItems: 'center',
        marginTop: -10,
    },

    logoBox: {
        width: 92,
        height: 92,
        borderRadius: 27,
        backgroundColor: colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },

    bookIcon: {
        color: colors.splashBackground,
        fontSize: 45,
    },

    bookSpine: {
        position: 'absolute',
        height: 31,
        width: 1,
        backgroundColor: colors.splashBackground,
    },

    title: {
        color: colors.white,
        fontSize: 39,
        fontWeight: '800',
        letterSpacing: -1,
        marginBottom: 10,
    },

    subtitle: {
        color: '#E6F1EB',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
    },

    bottomContent: {
        alignItems: 'center',
        marginBottom: 25,
    },

    indicators: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 22,
    },

    activeIndicator: {
        width: 20,
        height: 6,
        borderRadius: 10,
        backgroundColor: colors.yellow,
    },

    indicator: {
        width: 6,
        height: 6,
        borderRadius: 5,
        backgroundColor: '#628A79',
    },

    quote: {
        color: '#E6F1EB',
        fontSize: 13,
        lineHeight: 16,
        textAlign: 'center',
    },

    homeIndicator: {
        position: 'absolute',
        bottom: 8,
        width: 104,
        height: 4,
        borderRadius: 5,
        backgroundColor: '#163F31',
    },
});
