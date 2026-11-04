import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

const helpItems = [
  {
    title: 'Managing my learners',
    subtitle: 'Learn how to view and support learners.',
    icon: 'people-outline'
  },
  {
    title: 'Assigning practice',
    subtitle: 'Learn how to create learning activities.',
    icon: 'book-outline'
  },
  {
    title: 'Understanding reports',
    subtitle: 'Learn how to interpret class progress.',
    icon: 'bar-chart-outline'
  },
  {
    title: 'Account and security',
    subtitle: 'Get help with your teacher account.',
    icon: 'shield-checkmark-outline'
  }
];

export default function HelpSupportSettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>WE ARE HERE TO HELP</Text>
        <Text style={styles.title}>Help & support</Text>
        <Text style={styles.subtitle}>
          Find answers to common questions about using LumaLearn.
        </Text>

        <View style={styles.card}>
          {helpItems.map(item => (
            <TouchableOpacity
              key={item.title}
              style={styles.row}
              onPress={() => Alert.alert(item.title, item.subtitle)}
            >
              <View style={styles.icon}>
                <Ionicons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.muted}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={17} color={colors.body} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactCard}>
          <Ionicons name="chatbubble-ellipses-outline" size={25} color={colors.primary} />
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.muted}>Contact your school administrator for assistance.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Contact support', 'Connect your support email or contact form here.')}
          >
            <Text style={styles.buttonText}>Contact support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { color: colors.heading, fontSize: 24, fontWeight: '800', marginTop: 5 },
  subtitle: { color: colors.body, fontSize: 13, lineHeight: 20, marginVertical: 15 },
  card: { backgroundColor: colors.white, borderRadius: 16, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 13 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.border },
  icon: { width: 38, height: 38, backgroundColor: colors.lightGreen, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  rowTitle: { color: colors.heading, fontSize: 12, fontWeight: '700' },
  muted: { color: colors.body, fontSize: 10, lineHeight: 16, marginTop: 4 },
  contactCard: { backgroundColor: colors.lightGreen, borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 20 },
  contactTitle: { color: colors.heading, fontWeight: '800', fontSize: 15, marginTop: 10 },
  button: { backgroundColor: colors.primary, padding: 13, borderRadius: 11, marginTop: 15, width: '100%' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' }
});