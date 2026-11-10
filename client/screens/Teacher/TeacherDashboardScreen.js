import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { Text } from '../../components/TText';
import { supabase } from '../../config/supabase';
import TeacherBottomNav from '../../components/TeacherBottomNav';

const learnersNeedingSupport = [
  {
    initials: 'TN',
    name: 'Thabo Ndlovu',
    subject: 'Fractions · Last active today',
    mastery: 54,
  },
  {
    initials: 'ZD',
    name: 'Zanele Dube',
    subject: 'Word problems · Active yesterday',
    mastery: 58,
  },
];

function MetricCard({ icon, value, label }) {
  return (
    <View style={styles.metricCard}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

export default function TeacherDashboardScreen({ navigation }) {

  const [TeacherName, setTeacherName] = useState('');
  const [SchoolName, setSchoolName] = useState('')
  const [loadingSchoolName, setLoadingSchoolName] = useState(true)
  const [loadingName, setLoadingName] = useState(true);

  useEffect(() => {
    fetchTeacherName();
    fetchSchoolName();
  }, []);

  const fetchTeacherName = async () => {
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
        setTeacherName('Teacher');
        return;
      }

      // Retrieve the teacher's full name from the profiles table
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
        setTeacherName(profile.full_name.trim());
      } else {
        setTeacherName('Teacher');
      }

    } catch (error) {
      console.error('Error fetching teacher name:', error.message);
      setTeacherName('Teacher');
    } finally {
      setLoadingName(false);
    }
  };

  const fetchSchoolName = async () => {
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
        setSchoolName('Learner');
        return;
      }

      // Retrieve the school full name from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('school_name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      // Display the full name
      if (profile?.school_name) {
        setSchoolName(profile.school_name.trim());
      } else {
        setSchoolName('School');
      }

    } catch (error) {
      console.error('Error fetching school name:', error.message);
      setSchoolName('School');
    } finally {
      setLoadingSchoolName(false);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
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
                  TEACHER WORKSPACE
                </Text>
              </View>
            </View>



            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate('TeacherNotifications')}
            >
              <Ionicons
                name="notifications-outline"
                size={21}
                color={colors.heading}
              />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>
              {getGreeting()}, {loadingName ? '...' : TeacherName}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.classSelector}
            onPress={() =>
              navigation.navigate('SchoolClassesSettings')
            }
          >
            <Ionicons
              name="school-outline"
              size={18}
              color={colors.primary}
            />

            <Text style={styles.classText}>
              Grade 7A · {loadingSchoolName ? '...' : SchoolName}
            </Text>

            <Ionicons
              name="chevron-down"
              size={17}
              color={colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.metricsRow}>
            <MetricCard
              icon="people-outline"
              value="32"
              label="Learners"
            />

            <MetricCard
              icon="analytics-outline"
              value="68%"
              label="Class mastery"
            />

            <MetricCard
              icon="book-outline"
              value="27"
              label="Active this week"
            />
          </View>

          <View style={styles.focusCard}>
            <View style={styles.focusHeader}>
              <Ionicons
                name="bulb-outline"
                size={19}
                color={colors.primary}
              />
              <Text style={styles.focusTitle}>
                A small focus, a big difference
              </Text>
            </View>

            <Text style={styles.focusDescription}>
              12 learners need help comparing fractions. Try a guided
              group activity this week.
            </Text>

            <TouchableOpacity
              style={styles.focusLink}
              onPress={() => navigation.navigate('TeacherGaps')}
            >
              <Text style={styles.focusLinkText}>
                Explore learning gaps
              </Text>

              <Ionicons
                name="arrow-forward"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.createGroupCard}
            onPress={() => navigation.navigate('CreateGroup')}
          >
            <View style={styles.createGroupIcon}>
              <Ionicons
                name="people-outline"
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.createGroupInfo}>
              <Text style={styles.createGroupTitle}>
                Create Learning Group
              </Text>

              <Text style={styles.createGroupSubtitle}>
                Group learners and assign activities together.
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>A little extra support</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('LearnersNeedingSupport')}
            >
              <Text style={styles.viewAll}>View all 18</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.learnersCard}>
            {learnersNeedingSupport.map((learner, index) => (
              <TouchableOpacity
                key={learner.initials}
                style={[
                  styles.learnerRow,
                  index !== learnersNeedingSupport.length - 1 &&
                  styles.learnerDivider,
                ]}
                onPress={() =>
                  navigation.navigate('TeacherLearnerDetails', {
                    learner,
                  })
                }
              >
                <View style={styles.learnerAvatar}>
                  <Text style={styles.learnerInitials}>
                    {learner.initials}
                  </Text>
                </View>

                <View style={styles.learnerInfo}>
                  <Text style={styles.learnerName}>
                    {learner.name}
                  </Text>
                  <Text style={styles.learnerSubtitle}>
                    {learner.subject}
                  </Text>
                </View>

                <View style={styles.masteryBadge}>
                  <Text style={styles.masteryText}>
                    {learner.mastery}%
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color={colors.body}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.reportCard}
            onPress={() => navigation.navigate('TeacherReports')}
          >
            <View style={styles.reportIcon}>
              <Ionicons
                name="document-text-outline"
                size={21}
                color={colors.primary}
              />
            </View>

            <View style={styles.reportInfo}>
              <Text style={styles.reportTitle}>
                Your weekly report is ready
              </Text>
              <Text style={styles.reportSubtitle}>
                12–18 Oct · View class progress
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.primary}
            />
          </TouchableOpacity>
        </ScrollView>

        <TeacherBottomNav
          navigation={navigation}
          active="home"
        />
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
    paddingTop: 12,
    paddingBottom: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  notificationButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 15,
    gap: 9,
  },
  classText: {
    flex: 1,
    color: colors.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  metricCard: {
    flex: 1,
    minHeight: 88,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 11,
    justifyContent: 'center',
  },
  metricValue: {
    color: colors.heading,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  metricLabel: {
    color: colors.body,
    fontSize: 9,
    marginTop: 3,
  },
  focusCard: {
    backgroundColor: colors.lightGreen,
    borderRadius: 18,
    padding: 15,
    marginBottom: 19,
  },
  focusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  focusTitle: {
    flex: 1,
    color: colors.heading,
    fontSize: 12,
    fontWeight: '800',
  },
  focusDescription: {
    color: colors.heading,
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 10,
  },
  focusLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  focusLinkText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  createGroupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 13,
    marginBottom: 19,
    gap: 11,
  },

  createGroupIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },

  createGroupInfo: {
    flex: 1,
  },

  createGroupTitle: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '800',
  },

  createGroupSubtitle: {
    color: colors.body,
    fontSize: 10,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 11,
  },
  sectionTitle: {
    color: colors.heading,
    fontSize: 15,
    fontWeight: '800',
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
  greetingContainer: {
    marginBottom: 18,
  },

  greeting: {
    fontSize: 25,
    fontWeight: '800',
    color: colors.heading,
    marginBottom: 5,
  },

  viewAll: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
  learnersCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  learnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 9,
  },
  learnerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  learnerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnerInitials: {
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '800',
  },
  learnerInfo: {
    flex: 1,
  },
  learnerName: {
    color: colors.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  learnerSubtitle: {
    color: colors.body,
    fontSize: 9,
    marginTop: 4,
  },
  masteryBadge: {
    backgroundColor: '#FFF5D9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 13,
  },
  masteryText: {
    color: '#956B16',
    fontSize: 10,
    fontWeight: '800',
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    gap: 11,
    marginBottom: 8,
  },
  reportIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    color: colors.heading,
    fontSize: 11,
    fontWeight: '800',
  },
  reportSubtitle: {
    color: colors.body,
    fontSize: 9,
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
    color: colors.primaryDark,
    fontWeight: '800',
  },
});
