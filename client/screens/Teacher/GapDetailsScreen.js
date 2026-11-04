import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function GapDetailsScreen({ navigation, route }) {
  const learner = route?.params?.learner || 'Naledi Mokoena';
  const topic = route?.params?.topic || 'Comparing fractions';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>MATHEMATICS · FRACTIONS</Text>
        <Text style={styles.title}>Learning gap details</Text>

        <View style={styles.badge}>
          <Ionicons name="leaf-outline" size={15} color="#936A16" />
          <Text style={styles.badgeText}>A little practice will help</Text>
        </View>

        <Text style={styles.topic}>{topic}</Text>
        <Text style={styles.description}>
          {learner} understands equivalent fractions. The next step is
          comparing fractions when the denominators are different.
        </Text>

        <View style={styles.resultCard}>
          <Ionicons name="clipboard-outline" size={25} color="#936A16" />
          <View style={{ flex: 1 }}>
            <Text style={styles.resultTitle}>2 of 4 questions correct</Text>
            <Text style={styles.muted}>From the latest quiz · 80% overall</Text>
            <Text style={styles.muted}>This is a next step, not a setback.</Text>
          </View>
        </View>

        <View style={styles.visualCard}>
          <Text style={styles.visualTitle}>Try finding the same denominator.</Text>
          <FractionRow filled={3} total={6} label="½ = 3⁄6" />
          <FractionRow filled={2} total={6} label="⅓ = 2⁄6" />
          <Text style={styles.visualCaption}>
            3 sixths is more than 2 sixths. So 1/2 is greater than 1/3.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your practice plan</Text>

        <Plan icon="book-outline" title="Compare with common denominators" subtitle="Guided lesson · 8 min" />
        <Plan icon="list-outline" title="Build confidence, one question at a time" subtitle="5 practice questions · 4 min" />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AssignPractice', { learner, topic })}
        >
          <Text style={styles.buttonText}>Assign practice</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AITutor', { learner, topic })}
        >
          <Text style={styles.link}>Ask my tutor to explain first</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function FractionRow({ filled, total, label }) {
  return (
    <View style={styles.fractionRow}>
      <View style={styles.blocks}>
        {Array.from({ length: total }).map((_, i) => (
          <View key={i} style={[styles.block, i < filled && styles.filled]} />
        ))}
      </View>
      <Text style={styles.fractionLabel}>{label}</Text>
    </View>
  );
}

function Plan({ icon, title, subtitle }) {
  return (
    <View style={styles.plan}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <View style={{ flex: 1 }}>
        <Text style={styles.planTitle}>{title}</Text>
        <Text style={styles.muted}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={17} color={colors.body} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22, paddingBottom: 35 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { color: colors.heading, fontSize: 23, fontWeight: '800', marginTop: 5 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FFF5D9', padding: 9, borderRadius: 20,
    alignSelf: 'flex-start', marginTop: 20
  },
  badgeText: { color: '#936A16', fontSize: 10, fontWeight: '700' },
  topic: { fontSize: 24, fontWeight: '800', color: colors.heading, marginTop: 12 },
  description: { color: colors.body, fontSize: 13, lineHeight: 20, marginTop: 9 },
  resultCard: {
    flexDirection: 'row', gap: 13, alignItems: 'center',
    backgroundColor: colors.white, borderRadius: 16,
    borderWidth: 1, borderColor: colors.border, padding: 15, marginTop: 20
  },
  resultTitle: { color: colors.heading, fontWeight: '800', fontSize: 13 },
  muted: { color: colors.body, fontSize: 10, marginTop: 5 },
  visualCard: { backgroundColor: colors.lightGreen, borderRadius: 19, padding: 16, marginTop: 17 },
  visualTitle: { color: colors.heading, fontWeight: '800', fontSize: 13, marginBottom: 15 },
  fractionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  blocks: { flex: 1, flexDirection: 'row', gap: 3, height: 30 },
  block: { flex: 1, borderWidth: 1, borderColor: colors.primary, backgroundColor: colors.white, borderRadius: 4 },
  filled: { backgroundColor: colors.primary },
  fractionLabel: { color: colors.primaryDark, fontSize: 15, fontWeight: '800' },
  visualCaption: { color: colors.primaryDark, fontSize: 11, lineHeight: 17, marginTop: 5 },
  sectionTitle: { color: colors.heading, fontSize: 16, fontWeight: '800', marginTop: 22, marginBottom: 10 },
  plan: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 13 },
  planTitle: { color: colors.heading, fontSize: 12, fontWeight: '600' },
  button: {
    backgroundColor: colors.primary, borderRadius: 12, padding: 16,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: 10, marginTop: 20
  },
  buttonText: { color: '#fff', fontWeight: '700' },
  link: { color: colors.primary, fontWeight: '700', textAlign: 'center', marginTop: 17, fontSize: 12 }
});