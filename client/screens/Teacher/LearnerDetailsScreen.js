import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import TeacherBottomNav from '../../components/TeacherBottomNav';

const defaultLearner = {
  name: 'Naledi Mokoena',
  initials: 'NM',
  language: 'English',
  lastActive: 'Active today',
  mastery: 76,
  lessons: 24,
  streak: 4,
  gapCount: 1,

  subjects: [
    { name: 'Mathematics', value: 62 },
    { name: 'Natural Sciences', value: 81 },
    { name: 'English', value: 85 },
    { name: 'Social Sciences', value: 76 },
  ],
};

function MasteryRow({ name, value }) {
  return (
    <View style={styles.masteryRow}>
      <View style={styles.masteryLabelRow}>
        <Text style={styles.subjectName}>{name}</Text>

        <Text style={styles.subjectValue}>
          {value}%
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            { width: `${value}%` },
          ]}
        />
      </View>
    </View>
  );
}

export default function LearnerDetailsScreen({
  navigation,
  route,
}) {
  const learner = {
    ...defaultLearner,
    ...(route?.params?.learner || {}),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9F7"
      />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerIcon}
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color="#26372F"
              />
            </TouchableOpacity>

            <View style={styles.headerCenter}>
              <Text style={styles.eyebrow}>
                GRADE 7A
              </Text>

              <Text style={styles.title}>
                Learner details
              </Text>
            </View>

            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() =>
                navigation.navigate('LearnerOptions', { learner })
              }
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={21}
                color="#26372F"
              />
            </TouchableOpacity>
          </View>

          {/* Learner profile */}
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {learner.initials}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {learner.name}
              </Text>

              <Text style={styles.subline}>
                {learner.language} · {learner.lastActive}
              </Text>

              <View style={styles.gapPill}>
                <Text style={styles.gapText}>
                  {learner.gapCount} Mathematics learning gap
                  {learner.gapCount > 1 ? 's' : ''}
                </Text>
              </View>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.statsCard}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {learner.mastery}%
              </Text>

              <Text style={styles.statLabel}>
                Overall mastery
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {learner.lessons}
              </Text>

              <Text style={styles.statLabel}>
                Lessons done
              </Text>
            </View>

            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {learner.streak} days
              </Text>

              <Text style={styles.statLabel}>
                Streak
              </Text>
            </View>
          </View>

          {/* Subject mastery */}
          <Text style={styles.sectionTitle}>
            Subject mastery
          </Text>

          {learner.subjects.map((subject) => (
            <MasteryRow
              key={subject.name}
              name={subject.name}
              value={subject.value}
            />
          ))}

          {/* Latest assessment */}
          <View style={styles.assessmentCard}>
            <View style={styles.assessmentHeader}>
              <Text style={styles.cardTitle}>
                Latest assessment
              </Text>

              <View style={styles.assessmentScore}>
                <Text style={styles.assessmentScoreText}>
                  {learner.latestScore || 80}%
                </Text>
              </View>
            </View>

            <Text style={styles.assessmentTopic}>
              Equivalent fractions · 16 Oct
            </Text>

            <Text style={styles.assessmentDescription}>
              8/10 correct · +20 points since last quiz
            </Text>
          </View>

          {/* Learning gap */}
          <View style={styles.gapCard}>
            <View style={styles.gapIcon}>
              <Ionicons
                name="leaf-outline"
                size={19}
                color="#8A641A"
              />
            </View>

            <View style={styles.gapInfo}>
              <Text style={styles.gapCardTitle}>
                Comparing fractions · 2/4 correct
              </Text>

              <Text style={styles.gapDescription}>
                Practise common denominators.
              </Text>

              <Text style={styles.gapMeta}>
                Suggested lesson · 8 min
              </Text>
            </View>
          </View>

          {/* Assign practice */}
          <TouchableOpacity
            style={styles.assignButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('AssignPractice', {
                learner,
              })
            }
          >
            <Text style={styles.assignButtonText}>
              Assign practice lesson
            </Text>

            <Ionicons
              name="add"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

        </ScrollView>

        <TeacherBottomNav
          navigation={navigation}
          active="learners"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },

  screen: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },

  content: {
    paddingHorizontal: 21,
    paddingTop: 8,
    paddingBottom: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  headerIcon: {
    width: 32,
    height: 35,
    justifyContent: 'center',
  },

  headerCenter: {
    flex: 1,
    marginLeft: 7,
  },

  eyebrow: {
    color: '#2D8060',
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 3,
  },

  title: {
    color: '#26372F',
    fontSize: 19,
    fontWeight: '800',
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    marginBottom: 21,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E7F4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#205B46',
    fontSize: 22,
    fontWeight: '800',
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    color: '#26372F',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 5,
  },

  subline: {
    color: '#718078',
    fontSize: 10,
    marginBottom: 7,
  },

  gapPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF5D9',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 15,
  },

  gapText: {
    color: '#805B16',
    fontSize: 9,
    fontWeight: '600',
  },

  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E7F4EC',
    borderRadius: 17,
    paddingHorizontal: 14,
    paddingVertical: 15,
    marginBottom: 18,
  },

  stat: {
    flex: 1,
  },

  statNumber: {
    color: '#26372F',
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 3,
  },

  statLabel: {
    color: '#718078',
    fontSize: 9,
  },

  sectionTitle: {
    color: '#26372F',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },

  masteryRow: {
    marginBottom: 10,
  },

  masteryLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  subjectName: {
    color: '#26372F',
    fontSize: 11,
  },

  subjectValue: {
    color: '#2D8060',
    fontSize: 11,
    fontWeight: '800',
  },

  track: {
    height: 6,
    borderRadius: 5,
    backgroundColor: '#E4EBE6',
    overflow: 'hidden',
  },

  fill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#2D8060',
  },

  assessmentCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 17,
    padding: 13,
    marginTop: 4,
    marginBottom: 13,
  },

  assessmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  cardTitle: {
    color: '#26372F',
    fontSize: 12,
    fontWeight: '800',
  },

  assessmentScore: {
    backgroundColor: '#E7F4EC',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
  },

  assessmentScoreText: {
    color: '#205B46',
    fontSize: 10,
    fontWeight: '800',
  },

  assessmentTopic: {
    color: '#718078',
    fontSize: 10,
    marginBottom: 4,
  },

  assessmentDescription: {
    color: '#718078',
    fontSize: 10,
  },

  gapCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5D9',
    borderRadius: 16,
    padding: 13,
    marginBottom: 14,
  },

  gapIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  gapInfo: {
    flex: 1,
  },

  gapCardTitle: {
    color: '#26372F',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },

  gapDescription: {
    color: '#718078',
    fontSize: 10,
    marginBottom: 3,
  },

  gapMeta: {
    color: '#718078',
    fontSize: 9,
  },

  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: '#2D8060',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 5,
  },

  assignButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});