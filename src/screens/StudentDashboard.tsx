import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PerformanceChart } from '../components/PerformanceChart';
import { ExpandableSection } from '../components/ExpandableSection';
import { mockStudentData } from '../services/mockData';
import { translations } from '../i18n/translations';

interface SubjectData {
  scores: number[];
  teacher: string;
  classAverage: number[];
  schoolAverage: number[];
}

interface Subjects {
  Mathematics: SubjectData;
  English: SubjectData;
  Science: SubjectData;
  Chinese: SubjectData;
}

interface AttendanceData {
  present: number;
  absent: number;
  late: number;
  details: Array<{
    date: string;
    status: string;
    time?: string;
    reason?: string;
  }>;
}

const StudentDashboard: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const t = translations.en.charts; // Use English translations for now

  const calculateTrend = (scores: number[]): string => {
    if (scores.length < 2) return 'stable';
    const diff = scores[scores.length - 1] - scores[scores.length - 2];
    if (diff > 5) return 'improving';
    if (diff < -5) return 'declining';
    return 'stable';
  };

  const calculateSubjectAverage = (scores: number[]): number => {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  };

  const subjects = mockStudentData.academicData.subjects as Subjects;
  const subjectEntries = Object.entries(subjects);

  // Calculate scores with proper rounding
  const studentScores = subjectEntries.map(([_, subject]) => {
    const avg = calculateSubjectAverage(subject.scores);
    return Math.round(avg * 10) / 10; // Round to 1 decimal place
  });
  const classAverages = subjectEntries.map(([_, subject]) => {
    const avg = calculateSubjectAverage(subject.classAverage);
    return Math.round(avg * 10) / 10; // Round to 1 decimal place
  });
  
  // Find min/max values with padding
  const allValues = [...studentScores, ...classAverages];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  
  // Adjust the range to ensure all values are visible
  const range = maxValue - minValue;
  const padding = range * 0.15; // Increase padding to 15%
  const yAxisMin = Math.max(0, Math.floor(minValue - padding));
  const yAxisMax = Math.ceil(maxValue + padding);

  const subjectPerformanceChartData = {
    labels: Object.keys(subjects),
    datasets: [
      {
        data: studentScores,
        color: () => 'rgba(0, 122, 255, 0.8)', // Blue line for student scores
        strokeWidth: 2,
      }
    ],
  };

  const classAverageData = {
    labels: Object.keys(subjects),
    datasets: [
      {
        data: classAverages,
        color: () => 'rgba(255, 149, 0, 0.8)', // Orange line for class average
        strokeWidth: 2,
      }
    ],
  };

  const attendanceChartData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{
      data: [
        mockStudentData.attendance.present,
        mockStudentData.attendance.absent,
        mockStudentData.attendance.late,
      ],
    }],
    colors: [
      'rgba(52, 199, 89, 1)',    // Bright green for Present
      'rgba(255, 69, 58, 1)',    // Bright red for Absent
      'rgba(255, 159, 10, 1)',   // Bright orange for Late
    ],
  };

  const getPerformanceAnalysis = () => {
    const firstSubject = Object.values(subjects)[0];
    const trend = calculateTrend(firstSubject.scores);

    const subjectsWithAverages = subjectEntries.map(([name, data]) => ({
      name,
      average: calculateSubjectAverage(data.scores)
    }));

    const bestSubject = subjectsWithAverages.reduce((best, current) => 
      current.average > best.average ? current : best
    );

    const worstSubject = subjectsWithAverages.reduce((worst, current) => 
      current.average < worst.average ? current : worst
    );

    return {
      trend,
      bestSubject,
      worstSubject
    };
  };

  const analysis = getPerformanceAnalysis();

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Dashboard Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>
          Today's Overview
        </Text>
        <Text style={styles.nameText}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </View>

      {/* Academic Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Progress</Text>
        <View style={styles.card}>
          <View style={styles.chartWrapper}>
            <PerformanceChart
              type="line"
              data={subjectPerformanceChartData}
              title="Your Performance"
              yAxisMin={yAxisMin}
              yAxisMax={yAxisMax}
            />
          </View>
          <Text style={styles.trend}>
            Your performance is {analysis.trend}
          </Text>
          <ExpandableSection title="Detailed Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your strongest subject is {analysis.bestSubject.name} with an average of {Math.round(analysis.bestSubject.average * 10) / 10}%.
              </Text>
              <Text style={styles.analysisText}>
                Focus more attention on {analysis.worstSubject.name} where your average is {Math.round(analysis.worstSubject.average * 10) / 10}%.
              </Text>
              <Text style={styles.recommendationText}>
                Recommendations:
              </Text>
              <Text style={styles.bulletPoint}>• Schedule extra practice sessions for {analysis.worstSubject.name}</Text>
              <Text style={styles.bulletPoint}>• Maintain your strong performance in {analysis.bestSubject.name} through consistent study</Text>
              <Text style={styles.bulletPoint}>• Join study groups for peer learning and support</Text>
              <Text style={styles.bulletPoint}>• Review past exam papers to identify areas for improvement</Text>
              <Text style={styles.bulletPoint}>• Consider seeking additional help from subject teachers</Text>
              <Text style={styles.bulletPoint}>• Create a structured study timetable</Text>
            </View>
          </ExpandableSection>
        </View>
      </View>

      {/* Attendance Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Overview</Text>
        <View style={styles.card}>
          <View style={styles.chartWrapper}>
            <PerformanceChart
              type="pie"
              data={attendanceChartData}
              title="Attendance Distribution"
            />
          </View>
          <View style={styles.attendanceContainer}>
            <Text style={styles.attendanceText}>Present:</Text>
            <Text style={styles.attendanceValue}>{mockStudentData.attendance.present}%</Text>
            <Text style={styles.attendanceText}>
              {mockStudentData.attendance.absent} days absent, {mockStudentData.attendance.late} days late
            </Text>
          </View>
          <ExpandableSection title="Attendance Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your attendance rate is {
                  mockStudentData.attendance.present >= 95 
                    ? 'excellent! Keep up the good work.' 
                    : mockStudentData.attendance.present >= 90 
                    ? 'good, but there\'s room for improvement.' 
                    : 'concerning and requires immediate attention.'
                }
              </Text>
              <Text style={styles.analysisText}>
                Regular attendance is crucial for academic success and maintaining consistent learning progress.
              </Text>
              <Text style={styles.recommendationText}>
                Recommendations for Improvement:
              </Text>
              <Text style={styles.bulletPoint}>• Arrive 10-15 minutes before class starts to prepare</Text>
              <Text style={styles.bulletPoint}>• Plan your morning routine to avoid delays</Text>
              <Text style={styles.bulletPoint}>• Track your attendance patterns to identify issues</Text>
              <Text style={styles.bulletPoint}>• Set multiple alarms if needed</Text>
              <Text style={styles.bulletPoint}>• Prepare school materials the night before</Text>
              <Text style={styles.bulletPoint}>• Communicate with teachers about any attendance challenges</Text>
            </View>
          </ExpandableSection>
        </View>
      </View>

      {/* Subject Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.subjectPerformance}</Text>
        <View style={styles.card}>
          <View style={styles.chartWrapper}>
            <PerformanceChart
              type="line"
              data={subjectPerformanceChartData}
              title={t.subjectVsClass}
              yAxisMin={yAxisMin}
              yAxisMax={yAxisMax}
            />
            <View style={styles.overlayChart}>
              <PerformanceChart
                type="line"
                data={classAverageData}
                overlay={true}
                yAxisMin={yAxisMin}
                yAxisMax={yAxisMax}
              />
            </View>
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(0, 122, 255, 0.8)' }]} />
              <Text style={styles.legendText}>{t.yourAverage}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(255, 149, 0, 0.8)' }]} />
              <Text style={styles.legendText}>{t.classAverage}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.bestSubject}:</Text>
              <Text style={styles.infoValue}>{analysis.bestSubject.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.class}:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.class}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t.teacher}:</Text>
              <Text style={styles.infoValue}>{mockStudentData.academicData.subjects.Mathematics.teacher}</Text>
            </View>
          </View>
          <ExpandableSection title="Performance Insights">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your overall performance compared to class average shows {
                  studentScores.reduce((a, b) => a + b, 0) / studentScores.length >
                  classAverages.reduce((a, b) => a + b, 0) / classAverages.length
                    ? 'you are performing above the class average.'
                    : 'there is room for improvement to reach class average.'
                }
              </Text>
              <Text style={styles.subheading}>Detailed Analysis:</Text>
              <Text style={styles.analysisText}>
                • In {analysis.bestSubject.name}, you are excelling with scores above class average
              </Text>
              <Text style={styles.analysisText}>
                • {analysis.worstSubject.name} requires additional focus to improve performance
              </Text>
              <Text style={styles.recommendationText}>
                Key Actions for Improvement:
              </Text>
              <View style={styles.actionsList}>
                <Text style={styles.actionItem}>• Schedule regular review sessions for each subject</Text>
                <Text style={styles.actionItem}>• Actively participate in class discussions and activities</Text>
                <Text style={styles.actionItem}>• Take detailed notes during lessons</Text>
                <Text style={styles.actionItem}>• Form study groups with classmates</Text>
                <Text style={styles.actionItem}>• Complete all homework assignments on time</Text>
                <Text style={styles.actionItem}>• Seek help from teachers when facing difficulties</Text>
              </View>
            </View>
          </ExpandableSection>
        </View>
      </View>

      {/* Student Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <View style={styles.card}>
          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Student ID:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Class:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.class}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>School:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.school}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Contact:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.contact.email}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    position: 'relative',
    height: 250,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 2,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  expandableSection: {
    marginTop: 16,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expandableTitle: {
    fontSize: 16,
    color: '#666',
  },
  expandableContent: {
    overflow: 'hidden',
  },
  attendanceContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  attendanceText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  attendanceHighlight: {
    color: '#34C759',
    fontWeight: '600',
  },
  attendanceSubtext: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
  },
  performanceText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 12,
  },
  analysisSection: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  analysisText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 12,
    marginBottom: 8,
  },
  recommendationsList: {
    paddingLeft: 4,
  },
  recommendationItem: {
    fontSize: 15,
    color: '#48484A',
    marginBottom: 6,
    lineHeight: 20,
  },
  infoGrid: {
    paddingVertical: 8,
  },
  analysisContent: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 8,
    lineHeight: 20,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  actionsList: {
    marginTop: 8,
    paddingBottom: 8,
  },
  actionItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    paddingLeft: 8,
    lineHeight: 18,
  },
  overlayChart: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  trend: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 12,
  },
  attendanceValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4CAF50',
    marginVertical: 8,
  },
});

export default StudentDashboard; 