import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, Switch, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('Grade 7A');
  const [isPrivate, setIsPrivate] = useState(false);

  const createGroup = () => {
    if (!groupName.trim()) {
      Alert.alert('Group name required', 'Please enter a name for your group.');
      return;
    }

    Alert.alert('Group created', `${groupName} has been created successfully.`, [
      { text: 'Continue', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>TEACHER WORKSPACE</Text>
        <Text style={styles.title}>Create a learning group</Text>
        <Text style={styles.subtitle}>
          Bring learners together for focused activities and extra support.
        </Text>

        <Text style={styles.label}>Group name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Fractions support group"
          value={groupName}
          onChangeText={setGroupName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What will learners work on?"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Class</Text>
        <View style={styles.options}>
          {['Grade 7A', 'Grade 7B', 'Grade 7C'].map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.option, grade === item && styles.selected]}
              onPress={() => setGrade(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Subject</Text>
        <View style={styles.options}>
          {['Mathematics', 'English', 'Natural Sciences'].map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.option, subject === item && styles.selected]}
              onPress={() => setSubject(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.privacyRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.optionText}>Private group</Text>
            <Text style={styles.muted}>Only selected learners can join.</Text>
          </View>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            trackColor={{ true: colors.primary }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={createGroup}>
          <Text style={styles.buttonText}>Create group</Text>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22, paddingBottom: 35 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { color: colors.heading, fontSize: 24, fontWeight: '800', marginTop: 5 },
  subtitle: { color: colors.body, fontSize: 13, lineHeight: 20, marginTop: 9 },
  label: { color: colors.heading, fontWeight: '700', fontSize: 13, marginTop: 22, marginBottom: 9 },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, padding: 14, fontSize: 13, color: colors.heading
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  option: {
    paddingVertical: 11, paddingHorizontal: 13, borderRadius: 12,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border
  },
  selected: { backgroundColor: colors.lightGreen, borderColor: colors.primary },
  optionText: { color: colors.heading, fontSize: 12, fontWeight: '600' },
  muted: { color: colors.body, fontSize: 10, marginTop: 4 },
  privacyRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, borderRadius: 13,
    padding: 14, marginTop: 25
  },
  button: {
    backgroundColor: colors.primary, borderRadius: 12, padding: 16,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: 8, marginTop: 30
  },
  buttonText: { color: '#fff', fontWeight: '700' }
});