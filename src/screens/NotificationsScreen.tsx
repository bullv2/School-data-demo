import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NotificationsScreen = () => {
  const insets = useSafeAreaInsets();

  const renderNotificationIcon = (type: string) => {
    if (type === 'Academic') {
      return <Ionicons name="school" size={24} color="#0A84FF" />;
    }
    return <Ionicons name="calendar" size={24} color="#0A84FF" />;
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? insets.top : 0 }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          {/* Notifications */}
          {[
            {
              type: 'Academic',
              title: 'Math Test Results Available',
              date: '2024-03-15',
              unread: true,
            },
            {
              type: 'Event',
              title: 'Parent-Teacher Conference Scheduled',
              date: '2024-03-14',
              unread: false,
            },
            {
              type: 'Academic',
              title: 'Science Project Due Date Reminder',
              date: '2024-03-13',
              unread: true,
            },
          ].map((notification, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.notificationItem,
                { backgroundColor: notification.unread ? '#F0F9FF' : '#FFFFFF' },
              ]}
            >
              <View style={styles.notificationContent}>
                {renderNotificationIcon(notification.type)}
                <View style={styles.notificationText}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationDate}>{notification.date}</Text>
                </View>
                {notification.unread && <View style={styles.unreadDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Messages</Text>
          {/* Messages */}
          {[
            {
              from: 'Mrs. Johnson',
              subject: 'Class Field Trip',
              date: '2024-03-15',
              content:
                'Dear Parents, we are planning a field trip to the Science Museum next week. Please review the attached permission slip and return it by Friday.',
            },
            {
              from: 'School Administration',
              subject: 'School Closure Notice',
              date: '2024-03-14',
              content:
                'Due to inclement weather, the school will be closed tomorrow. All classes will resume on Monday.',
            },
          ].map((message, index) => (
            <TouchableOpacity key={index} style={styles.messageItem}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageSender}>{message.from}</Text>
                <Text style={styles.messageDate}>{message.date}</Text>
              </View>
              <Text style={styles.messageSubject}>{message.subject}</Text>
              <Text style={styles.messageContent} numberOfLines={2}>
                {message.content}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 15,
    color: '#666666',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0A84FF',
    marginLeft: 8,
  },
  messageItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageSender: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  messageDate: {
    fontSize: 15,
    color: '#666666',
  },
  messageSubject: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0A84FF',
    marginBottom: 8,
  },
  messageContent: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 20,
  },
});

export default NotificationsScreen; 