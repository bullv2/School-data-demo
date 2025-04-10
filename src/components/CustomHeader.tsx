import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NotificationPanel } from './NotificationPanel';
import { mockParentData } from '../services/mockData';
import { NotificationPosition } from '../navigation/types';

interface CustomHeaderProps {
  onLogout: () => void;
  studentName: string;
  showNotifications: boolean;
  onToggleNotifications: () => void;
  notificationButtonRef: React.RefObject<View>;
  notificationPosition?: NotificationPosition;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ 
  onLogout, 
  studentName,
  showNotifications,
  onToggleNotifications,
  notificationButtonRef,
  notificationPosition
}) => {
  const insets = useSafeAreaInsets();
  
  // Calculate number of unread notifications
  const unreadCount = mockParentData.notifications.filter(n => !n.read).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>Welcome,</Text>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{studentName}</Text>
        </View>
        <View style={styles.rightSection}>
          <View ref={notificationButtonRef}>
            <TouchableOpacity 
              onPress={onToggleNotifications} 
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="notifications-outline" size={24} color="#007AFF" />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={onLogout} 
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="log-out-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      
      <NotificationPanel
        visible={showNotifications}
        onClose={onToggleNotifications}
        position={notificationPosition}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    zIndex: 100,
    elevation: Platform.select({
      android: 100,
      default: 0
    }),
    minHeight: 64,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 64,
  },
  leftSection: {
    flex: 1,
    paddingRight: 16,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    flexShrink: 1,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
}); 