export type RootStackParamList = {
  Login: undefined;
  MainTabs: {
    studentId: string;
  };
};

export type MainTabParamList = {
  Dashboard: {
    studentId: string;
    showNotifications?: boolean;
  };
  Materials: {
    studentId: string;
    showNotifications?: boolean;
  };
  Profile: {
    studentId: string;
    showNotifications?: boolean;
  };
  Settings: {
    studentId: string;
  };
}; 