import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { PerformanceChart } from '../components/PerformanceChart';
import { mockStudentData } from '../services/mockData';
import { translations } from '../i18n/translations';

const StudentDashboard: React.FC = () => {
  // Using English for demo, in real app this would be dynamic
  const t = translations.en;
  
  const academicProgressData = {
    labels: mockStudentData.academicData.terms,
    datasets: [
      {
        data: mockStudentData.academicData.subjects.Mathematics.scores,
        color: () => '#0a84ff',
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{
      data: [
        mockStudentData.attendance.present,
        mockStudentData.attendance.absent,
        mockStudentData.attendance.late,
      ],
    }],
    legend: ['Present', 'Absent', 'Late'],
  };

  const subjectComparisonData = {
    labels: Object.keys(mockStudentData.academicData.subjects),
    datasets: [
      {
        data: Object.values(mockStudentData.academicData.subjects).map(
          (subject) => subject.scores[subject.scores.length - 1]
        ),
        color: () => '#0a84ff',
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{t.dashboard.title}</Text>
          <Text style={styles.subtitle}>
            {mockStudentData.studentInfo.name} - {mockStudentData.studentInfo.class}
          </Text>
        </View>

        <View style={styles.section}>
          <PerformanceChart
            type="line"
            data={academicProgressData}
            title="Academic Progress"
          />
        </View>

        <View style={styles.section}>
          <PerformanceChart
            type="pie"
            data={attendanceData}
            title="Attendance Overview"
          />
        </View>

        <View style={styles.section}>
          <PerformanceChart
            type="line"
            data={subjectComparisonData}
            title="Subject Comparison"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default StudentDashboard; 