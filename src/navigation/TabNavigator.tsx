import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StudentDashboard from '../screens/StudentDashboard';
import { mockStudentData, mockSchoolData, mockParentData } from '../services/mockData';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ExpandableSection = ({ title, children, isExpanded, onPress }) => (
  <View style={styles.section}>
    <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Ionicons
        name={isExpanded ? 'chevron-up' : 'chevron-down'}
        size={24}
        color="#666"
      />
    </TouchableOpacity>
    {isExpanded && <View style={styles.sectionContent}>{children}</View>}
  </View>
);

const ProfileScreen = () => {
  const [expandedSections, setExpandedSections] = React.useState({
    personal: true,
    academic: false,
    extracurricular: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <ExpandableSection
        title="Personal Information"
        isExpanded={expandedSections.personal}
        onPress={() => toggleSection('personal')}
      >
        <View style={styles.infoItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{mockStudentData.studentInfo.name}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Class:</Text>
          <Text style={styles.value}>{mockStudentData.studentInfo.class}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Student Number:</Text>
          <Text style={styles.value}>{mockStudentData.studentInfo.studentNumber}</Text>
        </View>
      </ExpandableSection>

      <ExpandableSection
        title="Academic Performance"
        isExpanded={expandedSections.academic}
        onPress={() => toggleSection('academic')}
      >
        <View style={styles.rankContainer}>
          <Text style={styles.rankTitle}>Current Rank</Text>
          <Text style={styles.rankValue}>{mockStudentData.academicData.overallPerformance.currentRank}</Text>
          <Text style={styles.rankChange}>
            {mockStudentData.academicData.overallPerformance.improvement} from last term
          </Text>
        </View>
      </ExpandableSection>

      <ExpandableSection
        title="Extracurricular Activities"
        isExpanded={expandedSections.extracurricular}
        onPress={() => toggleSection('extracurricular')}
      >
        {mockStudentData.extracurricular.activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <Text style={styles.activityName}>{activity.name}</Text>
            <Text style={styles.activityRole}>{activity.role}</Text>
            <Text style={styles.activitySchedule}>{activity.schedule}</Text>
          </View>
        ))}
      </ExpandableSection>
    </ScrollView>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={StudentDashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContent: {
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  rankContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  rankTitle: {
    fontSize: 16,
    color: '#666',
  },
  rankValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 8,
  },
  rankChange: {
    fontSize: 14,
    color: '#4CAF50',
  },
  activityItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  activityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  activityRole: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  activitySchedule: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default TabNavigator; 