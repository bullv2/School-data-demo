export type RootStackParamList = {
  Login: undefined;
  MainTabs: {
    studentId: string;
  };
};

export type NotificationPosition = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type MainTabParamList = {
  Dashboard: {
    studentId: string;
    showNotifications?: boolean;
    notificationPosition?: NotificationPosition;
  };
  Materials: {
    studentId: string;
    showNotifications?: boolean;
    notificationPosition?: NotificationPosition;
  };
  Profile: {
    studentId: string;
    showNotifications?: boolean;
    notificationPosition?: NotificationPosition;
  };
  Settings: {
    studentId: string;
    showNotifications?: boolean;
    notificationPosition?: NotificationPosition;
  };
}; 