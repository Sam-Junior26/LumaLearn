import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, TextInput, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const topics = [
  'Comparing fractions',
  'Equivalent fractions',
  'Word problems',
  'Finding common denominators',
];

export default function AssignPracticeScreen({ navigation, route }) {
  const learner = route?.params?.learner;

  const learnerName =
    typeof learner === 'string'
      ? learner
      : learner?.name || 'Naledi Mokoena';

  const [selectedTopic, setSelectedTopic] = useState('Comparing fractions');
  const [questions, setQuestions] = useState('5');
  const [dueDate, setDueDate] = useState('Friday, 23 October');
  const [instructions, setInstructions] = useState('');

  const assignPractice = () => {
    navigation.navigate('PracticeAssigned', {
      learner,
      topic: selectedTopic,
      questions,
      dueDate,
      instructions
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>LEARNER SUPPORT</Text>
        <Text style={styles.title}>Assign practice</Text>
        <Text style={styles.subtitle}>
          Create a practice activity to help {learnerName} improve.
        </Text>

        <Text style={styles.label}>Select a learning gap</Text>

        {topics.map(topic => (
          <TouchableOpacity
            key={topic}
            style={[
              styles.topic,
              selectedTopic === topic && styles.selectedTopic
            ]}
            onPress={() => setSelectedTopic(topic)}
          >
            <View>
              <Text style={styles.topicTitle}>{topic}</Text>
              <Text style={styles.muted}>Mathematics · Grade 7</Text>
            </View>
            <Ionicons
              name={selectedTopic === topic ? 'radio-button-on' : 'radio-button-off'}
              size={21}
              color={colors.primary}
            />
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Number of questions</Text>
        <View style={styles.counter}>
          <TouchableOpacity
            onPress={() => setQuestions(String(Math.max(1, Number(questions) - 1)))}
          >
            <Ionicons name="remove-circle-outline" size={27} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.counterNumber}>{questions}</Text>

          <TouchableOpacity
            onPress={() => setQuestions(String(Math.min(20, Number(questions) + 1)))}
          >
            <Ionicons name="add-circle-outline" size={27} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Due date</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="Enter due date"
        />

        <Text style={styles.label}>Instructions (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Add instructions for the learner..."
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={assignPractice}>
          <Text style={styles.buttonText}>Assign practice</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22, paddingBottom: 35 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { fontSize: 26, fontWeight: '800', color: colors.heading, marginTop: 5 },
  subtitle: { color: colors.body, fontSize: 13, lineHeight: 20, marginVertical: 10 },
  label: { color: colors.heading, fontSize: 14, fontWeight: '700', marginTop: 23, marginBottom: 10 },
  topic: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 14, padding: 15, marginBottom: 9,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  selectedTopic: { borderColor: colors.primary, backgroundColor: colors.lightGreen },
  topicTitle: { color: colors.heading, fontWeight: '700', fontSize: 13 },
  muted: { color: colors.body, fontSize: 10, marginTop: 5 },
  counter: {
    backgroundColor: colors.white, borderRadius: 13, padding: 13,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  counterNumber: { fontSize: 20, fontWeight: '800', color: colors.heading },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, padding: 14, color: colors.heading, fontSize: 13
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  button: {
    backgroundColor: colors.primary, padding: 16, borderRadius: 12,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: 10, marginTop: 30
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 13 }
});