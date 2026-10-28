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

function FractionComparison() {
  return (
    <View style={styles.diagramCard}>
      <Text style={styles.diagramTitle}>
        Try finding the same denominator.
      </Text>

      <View style={styles.fractionRow}>
        <View style={styles.fractionBar}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View
              key={item}
              style={[
                styles.fractionPiece,
                item <= 3 && styles.filledPiece,
              ]}
            />
          ))}
        </View>

        <Text style={styles.fractionText}>½ = ³⁄₆</Text>
      </View>

      <View style={styles.fractionRow}>
        <View style={styles.fractionBar}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View
              key={item}
              style={[
                styles.fractionPiece,
                item <= 2 && styles.filledPiece,
              ]}
            />
          ))}
        </View>

        <Text style={styles.fractionText}>⅓ = ²⁄₆</Text>
      </View>

      <Text style={styles.diagramExplanation}>
        3 sixths is more than 2 sixths.
        {'\n'}So 1/2 is greater than 1/3.
      </Text>
    </View>
  );
}

export default function LearningGapDetailsScreen({
  navigation,
  route,
}) {
  const subject = route?.params?.subject || 'Mathematics';
  const lesson = route?.params?.lesson || 'Comparing fractions';

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
              <Text style={styles.eyebrow}>
                {subject.toUpperCase()} · FRACTIONS
              </Text>

              <Text style={styles.pageTitle}>Your next step</Text>
            </View>
          </View>

          <View style={styles.tipPill}>
            <Ionicons
              name="leaf-outline"
              size={13}
              color="#805A13"
            />
            <Text style={styles.tipText}>
              A little practice will help
            </Text>
          </View>

          <Text style={styles.lessonTitle}>{lesson}</Text>

          <Text style={styles.description}>
            You understand equal fractions. Now let’s compare
            fractions when the bottom numbers are different.
          </Text>

          <View style={styles.resultCard}>
            <View style={styles.resultIcon}>
              <Ionicons
                name="clipboard-outline"
                size={22}
                color="#A8791C"
              />
            </View>

            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>
                2 of 4 questions correct
              </Text>

              <Text style={styles.resultDescription}>
                From your latest quiz · 80% overall
              </Text>

              <Text style={styles.resultDescription}>
                This is a next step, not a setback.
              </Text>
            </View>
          </View>

          <FractionComparison />

          <Text style={styles.sectionTitle}>
            Your practice plan
          </Text>

          <TouchableOpacity
            style={styles.planRow}
            onPress={() =>
              navigation.navigate('LessonDetails', {
                subject,
                lesson: 'Comparing fractions with common denominators',
              })
            }
          >
            <View style={styles.planIcon}>
              <Ionicons
                name="book-outline"
                size={19}
                color={colors.primary}
              />
            </View>

            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>
                Compare with common denominators
              </Text>

              <Text style={styles.planSubtitle}>
                Guided lesson · 8 min
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.body}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.planRow}
            onPress={() =>
              navigation.navigate('QuizIntroduction', {
                subject,
                lesson,
                mode: 'practice',
                questionCount: 5,
              })
            }
          >
            <View style={styles.planIcon}>
              <Ionicons
                name="list-outline"
                size={19}
                color={colors.primary}
              />
            </View>

            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>
                Build confidence, one question at a time
              </Text>

              <Text style={styles.planSubtitle}>
                5 practice questions · 4 min
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.body}
            />
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('QuizIntroduction', {
                subject,
                lesson,
                mode: 'practice',
                questionCount: 5,
              })
            }
          >
            <Text style={styles.startButtonText}>
              Start my practice
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tutorButton}
            onPress={() =>
              navigation.navigate('AITutor', {
                subject,
                lesson,
                question: 'Please explain comparing fractions.',
              })
            }
          >
            <Text style={styles.tutorButtonText}>
              Ask my tutor to explain first
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 12,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
  },
  backButton: {
    width: 39,
    height: 39,
    justifyContent: 'center',
    marginRight: 3,
  },
  headerText: {
    flex: 1,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },
  pageTitle: {
    color: colors.heading,
    fontSize: 19,
    fontWeight: '800',
  },
  tipPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFF5D9',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 11,
  },
  tipText: {
    color: '#805A13',
    fontSize: 10,
    fontWeight: '600',
  },
  lessonTitle: {
    color: colors.heading,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 7,
  },
  description: {
    color: colors.body,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    gap: 11,
  },
  resultIcon: {
    width: 38,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFF5D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 5,
  },
  resultDescription: {
    color: colors.body,
    fontSize: 10,
    lineHeight: 15,
  },
  diagramCard: {
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
  },
  diagramTitle: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 13,
  },
  fractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 11,
  },
  fractionBar: {
    flex: 1,
    flexDirection: 'row',
    height: 31,
    gap: 3,
  },
  fractionPiece: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
  },
  filledPiece: {
    backgroundColor: colors.primary,
  },
  fractionText: {
    width: 56,
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  diagramExplanation: {
    color: colors.primaryDark,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.heading,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 9,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  planIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    color: colors.heading,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },
  planSubtitle: {
    color: colors.body,
    fontSize: 10,
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.background || colors.screenBackground || '#F7F9F7',
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  tutorButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tutorButtonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
});
