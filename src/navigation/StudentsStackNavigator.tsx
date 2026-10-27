import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StudentsScreen } from '../screens/StudentsScreen';
import { StudentDetailScreen } from '../screens/StudentDetailScreen';
import type { StudentsStackParamList } from '../types';

const Stack = createNativeStackNavigator<StudentsStackParamList>();

export function StudentsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StudentsList" component={StudentsScreen} options={{ title: 'Estudiantes' }} />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetailScreen}
        options={{ title: 'Detalle del Estudiante' }}
      />
    </Stack.Navigator>
  );
}
