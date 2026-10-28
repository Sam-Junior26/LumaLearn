import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function QuizReviewScreen({ navigation, route }) {
  const results = route?.params?.results || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={23}
              color={colors.heading}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Review my answers
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {results.map((item, index) => {
            const correct = item.isCorrect;
            const selected = item.selectedAnswer;

            return (
              <View key={index} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>
                    Question {index + 1}
                  </Text>

                  <Ionicons
                    name={
                      correct
                        ? 'checkmark-circle'
                        : 'close-circle'
                    }
                    size={20}
                    color={correct ? colors.primary : colors.red}
                  />
                </View>

                <Text style={styles.questionText}>
                  {item.question}
                </Text>

                <Text style={styles.answerLabel}>
                  Your answer
                </Text>

                <View
                  style={[
                    styles.answerBox,
                    correct ? styles.correctBox : styles.incorrectBox,
                  ]}
                >
                  <Text style={styles.answerText}>
                    {selected === undefined
                      ? 'Skipped'
                      : item.options[selected]}
                  </Text>
                </View>

                {!correct && (
                  <>
                    <Text style={styles.answerLabel}>
                      Correct answer
                    </Text>

                    <View style={[styles.answerBox, styles.correctBox]}>
                      <Text style={styles.answerText}>
                        {item.options[item.correctAnswer]}
                      </Text>
                    </View>
                  </>
                )}

                <Text style={styles.topicLabel}>
                  Topic: {item.topic}
                </Text>
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LearnerDashboard')}
          >
            <Text style={styles.buttonText}>
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

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 22,
    paddingVertical: 17,
  },

  headerTitle: {
    color: colors.heading,
    fontSize: 19,
    fontWeight: '800',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 25,
  },

  questionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 15,
    marginBottom: 13,
  },

  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  questionNumber: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },

  questionText: {
    color: colors.heading,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 13,
  },

  answerLabel: {
    color: colors.body,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 5,
  },

  answerBox: {
    borderRadius: 9,
    padding: 10,
    marginBottom: 11,
  },

  correctBox: {
    backgroundColor: colors.lightGreen,
  },

  incorrectBox: {
    backgroundColor: colors.lightRed,
  },

  answerText: {
    color: colors.heading,
    fontSize: 12,
    fontWeight: '600',
  },

  topicLabel: {
    color: colors.body,
    fontSize: 10,
    marginTop: 3,
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
});
