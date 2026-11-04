import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

const tabs = [
  {
    label: 'Home',
    route: 'TeacherDashboard',
    icon: 'home-outline',
    active: 'home',
  },
  {
    label: 'Learners',
    route: 'TeacherLearners',
    icon: 'people-outline',
    active: 'learners',
  },
  {
    label: 'Gaps',
    route: 'TeacherGaps',
    icon: 'stats-chart-outline',
    active: 'gaps',
  },
  {
    label: 'Reports',
    route: 'TeacherReports',
    icon: 'document-text-outline',
    active: 'reports',
  },
  {
    label: 'Settings',
    route: 'TeacherSettings',
    icon: 'settings-outline',
    active: 'settings',
  },
];

export default function TeacherBottomNav({
  navigation,
  active = 'learners',
}) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const selected = active === tab.active;

        return (
          <TouchableOpacity
            key={tab.active}
            style={styles.tab}
            activeOpacity={0.75}
            onPress={() => {
              if (!selected) {
                navigation.navigate(tab.route);
              }
            }}
          >
            <View
              style={[
                styles.iconWrap,
                selected && styles.selectedIconWrap,
              ]}
            >
              <Ionicons
                name={tab.icon}
                size={18}
                color={selected ? '#2D8060' : '#7C8981'}
              />
            </View>

            <Text
              style={[
                styles.label,
                selected && styles.selectedLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E4EBE6',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconWrap: {
    minWidth: 38,
    height: 27,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedIconWrap: {
    backgroundColor: '#E7F4EC',
  },

  label: {
    fontSize: 9,
    color: colors.body,
    marginTop: 2,
  },

  selectedLabel: {
    color: colors.primary,
    fontWeight: '700',
  },
});