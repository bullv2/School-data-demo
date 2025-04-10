import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const renderSettingItem = (
    icon: string,
    title: string,
    value?: boolean,
    onValueChange?: (value: boolean) => void,
    showArrow?: boolean
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => onValueChange?.(!value)}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={22} color="#4a90e2" />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {typeof value !== 'undefined' ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#ddd', true: '#4a90e2' }}
          thumbColor="#fff"
        />
      ) : showArrow ? (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {renderSettingItem(
          'notifications',
          'Push Notifications',
          notifications,
          setNotifications
        )}
        {renderSettingItem(
          'mail',
          'Email Updates',
          emailUpdates,
          setEmailUpdates
        )}
      </View>

      {/* Appearance Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        {renderSettingItem(
          'moon',
          'Dark Mode',
          darkMode,
          setDarkMode
        )}
        {renderSettingItem(
          'color-palette',
          'Theme',
          undefined,
          undefined,
          true
        )}
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderSettingItem(
          'volume-high',
          'Sound Effects',
          soundEnabled,
          setSoundEnabled
        )}
        {renderSettingItem(
          'language',
          'Language',
          undefined,
          undefined,
          true
        )}
        {renderSettingItem(
          'time',
          'Time Zone',
          undefined,
          undefined,
          true
        )}
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderSettingItem(
          'shield-checkmark',
          'Privacy Settings',
          undefined,
          undefined,
          true
        )}
        {renderSettingItem(
          'key',
          'Change Password',
          undefined,
          undefined,
          true
        )}
        {renderSettingItem(
          'cloud-download',
          'Data Backup',
          undefined,
          undefined,
          true
        )}
      </View>

      {/* Help & Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        {renderSettingItem(
          'help-circle',
          'FAQ',
          undefined,
          undefined,
          true
        )}
        {renderSettingItem(
          'chatbox',
          'Contact Support',
          undefined,
          undefined,
          true
        )}
        {renderSettingItem(
          'information-circle',
          'About',
          undefined,
          undefined,
          true
        )}
      </View>

      {/* Danger Zone */}
      <View style={[styles.section, styles.dangerSection]}>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconContainer, styles.dangerIcon]}>
              <Ionicons name="log-out" size={22} color="#ff3b30" />
            </View>
            <Text style={[styles.settingTitle, styles.dangerText]}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  dangerSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  dangerIcon: {
    backgroundColor: '#fff2f2',
  },
  dangerText: {
    color: '#ff3b30',
  },
});

export default SettingsScreen; 