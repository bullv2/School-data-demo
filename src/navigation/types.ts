export type RootStackParamList = {
  Login: undefined;
  MainTabs: {
    studentId: string;
  };
};

export type MainTabParamList = {
  Dashboard: {
    studentId: string;
  };
  Materials: {
    studentId: string;
  };
  Profile: {
    studentId: string;
  };
  Settings: {
    studentId: string;
  };
}; 