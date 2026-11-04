import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import TeacherBottomNav from '../../components/TeacherBottomNav';
import { colors } from '../../styles/theme';

const learnersData = [
  { id: '1', name: 'Amina Maseko', initials: 'AM', mastery: 88, status: 'On track · Active today' },
  { id: '2', name: 'Lebo Molefe', initials: 'LM', mastery: 65, status: 'Comparing fractions · 2 days ago' },
  { id: '3', name: 'Naledi Mokoena', initials: 'NM', mastery: 76, status: 'Comparing fractions · Active today' },
  { id: '4', name: 'Sipho Dlamini', initials: 'SD', mastery: 83, status: 'On track · Active today' },
  { id: '5', name: 'Thabo Ndlovu', initials: 'TN', mastery: 54, status: 'Equivalent fractions · Active today' },
  { id: '6', name: 'Zanele Dube', initials: 'ZD', mastery: 58, status: 'Word problems · Active yesterday' },
  { id: '7', name: 'Lerato Nkosi', initials: 'LN', mastery: 72, status: 'On track · Active today' },
  { id: '8', name: 'Kabelo Mokoena', initials: 'KM', mastery: 49, status: 'Needs support · 3 days ago' },
];

export default function LearnersScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [sortAZ, setSortAZ] = useState(true);

  const filteredLearners = useMemo(() => {
    let result = learnersData.filter((learner) =>
      learner.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (filter === 'support') {
      result = result.filter((learner) => learner.mastery < 70);
    }

    return [...result].sort((a, b) =>
      sortAZ
        ? a.name.localeCompare(b.name)
        : b.mastery - a.mastery
    );
  }, [search, filter, sortAZ]);

  const visibleLearners = filteredLearners.slice(0, visibleCount);

  const openLearner = (learner) => {
    navigation.navigate('TeacherLearnerDetails', { learner });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9F7" />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* Header */}
          <View style={styles.topLine}>
            <Text style={styles.eyebrow}>
              GRADE 7A · 32 LEARNERS
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddLearner')}
            >
              <Ionicons
                name="person-add-outline"
                size={20}
                color="#26372F"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>My learners</Text>

          {/* Search */}
          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={18}
              color="#7C8981"
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by learner name"
              placeholderTextColor="#87938C"
              style={styles.searchInput}
              returnKeyType="search"
            />

            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons
                  name="close-circle"
                  size={17}
                  color="#87938C"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Filters */}
          <View style={styles.filterBar}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'all' && styles.activeFilter,
              ]}
              onPress={() => {
                setFilter('all');
                setVisibleCount(6);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'all' && styles.activeFilterText,
                ]}
              >
                All 32
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === 'support' && styles.activeFilter,
              ]}
              onPress={() => {
                setFilter('support');
                setVisibleCount(6);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === 'support' && styles.activeFilterText,
                ]}
              >
                Needs support 18
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sorting */}
          <View style={styles.listMeta}>
            <Text style={styles.mutedText}>
              Overall mastery shown
            </Text>

            <TouchableOpacity
              style={styles.sortButton}
              onPress={() => setSortAZ(!sortAZ)}
            >
              <Ionicons
                name="swap-vertical"
                size={15}
                color="#2D8060"
              />

              <Text style={styles.sortText}>
                {sortAZ ? 'Name A–Z' : 'Highest mastery'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Learners list */}
          <View style={styles.listCard}>
            {visibleLearners.map((learner, index) => (
              <TouchableOpacity
                key={learner.id}
                style={[
                  styles.learnerRow,
                  index === visibleLearners.length - 1 && styles.lastRow,
                ]}
                activeOpacity={0.75}
                onPress={() => openLearner(learner)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {learner.initials}
                  </Text>
                </View>

                <View style={styles.learnerInfo}>
                  <Text style={styles.learnerName}>
                    {learner.name}
                  </Text>

                  <Text
                    style={styles.learnerStatus}
                    numberOfLines={1}
                  >
                    {learner.status}
                  </Text>
                </View>

                <View
                  style={[
                    styles.scorePill,
                    learner.mastery >= 70
                      ? styles.greenPill
                      : styles.yellowPill,
                  ]}
                >
                  <Text
                    style={[
                      styles.scoreText,
                      learner.mastery >= 70
                        ? styles.greenScore
                        : styles.yellowScore,
                    ]}
                  >
                    {learner.mastery}%
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color="#8A9890"
                />
              </TouchableOpacity>
            ))}

            {visibleLearners.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>
                  No learners found
                </Text>

                <Text style={styles.mutedText}>
                  Try another name or change the filter.
                </Text>
              </View>
            )}
          </View>

          {/* Bottom information */}
          <View style={styles.bottomMeta}>
            <Text style={styles.mutedText}>
              Showing {visibleLearners.length} of {filteredLearners.length} learners
            </Text>

            {visibleCount < filteredLearners.length && (
              <TouchableOpacity
                onPress={() => setVisibleCount((count) => count + 6)}
              >
                <Text style={styles.loadMore}>
                  Load more ↓
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <TeacherBottomNav
          navigation={navigation}
          active="learners"
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
    backgroundColor: '#F7F9F7',
  },

  content: {
    paddingHorizontal: 21,
    paddingTop: 10,
    paddingBottom: 18,
  },

  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },

  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },

  addButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colors.heading,
    fontSize: 22,
    fontWeight: '800',
    marginTop: -1,
    marginBottom: 19,
  },

  searchBox: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#26372F',
    paddingVertical: 0,
  },

  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#EFF3F0',
    borderRadius: 12,
    padding: 4,
    marginTop: 15,
    marginBottom: 14,
  },

  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 9,
  },

  activeFilter: {
    backgroundColor: '#FFFFFF',
  },

  filterText: {
    fontSize: 11,
    color: '#718078',
    fontWeight: '500',
  },

  activeFilterText: {
    color: '#205B46',
    fontWeight: '700',
  },

  listMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
  },

  mutedText: {
    color: '#718078',
    fontSize: 10,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  sortText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '700',
  },

  listCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7E0',
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  learnerRow: {
    minHeight: 61,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5ECE7',
    gap: 10,
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E7F4EC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#205B46',
    fontSize: 12,
    fontWeight: '800',
  },

  learnerInfo: {
    flex: 1,
    minWidth: 0,
  },

  learnerName: {
    color: '#26372F',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },

  learnerStatus: {
    color: '#718078',
    fontSize: 9,
  },

  scorePill: {
    minWidth: 39,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },

  greenPill: {
    backgroundColor: '#E7F4EC',
  },

  yellowPill: {
    backgroundColor: '#FFF5D9',
  },

  scoreText: {
    fontSize: 10,
    fontWeight: '800',
  },

  greenScore: {
    color: '#205B46',
  },

  yellowScore: {
    color: '#8A641A',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 6,
  },

  emptyTitle: {
    color: '#26372F',
    fontSize: 13,
    fontWeight: '700',
  },

  bottomMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },

  loadMore: {
    color: '#2D8060',
    fontSize: 10,
    fontWeight: '700',
  },
});