import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { supabase } from '../../config/supabase';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const learner = {
    name: 'Naledi Mokoena',
    initials: 'NM',
    grade: 'Grade 7A',
    school: 'Siyakhula Secondary',
    email: 'naledi.m@school.org.za',
    lessons: 24,
    streak: 4,
    mastery: 76,
};

function StatCard({ value, label }) {
    return (
        <View style={styles.statItem}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

function MenuRow({ icon, title, subtitle, onPress }) {
    return (
        <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.menuIcon}>
                <Ionicons name={icon} size={19} color={colors.primary} />
            </View>

            <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={17}
                color={colors.body}
            />
        </TouchableOpacity>
    );
}

function BottomNavigation({ navigation, active = 'Profile' }) {
    const tabs = [
        { label: 'Home', icon: 'home-outline', screen: 'LearnerDashboard' },
        { label: 'Subjects', icon: 'book-outline', screen: 'SubjectSelection' },
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
                        onPress={() => {
                            if (tab.screen) {
                                navigation.navigate(tab.screen);
                            }
                        }}
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

export default function ProfileScreen({ navigation }) {

    const [learnerName, setLearnerName] = useState('');
    const [learnerEmail, setLearnerEmail] = useState('');
    const [loadingName, setLoadingName] = useState(true);
    const [loadingEmail, setLoadingEmail] = useState(true);

    useEffect(() => {
        fetchLearnerName();
        fetchLearnerEmail();
    }, []);

    const fetchLearnerName = async () => {
        try {
            // Get the currently logged-in user
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError) {
                throw userError;
            }

            if (!user) {
                setLearnerName('Learner');
                return;
            }

            // Retrieve the learner's full name from the profiles table
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', user.id)
                .single();

            if (profileError) {
                throw profileError;
            }

            // Display the full name
            if (profile?.full_name) {
                setLearnerName(profile.full_name.trim());
            } else {
                setLearnerName('Learner');
            }

        } catch (error) {
            console.error('Error fetching learner name:', error.message);
            setLearnerName('Learner');
        } finally {
            setLoadingName(false);
        }
    };

    const getInitials = (fullName) => {
        if (!fullName) return 'L';

        return fullName
            .trim()
            .split(/\s+/)
            .map(name => name[0].toUpperCase())
            .slice(0, 2)
            .join('');
    };

    const fetchLearnerEmail = async () => {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        if (user) {
            setLearnerEmail(user.email || '');
        } else {
            setLearnerEmail('');
        }
    } catch (error) {
        console.error('Error fetching learner email:', error.message);
        setLearnerEmail('');
    } finally {
        setLoadingEmail(false)
    }
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
                        <Text style={styles.pageTitle}>My profile</Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Settings')}
                        >
                            <Ionicons
                                name="settings-outline"
                                size={22}
                                color={colors.heading}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{getInitials(learnerName)}</Text>
                        </View>

                        <Text style={styles.learnerName}>{loadingName ? '...' : learnerName}</Text>

                        <Text style={styles.schoolText}>
                            {learner.grade} · {learner.school}
                        </Text>

                        <Text style={styles.emailText}>{loadingEmail ? '...' : learnerEmail}</Text>

                        <View style={styles.accountBadge}>
                            <Text style={styles.accountBadgeText}>Learner account</Text>
                        </View>
                    </View>

                    <View style={styles.statsCard}>
                        <StatCard value={learner.lessons} label="Lessons" />
                        <StatCard value={`${learner.streak} days`} label="Streak" />
                        <StatCard value={`${learner.mastery}%`} label="Mastery" />
                    </View>

                    <Text style={styles.sectionTitle}>Small wins, big growth</Text>

                    <View style={styles.achievementRow}>
                        <View style={styles.achievementCard}>
                            <Ionicons name="leaf-outline" size={23} color="#956B16" />
                            <Text style={styles.achievementText}>First steps</Text>
                        </View>

                        <View style={styles.achievementCard}>
                            <Ionicons name="flame-outline" size={23} color="#956B16" />
                            <Text style={styles.achievementText}>4-day streak</Text>
                        </View>

                        <View style={styles.achievementCard}>
                            <Ionicons
                                name="chatbubble-outline"
                                size={23}
                                color="#956B16"
                            />
                            <Text style={styles.achievementText}>Curious mind</Text>
                        </View>
                    </View>

                    <View style={styles.menuCard}>
                        <MenuRow
                            icon="person-outline"
                            title="Personal information"
                            subtitle="Name, school and grade"
                            onPress={() => navigation.navigate('PersonalInformation')}
                        />

                        <MenuRow
                            icon="download-outline"
                            title="My downloads"
                            subtitle="4 lessons · 5.8 MB"
                            onPress={() => navigation.navigate('MyDownloads')}
                        />

                        <MenuRow
                            icon="language-outline"
                            title="Language & preferences"
                            subtitle="English · Manage in settings"
                            onPress={() => navigation.navigate('Settings')}
                        />
                    </View>
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
        paddingTop: 14,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 28,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.heading,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 22,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.primaryDark,
    },
    learnerName: {
        fontSize: 21,
        fontWeight: '800',
        color: colors.heading,
        marginBottom: 7,
    },
    schoolText: {
        fontSize: 11,
        color: colors.body,
        marginBottom: 4,
    },
    emailText: {
        fontSize: 11,
        color: colors.body,
    },
    accountBadge: {
        backgroundColor: colors.lightGreen,
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 9,
    },
    accountBadgeText: {
        color: colors.primaryDark,
        fontSize: 10,
        fontWeight: '700',
    },
    statsCard: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        paddingVertical: 15,
        marginBottom: 22,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.heading,
    },
    statLabel: {
        fontSize: 10,
        color: colors.body,
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.heading,
        marginBottom: 11,
    },
    achievementRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 18,
    },
    achievementCard: {
        flex: 1,
        minHeight: 83,
        borderRadius: 15,
        backgroundColor: '#FFF5D9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        gap: 8,
    },
    achievementText: {
        fontSize: 9,
        fontWeight: '600',
        color: colors.heading,
        textAlign: 'center',
    },
    menuCard: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        paddingHorizontal: 13,
        paddingVertical: 5,
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    menuIcon: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },
    menuInfo: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 12,
        color: colors.heading,
        fontWeight: '600',
    },
    menuSubtitle: {
        fontSize: 10,
        color: colors.body,
        marginTop: 4,
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
        color: colors.primary,
        fontWeight: '800',
    },
});
