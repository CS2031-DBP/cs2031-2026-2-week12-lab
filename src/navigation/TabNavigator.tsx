import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { CoursesStackNavigator } from './CoursesStackNavigator';
import { StudentsStackNavigator } from './StudentsStackNavigator';
import type { TabNavigatorParamList } from '../types';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof TabNavigatorParamList, string> = {
            Home: 'home',
            Courses: 'book',
            Students: 'people',
          };
          return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
        },
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Courses" component={CoursesStackNavigator} options={{ title: 'Cursos', headerShown: false }} />
      <Tab.Screen name="Students" component={StudentsStackNavigator} options={{ title: 'Estudiantes', headerShown: false }} />
    </Tab.Navigator>
  );
}
