import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NotificationPanel from './NotificationPanel';

interface CustomHeaderProps {
  onLogout?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ onLogout }) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.rightButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setIsNotificationVisible(true)}
            >
              <Ionicons name="notifications-outline" size={22} color="#0a84ff" />
              <View style={styles.badge} />
            </TouchableOpacity>
            {onLogout && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={onLogout}
              >
                <Ionicons name="log-out-outline" size={22} color="#0a84ff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <NotificationPanel
        isVisible={isNotificationVisible}
        onClose={() => setIsNotificationVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44, // Standard iOS header height
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    marginLeft: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
  },
});

export default CustomHeader; 