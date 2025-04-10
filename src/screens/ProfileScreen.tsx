import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock user data
const mockUserData = {
  name: 'Sarah Johnson',
  grade: '10th Grade',
  studentId: 'ST2024001',
  email: 'sarah.j@school.edu',
  avatar: 'https://i.pravatar.cc/300',
  stats: {
    attendance: '95%',
    gpa: '3.8',
    rank: '15/150',
    activities: 5,
  },
  achievements: [
    {
      id: '1',
      title: 'Honor Roll',
      description: 'Achieved Honor Roll status for Fall 2023',
      icon: 'trophy',
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      description: '100% attendance in Spring 2023',
      icon: 'calendar-check',
    },
    {
      id: '3',
      title: 'Science Fair Winner',
      description: 'First place in Regional Science Fair',
      icon: 'ribbon',
    },
  ],
};

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: mockUserData.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{mockUserData.name}</Text>
        <Text style={styles.grade}>{mockUserData.grade}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Student Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="school" size={20} color="#666" />
            <Text style={styles.infoLabel}>Student ID</Text>
            <Text style={styles.infoValue}>{mockUserData.studentId}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="mail" size={20} color="#666" />
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{mockUserData.email}</Text>
          </View>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.stats.attendance}</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.stats.gpa}</Text>
            <Text style={styles.statLabel}>GPA</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.stats.rank}</Text>
            <Text style={styles.statLabel}>Class Rank</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{mockUserData.stats.activities}</Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {mockUserData.achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <View style={styles.achievementIcon}>
              <Ionicons name={achievement.icon as any} size={24} color="#4a90e2" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  grade: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  infoContainer: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4a90e2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileScreen; 