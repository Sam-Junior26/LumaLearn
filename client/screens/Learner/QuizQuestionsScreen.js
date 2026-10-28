import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const questions = [
  {
    question: 'Which fraction is equivalent to 1/2?',
    visual: 'half',
    options: ['1/4', '2/4', '2/3', '3/4'],
    correctAnswer: 1,
    topic: 'Equivalent fractions',
  },
  {
    question: 'Which fraction is equivalent to 2/3?',
    visual: 'thirds',
    options: ['2/6', '3/6', '4/6', '5/6'],
    correctAnswer: 2,
    topic: 'Equivalent fractions',
  },
  {
    question: 'Which fraction is equivalent to 3/4?',
    visual: 'quarters',
    options: ['3/8', '4/8', '6/8', '5/8'],
    correctAnswer: 2,
    topic: 'Equivalent fractions',
  },
  {
    question: 'What is 1/4 + 1/4?',
    visual: 'quarters',
    options: ['1/2', '1/4', '3/4', '1'],
    correctAnswer: 0,
    topic: 'Comparing fractions',
  },
  {
    question: 'Which fraction is larger?',
    visual: 'none',
    options: ['1/4', '3/4', 'They are equal', 'Cannot tell'],
    correctAnswer: 1,
    topic: 'Comparing fractions',
  },
  {
    question: 'What is 2/4 in its simplest form?',
    visual: 'none',
    options: ['1/4', '1/2', '3/4', '2/3'],
    correctAnswer: 1,
    topic: 'Equivalent fractions',
  },
  {
    question: 'Which fraction is equivalent to 1/3?',
    visual: 'thirds',
    options: ['2/3', '2/6', '3/6', '3/4'],
    correctAnswer: 1,
    topic: 'Equivalent fractions',
  },
  {
    question: 'Which fraction is smaller than 1/2?',
    visual: 'none',
    options: ['3/4', '2/3', '1/4', '4/6'],
    correctAnswer: 2,
    topic: 'Comparing fractions',
  },
  {
    question: 'What is 2/5 + 1/5?',
    visual: 'none',
    options: ['3/5', '3/10', '2/10', '1/5'],
    correctAnswer: 0,
    topic: 'Comparing fractions',
  },
  {
    question: 'Which pair represents equivalent fractions?',
    visual: 'none',
    options: ['1/2 and 1/4', '1/3 and 2/6', '2/3 and 1/3', '1/4 and 3/4'],
    correctAnswer: 1,
    topic: 'Equivalent fractions',
  },
];

function FractionVisual({ type }) {
  if (type === 'none') return null;

  const count = type === 'half' ? 2 : type === 'thirds' ? 3 : 4;
  const filled = type === 'half' ? 1 : type === 'thirds' ? 1 : 3;

  return (
    <View style={styles.visualCard}>
      <View style={styles.visualBar}>
        {Array.from({ length: count }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.visualPart,
              index < filled
                ? styles.visualPartFilled
                : styles.visualPartEmpty,
            ]}
          />
        ))}
      </View>

      <Text style={styles.visualFraction}>
        {type === 'half' ? '½' : type === 'thirds' ? '⅓' : '¾'}
      </Text>
    </View>
  );
}

