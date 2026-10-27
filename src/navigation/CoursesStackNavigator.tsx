import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CoursesTopTabNavigator } from './CoursesTopTabNavigator';
import { CourseDetailScreen } from '../screens/CourseDetailScreen';
import type { CoursesStackParamList } from '../types';

const Stack = createNativeStackNavigator<CoursesStackParamList>();

export function CoursesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CoursesList" component={CoursesTopTabNavigator} options={{ title: 'Cursos' }} />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{ title: 'Detalle del Curso' }}
      />
    </Stack.Navigator>
  );
}
