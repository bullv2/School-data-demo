import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StudentDashboard from './src/screens/StudentDashboard';
import { translations } from './src/i18n/translations';

const Stack = createNativeStackNavigator();

export default function App() {
  // Using English for demo
  const t = translations.en;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="StudentDashboard" 
            component={StudentDashboard}
            options={{
              title: t.dashboard.title,
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerTintColor: '#000000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 