export default function QuizQuestionsScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState([]);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = selectedAnswers[currentIndex];

  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const chooseAnswer = (optionIndex) => {
    setSelectedAnswers((previous) => ({
      ...previous,
      [currentIndex]: optionIndex,
    }));
  };

  const goToNextQuestion = () => {
    if (selectedAnswer === undefined) {
      Alert.alert(
        'Choose an answer',
        'Please select an answer or skip this question.'
      );
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
      return;
    }

    finishQuiz();
  };

  const skipQuestion = () => {
    setSkippedQuestions((previous) =>
      previous.includes(currentIndex)
        ? previous
        : [...previous, currentIndex]
    );

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const results = questions.map((question, index) => ({
      ...question,
      selectedAnswer: selectedAnswers[index],
      isCorrect:
        selectedAnswers[index] === question.correctAnswer,
    }));

    const score = results.filter((item) => item.isCorrect).length;

    navigation.replace('QuizResults', {
      score,
      total: questions.length,
      results,
      skippedQuestions,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.heading}
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>KNOWLEDGE CHECK</Text>
            <Text style={styles.headerTitle}>
              Equivalent fractions
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() =>
              Alert.alert(
                'Leave quiz?',
                'Your current answers will not be submitted unless you finish the quiz.',
                [
                  { text: 'Stay', style: 'cancel' },
                  {
                    text: 'Leave',
                    style: 'destructive',
                    onPress: () => navigation.goBack(),
                  },
                ]
              )
            }
          >
            <Ionicons
              name="close"
              size={22}
              color={colors.body}
            />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressTextRow}>
            <Text style={styles.questionCount}>
              Question {currentIndex + 1} of {questions.length}
            </Text>

            <Text style={styles.answeredCount}>
              {answeredCount} answered
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.answerHint}>
            <Text style={styles.answerHintText}>
              Choose one answer
            </Text>
          </View>

          <Text style={styles.questionTitle}>
            {currentQuestion.question}
          </Text>

          <FractionVisual type={currentQuestion.visual} />

          {/* Answer options */}
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;

            return (
              <TouchableOpacity
                key={`${currentIndex}-${option}`}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedOption,
                ]}
                activeOpacity={0.8}
                onPress={() => chooseAnswer(index)}
              >
                <View
                  style={[
                    styles.optionLetter,
                    isSelected && styles.selectedOptionLetter,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLetterText,
                      isSelected && styles.selectedOptionLetterText,
                    ]}
                  >
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>

                <Text style={styles.optionText}>
                  {option}
                </Text>

                <View
                  style={[
                    styles.radioButton,
                    isSelected && styles.radioButtonSelected,
                  ]}
                >
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={13}
                      color={colors.primary}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.85}
            onPress={goToNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === questions.length - 1
                ? 'See results'
                : 'Next question'}
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={skipQuestion}
          >
            <Text style={styles.skipButtonText}>
              Skip for now
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
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 22,
  },

  headerButton: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    flex: 1,
    marginLeft: 12,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 3,
  },

  headerTitle: {
    color: colors.heading,
    fontSize: 18,
    fontWeight: '800',
  },

  progressSection: {
    paddingHorizontal: 22,
    marginBottom: 16,
  },

  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  questionCount: {
    color: colors.heading,
    fontSize: 11,
    fontWeight: '700',
  },

  answeredCount: {
    color: colors.body,
    fontSize: 10,
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

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 12,
  },

  answerHint: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lightGreen,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },

  answerHintText: {
    color: colors.primaryDark,
    fontSize: 10,
    fontWeight: '600',
  },

  questionTitle: {
    color: colors.heading,
    fontSize: 23,
    lineHeight: 28,
    fontWeight: '800',
    marginBottom: 13,
  },

  visualCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderRadius: 17,
    padding: 16,
    marginBottom: 16,
    gap: 10,
  },

  visualBar: {
    flex: 1,
    height: 32,
    flexDirection: 'row',
    gap: 3,
  },

  visualPart: {
    flex: 1,
    borderRadius: 4,
  },

  visualPartFilled: {
    backgroundColor: colors.primary,
  },

  visualPartEmpty: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  visualFraction: {
    color: colors.primaryDark,
    fontSize: 17,
    fontWeight: '800',
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    minHeight: 53,
  },

  selectedOption: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.primary,
    borderWidth: 2,
  },

  optionLetter: {
    width: 27,
    height: 27,
    borderRadius: 8,
    backgroundColor: colors.mutedGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  selectedOptionLetter: {
    backgroundColor: colors.primary,
  },

  optionLetterText: {
    color: colors.body,
    fontSize: 11,
    fontWeight: '800',
  },

  selectedOptionLetterText: {
    color: colors.white,
  },

  optionText: {
    color: colors.heading,
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
  },

  radioButton: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioButtonSelected: {
    borderColor: colors.primary,
  },

  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 12,
  },

  nextButton: {
    minHeight: 47,
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  nextButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },

  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  skipButtonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
});
