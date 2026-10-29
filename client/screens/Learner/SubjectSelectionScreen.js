import React, { useState } from 'react';
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
  {
    name: 'Mathematics',
    icon: 'calculator-outline',
    completed: 8,
    total: 16,
    progress: 62,
    next: 'Equivalent fractions',
  },
  {
    name: 'Natural Sciences',
    icon: 'flask-outline',
    completed: 6,
    total: 12,
    progress: 81,
    next: 'Food webs around us',
  },
  {
    name: 'English',
    icon: 'book-outline',
    completed: 7,
    total: 14,
    progress: 85,
    next: 'Reading for meaning',
  },
  {
    name: 'Social Sciences',
    icon: 'earth-outline',
    completed: 3,
    total: 10,
    progress: 76,
    next: 'Maps and scale',
  },
];

export default function SubjectSelectionScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All subjects');

  // Example offline lessons.
  // Replace these with the learner's actual downloaded lessons.
  const downloadedLessons = [
    'Mathematics',
    'English',
  ];

  const displayedSubjects =
    activeTab === 'All subjects'
      ? subjects
      : subjects.filter((subject) =>
        downloadedLessons.includes(subject.name)
      );

  const renderSubject = (subject) => (
    <TouchableOpacity
      key={subject.name}
      style={styles.subjectCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('LessonDetails', {
          subject: subject.name,
          lesson: subject.next,
        })
      }
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
          <Text style={styles.subjectName}>
            {subject.name}
          </Text>

          <Text style={styles.subjectSubtitle}>
            {subject.completed} of {subject.total} lessons completed
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.primary}
        />
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            { width: `${subject.progress}%` },
          ]}
        />
      </View>

      <View style={styles.subjectBottom}>
        <Text style={styles.nextLesson} numberOfLines={1}>
          Next: {subject.next}
        </Text>

        <Text style={styles.progressPercentage}>
          {subject.progress}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.screenBackground}
      />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.eyebrow}>
            GRADE 7 · CAPS ALIGNED
          </Text>

          <View style={styles.header}>
            <Text style={styles.title}>
              Explore your subjects
            </Text>

            <TouchableOpacity
              onPress={() => {
                // Add subject search functionality here.
              }}
            >
              <Ionicons
                name="search-outline"
                size={23}
                color={colors.heading}
              />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {['All subjects', 'Downloaded'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Subjects */}
          {displayedSubjects.length > 0 ? (
            displayedSubjects.map(renderSubject)
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="cloud-download-outline"
                size={35}
                color={colors.primary}
              />

              <Text style={styles.emptyTitle}>
                No downloaded subjects
              </Text>

              <Text style={styles.emptyDescription}>
                Download lessons to learn when you're offline.
              </Text>
            </View>
          )}

          <View style={styles.offlineInfo}>
            <Ionicons
              name="download-outline"
              size={15}
              color={colors.primary}
            />

            <Text style={styles.offlineText}>
              4 lessons saved for learning without internet.
            </Text>
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
            const active = item.name === 'Subjects';

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
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.heading,
  },

  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.mutedGreen,
    padding: 4,
    borderRadius: 12,
    marginBottom: 15,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 9,
  },

  activeTab: {
    backgroundColor: colors.white,
  },

  tabText: {
    color: colors.body,
    fontSize: 12,
    fontWeight: '500',
  },

  activeTabText: {
    color: colors.primaryDark,
    fontWeight: '700',
  },

  subjectCard: {
    backgroundColor: colors.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 13,
  },

  subjectTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  subjectIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  subjectInfo: {
    flex: 1,
  },

  subjectName: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.heading,
    marginBottom: 4,
  },

  subjectSubtitle: {
    fontSize: 10,
    color: colors.body,
  },

  progressBackground: {
    height: 6,
    borderRadius: 5,
    backgroundColor: '#E4ECE7',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },

  subjectBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  nextLesson: {
    color: colors.body,
    fontSize: 10,
    flex: 1,
    marginRight: 8,
  },

  progressPercentage: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },

  offlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 7,
  },

  offlineText: {
    color: colors.body,
    fontSize: 10,
  },

  emptyState: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginTop: 15,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.heading,
    marginTop: 10,
  },

  emptyDescription: {
    color: colors.body,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 6,
  },

  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    paddingBottom: 8,
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
  },

  navIcon: {
    width: 38,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeNavIcon: {
    backgroundColor: colors.lightGreen,
  },

  navText: {
    color: colors.body,
    fontSize: 9,
    marginTop: 3,
  },

  activeNavText: {
    color: colors.primary,
    fontWeight: '800',
  },
});