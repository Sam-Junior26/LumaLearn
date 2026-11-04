import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function PracticeAssignedScreen({ navigation, route }) {
  const {
    learner = 'Naledi Mokoena',
    topic = 'Comparing fractions',
    questions = '5',
    dueDate = 'Friday, 23 October'
  } = route?.params || {};

  const learnerName =
    typeof learner === 'string'
      ? learner
      : learner?.name || 'Naledi Mokoena';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={45} color={colors.primary} />
        </View>

        <Text style={styles.title}>Practice assigned!</Text>
        <Text style={styles.subtitle}>
          Your practice activity has been successfully assigned.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardHeading}>ASSIGNMENT DETAILS</Text>

          <Detail label="Learner" value={learnerName} />
          <Detail label="Learning gap" value={topic} />
          <Detail label="Questions" value={`${questions} questions`} />
          <Detail label="Due date" value={dueDate} />
          <Detail label="Status" value="Assigned" />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TeacherDashboard')}
        >
          <Text style={styles.buttonText}>Back to dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondary}
          onPress={() => navigation.navigate('TeacherLearners')}
        >
          <Text style={styles.secondaryText}>View my learners</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  successIcon: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: colors.lightGreen, alignSelf: 'center',
    justifyContent: 'center', alignItems: 'center', marginBottom: 25
  },
  title: { fontSize: 25, fontWeight: '800', color: colors.heading, textAlign: 'center' },
  subtitle: { color: colors.body, fontSize: 13, textAlign: 'center', marginTop: 10, lineHeight: 20 },
  card: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 18, padding: 18, marginTop: 30
  },
  cardHeading: { color: colors.primary, fontSize: 10, fontWeight: '800', marginBottom: 15 },
  detail: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border
  },
  label: { color: colors.body, fontSize: 12 },
  value: { color: colors.heading, fontSize: 12, fontWeight: '700' },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 12, marginTop: 25 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
  secondary: { padding: 15 },
  secondaryText: { color: colors.primary, textAlign: 'center', fontWeight: '700' }
});