import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { CoursesStackNavigator } from './CoursesStackNavigator';
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
            // TODO (Paso 1 - Tu turno): agrega un ícono para Students (ej. 'people')
          };
          return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
        },
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Courses" component={CoursesStackNavigator} options={{ title: 'Cursos', headerShown: false }} />
      {/* TODO (Paso 1 - Tu turno): agrega una tercera pestaña "Students"
          1. Actualiza TabNavigatorParamList en src/types/index.ts para incluir Students: undefined
          2. Crea src/screens/StudentsScreen.tsx (sigue el patrón de HomeScreen)
          3. Importa StudentsScreen aquí y añade <Tab.Screen name="Students" .../> */}
    </Tab.Navigator>
  );
}
