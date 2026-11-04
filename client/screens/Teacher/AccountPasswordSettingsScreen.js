import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  SafeAreaView, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function AccountPasswordSettingsScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const save = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing information', 'Please complete all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please check your new password.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Password too short', 'Your password must contain at least 8 characters.');
      return;
    }

    Alert.alert('Password ready', 'Connect this button to your Supabase password update.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>SECURITY</Text>
        <Text style={styles.title}>Account & password</Text>
        <Text style={styles.subtitle}>Update your account password.</Text>

        <Text style={styles.label}>Current password</Text>
        <TextInput style={styles.input} secureTextEntry value={currentPassword}
          onChangeText={setCurrentPassword} placeholder="Enter current password" />

        <Text style={styles.label}>New password</Text>
        <TextInput style={styles.input} secureTextEntry value={newPassword}
          onChangeText={setNewPassword} placeholder="Enter new password" />

        <Text style={styles.label}>Confirm new password</Text>
        <TextInput style={styles.input} secureTextEntry value={confirmPassword}
          onChangeText={setConfirmPassword} placeholder="Confirm new password" />

        <TouchableOpacity style={styles.button} onPress={save}>
          <Text style={styles.buttonText}>Update password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { color: colors.heading, fontSize: 24, fontWeight: '800', marginTop: 5 },
  subtitle: { color: colors.body, fontSize: 13, marginTop: 8, marginBottom: 20 },
  label: { color: colors.heading, fontSize: 12, fontWeight: '700', marginTop: 18, marginBottom: 8 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, color: colors.heading },
  button: { backgroundColor: colors.primary, borderRadius: 12, padding: 16, marginTop: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' }
});