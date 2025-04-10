import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PerformanceChart } from '../components/PerformanceChart';
import { mockStudentData } from '../services/mockData';

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

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
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

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const contentHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.expandableSection}>
      <TouchableOpacity 
        style={styles.expandableHeader} 
        onPress={toggleExpand}
      >
        <Text style={styles.expandableTitle}>{title}</Text>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#666"
        />
      </TouchableOpacity>
      <Animated.View style={[styles.expandableContent, { maxHeight: contentHeight }]}>
        {children}
      </Animated.View>
    </View>
  );
};

const StudentDashboard: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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

  const subjectPerformanceChartData = {
    labels: Object.keys(subjects),
    datasets: [
      {
        data: subjectEntries.map(([_, subject]) => calculateSubjectAverage(subject.scores)),
        color: () => 'rgba(0, 122, 255, 0.8)',
      },
      {
        data: subjectEntries.map(([_, subject]) => calculateSubjectAverage(subject.classAverage)),
        color: () => 'rgba(142, 142, 147, 0.8)',
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
      'rgba(52, 199, 89, 1)',   // iOS green for Present
      'rgba(255, 59, 48, 1)',   // iOS red for Absent
      'rgba(255, 149, 0, 1)',   // iOS orange for Late
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
          <PerformanceChart
            type="line"
            data={subjectPerformanceChartData}
            title="Subject Performance"
          />
          <Text style={styles.trend}>
            Your performance is {analysis.trend}
          </Text>
          <ExpandableSection title="Detailed Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your strongest subject is {analysis.bestSubject.name} with an average of {analysis.bestSubject.average}%.
              </Text>
              <Text style={styles.analysisText}>
                Focus more attention on {analysis.worstSubject.name} where your average is {analysis.worstSubject.average}%.
              </Text>
              <Text style={styles.recommendationText}>
                Recommendations:
              </Text>
              <Text style={styles.bulletPoint}>• Schedule extra practice for {analysis.worstSubject.name}</Text>
              <Text style={styles.bulletPoint}>• Maintain your strong performance in {analysis.bestSubject.name}</Text>
              <Text style={styles.bulletPoint}>• Consider joining study groups for challenging subjects</Text>
            </View>
          </ExpandableSection>
        </View>
      </View>

      {/* Attendance Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Overview</Text>
        <View style={styles.card}>
          <PerformanceChart
            type="pie"
            data={attendanceChartData}
            title="Attendance Distribution"
          />
          <Text style={styles.attendanceText}>
            Present: <Text style={styles.attendanceHighlight}>{mockStudentData.attendance.present}%</Text>
          </Text>
          <Text style={styles.attendanceSubtext}>
            {mockStudentData.attendance.absent} days absent, {mockStudentData.attendance.late} days late
          </Text>
          <ExpandableSection title="Attendance Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your attendance rate is {
                  mockStudentData.attendance.present >= 95 
                    ? 'excellent' 
                    : mockStudentData.attendance.present >= 90 
                    ? 'good, but could be improved' 
                    : 'concerning and needs improvement'
                }
              </Text>
              <Text style={styles.recommendationText}>
                Recommendations:
              </Text>
              <Text style={styles.bulletPoint}>• Aim to arrive 10 minutes before class starts</Text>
              <Text style={styles.bulletPoint}>• Plan your morning routine to avoid delays</Text>
              <Text style={styles.bulletPoint}>• Keep track of your attendance patterns</Text>
            </View>
          </ExpandableSection>
        </View>
      </View>

      {/* Subject Performance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subject Performance</Text>
        <View style={styles.card}>
          <PerformanceChart
            type="bar"
            data={subjectPerformanceChartData}
            title="Subject vs Class Average"
          />
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(0, 122, 255, 0.8)' }]} />
              <Text style={styles.legendText}>Your Average</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: 'rgba(142, 142, 147, 0.8)' }]} />
              <Text style={styles.legendText}>Class Average</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>
              Best Subject: <Text style={styles.infoValue}>{analysis.bestSubject.name}</Text>
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Class:</Text>
              <Text style={styles.infoValue}>{mockStudentData.studentInfo.class}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Teacher:</Text>
              <Text style={styles.infoValue}>{mockStudentData.academicData.subjects.Mathematics.teacher}</Text>
            </View>
          </View>
          <ExpandableSection title="Performance Insights">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your overall performance is {analysis.trend}
              </Text>
              <Text style={styles.subheading}>Key Actions:</Text>
              <View style={styles.actionsList}>
                <Text style={styles.actionItem}>• Schedule regular review sessions</Text>
                <Text style={styles.actionItem}>• Participate actively in class discussions</Text>
                <Text style={styles.actionItem}>• Seek help early when facing difficulties</Text>
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
    backgroundColor: '#F2F2F7',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
    paddingLeft: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  trend: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  attendanceText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 8,
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
    fontSize: 15,
    color: '#48484A',
    marginBottom: 8,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  infoLabel: {
    fontSize: 15,
    color: '#666666',
    width: 100,
    fontWeight: '400',
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
  },
  analysisContent: {
    paddingTop: 12,
  },
  recommendationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#666',
    marginLeft: 12,
    marginBottom: 6,
    lineHeight: 22,
  },
  expandableSection: {
    marginTop: 10,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  expandableTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  expandableContent: {
    overflow: 'hidden',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
  },
  infoContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginTop: 12,
    marginBottom: 8,
  },
  actionsList: {
    paddingLeft: 4,
  },
  actionItem: {
    fontSize: 15,
    color: '#48484A',
    marginBottom: 6,
    lineHeight: 20,
  },
});

export default StudentDashboard; 