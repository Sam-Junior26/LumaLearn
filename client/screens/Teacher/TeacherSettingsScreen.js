import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

import { alertT } from '../../components/TText';
import { Ionicons } from '@expo/vector-icons';
import TeacherBottomNav from '../../components/TeacherBottomNav';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../config/supabase';
import { colors } from '../../styles/theme';

function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.settingsRow}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.rowIcon}>
        <Ionicons
          name={icon}
          size={18}
          color="#2D8060"
        />
      </View>

      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        {subtitle && (
          <Text style={styles.rowSubtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={17}
        color="#87938C"
      />
    </TouchableOpacity>
  );
}

function ToggleRow({
  title,
  subtitle,
  value,
  onValueChange,
}) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowSubtitle}>
          {subtitle}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: '#DDE7E0',
          true: '#2D8060',
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#DDE7E0"
      />
    </View>
  );
}

export default function TeacherSettingsScreen({ navigation }) {

  const [weeklySummary, setWeeklySummary] = useState(true);
  const [dataSaver, setDataSaver] = useState(true);

  const [TeacherName, setTeacherName] = useState('');
  const [TeacherEmail, setTeacherEmail] = useState('');
  const [SchoolName, setSchoolName] = useState('')
  const [loadingSchoolName, setLoadingSchoolName] = useState(true)
  const [loadingName, setLoadingName] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(true);

  useEffect(() => {
    fetchTeacherName();
    fetchTeacherEmail();
    fetchSchoolName();
  }, []);

  const fetchTeacherName = async () => {
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
        setTeacherName('Learner');
        return;
      }

      // Retrieve the teacher's full name from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      // Display the full name
      if (profile?.full_name) {
        setTeacherName(profile.full_name.trim());
      } else {
        setTeacherName('Teacher');
      }

    } catch (error) {
      console.error('Error fetching teacher name:', error.message);
      setTeacherName('Teacher');
    } finally {
      setLoadingName(false);
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return 'L';

    return fullName
      .trim()
      .split(/\s+/)
      .map(name => name[0].toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const fetchTeacherEmail = async () => {
    try {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser();

      if (error) {
        throw error;
      }

      if (user) {
        setTeacherEmail(user.email || '');
      } else {
        setTeacherEmail('');
      }
    } catch (error) {
      console.error('Error fetching learner email:', error.message);
      setTeacherEmail('');
    } finally {
      setLoadingEmail(false)
    }
  };

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

  const { signOut } = useAuth();

  const handleLogOut = () => {
    alertT(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await signOut();

              if (error) {
                alertT(
                  'Logout Failed',
                  error.message
                );
                return;
              }

              navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
              });
            } catch (error) {
              alertT(
                'Error',
                'Unable to log out. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

  const showMessage = (title) => {
    Alert.alert(title, `Your ${title.toLowerCase()} settings will be available here.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9F7"
      />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <Text style={styles.eyebrow}>
            YOUR TEACHER WORKSPACE
          </Text>

          <Text style={styles.title}>
            Settings
          </Text>

          {/* Teacher profile */}
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(TeacherName)}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.teacherName}>
                {loadingName ? '...' : TeacherName}
              </Text>

              <Text style={styles.email}>
                {loadingEmail ? '...' : TeacherEmail}
              </Text>

              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>
                  Teacher · Grade 7A
                </Text>
              </View>
            </View>
          </View>

          {/* School settings */}
          <View style={styles.settingsCard}>
            <SettingsRow
              icon="school-outline"
              title="My school & classes"
              subtitle={`${loadingSchoolName ? '...' : SchoolName} · Grade 7A`}
              onPress={() => navigation.navigate('SchoolClassesSettings')}
            />

            <View style={styles.divider} />

            <SettingsRow
              icon="language-outline"
              title="App language"
              subtitle="English"
              onPress={() => navigation.navigate('Language')}
            />

            <View style={styles.divider} />

            <SettingsRow
              icon="shield-checkmark-outline"
              title="Account & password"
              subtitle="Manage your teacher account"
              onPress={() => navigation.navigate('AccountPasswordSettings')}
            />
          </View>

          {/* Data settings */}
          <Text style={styles.sectionTitle}>
            Stay informed, use less data
          </Text>

          <View style={styles.settingsCard}>
            <ToggleRow
              title="Weekly class summary"
              subtitle="Every Monday · Email & in-app"
              value={weeklySummary}
              onValueChange={setWeeklySummary}
            />

            <View style={styles.divider} />

            <ToggleRow
              title="Data saver"
              subtitle="Sync reports on Wi-Fi when available"
              value={dataSaver}
              onValueChange={setDataSaver}
            />
          </View>

          {/* Privacy and support */}
          <View style={styles.settingsCard}>
            <SettingsRow
              icon="lock-closed-outline"
              title="Learner privacy & data"
              subtitle="School consent and data access"
              onPress={() => navigation.navigate('PrivacySettings')}
            />

            <View style={styles.divider} />

            <SettingsRow
              icon="help-circle-outline"
              title="Help & support"
              subtitle="Get help with your classroom"
              onPress={() => navigation.navigate('HelpSupportSettings')}
            />
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogOut}
            activeOpacity={0.8}
          >
            <Text style={styles.logoutText}>
              Log out
            </Text>

            <Ionicons
              name="log-out-outline"
              size={18}
              color="#2D8060"
            />
          </TouchableOpacity>

          <Text style={styles.version}>
            LumaLearn · Version 1.0.0
          </Text>
        </ScrollView>

        <TeacherBottomNav
          navigation={navigation}
          active="settings"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },

  screen: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '700',
    marginBottom: 4,
  },

  title: {
    color: '#26372F',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 19,
    gap: 12,
  },

  avatar: {
    width: 49,
    height: 49,
    borderRadius: 25,
    backgroundColor: '#E7F4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#205B46',
    fontSize: 15,
    fontWeight: '800',
  },

  profileInfo: {
    flex: 1,
  },

  teacherName: {
    color: '#26372F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 3,
  },

  email: {
    color: '#718078',
    fontSize: 9,
    marginBottom: 5,
  },

  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7F4EC',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  roleText: {
    color: '#205B46',
    fontSize: 9,
    fontWeight: '700',
  },

  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 17,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginBottom: 13,
  },

  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 51,
    gap: 10,
  },

  rowIcon: {
    width: 34,
    height: 34,
    backgroundColor: '#E7F4EC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowInfo: {
    flex: 1,
  },

  rowTitle: {
    color: '#26372F',
    fontSize: 11,
    fontWeight: '600',
  },

  rowSubtitle: {
    color: '#718078',
    fontSize: 9,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5ECE7',
    marginLeft: 43,
  },

  sectionTitle: {
    color: '#26372F',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 51,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 1,
  },

  logoutText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  version: {
    textAlign: 'center',
    color: '#87938C',
    fontSize: 9,
    marginTop: 11,
  },
});