import React, {useState, useEffect} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles/theme';
import { supabase } from '../../config/supabase';

export default function SchoolClassesSettingsScreen({ navigation }) {

  const [SchoolName, setSchoolName] = useState('')
  const [loadingScoolName, setLoadingSchoolName] = useState(true)

  useEffect(() => {
    fetchSchoolName()
  }, [])

  const fetchSchoolName = async () => {
      try {
        // Get the currently logged-in user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
  
        if (userError) {
          throw userError;
        }
  
        if (!user) {
          setSchoolName('Learner');
          return;
        }
  
        // Retrieve the school full name from the profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('school_name')
          .eq('id', user.id)
          .single();
  
        if (profileError) {
          throw profileError;
        }
  
        // Display the full name
        if (profile?.school_name) {
          setSchoolName(profile.school_name.trim());
        } else {
          setSchoolName('School');
        }
  
      } catch (error) {
        console.error('Error fetching school name:', error.message);
        setSchoolName('School');
      } finally {
        setLoadingSchoolName(false);
      }
    };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={23} color={colors.heading} />
        </TouchableOpacity>

        <Text style={styles.eyebrow}>TEACHER ACCOUNT</Text>
        <Text style={styles.title}>My school & classes</Text>

        <View style={styles.card}>
          <Text style={styles.label}>SCHOOL</Text>
          <Text style={styles.value}>{loadingScoolName ? '...' : SchoolName}</Text>
          <Text style={styles.muted}>South Africa</Text>
        </View>

        <Text style={styles.sectionTitle}>My classes</Text>

        {['Grade 7A', 'Grade 7B', 'Grade 7C'].map((item, index) => (
          <View key={item} style={styles.classCard}>
            <View style={styles.icon}>
              <Ionicons name="people-outline" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.value}>{item}</Text>
              <Text style={styles.muted}>{index === 0 ? 32 : 28} learners</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.body} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.screenBackground },
  content: { padding: 22 },
  eyebrow: { color: colors.primary, fontSize: 10, fontWeight: '700', marginTop: 25 },
  title: { color: colors.heading, fontSize: 24, fontWeight: '800', marginTop: 5, marginBottom: 20 },
  card: { backgroundColor: colors.lightGreen, padding: 18, borderRadius: 16 },
  label: { color: colors.primary, fontSize: 10, fontWeight: '800' },
  value: { color: colors.heading, fontSize: 14, fontWeight: '700', marginTop: 5 },
  muted: { color: colors.body, fontSize: 11, marginTop: 4 },
  sectionTitle: { color: colors.heading, fontSize: 16, fontWeight: '800', marginTop: 25, marginBottom: 12 },
  classCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  icon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.lightGreen, alignItems: 'center', justifyContent: 'center' }
});