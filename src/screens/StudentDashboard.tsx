import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { PerformanceChart } from '../components/PerformanceChart';
import { mockStudentProfiles } from '../services/mockData';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

interface SubjectData {
  scores: number[];
  teacher: string;
  classAverage: number[];
  schoolAverage: number[];
}

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
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

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.expandableSection}>
      <TouchableOpacity
        style={styles.expandableHeader}
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.expandableTitle}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#666666"
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.expandableContent,
          { maxHeight: heightInterpolate },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const StudentDashboard: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MainTabs'>>();
  const studentId = route.params?.studentId || 'ST001';
  const studentData = mockStudentProfiles[studentId as keyof typeof mockStudentProfiles];

  const calculateTrend = (scores: number[]) => {
    const lastTwo = scores.slice(-2);
    const diff = lastTwo[1] - lastTwo[0];
    return {
      trend: diff > 0 ? 'improving' : diff < 0 ? 'declining' : 'stable',
      percentage: Math.abs((diff / lastTwo[0]) * 100).toFixed(1),
    };
  };

  const getSubjectRecommendations = (subject: SubjectData) => {
    const latestScore = subject.scores[subject.scores.length - 1];
    const latestClassAvg = subject.classAverage[subject.classAverage.length - 1];
    
    if (latestScore >= latestClassAvg + 10) {
      return "Excellent performance! Consider participating in advanced programs or competitions.";
    } else if (latestScore >= latestClassAvg) {
      return "Good progress. Focus on maintaining consistency and tackling more challenging problems.";
    } else {
      return "Consider scheduling additional consultation with the teacher and focusing on fundamentals.";
    }
  };
  
  const academicProgressData = {
    labels: studentData.academicData.terms,
    datasets: [
      {
        data: studentData.academicData.subjects.Mathematics.scores,
        color: () => '#0a84ff',
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{
      data: [
        studentData.attendance.present,
        studentData.attendance.absent,
        studentData.attendance.late,
      ],
    }],
    legend: ['Present', 'Absent', 'Late'],
  };

  const subjectComparisonData = {
    labels: Object.keys(studentData.academicData.subjects),
    datasets: [
      {
        data: Object.values(studentData.academicData.subjects).map(
          (subject: SubjectData) => subject.scores[subject.scores.length - 1]
        ),
        color: () => '#0a84ff',
      },
    ],
  };

  const mathTrend = calculateTrend(studentData.academicData.subjects.Mathematics.scores);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>
            {studentData.studentInfo.name} - {studentData.studentInfo.class}
          </Text>
        </View>

        <View style={styles.section}>
          <PerformanceChart
            type="line"
            data={academicProgressData}
            title="Academic Progress"
          />
          <ExpandableSection title="Detailed Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Your Mathematics performance is {mathTrend.trend} by {mathTrend.percentage}% compared to last term.
              </Text>
              <Text style={styles.recommendationText}>
                {getSubjectRecommendations(studentData.academicData.subjects.Mathematics)}
              </Text>
            </View>
          </ExpandableSection>
        </View>

        <View style={styles.section}>
          <PerformanceChart
            type="pie"
            data={attendanceData}
            title="Attendance Overview"
          />
          <ExpandableSection title="Detailed Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Attendance Rate: {((studentData.attendance.present / (studentData.attendance.present + studentData.attendance.absent + studentData.attendance.late)) * 100).toFixed(1)}%
              </Text>
              <Text style={styles.recommendationText}>
                {studentData.attendance.late > 2 
                  ? "Consider leaving earlier to avoid being late to classes."
                  : "Great job maintaining good attendance!"}
              </Text>
            </View>
          </ExpandableSection>
        </View>

        <View style={styles.section}>
          <PerformanceChart
            type="line"
            data={subjectComparisonData}
            title="Subject Comparison"
          />
          <ExpandableSection title="Detailed Analysis">
            <View style={styles.analysisContent}>
              <Text style={styles.analysisText}>
                Strongest subject: {Object.entries(studentData.academicData.subjects).reduce((a, b) => 
                  a[1].scores[a[1].scores.length - 1] > b[1].scores[b[1].scores.length - 1] ? a : b
                )[0]}
              </Text>
              <Text style={styles.recommendationText}>
                Focus on maintaining excellence in strong subjects while allocating more study time to subjects with lower scores.
              </Text>
            </View>
          </ExpandableSection>
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
  expandableSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  expandableTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c1c1e',
  },
  expandableContent: {
    overflow: 'hidden',
  },
  analysisContent: {
    padding: 16,
    paddingTop: 0,
  },
  analysisText: {
    fontSize: 15,
    color: '#1c1c1e',
    marginBottom: 8,
    lineHeight: 20,
  },
  recommendationText: {
    fontSize: 15,
    color: '#666666',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default StudentDashboard; 