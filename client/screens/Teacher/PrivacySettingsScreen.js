import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, Switch, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function PrivacySettingsScreen({ navigation }) {
  const [learnerData, setLearnerData] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>YOUR INFORMATION</Text>
        <Text style={styles.title}>Privacy & data</Text>
        <Text style={styles.subtitle}>
          Manage how your teacher account and classroom information are used.
        </Text>

        <View style={styles.card}>
          <Toggle title="Learner data access"
            subtitle="Allow access to assigned class information"
            value={learnerData} onChange={setLearnerData} />

          <Toggle title="Profile visibility"
            subtitle="Allow learners to see your teacher profile"
            value={profileVisibility} onChange={setProfileVisibility} />

          <Toggle title="Notifications"
            subtitle="Receive classroom and learning updates"
            value={notifications} onChange={setNotifications} />
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
          <Text style={styles.infoText}>
            Learner information should only be used for educational purposes.
            Keep classroom information private and secure.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Toggle({ title, subtitle, value, onChange }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.muted}>{subtitle}</Text>
      </View>
      <Switch value={value} onValueChange={onChange}
        trackColor={{ true: colors.primary }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { color: colors.heading, fontSize: 24, fontWeight: '800', marginTop: 5 },
  subtitle: { color: colors.body, fontSize: 13, lineHeight: 20, marginVertical: 15 },
  card: { backgroundColor: colors.white, borderRadius: 16, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 17, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowTitle: { color: colors.heading, fontSize: 12, fontWeight: '700' },
  muted: { color: colors.body, fontSize: 10, marginTop: 5, paddingRight: 10 },
  infoCard: { backgroundColor: colors.lightGreen, borderRadius: 15, padding: 16, marginTop: 20, flexDirection: 'row', gap: 12 },
  infoText: { color: colors.heading, fontSize: 11, lineHeight: 18, flex: 1 }
});