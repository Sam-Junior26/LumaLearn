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
import {colors} from '../../styles/theme'

function FractionIllustration() {
  return (
    <View style={styles.illustration}>
      <View style={styles.illustrationHeader}>
        <Text style={styles.illustrationTitle}>
          YOU'RE READY TO TRY
        </Text>

        <Ionicons
          name="clipboard-outline"
          size={25}
          color={colors.primary}
        />
      </View>

      {/* Three equal parts */}
      <View style={styles.fractionRow}>
        <View style={styles.fractionBar}>
          <View style={styles.filledPart} />
          <View style={styles.filledPart} />
          <View style={styles.emptyPart} />
        </View>

        <Text style={styles.fractionLabel}>⅔</Text>
      </View>

      {/* Six equal parts */}
      <View style={styles.fractionRow}>
        <View style={styles.fractionBar}>
          <View style={styles.filledPart} />
          <View style={styles.filledPart} />
          <View style={styles.filledPart} />
          <View style={styles.filledPart} />
          <View style={styles.emptyPart} />
          <View style={styles.emptyPart} />
        </View>

        <Text style={styles.fractionLabel}>⁴⁄₆</Text>
      </View>
    </View>
  );
}

export default function QuizIntroductionScreen({ navigation }) {
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
              style={styles.backButton}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color={colors.heading}
              />
            </TouchableOpacity>

            <View style={styles.headerText}>
              <Text style={styles.eyebrow}>MATHEMATICS</Text>
              <Text style={styles.headerTitle}>
                Knowledge check
              </Text>
            </View>
          </View>

          <FractionIllustration />

          <Text style={styles.heading}>
            Let's see what
            {'\n'}you've learned.
          </Text>

          <Text style={styles.description}>
            Practise equivalent fractions and comparing
            fractions. Every answer helps us find your next step.
          </Text>

          {/* Quiz information */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="list-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>
                  10 questions
                </Text>
                <Text style={styles.infoDescription}>
                  Multiple choice, one answer each
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>
                  About 8 minutes
                </Text>
                <Text style={styles.infoDescription}>
                  No timer. Take the time you need.
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="leaf-outline"
                  size={20}
                  color={colors.primary}
                />
              </View>

              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>
                  Feedback that helps you grow
                </Text>
                <Text style={styles.infoDescription}>
                  Review your answers at the end
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Start quiz */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('QuizQuestions')
            }
          >
            <Text style={styles.primaryButtonText}>
              Start quiz
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.white}
            />
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Your progress saves after each answer.
            {'\n'}You can leave and come back.
          </Text>
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
    paddingHorizontal: 23,
    paddingBottom: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 22,
  },

  backButton: {
    marginRight: 18,
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 3,
  },

  headerTitle: {
    color: colors.heading,
    fontSize: 19,
    fontWeight: '800',
  },

  illustration: {
    backgroundColor: colors.lightGreen,
    borderRadius: 21,
    padding: 19,
    marginBottom: 20,
  },

  illustrationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  illustrationTitle: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '800',
  },

  fractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 13,
  },

  fractionBar: {
    flex: 1,
    flexDirection: 'row',
    height: 31,
    gap: 3,
  },

  filledPart: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },

  emptyPart: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
  },

  fractionLabel: {
    width: 28,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '800',
    color: colors.primaryDark,
  },

  heading: {
    fontSize: 25,
    lineHeight: 29,
    color: colors.heading,
    fontWeight: '800',
    marginBottom: 9,
  },

  description: {
    color: colors.body,
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },

  infoIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  infoText: {
    flex: 1,
  },

  infoTitle: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },

  infoDescription: {
    color: colors.body,
    fontSize: 10,
  },

  footer: {
    paddingHorizontal: 23,
    paddingTop: 10,
    paddingBottom: 12,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    minHeight: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'capitalize',
  },

  footerNote: {
    textAlign: 'center',
    color: colors.body,
    fontSize: 10,
    lineHeight: 14,
    marginTop: 10,
  },
});
