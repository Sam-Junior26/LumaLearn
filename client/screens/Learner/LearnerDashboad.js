import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Pressable
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { supabase } from '../../config/supabase';

const subjects = [
    {
        name: 'Mathematics',
        mastery: 62,
        icon: 'calculator-outline',
    },
    {
        name: 'Natural Sciences',
        mastery: 81,
        icon: 'flask-outline',
    },
    {
        name: 'English',
        mastery: 85,
        icon: 'book-outline',
    },
    {
        name: 'Social Sciences',
        mastery: 76,
        icon: 'earth-outline',
    },
];

const recommendations = [
    {
        title: 'Comparing fractions',
        subject: 'Mathematics',
        duration: '8 min',
        icon: 'calculator-outline',
    },
    {
        title: 'Food webs around us',
        subject: 'Natural Sciences',
        duration: '10 min',
        icon: 'leaf-outline',
    },
];

export default function DashboardScreen({ navigation }) {

    const [learnerName, setLearnerName] = useState('');
    const [loadingName, setLoadingName] = useState(true);

    useEffect(() => {
        fetchLearnerName();
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

    const renderSubject = (subject) => (
        <TouchableOpacity
            key={subject.name}
            style={styles.subjectCard}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('LessonDetails', {
                    subject: subject.name,
                })
            }}
        >
            <View style={styles.subjectTop}>
                <View style={styles.subjectIcon}>
                    <Ionicons
                        name={subject.icon}
                        size={22}
                        color={colors.primary}
                    />
                </View>

                <View style={styles.subjectInfo}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.masteryText}>
                        {subject.mastery}% mastery
                    </Text>
                </View>
            </View>

            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${subject.mastery}%` },
                    ]}
                />
            </View>
        </TouchableOpacity>
    );

    const renderRecommendation = (item) => (
        <TouchableOpacity
            key={item.title}
            style={styles.recommendationCard}
            activeOpacity={0.8}
            onPress={() => {
                // Connect this to your lesson screen.
            }}
        >
            <View style={styles.recommendationIcon}>
                <Ionicons
                    name={item.icon}
                    size={21}
                    color={colors.primary}
                />
            </View>

            <View style={styles.recommendationInfo}>
                <Text style={styles.recommendationTitle}>
                    {item.title}
                </Text>
                <Text style={styles.recommendationSubtitle}>
                    {item.subject} · {item.duration}
                </Text>
            </View>

            <Ionicons
                name="chevron-forward"
                size={19}
                color={colors.primary}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={colors.background}
            />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoIcon}>
                            <Ionicons
                                name="book"
                                size={25}
                                color={colors.white}
                            />
                        </View>

                        <View>
                            <Text style={styles.logoText}>LumaLearn</Text>
                            <Text style={styles.logoSubtitle}>
                                GRADE 7 · LET'S KEEP GROWING
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => {
                            // Open notifications.
                        }}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={23}
                            color={colors.heading}
                        />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Greeting */}
                <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>
                        Hello, {loadingName ? '...' : learnerName}
                    </Text>

                    <Text style={styles.greetingSubtitle}>
                        A little progress, every day. You've got this.
                    </Text>
                </View>

                {/* Continue Learning */}
                <View style={styles.learningCard}>
                    <View style={styles.learningHeader}>
                        <Text style={styles.eyebrow}>
                            CONTINUE LEARNING
                        </Text>

                        <TouchableOpacity>
                            <Ionicons
                                name="bookmark-outline"
                                size={20}
                                color={colors.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.learningTitle}>
                        Equivalent fractions
                    </Text>

                    <Text style={styles.learningSubtitle}>
                        Mathematics · 6 min left · Step 2 of 4
                    </Text>

                    <View style={styles.progressBackground}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: '50%' },
                            ]}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.continueButton}
                        activeOpacity={0.85}
                        onPress={() => {
                            navigation.navigate('LessonDetails')
                        }}
                    >
                        <Text style={styles.continueButtonText}>
                            Continue lesson
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={19}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </View>

                {/* AI Tutor */}
                <TouchableOpacity
                    style={styles.tutorCard}
                    activeOpacity={0.9}
                    onPress={() => {
                        navigation.navigate('AITutor')
                    }}
                >
                    <View style={styles.tutorTop}>
                        <View style={styles.tutorIconBox}>
                            <MaterialCommunityIcons
                                name="robot-happy-outline"
                                size={32}
                                color={colors.primaryDark}
                            />
                        </View>

                        <View style={styles.tutorInfo}>
                            <Text style={styles.tutorTitle}>
                                Meet your AI Tutor
                            </Text>

                            <Text style={styles.tutorDescription}>
                                No question is too small.
                                {"\n"}Let's figure it out together.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.tutorBottom}>
                        <Text style={styles.tutorAction}>
                            Ask a question
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={17}
                            color={colors.yellow}
                        />
                    </View>

                    <MaterialCommunityIcons
                        name="creation"
                        size={33}
                        color="#A7D6C0"
                        style={styles.tutorDecoration}
                    />
                </TouchableOpacity>

                {/* Subjects */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Your subjects
                    </Text>

                    <TouchableOpacity onPress={() =>
                        navigation.navigate('SubjectSelection')}
                    >
                        <Text style={styles.seeAll}>See all</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.subjectsGrid}>
                    {subjects.map(renderSubject)}
                </View>

                {/* Recommendations */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Picked for you
                    </Text>

                    <TouchableOpacity>
                        <Text style={styles.seeAll}>View all</Text>
                    </TouchableOpacity>
                </View>

                {recommendations.map(renderRecommendation)}

                {/* Progress */}
                <View style={styles.progressSection}>
                    <Text style={styles.sectionTitle}>
                        You're making progress
                    </Text>

                    <View style={styles.statsCard}>
                        <View style={styles.statsTop}>
                            <View style={styles.masteryStat}>
                                <Text style={styles.masteryNumber}>76%</Text>
                                <Text style={styles.statSubtitle}>
                                    overall mastery
                                </Text>
                            </View>

                            <View style={styles.statDivider} />

                            <View style={styles.smallStat}>
                                <Ionicons
                                    name="flame-outline"
                                    size={24}
                                    color={colors.primary}
                                />

                                <View>
                                    <Text style={styles.statValue}>
                                        4-day
                                    </Text>
                                    <Text style={styles.statSubtitle}>
                                        streak
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.statDivider} />

                            <View style={styles.smallStat}>
                                <Ionicons
                                    name="locate-outline"
                                    size={24}
                                    color={colors.primary}
                                />

                                <View>
                                    <Text style={styles.statValue}>
                                        Weekly goal
                                    </Text>
                                    <Text style={styles.statSubtitle}>
                                        3 of 5 lessons
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.weeklyProgressRow}>
                            <View style={styles.weeklyProgressBackground}>
                                <View
                                    style={[
                                        styles.weeklyProgressFill,
                                        { width: '60%' },
                                    ]}
                                />
                            </View>

                            <Text style={styles.weeklyProgressText}>
                                60%
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom navigation */}
            <View style={styles.bottomNavigation}>
                {[
                    { name: 'Home', icon: 'home-outline', route: 'LearnerDashboard' },
                    { name: 'Subjects', icon: 'book-outline', route: 'SubjectSelection' },
                    { name: 'Tutor', icon: 'sparkles-outline', route: 'AITutor' },
                    { name: 'Progress', icon: 'stats-chart-outline', route: 'LearningProgress' },
                    { name: 'Profile', icon: 'person-outline', route: 'Profile' },
                ].map((item) => {
                    const active = item.name === 'Home';

                    return (
                        <TouchableOpacity
                            key={item.name}
                            style={styles.navItem}
                            onPress={() => {
                                if (!active) {
                                    navigation.navigate(item.route);
                                }
                            }}
                        >
                            <View
                                style={[
                                    styles.navIcon,
                                    active && styles.activeNavIcon,
                                ]}
                            >
                                <Ionicons
                                    name={item.icon}
                                    size={19}
                                    color={
                                        active ? colors.primary : colors.body
                                    }
                                />
                            </View>

                            <Text
                                style={[
                                    styles.navText,
                                    active && styles.activeNavText,
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
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
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },

    logoIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoText: {
        color: colors.heading,
        fontSize: 21,
        fontWeight: '800',
    },

    logoSubtitle: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.6,
        marginTop: 2,
    },

    notificationButton: {
        padding: 6,
        position: 'relative',
    },

    notificationDot: {
        position: 'absolute',
        top: 4,
        right: 5,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },

    greetingContainer: {
        marginBottom: 18,
    },

    greeting: {
        fontSize: 25,
        fontWeight: '800',
        color: colors.heading,
        marginBottom: 5,
    },

    greetingSubtitle: {
        color: colors.body,
        fontSize: 12,
    },

    learningCard: {
        backgroundColor: colors.lightGreen,
        borderRadius: 18,
        padding: 16,
        marginBottom: 14,
    },

    learningHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 9,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.4,
    },

    learningTitle: {
        color: colors.heading,
        fontSize: 19,
        fontWeight: '800',
        marginBottom: 5,
    },

    learningSubtitle: {
        color: colors.body,
        fontSize: 11,
        marginBottom: 13,
    },

    progressBackground: {
        height: 5,
        backgroundColor: '#D5E8DC',
        borderRadius: 5,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 5,
    },

    continueButton: {
        backgroundColor: colors.primary,
        borderRadius: 9,
        minHeight: 43,
        marginTop: 13,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },

    continueButtonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '700',
    },

    tutorCard: {
        backgroundColor: colors.primaryDark,
        borderRadius: 16,
        padding: 16,
        marginBottom: 22,
        overflow: 'hidden',
    },

    tutorTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    tutorIconBox: {
        width: 51,
        height: 51,
        borderRadius: 12,
        backgroundColor: colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tutorInfo: {
        flex: 1,
    },

    tutorTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 5,
    },

    tutorDescription: {
        color: '#E4F0E9',
        fontSize: 11,
        lineHeight: 17,
    },

    tutorBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginTop: 13,
    },

    tutorAction: {
        color: colors.yellow,
        fontSize: 11,
        fontWeight: '800',
    },

    tutorDecoration: {
        position: 'absolute',
        right: 13,
        top: 30,
        opacity: 0.65,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    sectionTitle: {
        color: colors.heading,
        fontSize: 17,
        fontWeight: '800',
    },

    seeAll: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '700',
    },

    subjectsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 22,
    },

    subjectCard: {
        width: '48.5%',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },

    subjectTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },

    subjectIcon: {
        width: 34,
        height: 34,
        borderRadius: 18,
        backgroundColor: colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },

    subjectInfo: {
        flex: 1,
    },

    subjectName: {
        color: colors.heading,
        fontSize: 10,
        fontWeight: '800',
    },

    masteryText: {
        color: colors.body,
        fontSize: 9,
        marginTop: 4,
    },

    recommendationCard: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        padding: 11,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 9,
        gap: 10,
    },

    recommendationIcon: {
        width: 35,
        height: 35,
        borderRadius: 10,
        backgroundColor: colors.lightGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },

    recommendationInfo: {
        flex: 1,
    },

    recommendationTitle: {
        color: colors.heading,
        fontSize: 11,
        fontWeight: '700',
        marginBottom: 4,
    },

    recommendationSubtitle: {
        color: colors.body,
        fontSize: 9,
    },

    progressSection: {
        marginTop: 12,
    },

    statsCard: {
        backgroundColor: colors.lightGreen,
        borderRadius: 15,
        padding: 13,
        marginTop: 12,
    },

    statsTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    masteryStat: {
        flex: 1,
    },

    masteryNumber: {
        color: colors.heading,
        fontSize: 25,
        fontWeight: '800',
    },

    statSubtitle: {
        color: colors.body,
        fontSize: 9,
        marginTop: 3,
    },

    statDivider: {
        width: 1,
        height: 35,
        backgroundColor: '#C4DDD0',
        marginHorizontal: 9,
    },

    smallStat: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },

    statValue: {
        color: colors.heading,
        fontSize: 10,
        fontWeight: '800',
    },

    weeklyProgressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    weeklyProgressBackground: {
        flex: 1,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#D5E8DC',
        overflow: 'hidden',
    },

    weeklyProgressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 5,
    },

    weeklyProgressText: {
        color: colors.primary,
        fontSize: 10,
        fontWeight: '800',
    },

    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: 9,
        paddingBottom: 8,
    },

    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },

    navText: {
        color: colors.body,
        fontSize: 9,
    },

    activeNavText: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '800',
    },
});
