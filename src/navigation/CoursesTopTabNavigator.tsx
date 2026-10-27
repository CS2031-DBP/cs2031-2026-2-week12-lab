import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllCoursesTab } from '../screens/AllCoursesTab';
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
      {/* TODO (Paso 3 - Tu turno): agrega un segundo <Tab.Screen> "Mine"
          usando un componente MyCoursesTab (créalo en src/screens/) que
          llame a getStudentCourses(1) en vez de getCourses(). Si no hay
          cursos, muestra "No tienes cursos matriculados". */}
    </Tab.Navigator>
  );
}
