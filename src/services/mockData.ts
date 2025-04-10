export const mockStudentData = {
  studentInfo: {
    id: 'ST001',
    name: 'Chan Tai Man',
    class: '4A',
    school: 'Demo Secondary School',
    studentNumber: '2023001',
    dateOfBirth: '2010-05-15',
    gender: 'Male',
    contact: {
      email: 'student@demo.edu.hk',
      phone: '+852 1234 5678'
    }
  },
  academicData: {
    currentTerm: 'Term 2',
    subjects: {
      Mathematics: {
        scores: [85, 88, 92, 87],
        teacher: 'Mr. Wong',
        classAverage: [82, 85, 88, 84],
        schoolAverage: [80, 82, 85, 82]
      },
      English: {
        scores: [78, 82, 80, 85],
        teacher: 'Ms. Lee',
        classAverage: [75, 78, 80, 78],
        schoolAverage: [73, 75, 78, 76]
      },
      Science: {
        scores: [90, 88, 92, 94],
        teacher: 'Mr. Chan',
        classAverage: [85, 87, 89, 88],
        schoolAverage: [83, 85, 87, 86]
      },
      Chinese: {
        scores: [88, 85, 89, 90],
        teacher: 'Ms. Cheung',
        classAverage: [84, 86, 88, 87],
        schoolAverage: [82, 84, 86, 85]
      }
    },
    terms: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
    overallPerformance: {
      currentRank: 5,
      previousRank: 7,
      improvement: '+2',
      totalStudents: 40
    }
  },
  attendance: {
    present: 95,
    absent: 3,
    late: 2,
    details: [
      { date: '2024-01-15', status: 'Present', time: '08:00' },
      { date: '2024-01-16', status: 'Late', time: '08:15' },
      { date: '2024-01-17', status: 'Present', time: '07:55' },
      { date: '2024-01-18', status: 'Absent', reason: 'Sick Leave' },
      { date: '2024-01-19', status: 'Present', time: '08:00' }
    ]
  },
  extracurricular: {
    activities: [
      {
        name: 'Basketball Team',
        role: 'Team Member',
        schedule: 'Monday, Wednesday 16:00-18:00',
        achievements: ['Inter-school Competition 2nd Place']
      },
      {
        name: 'Science Club',
        role: 'Member',
        schedule: 'Friday 15:00-17:00',
        achievements: ['Science Fair Participation']
      }
    ]
  },
  behavior: {
    awards: [
      { name: 'Best Progress Award', date: '2023-12-15' },
      { name: 'Perfect Attendance', date: '2023-06-30' }
    ],
    incidents: [
      { type: 'Positive', description: 'Helped classmates with homework', date: '2024-01-10' },
      { type: 'Positive', description: 'Excellent class participation', date: '2024-01-05' }
    ]
  }
};

export const mockSchoolData = {
  schoolInfo: {
    id: 'SCH001',
    name: 'Demo Secondary School',
    address: '123 Education Road, Hong Kong',
    principal: 'Dr. Lee',
    contact: {
      phone: '+852 2345 6789',
      email: 'info@demo.edu.hk',
      website: 'www.demo.edu.hk'
    }
  },
  statistics: {
    totalStudents: 1200,
    totalClasses: 30,
    averageClassSize: 40,
    teacherStudentRatio: '1:20',
    facilities: [
      'Science Laboratories',
      'Computer Rooms',
      'Library',
      'Sports Hall',
      'Swimming Pool'
    ]
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
    },
    universityAcceptance: {
      local: 85,
      overseas: 15,
      topChoices: ['HKU', 'CUHK', 'HKUST']
    }
  },
  events: [
    {
      title: 'Annual Sports Day',
      date: '2024-03-15',
      location: 'School Sports Ground',
      description: 'Annual inter-class sports competition'
    },
    {
      title: 'Science Fair',
      date: '2024-04-20',
      location: 'School Hall',
      description: 'Student science projects exhibition'
    }
  ]
};

export const mockParentData = {
  parentInfo: {
    id: 'P001',
    name: 'Chan Siu Ming',
    relationship: 'Father',
    contact: {
      phone: '+852 9876 5432',
      email: 'parent@example.com'
    },
    children: [
      {
        id: 'ST001',
        name: 'Chan Tai Man',
        class: '4A'
      }
    ]
  },
  notifications: [
    {
      id: '1',
      type: 'Academic',
      title: 'Math Test Results Available',
      date: '2024-03-15',
      read: false,
    },
    {
      id: '2',
      type: 'Event',
      title: 'Parent-Teacher Conference Scheduled',
      date: '2024-03-14',
      read: true,
    },
    {
      id: '3',
      type: 'Academic',
      title: 'Science Project Due Date Reminder',
      date: '2024-03-13',
      read: false,
    },
  ],
  messages: [
    {
      id: '1',
      from: 'Mrs. Johnson',
      subject: 'Class Field Trip',
      date: '2024-03-15',
      content: 'Dear Parents, we are planning a field trip to the Science Museum next week. Please review the attached permission slip and return it by Friday.',
    },
    {
      id: '2',
      from: 'School Administration',
      subject: 'School Closure Notice',
      date: '2024-03-14',
      content: 'Due to inclement weather, the school will be closed tomorrow. All classes will resume on Monday.',
    },
  ]
}; 