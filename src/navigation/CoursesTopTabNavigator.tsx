import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllCoursesTab } from '../screens/AllCoursesTab';
import { MyCoursesTab } from '../screens/MyCoursesTab';
import type { CoursesTopTabParamList } from '../types';

const Tab = createMaterialTopTabNavigator<CoursesTopTabParamList>();

export function CoursesTopTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen name="All" component={AllCoursesTab} options={{ title: 'Todos los Cursos' }} />
      <Tab.Screen name="Mine" component={MyCoursesTab} options={{ title: 'Mis Cursos' }} />
    </Tab.Navigator>
  );
}
