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

const subjects = [
  { name: 'Mathematics', mastery: 62 },
  { name: 'Natural Sciences', mastery: 81 },
  { name: 'English', mastery: 85 },
  { name: 'Social Sciences', mastery: 76 },
];

const weeklyProgress = [
  { label: '14 Sep', value: 35 },
  { label: '21 Sep', value: 58 },
  { label: '28 Sep', value: 65 },
  { label: '5 Oct', value: 82 },
  { label: '12 Oct', value: 100 },
];

function ProgressChart() {
  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Growing every week</Text>
        <Text style={styles.chartPeriod}>Last 5 weeks</Text>
      </View>

      <View style={styles.chartArea}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.chartGridLine} />
        ))}

        <View style={styles.chartBars}>
          {weeklyProgress.map((item, index) => (
            <View key={item.label} style={styles.chartColumn}>
              <View
                style={[
                  styles.chartPoint,
                  {
                    height: `${item.value}%`,
                  },
                ]}
              />

              <Text style={styles.chartDate}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartValue}>
          <Text style={styles.chartValueText}>76%</Text>
        </View>
      </View>
    </View>
  );
}

function SubjectProgress({ name, mastery }) {
  return (
    <View style={styles.subjectItem}>
      <View style={styles.subjectHeading}>
        <Text style={styles.subjectName}>{name}</Text>
        <Text style={styles.subjectPercentage}>{mastery}%</Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${mastery}%` },
          ]}
        />
      </View>
    </View>
  );
}

function BottomNavigation({ navigation }) {
  const tabs = [
    { label: 'Home', icon: 'home-outline', route: 'LearnerDashboard' },
    { label: 'Subjects', icon: 'book-outline', route: 'SubjectSelection' },
    { label: 'Tutor', icon: 'sparkles-outline', route: 'AITutor' },
    { label: 'Progress', icon: 'stats-chart-outline', route: 'LearningProgress' },
    { label: 'Profile', icon: 'person-outline', route: 'Profile' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const active = tab.label === 'Progress';

        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            onPress={() => {
              if (!active) {
                navigation.navigate(tab.route);
              }
            }}
          >
            <View style={active ? styles.activeTabIcon : styles.tabIcon}>
              <Ionicons
                name={tab.icon}
                size={18}
                color={active ? colors.primary : colors.body}
              />
            </View>

            <Text
              style={[
                styles.tabLabel,
                active && styles.activeTabLabel,
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

export default function LearningProgressScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background || colors.screenBackground}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>
                YOUR LEARNING JOURNEY
              </Text>

              <Text style={styles.pageTitle}>
                Look how far you’ve come
              </Text>
            </View>

            <TouchableOpacity
              style={styles.calendarButton}
              onPress={() => {}}
            >
              <Ionicons
                name="calendar-outline"
                size={21}
                color={colors.heading}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryTop}>
              <Text style={styles.masteryPercentage}>76%</Text>

              <View style={styles.pointsBadge}>
                <Ionicons
                  name="arrow-up"
                  size={12}
                  color={colors.primaryDark}
                />
                <Text style={styles.pointsText}>12 points</Text>
              </View>
            </View>

            <Text style={styles.masteryCaption}>
              overall mastery
            </Text>

            <View style={styles.summaryFooter}>
              <Text style={styles.summaryDetail}>
                24 lessons completed
              </Text>

              <Text style={styles.summaryDetail}>
                🔥 4-day learning streak
              </Text>
            </View>
          </View>

          <ProgressChart />

          <Text style={styles.sectionTitle}>
            Mastery by subject
          </Text>

          {subjects.map((subject) => (
            <SubjectProgress
              key={subject.name}
              name={subject.name}
              mastery={subject.mastery}
            />
          ))}

          <TouchableOpacity
            style={styles.nextStepCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('LearningGapDetails', {
                subject: 'Mathematics',
                lesson: 'Comparing fractions',
              })
            }
          >
            <Ionicons
              name="bulb-outline"
              size={21}
              color="#805A13"
            />

            <View style={styles.nextStepInfo}>
              <Text style={styles.nextStepTitle}>
                One next step in Mathematics
              </Text>

              <Text style={styles.nextStepSubtitle}>
                Comparing fractions · Let’s practise
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>
        </ScrollView>

        <BottomNavigation navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background || colors.screenBackground || '#F7F9F7',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    paddingRight: 8,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  pageTitle: {
    color: colors.heading,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '800',
  },
  calendarButton: {
    padding: 6,
  },
  summaryCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 19,
    padding: 16,
    marginBottom: 14,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masteryPercentage: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '800',
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E7F4EC',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  pointsText: {
    color: '#205B46',
    fontSize: 10,
    fontWeight: '700',
  },
  masteryCaption: {
    color: '#E4F0E9',
    fontSize: 11,
    marginTop: -2,
  },
  summaryFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  summaryDetail: {
    color: colors.white,
    fontSize: 9,
  },
  chartCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 13,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  chartTitle: {
    color: colors.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  chartPeriod: {
    color: colors.body,
    fontSize: 9,
  },
  chartArea: {
    height: 95,
    justifyContent: 'flex-end',
  },
  chartGridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E8EEE9',
  },
  chartBars: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartColumn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chartPoint: {
    width: 3,
    maxHeight: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  chartDate: {
    color: colors.body,
    fontSize: 8,
    marginTop: 5,
  },
  chartValue: {
    position: 'absolute',
    right: 0,
    top: 1,
    backgroundColor: '#E7F4EC',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },
  chartValueText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
  },
  sectionTitle: {
    color: colors.heading,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 13,
  },
  subjectItem: {
    marginBottom: 12,
  },
  subjectHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  subjectName: {
    color: colors.heading,
    fontSize: 11,
  },
  subjectPercentage: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  progressTrack: {
    height: 6,
    borderRadius: 10,
    backgroundColor: '#E5ECE7',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  nextStepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6DA',
    borderRadius: 16,
    padding: 13,
    marginTop: 2,
    gap: 10,
  },
  nextStepInfo: {
    flex: 1,
  },
  nextStepTitle: {
    color: colors.heading,
    fontSize: 11,
    fontWeight: '700',
  },
  nextStepSubtitle: {
    color: colors.body,
    fontSize: 10,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 5,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    width: 38,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabIcon: {
    width: 38,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7F4EC',
    borderRadius: 20,
  },
  tabLabel: {
    color: colors.body,
    fontSize: 9,
    marginTop: 2,
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: '800',
  },
});
