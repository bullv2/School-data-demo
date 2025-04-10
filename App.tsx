import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import StudentDashboard from './src/screens/StudentDashboard';
import MaterialsScreen from './src/screens/MaterialsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { CustomHeader } from './src/components/CustomHeader';
import { RootStackParamList, MainTabParamList, NotificationPosition } from './src/navigation/types';
import { mockStudentData } from './src/services/mockData';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

type MainTabsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
  route: {
    params: {
      studentId: string;
    };
  };
};

const MainTabs = ({ navigation, route }: MainTabsScreenProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationPosition, setNotificationPosition] = useState<NotificationPosition | null>(null);
  const notificationButtonRef = useRef<View>(null);

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleToggleNotifications = () => {
    if (notificationButtonRef.current) {
      notificationButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setNotificationPosition({
          x: pageX,
          y: pageY,
          width,
          height
        });
        setShowNotifications(!showNotifications);
      });
    } else {
      setShowNotifications(!showNotifications);
    }
  };

  const studentId = route.params.studentId || mockStudentData.studentInfo.id;

  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F7' }}>
      <View style={{ 
        zIndex: 2, 
        elevation: 2,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
      }}>
        <CustomHeader
          onLogout={handleLogout}
          studentName={mockStudentData.studentInfo.name}
          showNotifications={showNotifications}
          onToggleNotifications={handleToggleNotifications}
          notificationButtonRef={notificationButtonRef}
          notificationPosition={notificationPosition}
        />
      </View>
      <View style={{ flex: 1, zIndex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap = 'home';

              switch (route.name) {
                case 'Dashboard':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Materials':
                  iconName = focused ? 'book' : 'book-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                case 'Settings':
                  iconName = focused ? 'settings' : 'settings-outline';
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E5E5EA',
              paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={StudentDashboard}
            initialParams={{ 
              studentId,
              showNotifications,
              notificationPosition 
            }}
          />
          <Tab.Screen 
            name="Materials" 
            component={MaterialsScreen}
            initialParams={{ 
              studentId,
              showNotifications,
              notificationPosition 
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            initialParams={{ 
              studentId,
              showNotifications,
              notificationPosition 
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            initialParams={{ 
              studentId,
              showNotifications,
              notificationPosition 
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: {
              backgroundColor: '#F2F2F7',
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 