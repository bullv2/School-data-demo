export const mockStudentData = {
  studentInfo: {
    id: 'ST001',
    name: 'Chan Tai Man',
    class: '4A',
    school: 'Demo Secondary School',
    studentNumber: '2023001',
    dateOfBirth: '2010-05-15',
    gender: 'Male',
    profilePicture: 'https://i.pravatar.cc/300?img=12',
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
    profilePicture: 'https://i.pravatar.cc/300?img=32',
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
      type: 'academic',
      title: 'New Assignment Posted',
      message: 'Math homework due next Monday',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'behavior',
      title: 'Behavior Alert',
      message: 'Late to class 3 times this week',
      time: '1 day ago',
      read: true
    },
    {
      id: '3',
      type: 'academic',
      title: 'Test Results Available',
      message: 'Science test results are now available',
      time: '2 days ago',
      read: true
    }
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

// Student credentials for login
export const mockStudentCredentials = [
  { studentId: 'ST001', password: 'demo001' },
  { studentId: 'ST002', password: 'demo002' },
  { studentId: 'ST003', password: 'demo003' },
];

// Helper function to generate random scores
const generateRandomScores = (min: number, max: number, count: number): number[] => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Student profiles with randomized data
export const mockStudentProfiles = {
  ST001: {
    studentInfo: {
      id: 'ST001',
      name: 'Chan Tai Man',
      class: '4A',
      school: 'Demo Secondary School',
      studentNumber: '2023001',
      dateOfBirth: '2010-05-15',
      gender: 'Male',
      profilePicture: 'https://i.pravatar.cc/300?img=12',
      contact: {
        email: 'taiman@demo.edu.hk',
        phone: '+852 1234 5678'
      }
    },
    academicData: {
      currentTerm: 'Term 2',
      subjects: {
        Mathematics: {
          scores: generateRandomScores(75, 95, 4),
          teacher: 'Mr. Wong',
          classAverage: generateRandomScores(70, 85, 4),
          schoolAverage: generateRandomScores(65, 80, 4)
        },
        English: {
          scores: generateRandomScores(70, 90, 4),
          teacher: 'Ms. Lee',
          classAverage: generateRandomScores(65, 85, 4),
          schoolAverage: generateRandomScores(60, 80, 4)
        },
        Science: {
          scores: generateRandomScores(80, 95, 4),
          teacher: 'Mr. Chan',
          classAverage: generateRandomScores(75, 90, 4),
          schoolAverage: generateRandomScores(70, 85, 4)
        },
        Chinese: {
          scores: generateRandomScores(75, 90, 4),
          teacher: 'Ms. Cheung',
          classAverage: generateRandomScores(70, 85, 4),
          schoolAverage: generateRandomScores(65, 80, 4)
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
      late: 2
    }
  },
  ST002: {
    studentInfo: {
      id: 'ST002',
      name: 'Wong Siu Ming',
      class: '4B',
      school: 'Demo Secondary School',
      studentNumber: '2023002',
      dateOfBirth: '2010-08-22',
      gender: 'Female',
      profilePicture: 'https://i.pravatar.cc/300?img=13',
      contact: {
        email: 'siuming@demo.edu.hk',
        phone: '+852 2345 6789'
      }
    },
    academicData: {
      currentTerm: 'Term 2',
      subjects: {
        Mathematics: {
          scores: generateRandomScores(80, 98, 4),
          teacher: 'Mr. Wong',
          classAverage: generateRandomScores(70, 85, 4),
          schoolAverage: generateRandomScores(65, 80, 4)
        },
        English: {
          scores: generateRandomScores(85, 95, 4),
          teacher: 'Ms. Lee',
          classAverage: generateRandomScores(65, 85, 4),
          schoolAverage: generateRandomScores(60, 80, 4)
        },
        Science: {
          scores: generateRandomScores(75, 90, 4),
          teacher: 'Mr. Chan',
          classAverage: generateRandomScores(75, 90, 4),
          schoolAverage: generateRandomScores(70, 85, 4)
        },
        Chinese: {
          scores: generateRandomScores(90, 98, 4),
          teacher: 'Ms. Cheung',
          classAverage: generateRandomScores(70, 85, 4),
          schoolAverage: generateRandomScores(65, 80, 4)
        }
      },
      terms: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
      overallPerformance: {
        currentRank: 2,
        previousRank: 3,
        improvement: '+1',
        totalStudents: 40
      }
    },
    attendance: {
      present: 98,
      absent: 1,
      late: 1
    }
  },
  ST003: {
    studentInfo: {
      id: 'ST003',
      name: 'Lee Ka Ying',
      class: '4A',
      school: 'Demo Secondary School',
      studentNumber: '2023003',
      dateOfBirth: '2010-03-10',
      gender: 'Female',
      profilePicture: 'https://i.pravatar.cc/300?img=14',
      contact: {
        email: 'kaying@demo.edu.hk',
        phone: '+852 3456 7890'
      }
    },
    academicData: {
      currentTerm: 'Term 2',
      subjects: {
        Mathematics: {
          scores: generateRandomScores(70, 85, 4),
          teacher: 'Mr. Wong',
          classAverage: generateRandomScores(70, 85, 4),
          schoolAverage: generateRandomScores(65, 80, 4)
        },
        English: {
          scores: generateRandomScores(75, 90, 4),
          teacher: 'Ms. Lee',
          classAverage: generateRandomScores(65, 85, 4),
          schoolAverage: generateRandomScores(60, 80, 4)
        },
        Science: {
          scores: generateRandomScores(65, 80, 4),
          teacher: 'Mr. Chan',
          classAverage: generateRandomScores(75, 90, 4),
          schoolAverage: generateRandomScores(70, 85, 4)
        },
        Chinese: {
          scores: generateRandomScores(80, 95, 4),
          teacher: 'Ms. Cheung',
          classAverage: generateRandomScores(70, 85, 4),
          schoolAverage: generateRandomScores(65, 80, 4)
        }
      },
      terms: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
      overallPerformance: {
        currentRank: 15,
        previousRank: 18,
        improvement: '+3',
        totalStudents: 40
      }
    },
    attendance: {
      present: 92,
      absent: 5,
      late: 3
    }
  }
};

export const mockUserProfile = {
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
  academicData: {
    subjects: [
      {
        name: 'Mathematics',
        scores: [85, 88, 92, 90],
        average: 88.75,
        classAverage: 82,
      },
      {
        name: 'Science',
        scores: [90, 92, 88, 94],
        average: 91,
        classAverage: 84,
      },
      {
        name: 'English',
        scores: [87, 89, 91, 88],
        average: 88.75,
        classAverage: 83,
      },
      {
        name: 'History',
        scores: [92, 90, 88, 94],
        average: 91,
        classAverage: 85,
      },
    ],
    attendance: {
      present: 95,
      absent: 3,
      late: 2,
      total: 100,
    },
  },
  studentInfo: {
    className: '10-A',
    homeroom: 'Room 203',
    advisor: 'Mr. Anderson',
  },
}; 