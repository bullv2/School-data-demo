import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
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
        data: mockStudentData.academicData.subjects.Mathematics,
        color: () => 'rgb(75, 192, 192)',
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
    labels: Object.keys(mockStudentData.comparativeData),
    datasets: [
      {
        data: Object.values(mockStudentData.comparativeData).map(
          (subject) => subject.studentScore
        ),
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.dashboard.title}</Text>
        <Text style={styles.subtitle}>
          {mockStudentData.studentInfo.name} - {mockStudentData.studentInfo.class}
        </Text>
      </View>

      <PerformanceChart
        type="line"
        data={academicProgressData}
        title={t.charts.academicProgress}
      />

      <PerformanceChart
        type="pie"
        data={attendanceData}
        title={t.charts.attendance}
      />

      <PerformanceChart
        type="line"
        data={subjectComparisonData}
        title={t.charts.subjectPerformance}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});

export default StudentDashboard; 