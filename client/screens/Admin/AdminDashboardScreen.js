import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../config/supabase';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboardScreen({ navigation }) {
    const { user, signOut } = useAuth();

    const [teachers, setTeachers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [busyId, setBusyId] = useState(null);

    // Load pending teachers and administrator notifications.
    const loadData = useCallback(async () => {
        if (!user?.id) return;

        try {
            const [teacherResult, notificationResult] =
                await Promise.all([
                    supabase
                        .from('profiles')
                        .select(
                            'id, full_name, email, school_name, phone_number, account_status, role'
                        )
                        .eq('role', 'teacher')
                        .eq('account_status', 'pending')
                        .order('id', { ascending: false }),

                    supabase
                        .from('admin_notifications')
                        .select(
                            'id, title, message, is_read, created_at, related_user_id'
                        )
                        .eq('admin_id', user.id)
                        .order('created_at', { ascending: false })
                        .limit(30)
                ]);

            if (teacherResult.error) throw teacherResult.error;
            if (notificationResult.error) throw notificationResult.error;

            setTeachers(teacherResult.data || []);
            setNotifications(notificationResult.data || []);

        } catch (error) {
            Alert.alert(
                'Unable to load applications',
                error.message || 'Please try again.'
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [user?.id]);

    // Load data and listen for new notifications.
    useEffect(() => {
        if (!user?.id) return;

        loadData();

        const channel = supabase
            .channel('admin-teacher-approval-updates')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'admin_notifications',
                    filter: `admin_id=eq.${user.id}`
                },
                loadData
            )
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'profiles',
                    filter: 'role=eq.teacher'
                },
                loadData
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [loadData, user?.id]);

    // Accept or reject a teacher.
    async function decide(teacher, decision) {
        const perform = async () => {
            setBusyId(teacher.id);

            try {
                const { error } = await supabase.rpc(
                    'admin_review_teacher_registration',
                    {
                        p_teacher_id: teacher.id,
                        p_decision: decision,
                        p_reason:
                            decision === 'reject'
                                ? 'Registration not approved by administrator.'
                                : null
                    }
                );

                if (error) throw error;

                Alert.alert(
                    'Application updated',
                    decision === 'accept'
                        ? 'Teacher account is now active.'
                        : 'Teacher registration has been rejected.'
                );

                await loadData();

            } catch (error) {
                Alert.alert(
                    'Could not update application',
                    error.message || 'Please try again.'
                );
            } finally {
                setBusyId(null);
            }
        };

        Alert.alert(
            decision === 'accept'
                ? 'Approve teacher?'
                : 'Reject teacher?',
            `Are you sure you want to ${
                decision === 'accept' ? 'approve' : 'reject'
            } ${teacher.full_name || teacher.email}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: decision === 'accept' ? 'Accept' : 'Reject',
                    style: decision === 'reject' ? 'destructive' : 'default',
                    onPress: perform
                }
            ]
        );
    }

    // Mark notification as read.
    async function markRead(item) {
        if (item.is_read) return;

        const { error } = await supabase
            .from('admin_notifications')
            .update({ is_read: true })
            .eq('id', item.id)
            .eq('admin_id', user.id);

        if (!error) {
            setNotifications(current =>
                current.map(n =>
                    n.id === item.id
                        ? { ...n, is_read: true }
                        : n
                )
            );
        }
    }

    // Teacher application card.
    const renderTeacher = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <View style={styles.avatar}>
                    <Ionicons
                        name="person-outline"
                        size={21}
                        color="#176B5B"
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>
                        {item.full_name || 'Teacher applicant'}
                    </Text>

                    <Text style={styles.email}>
                        {item.email || 'No email provided'}
                    </Text>
                </View>

                <Text style={styles.pending}>PENDING</Text>
            </View>

            <Text style={styles.detail}>
                School: {item.school_name || 'Not provided'}
            </Text>

            <Text style={styles.detail}>
                Phone: {item.phone_number || 'Not provided'}
            </Text>

            <View style={styles.actions}>
                <Pressable
                    disabled={busyId === item.id}
                    onPress={() => decide(item, 'reject')}
                    style={styles.rejectButton}
                >
                    <Text style={styles.rejectText}>Reject</Text>
                </Pressable>

                <Pressable
                    disabled={busyId === item.id}
                    onPress={() => decide(item, 'accept')}
                    style={styles.acceptButton}
                >
                    {busyId === item.id ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.acceptText}>
                            Accept teacher
                        </Text>
                    )}
                </Pressable>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#F7F9F7"
            />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.eyebrow}>
                        LUMALEARN ADMIN
                    </Text>

                    <Text style={styles.heading}>
                        Teacher approvals
                    </Text>

                    <Text style={styles.subheading}>
                        Review and manage teacher registrations.
                    </Text>
                </View>

                <Pressable
                    onPress={async () => {
                        await signOut();

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Welcome' }]
                        });
                    }}
                    style={styles.logout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={21}
                        color="#34443D"
                    />
                </Pressable>
            </View>

            {/* Pending count */}
            <View style={styles.summary}>
                <Text style={styles.summaryNumber}>
                    {teachers.length}
                </Text>

                <Text style={styles.summaryLabel}>
                    Pending applications
                </Text>
            </View>

            {/* Notifications */}
            <Text style={styles.sectionTitle}>
                Registration notifications
            </Text>

            {notifications.length === 0 ? (
                <Text style={styles.emptySmall}>
                    No notifications yet.
                </Text>
            ) : (
                notifications.slice(0, 5).map(item => (
                    <Pressable
                        key={item.id}
                        onPress={() => markRead(item)}
                        style={[
                            styles.notification,
                            !item.is_read && styles.unread
                        ]}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={19}
                            color="#176B5B"
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={styles.notificationTitle}>
                                {item.title}
                            </Text>

                            <Text style={styles.notificationMessage}>
                                {item.message}
                            </Text>
                        </View>

                        {!item.is_read && (
                            <View style={styles.dot} />
                        )}
                    </Pressable>
                ))
            )}

            {/* Teacher applications */}
            <Text style={styles.sectionTitle}>
                Pending teacher applications
            </Text>

            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#176B5B"
                    style={{ marginTop: 30 }}
                />
            ) : (
                <FlatList
                    data={teachers}
                    keyExtractor={item => item.id}
                    renderItem={renderTeacher}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                loadData();
                            }}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={38}
                                color="#2F9D94"
                            />

                            <Text style={styles.emptyTitle}>
                                All caught up
                            </Text>

                            <Text style={styles.emptyText}>
                                There are no teacher registrations
                                waiting for approval.
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9F7',
        paddingHorizontal: 18,
        paddingTop: 54
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18
    },
    eyebrow: {
        color: '#2F9D94',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.2
    },
    heading: {
        color: '#26372F',
        fontSize: 25,
        fontWeight: '800',
        marginTop: 5
    },
    subheading: {
        color: '#718078',
        fontSize: 12,
        marginTop: 4
    },
    logout: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    summary: {
        backgroundColor: '#E7F4EC',
        borderRadius: 15,
        padding: 16,
        marginBottom: 18
    },
    summaryNumber: {
        color: '#176B5B',
        fontSize: 27,
        fontWeight: '800'
    },
    summaryLabel: {
        color: '#46645A',
        fontSize: 12,
        marginTop: 2
    },
    sectionTitle: {
        color: '#26372F',
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 10,
        marginTop: 5
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8
    },
    unread: {
        borderWidth: 1,
        borderColor: '#A8D8C6'
    },
    notificationTitle: {
        color: '#26372F',
        fontSize: 12,
        fontWeight: '700'
    },
    notificationMessage: {
        color: '#718078',
        fontSize: 11,
        marginTop: 3
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#2F9D94'
    },
    emptySmall: {
        color: '#718078',
        fontSize: 12,
        marginBottom: 14
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E2EAE4'
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#E7F4EC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        color: '#26372F',
        fontSize: 14,
        fontWeight: '800'
    },
    email: {
        color: '#718078',
        fontSize: 11,
        marginTop: 3
    },
    pending: {
        color: '#966A14',
        backgroundColor: '#FFF4D9',
        fontSize: 9,
        fontWeight: '800',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 7
    },
    detail: {
        color: '#52645B',
        fontSize: 12,
        marginBottom: 5
    },
    actions: {
        flexDirection: 'row',
        gap: 9,
        marginTop: 12
    },
    rejectButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D7A3A3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 11
    },
    rejectText: {
        color: '#A43C3C',
        fontSize: 12,
        fontWeight: '700'
    },
    acceptButton: {
        flex: 1.5,
        backgroundColor: '#176B5B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 11
    },
    acceptText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700'
    },
    empty: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30
    },
    emptyTitle: {
        color: '#26372F',
        fontSize: 15,
        fontWeight: '800',
        marginTop: 10
    },
    emptyText: {
        color: '#718078',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        lineHeight: 18
    }
});