import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    SafeAreaView,
    StatusBar,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { useAuth } from '../../context/AuthContext';

function SettingRow({ icon, title, subtitle, onPress }) {
    return (
        <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.settingIcon}>
                <Ionicons name={icon} size={19} color={colors.primary} />
            </View>

            <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle ? (
                    <Text style={styles.settingSubtitle}>{subtitle}</Text>
                ) : null}
            </View>

            <Ionicons
                name="chevron-forward"
                size={17}
                color={colors.body}
            />
        </TouchableOpacity>
    );
}

function PreferenceRow({
    title,
    subtitle,
    value,
    onValueChange,
}) {
    return (
        <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
                <Text style={styles.settingTitle}>{title}</Text>
                <Text style={styles.settingSubtitle}>{subtitle}</Text>
            </View>

            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: colors.border,
                    true: colors.primary,
                }}
                thumbColor={colors.white}
            />
        </View>
    );
}

function BottomNavigation({ navigation, active = 'Profile' }) {
    const tabs = [
        { label: 'Home', icon: 'home-outline', screen: 'LearnerDashboard' },
        { label: 'Subjects', icon: 'book-outline', screen: 'SubjectsSelection' },
        { label: 'Tutor', icon: 'sparkles-outline', screen: 'AITutor' },
        { label: 'Progress', icon: 'stats-chart-outline', screen: 'LearningProgress' },
        { label: 'Profile', icon: 'person-outline', screen: 'Profile' },
    ];

    return (
        <View style={styles.bottomNav}>
            {tabs.map((tab) => {
                const selected = active === tab.label;

                return (
                    <TouchableOpacity
                        key={tab.label}
                        style={styles.navItem}
                        onPress={() => navigation.navigate(tab.screen)}
                    >
                        <View style={[styles.navIcon, selected && styles.activeNavIcon]}>
                            <Ionicons
                                name={tab.icon}
                                size={19}
                                color={selected ? colors.primary : colors.body}
                            />
                        </View>

                        <Text
                            style={[
                                styles.navLabel,
                                selected && styles.activeNavLabel,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function SettingsScreen({ navigation }) {

    const [reminders, setReminders] = useState(true);
    const [dataSaver, setDataSaver] = useState(true);
    const [wifiOnly, setWifiOnly] = useState(true);

    const { signOut } = useAuth();

    const handleSignOut = () => {
        Alert.alert(
            'Log out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log out',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const { error } = await signOut();

                            if (error) {
                                Alert.alert(
                                    'Logout Failed',
                                    error.message
                                );
                                return;
                            }

                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Welcome' }],
                            });
                        } catch (error) {
                            Alert.alert(
                                'Error',
                                'Unable to log out. Please try again.'
                            );
                        }
                    },
                },
            ]
        );
    };



    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={colors.background}
            />

            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={22}
                                color={colors.heading}
                            />
                        </TouchableOpacity>

                        <View style={styles.headerText}>
                            <Text style={styles.eyebrow}>MAKE LEARNING YOURS</Text>
                            <Text style={styles.pageTitle}>Settings</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <SettingRow
                            icon="language-outline"
                            title="App & tutor language"
                            subtitle="English"
                            onPress={() => navigation.navigate('Language')}
                        />

                        <SettingRow
                            icon="text-outline"
                            title="Text size"
                            subtitle="Standard · Adjust for easier reading"
                            onPress={() =>
                                Alert.alert(
                                    'Text size',
                                    'Text-size preferences can be connected to a dedicated settings screen.'
                                )
                            }
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Learning & data</Text>

                    <View style={styles.card}>
                        <PreferenceRow
                            title="Learning reminders"
                            subtitle="A gentle nudge at 16:00 on weekdays"
                            value={reminders}
                            onValueChange={setReminders}
                        />

                        <PreferenceRow
                            title="Data saver"
                            subtitle="Keep images small; no auto-play"
                            value={dataSaver}
                            onValueChange={setDataSaver}
                        />

                        <PreferenceRow
                            title="Download on Wi-Fi only"
                            subtitle="Protect your mobile data"
                            value={wifiOnly}
                            onValueChange={setWifiOnly}
                        />
                    </View>

                    <View style={[styles.card, styles.accountCard]}>
                        <SettingRow
                            icon="shield-checkmark-outline"
                            title="Account & password"
                            subtitle="Learner account"
                            onPress={() =>
                                Alert.alert(
                                    'Account & password',
                                    'Connect this option to your account-management screen.'
                                )
                            }
                        />

                        <SettingRow
                            icon="lock-closed-outline"
                            title="Privacy & your data"
                            onPress={() =>
                                Alert.alert(
                                    'Privacy & your data',
                                    'Connect this option to your privacy screen.'
                                )
                            }
                        />

                        <SettingRow
                            icon="help-circle-outline"
                            title="Help & support"
                            onPress={() =>
                                Alert.alert(
                                    'Help & support',
                                    'Connect this option to your help screen.'
                                )
                            }
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleSignOut}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.logoutText}>Log out</Text>
                        <Ionicons
                            name="log-out-outline"
                            size={18}
                            color={colors.primary}
                        />
                    </TouchableOpacity>

                    <Text style={styles.versionText}>
                        LumaLearn · Version 1.0.0
                    </Text>
                </ScrollView>

                <BottomNavigation navigation={navigation} active="Profile" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 18,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 23,
    },
    backButton: {
        width: 38,
        height: 38,
        justifyContent: 'center',
    },
    headerText: {
        marginLeft: 0,
    },
    eyebrow: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '800',
        marginBottom: 3,
    },
    pageTitle: {
        color: colors.heading,
        fontSize: 20,
        fontWeight: '800',
    },
    sectionTitle: {
        color: colors.heading,
        fontSize: 15,
        fontWeight: '800',
        marginTop: 16,
        marginBottom: 8,
    },
    card: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    accountCard: {
        marginTop: 12,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 55,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingVertical: 7,
    },
    settingIcon: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    settingInfo: {
        flex: 1,
    },
    settingTitle: {
        color: colors.heading,
        fontSize: 12,
        fontWeight: '600',
    },
    settingSubtitle: {
        color: colors.body,
        fontSize: 10,
        marginTop: 3,
        lineHeight: 14,
    },
    preferenceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 59,
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    preferenceInfo: {
        flex: 1,
        paddingRight: 8,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        minHeight: 46,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        marginTop: 12,
    },
    logoutText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    versionText: {
        textAlign: 'center',
        color: colors.body,
        fontSize: 9,
        marginTop: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 8,
        paddingBottom: 5,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        gap: 3,
    },
    navIcon: {
        minWidth: 38,
        height: 27,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeNavIcon: {
        backgroundColor: colors.lightGreen,
    },
    navLabel: {
        fontSize: 9,
        color: colors.body,
    },
    activeNavLabel: {
        color: colors.primaryDark,
        fontWeight: '800',
    },
});
