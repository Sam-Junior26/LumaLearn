import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import TeacherBottomNav from '../../components/TeacherBottomNav';
import { colors } from '../../styles/theme';

const weeklyData = [
  { label: '21 Sep', value: 52 },
  { label: '28 Sep', value: 57 },
  { label: '5 Oct', value: 63 },
  { label: '12 Oct', value: 68 },
];

export default function TeacherReportsScreen({ navigation }) {
  const [period, setPeriod] = useState('Weekly');

  const downloadReport = () => {
    Alert.alert(
      'Download report',
      'Connect your PDF report generation functionality here.'
    );
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
            <View>
              <Text style={styles.eyebrow}>
                GRADE 7A · REPORTS
              </Text>

              <Text style={styles.title}>
                See the bigger picture
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                Alert.alert('Share report', 'Connect your sharing functionality here.')
              }
            >
              <Ionicons
                name="share-social-outline"
                size={20}
                color="#26372F"
              />
            </TouchableOpacity>
          </View>

          {/* Period selector */}
          <View style={styles.periodTabs}>
            {['Weekly', 'Monthly', 'Term'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.periodTab,
                  period === item && styles.activePeriod,
                ]}
                onPress={() => setPeriod(item)}
              >
                <Text
                  style={[
                    styles.periodText,
                    period === item && styles.activePeriodText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date selector */}
          <View style={styles.dateRow}>
            <TouchableOpacity>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#2D8060"
              />
            </TouchableOpacity>

            <View style={styles.dateCenter}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color="#2D8060"
              />

              <Text style={styles.dateText}>
                12–18 October 2026
              </Text>
            </View>

            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#2D8060"
              />
            </TouchableOpacity>
          </View>

          {/* Overall mastery */}
          <View style={styles.overallCard}>
            <View style={styles.overallHeader}>
              <Text style={styles.overallNumber}>
                68%
              </Text>

              <View style={styles.pointsPill}>
                <Text style={styles.pointsText}>
                  ↑ 6 points
                </Text>
              </View>
            </View>

            <Text style={styles.overallLabel}>
              Average class mastery
            </Text>

            <Text style={styles.overallDescription}>
              27 of 32 active · 46 lessons completed this week
            </Text>
          </View>

          {/* Progress chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>
              Class mastery is moving up
            </Text>

            <View style={styles.chart}>
              {weeklyData.map((item) => (
                <View key={item.label} style={styles.chartColumn}>
                  <Text style={styles.chartValue}>
                    {item.value}%
                  </Text>

                  <View style={styles.chartBarBackground}>
                    <View
                      style={[
                        styles.chartBar,
                        { height: `${item.value}%` },
                      ]}
                    />
                  </View>

                  <Text style={styles.chartDate}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Subject snapshot */}
          <Text style={styles.sectionTitle}>
            Subject snapshot
          </Text>

          <View style={styles.subjectRow}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectName}>
                Mathematics
              </Text>

              <Text style={styles.subjectScore}>
                64%
              </Text>
            </View>

            <View style={styles.subjectTrack}>
              <View style={[styles.subjectFill, { width: '64%' }]} />
            </View>
          </View>

          <View style={styles.subjectRow}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectName}>
                Natural Sciences
              </Text>

              <Text style={styles.subjectScore}>
                72%
              </Text>
            </View>

            <View style={styles.subjectTrack}>
              <View style={[styles.subjectFill, { width: '72%' }]} />
            </View>
          </View>

          <Text style={styles.reportNote}>
            18 learners need targeted support.
            {'\n'}Most common gap: comparing fractions (12 learners).
          </Text>

          {/* Download report */}
          <TouchableOpacity
            style={styles.downloadButton}
            activeOpacity={0.85}
            onPress={downloadReport}
          >
            <Text style={styles.downloadText}>
              Download class report · PDF
            </Text>

            <Ionicons
              name="download-outline"
              size={17}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </ScrollView>

        <TeacherBottomNav
          navigation={navigation}
          active="reports"
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
    paddingBottom: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },

  eyebrow: {
    color: '#2D8060',
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },

  title: {
    color: '#26372F',
    fontSize: 19,
    fontWeight: '800',
  },

  periodTabs: {
    flexDirection: 'row',
    backgroundColor: '#EFF3F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
  },

  periodTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 9,
  },

  activePeriod: {
    backgroundColor: '#FFFFFF',
  },

  periodText: {
    color: '#718078',
    fontSize: 10,
  },

  activePeriodText: {
    color: '#205B46',
    fontWeight: '700',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 3,
  },

  dateCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  dateText: {
    color: '#26372F',
    fontSize: 10,
    fontWeight: '600',
  },

  overallCard: {
    backgroundColor: '#E7F4EC',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
  },

  overallHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  overallNumber: {
    color: '#26372F',
    fontSize: 29,
    fontWeight: '800',
  },

  pointsPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 15,
  },

  pointsText: {
    color: '#2D8060',
    fontSize: 9,
    fontWeight: '800',
  },

  overallLabel: {
    color: '#718078',
    fontSize: 10,
    marginTop: 1,
  },

  overallDescription: {
    color: '#718078',
    fontSize: 9,
    marginTop: 8,
  },

  chartCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 17,
    padding: 14,
    marginBottom: 17,
  },

  chartTitle: {
    color: '#26372F',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 15,
  },

  chart: {
    height: 125,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },

  chartColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },

  chartValue: {
    color: '#26372F',
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 5,
  },

  chartBarBackground: {
    width: 27,
    height: 78,
    backgroundColor: '#E7F4EC',
    borderRadius: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  chartBar: {
    width: '100%',
    backgroundColor: '#2D8060',
    borderRadius: 5,
  },

  chartDate: {
    color: '#718078',
    fontSize: 8,
    marginTop: 7,
  },

  sectionTitle: {
    color: '#26372F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },

  subjectRow: {
    marginBottom: 13,
  },

  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  subjectName: {
    color: '#26372F',
    fontSize: 11,
  },

  subjectScore: {
    color: '#2D8060',
    fontSize: 11,
    fontWeight: '800',
  },

  subjectTrack: {
    height: 6,
    backgroundColor: '#E5ECE7',
    borderRadius: 5,
    overflow: 'hidden',
  },

  subjectFill: {
    height: '100%',
    backgroundColor: '#2D8060',
    borderRadius: 5,
  },

  reportNote: {
    color: '#718078',
    fontSize: 9,
    lineHeight: 14,
    marginTop: 1,
    marginBottom: 14,
  },

  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },

  downloadText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});