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


export default function QuizResultsScreen({ navigation, route }) {
  const score = route?.params?.score ?? 8;
  const total = route?.params?.total ?? 10;
  const results = route?.params?.results ?? [];

  const percentage = total > 0
    ? Math.round((score / total) * 100)
    : 0;

  // Calculate the topic scores from the submitted answers.
  const topicScores = {};

  results.forEach((item) => {
    if (!topicScores[item.topic]) {
      topicScores[item.topic] = {
        correct: 0,
        total: 0,
      };
    }

    topicScores[item.topic].total += 1;

    if (item.isCorrect) {
      topicScores[item.topic].correct += 1;
    }
  });

  const topics = Object.entries(topicScores);

  const reviewAnswers = () => {
    navigation.navigate('QuizReview', {
      results,
      score,
      total,
    });
  };

  const practiseLearningGap = () => {
    const weakestTopic = topics.length
      ? topics.reduce((weakest, current) => {
          const currentRatio =
            current[1].correct / current[1].total;

          const weakestRatio =
            weakest[1].correct / weakest[1].total;

          return currentRatio < weakestRatio
            ? current
            : weakest;
        })
      : ['Comparing fractions', { correct: 2, total: 4 }];

    navigation.navigate('SubjectSelection', {
      recommendedTopic: weakestTopic[0],
    });
  };

  const encouragement =
    percentage >= 80
      ? 'Look at you grow, Naledi!'
      : percentage >= 50
      ? 'You are making progress, Naledi!'
      : 'Every attempt helps you grow, Naledi!';

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
              <Text style={styles.eyebrow}>
                EQUIVALENT FRACTIONS
              </Text>

              <Text style={styles.headerTitle}>
                Your results
              </Text>
            </View>
          </View>

          {/* Score circle */}
          <View style={styles.scoreSection}>
            <View style={styles.scoreCircle}>
              <View style={styles.scoreInner}>
                <Text style={styles.scorePercentage}>
                  {percentage}%
                </Text>

                <Text style={styles.scoreCaption}>
                  {score} of {total} correct
                </Text>
              </View>
            </View>

            <Text style={styles.encouragement}>
              {encouragement}
            </Text>

            <Text style={styles.encouragementDescription}>
              You're getting the hang of fractions.
              {'\n'}Every bit of practice is paying off.
            </Text>

            <View style={styles.pointsBadge}>
              <Ionicons
                name="trending-up-outline"
                size={14}
                color={colors.primary}
              />

              <Text style={styles.pointsText}>
                +{score * 10} points earned
              </Text>
            </View>
          </View>

          {/* Topic breakdown */}
          <View style={styles.topicCard}>
            {(
              topics.length
                ? topics
                : [
                    [
                      'Equivalent fractions',
                      { correct: 6, total: 6 },
                    ],
                    [
                      'Comparing fractions',
                      { correct: 2, total: 4 },
                    ],
                  ]
            ).map(([topic, stats], index) => {
              const isStrong =
                stats.correct / stats.total >= 0.7;

              return (
                <View
                  key={topic}
                  style={[
                    styles.topicRow,
                    index > 0 && styles.topicRowBorder,
                  ]}
                >
                  <Ionicons
                    name={
                      isStrong
                        ? 'checkmark-circle-outline'
                        : 'leaf-outline'
                    }
                    size={20}
                    color={
                      isStrong
                        ? colors.primary
                        : colors.yellowDark
                    }
                  />

                  <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle}>
                      {topic}
                    </Text>

                    <Text style={styles.topicDescription}>
                      {isStrong
                        ? 'A strong understanding'
                        : 'A little more practice'}
                    </Text>
                  </View>

                  <Text style={styles.topicScore}>
                    {stats.correct}/{stats.total}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Recommendation */}
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>
              Your next small step
            </Text>

            <Text style={styles.recommendationText}>
              Try comparing fractions with different
              denominators. A short lesson can help.
            </Text>
          </View>

          {/* Practise learning gap */}
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('LearningGapDetails')}
          >
            <Text style={styles.primaryButtonText}>
              Practise my learning gap
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.white}
            />
          </TouchableOpacity>

          {/* Review answers */}
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={reviewAnswers}
          >
            <Text style={styles.secondaryButtonText}>
              Review my answers
            </Text>
          </TouchableOpacity>

          {/* Dashboard */}
          <TouchableOpacity
            style={styles.dashboardButton}
            onPress={() => navigation.navigate('LearnerDashboard')}
          >
            <Text style={styles.dashboardButtonText}>
              Back to dashboard
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },

  backButton: {
    marginRight: 17,
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

  scoreSection: {
    alignItems: 'center',
    marginBottom: 20,
  },

  scoreCircle: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 7,
    borderColor: colors.primary,
    borderLeftColor: '#E4ECE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  scoreInner: {
    alignItems: 'center',
  },

  scorePercentage: {
    color: colors.heading,
    fontSize: 31,
    fontWeight: '800',
  },

  scoreCaption: {
    color: colors.body,
    fontSize: 10,
    marginTop: 1,
  },

  encouragement: {
    color: colors.heading,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 5,
  },

  encouragementDescription: {
    color: colors.body,
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
  },

  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },

  pointsText: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '700',
  },

  topicCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 14,
  },

  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    gap: 10,
  },

  topicRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  topicInfo: {
    flex: 1,
  },

  topicTitle: {
    color: colors.heading,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },

  topicDescription: {
    color: colors.body,
    fontSize: 10,
  },

  topicScore: {
    color: colors.heading,
    fontSize: 13,
    fontWeight: '800',
  },

  recommendationCard: {
    backgroundColor: colors.yellow,
    borderRadius: 17,
    padding: 14,
    marginBottom: 14,
  },

  recommendationTitle: {
    color: colors.yellowDark,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 7,
  },

  recommendationText: {
    color: colors.heading,
    fontSize: 11,
    lineHeight: 17,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    minHeight: 47,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 9,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  dashboardButton: {
    alignItems: 'center',
    paddingVertical: 13,
  },

  dashboardButtonText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },
});
