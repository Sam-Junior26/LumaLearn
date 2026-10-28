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

function FractionDiagram() {
  return (
    <View style={styles.diagramCard}>
      <View style={styles.diagramHeader}>
        <Text style={styles.diagramLabel}>Grade 7</Text>

        <View style={styles.duration}>
          <Ionicons
            name="time-outline"
            size={13}
            color={colors.primaryDark}
          />

          <Text style={styles.diagramLabel}>12 min</Text>
        </View>
      </View>

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
    </View>
  );
}

export default function LessonDetailsScreen({ navigation, route }) {
  const subject = route?.params?.subject || 'Mathematics';
  const lesson = route?.params?.lesson || 'Equivalent fractions';

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

            <TouchableOpacity style={styles.headerButton}>
              <Ionicons
                name="bookmark-outline"
                size={22}
                color={colors.heading}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.eyebrow}>
            NUMBER, OPERATIONS & RELATIONSHIPS
          </Text>

          <Text style={styles.pageTitle}>{subject}</Text>

          <FractionDiagram />

          <Text style={styles.lessonTitle}>
            {lesson}
          </Text>

          <Text style={styles.description}>
            Different numbers, the same amount. Discover how
            fractions can look different and still be equal.
          </Text>

          <Text style={styles.objectivesTitle}>
            By the end, you can...
          </Text>

          {[
            'Recognise fractions with the same value',
            'Make equivalent fractions by multiplying',
            'Use visual models to explain your answer',
          ].map((objective) => (
            <View key={objective} style={styles.objectiveRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={17}
                color={colors.primary}
              />

              <Text style={styles.objectiveText}>
                {objective}
              </Text>
            </View>
          ))}

          {/* Language */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={() => {
              navigation.navigate('Language');
            }}
          >
            <View style={styles.settingIcon}>
              <Ionicons
                name="language-outline"
                size={19}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>English</Text>
              <Text style={styles.settingSubtitle}>
                Switch language while you learn
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.body}
            />
          </TouchableOpacity>

          {/* Offline download */}
          <TouchableOpacity
            style={styles.settingCard}
            onPress={() => {
              // Connect to your lesson-download functionality.
            }}
          >
            <View style={styles.settingIcon}>
              <Ionicons
                name="download-outline"
                size={19}
                color={colors.primary}
              />
            </View>

            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>
                Saved on this device
              </Text>

              <Text style={styles.settingSubtitle}>
                Text & diagrams · 1.2 MB
              </Text>
            </View>

            <Ionicons
              name="checkmark-circle-outline"
              size={17}
              color={colors.body}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* Continue button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('LessonLearning', {
                subject,
                lesson,
                step: 2,
              })
            }
          >
            <Text style={styles.continueButtonText}>
              Continue lesson · Step 2 of 4
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
    marginBottom: 15,
  },

  headerButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
  },

  eyebrow: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.heading,
    marginTop: 3,
    marginBottom: 22,
    textAlign: 'center',
  },

  diagramCard: {
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  diagramHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },

  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  diagramLabel: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '600',
  },

  fractionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  halfBar: {
    flex: 1,
    flexDirection: 'row',
    height: 31,
    gap: 3,
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
    height: 31,
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
    fontSize: 18,
    color: colors.primaryDark,
    fontWeight: '800',
    textAlign: 'center',
  },

  lessonTitle: {
    fontSize: 27,
    lineHeight: 31,
    fontWeight: '800',
    color: colors.heading,
    marginBottom: 10,
  },

  description: {
    color: colors.body,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 23,
  },

  objectivesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.heading,
    marginBottom: 12,
  },

  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 11,
  },

  objectiveText: {
    color: colors.heading,
    fontSize: 12,
    flex: 1,
  },

  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 17,
    marginTop: 7,
  },

  settingIcon: {
    width: 36,
    height: 36,
    backgroundColor: colors.lightGreen,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '600',
  },

  settingSubtitle: {
    color: colors.body,
    fontSize: 10,
    marginTop: 4,
  },

  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },

  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
  },

  continueButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});