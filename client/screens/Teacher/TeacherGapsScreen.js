import React, { useState } from 'react';

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
import { colors } from '../../styles/theme';

const gaps = [
  {
    id: '1',
    title: 'Comparing fractions',
    description: 'Different denominators · 12 learners',
    mastery: 45,
    priority: 'Priority',
    suggestion: 'Teach with fraction strips',
  },
  {
    id: '2',
    title: 'Equivalent fractions',
    description: 'Multiplying numerator & denominator · 8 learners',
    mastery: 56,
    priority: 'Practice',
    suggestion: 'Revisit equal parts visually',
  },
  {
    id: '3',
    title: 'Word problems',
    description: 'Choosing the right operation · 5 learners',
    mastery: 68,
    priority: 'Practice',
    suggestion: 'Try a guided reading activity',
  },
];

export default function TeacherGapsScreen({ navigation }) {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const renderGap = (gap) => (
    <TouchableOpacity
      key={gap.id}
      style={styles.gapCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('GapDetails', { gap })
      }
    >
      <View style={styles.gapHeader}>
        <Text style={styles.gapTitle}>{gap.title}</Text>

        <View
          style={[
            styles.priorityBadge,
            gap.priority === 'Priority'
              ? styles.priority
              : styles.practice,
          ]}
        >
          <Text
            style={[
              styles.priorityText,
              gap.priority === 'Priority'
                ? styles.priorityTextDark
                : styles.practiceText,
            ]}
          >
            {gap.priority}
          </Text>
        </View>
      </View>

      <Text style={styles.gapDescription}>
        {gap.description}
      </Text>

      <View style={styles.masteryHeader}>
        <Text style={styles.masteryLabel}>
          Group skill mastery
        </Text>

        <Text style={styles.masteryValue}>
          {gap.mastery}%
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${gap.mastery}%` },
          ]}
        />
      </View>

      <View style={styles.suggestionRow}>
        <Text style={styles.suggestionText}>
          {gap.suggestion}
        </Text>

        <Ionicons
          name="arrow-forward"
          size={17}
          color="#2D8060"
        />
      </View>
    </TouchableOpacity>
  );

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
            <View>
              <Text style={styles.eyebrow}>
                GRADE 7A · LEARNING GAPS
              </Text>

              <Text style={styles.title}>
                Where support matters
              </Text>
            </View>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setSelectedSubject('All subjects')}
            >
              <Ionicons
                name="options-outline"
                size={21}
                color="#26372F"
              />
            </TouchableOpacity>
          </View>

          {/* Subject filters */}
          <View style={styles.subjectTabs}>
            {['Mathematics', 'All subjects'].map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.subjectTab,
                  selectedSubject === subject &&
                    styles.activeSubjectTab,
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[
                    styles.subjectTabText,
                    selectedSubject === subject &&
                      styles.activeSubjectText,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Summary card */}
          <View style={styles.summaryCard}>
            <Ionicons
              name="people-outline"
              size={23}
              color="#2D8060"
            />

            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>
                18 learners. 3 focus areas.
              </Text>

              <Text style={styles.summaryDescription}>
                Based on recent assessments.
                {'\n'}Some learners appear in more than one group.
              </Text>
            </View>
          </View>

          {/* Learning gaps */}
          <Text style={styles.sectionTitle}>
            Plan your next small group
          </Text>

          {gaps
            .filter((gap) =>
              selectedSubject === 'Mathematics'
                ? true
                : true
            )
            .map(renderGap)}
        </ScrollView>

        <TeacherBottomNav
          navigation={navigation}
          active="gaps"
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
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },

  title: {
    color: colors.heading,
    fontSize: 20,
    fontWeight: '800',
  },

  filterButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subjectTabs: {
    flexDirection: 'row',
    backgroundColor: '#EFF3F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 15,
  },

  subjectTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 9,
  },

  activeSubjectTab: {
    backgroundColor: '#FFFFFF',
  },

  subjectTabText: {
    color: '#718078',
    fontSize: 10,
  },

  activeSubjectText: {
    color: '#205B46',
    fontWeight: '700',
  },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F4EC',
    borderRadius: 16,
    padding: 15,
    marginBottom: 19,
    gap: 12,
  },

  summaryInfo: {
    flex: 1,
  },

  summaryTitle: {
    color: '#26372F',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 5,
  },

  summaryDescription: {
    color: '#718078',
    fontSize: 9,
    lineHeight: 14,
  },

  sectionTitle: {
    color: '#26372F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 11,
  },

  gapCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 17,
    padding: 13,
    marginBottom: 12,
  },

  gapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  gapTitle: {
    color: '#26372F',
    fontSize: 12,
    fontWeight: '800',
    flex: 1,
  },

  priorityBadge: {
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  priority: {
    backgroundColor: '#FFF3D3',
  },

  practice: {
    backgroundColor: '#EFF3F0',
  },

  priorityText: {
    fontSize: 9,
    fontWeight: '700',
  },

  priorityTextDark: {
    color: '#8A641A',
  },

  practiceText: {
    color: '#718078',
  },

  gapDescription: {
    color: '#718078',
    fontSize: 9,
    marginBottom: 13,
  },

  masteryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  masteryLabel: {
    color: '#718078',
    fontSize: 9,
  },

  masteryValue: {
    color: '#2D8060',
    fontSize: 10,
    fontWeight: '800',
  },

  progressTrack: {
    height: 6,
    backgroundColor: '#E5ECE7',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },

  suggestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  suggestionText: {
    color: '#2D8060',
    fontSize: 10,
    fontWeight: '700',
  },
});