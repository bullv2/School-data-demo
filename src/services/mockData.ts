export const mockStudentData = {
  studentInfo: {
    id: 'ST001',
    name: 'Chan Tai Man',
    class: '4A',
    school: 'Demo Secondary School'
  },
  academicData: {
    subjects: {
      Mathematics: [85, 88, 92, 87],
      English: [78, 82, 80, 85],
      Science: [90, 88, 92, 94],
      Chinese: [88, 85, 89, 90]
    },
    terms: ['Term 1', 'Term 2', 'Term 3', 'Term 4']
  },
  attendance: {
    present: 95,
    absent: 3,
    late: 2
  },
  comparativeData: {
    Mathematics: {
      studentScore: 88,
      classAverage: 82,
      schoolAverage: 80
    },
    English: {
      studentScore: 85,
      classAverage: 80,
      schoolAverage: 78
    },
    Science: {
      studentScore: 92,
      classAverage: 85,
      schoolAverage: 83
    },
    Chinese: {
      studentScore: 89,
      classAverage: 84,
      schoolAverage: 82
    }
  }
};

export const mockSchoolData = {
  schoolInfo: {
    id: 'SCH001',
    name: 'Demo Secondary School',
    totalStudents: 1200,
    totalClasses: 30
  },
  performanceData: {
    overallAttendance: 96,
    averageScores: {
      Mathematics: 82,
      English: 80,
      Science: 85,
      Chinese: 84
    },
    yearlyProgress: {
      '2023': {
        Mathematics: [80, 82, 83, 82],
        English: [78, 79, 80, 80],
        Science: [83, 84, 85, 85],
        Chinese: [82, 83, 84, 84]
      }
    }
  }
}; 