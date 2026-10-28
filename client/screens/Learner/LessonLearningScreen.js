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

function FractionVisual() {
  return (
    <View style={styles.visualCard}>
      <Text style={styles.visualEyebrow}>
        LOOK AT THE SHADED PARTS
      </Text>

      {/* One half */}
      <View style={styles.fractionRow}>
        <View style={styles.halfBar}>
          <View style={styles.filledHalf} />
          <View style={styles.emptyHalf} />
        </View>

        <Text style={styles.fractionLabel}>½</Text>
      </View>

      {/* Two quarters */}
      <View style={styles.fractionRow}>
        <View style={styles.quarterBar}>
          <View style={styles.filledQuarter} />
          <View style={styles.filledQuarter} />
          <View style={styles.emptyQuarter} />
          <View style={styles.emptyQuarter} />
        </View>

        <Text style={styles.fractionLabel}>²⁄₄</Text>
      </View>

      <Text style={styles.visualCaption}>
        Both show half of the same whole.
      </Text>
    </View>
  );
}

export default function LessonLearningScreen({
  navigation,
  route,
}) {
  const lesson =
    route?.params?.lesson || 'Equivalent fractions';

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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.heading}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => {
                // Add translation or language controls.
              }}
            >
              <Ionicons
                name="language-outline"
                size={22}
                color={colors.heading}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.eyebrow}>
            MATHEMATICS · STEP 2 OF 4
          </Text>

          <Text style={styles.pageTitle}>
            {lesson}
          </Text>

          {/* Lesson progress */}
          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          {/* Language and listen */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.languagePill}
              onPress={() => navigation.navigate('Language')}
            >
              <Ionicons
                name="globe-outline"
                size={13}
                color={colors.primary}
              />

              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.listenButton}
              onPress={() => {
                // Connect text-to-speech functionality here.
              }}
            >
              <Ionicons
                name="volume-high-outline"
                size={16}
                color={colors.primary}
              />

              <Text style={styles.listenText}>Listen</Text>
            </TouchableOpacity>
          </View>

          {/* Explanation */}
          <Text style={styles.heading}>
            Same amount.
            {'\n'}Different pieces.
          </Text>

          <Text style={styles.description}>
            Imagine sharing a loaf of bread. One of two equal
            pieces is the same amount as two of four equal pieces.
          </Text>

          {/* Fraction diagram */}
          <FractionVisual />

          {/* Golden rule */}
          <View style={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <Ionicons
                name="bulb-outline"
                size={18}
                color={colors.yellowDark}
              />

              <Text style={styles.ruleTitle}>
                The golden rule
              </Text>
            </View>

            <Text style={styles.ruleText}>
              Multiply the top and bottom by the same number:
            </Text>

            <Text style={styles.formula}>
              (1 × 2) / (2 × 2) = 2/4.
            </Text>
          </View>

          {/* AI Tutor */}
          <TouchableOpacity
            style={styles.tutorLink}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('AITutor')
            }}
          >
            <Ionicons
              name="sparkles-outline"
              size={17}
              color={colors.primary}
            />

            <Text style={styles.tutorLinkText}>
              Need another example? Ask your tutor
            </Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.primary}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* Next button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate('QuizIntroduction', {
                subject: 'Mathematics',
                lesson: lesson,
              });
            }}
          >
            <Text style={styles.nextButtonText}>
              Next: Try it yourself
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.white}
            />
          </TouchableOpacity>
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
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },

  headerButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
  },

  eyebrow: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },

  pageTitle: {
    textAlign: 'center',
    color: colors.heading,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 3,
    marginBottom: 22,
  },

  progressBackground: {
    height: 6,
    borderRadius: 5,
    backgroundColor: '#E4ECE7',
    overflow: 'hidden',
    marginBottom: 17,
  },

  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },

  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  languagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  languageText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '600',
  },

  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 5,
  },

  listenText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },

  heading: {
    color: colors.heading,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 9,
  },

  description: {
    color: colors.body,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 17,
  },

  visualCard: {
    backgroundColor: colors.lightGreen,
    borderRadius: 19,
    padding: 16,
    marginBottom: 16,
  },

  visualEyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 15,
  },

  fractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  halfBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
    height: 32,
  },

  filledHalf: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  emptyHalf: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
  },

  quarterBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
    height: 32,
  },

  filledQuarter: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  emptyQuarter: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
  },

  fractionLabel: {
    width: 28,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryDark,
  },

  visualCaption: {
    textAlign: 'center',
    color: colors.primaryDark,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },

  ruleCard: {
    backgroundColor: colors.yellow,
    borderRadius: 17,
    padding: 15,
    marginBottom: 16,
  },

  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  ruleTitle: {
    color: colors.yellowDark,
    fontSize: 13,
    fontWeight: '800',
  },

  ruleText: {
    color: colors.heading,
    fontSize: 11,
    lineHeight: 17,
  },

  formula: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 5,
  },

  tutorLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    marginBottom: 5,
  },

  tutorLinkText: {
    flex: 1,
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },

  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
  },

  nextButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});