import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

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

function BottomNavigation({ navigation, active = 'Home' }) {
  const tabs = [
    { label: 'Home', icon: 'home-outline', screen: 'TeacherDashboard' },
    { label: 'Learners', icon: 'people-outline', screen: 'Learners' },
    { label: 'Gaps', icon: 'analytics-outline', screen: 'LearningGaps' },
    { label: 'Reports', icon: 'document-text-outline', screen: 'TeacherReports' },
    { label: 'Settings', icon: 'settings-outline', screen: 'TeacherSettings' },
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
                size={18}
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

export default function TeacherDashboardScreen({ navigation }) {
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
            <View>
              <Text style={styles.eyebrow}>TEACHER WORKSPACE</Text>
              <Text style={styles.pageTitle}>Morning, Ms Dlamini</Text>
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

          <TouchableOpacity
            style={styles.classSelector}
            onPress={() =>
              navigation.navigate('ClassSelection')
            }
          >
            <Ionicons
              name="school-outline"
              size={18}
              color={colors.primary}
            />

            <Text style={styles.classText}>
              Grade 7A · Siyakhula Secondary
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
              onPress={() => navigation.navigate('LearningGaps')}
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
                  navigation.navigate('LearnerDetails', {
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

        <BottomNavigation navigation={navigation} active="Home" />
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
  eyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
    marginBottom: 4,
  },
  pageTitle: {
    color: colors.heading,
    fontSize: 20,
    fontWeight: '800',
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
