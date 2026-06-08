# Lab 12 — Navegación en React Native (CS2031 DBP 2026-1)

## 📱 ¿Qué vamos a construir?

En este laboratorio crearemos **UTEC Mobile**, una aplicación de portales estudiantil que demuestra los cuatro navegadores principales de React Navigation en una progresión natural:

- **Drawer Navigator** → Menú deslizable desde la izquierda con Perfil y Configuración
- **Bottom Tabs Navigator** → Navegación principal (Inicio, Cursos, Estudiantes)
- **Native Stack Navigator** → Navegación en pila dentro de la pestaña de Cursos
- **Material Top Tabs Navigator** → Pestañas deslizables horizontales (Todos los cursos / Mis cursos)

**Stack de tecnologías:**
- React Native + Expo (framework simplificado)
- React Navigation v6
- React Native Paper (componentes Material Design)
- Axios (para llamadas API)
- TypeScript

---

## 🎯 Prerrequisitos

Antes de empezar, asegúrate de tener instalado:

- **Node.js 20+** → verifica con `node --version`
- **Expo Go app** instalada en tu teléfono (iOS o Android)
  - O un emulador Android/iOS corriendo en tu máquina
- **Git** instalado
- El **backend de la semana 11** corriendo: clon [este repo](https://github.com/CS2031-DBP/cs2031-2026-1-week11-backend) y ejecuta:
  ```bash
  ./mvnw spring-boot:run
  ```
  Verifica que `GET http://localhost:8080/student` devuelve datos

---

## 📋 Pasos del Lab

### Paso 0 — Crear el proyecto Expo

1. Abre la terminal en la ubicación donde quieres crear el proyecto:
   ```bash
   npx create-expo-app@latest --template blank-typescript utec-mobile
   cd utec-mobile
   ```

2. Abre el proyecto en VS Code:
   ```bash
   code .
   ```

3. Instala las dependencias principales:
   ```bash
   npm install @react-navigation/native
   npx expo install react-native-screens react-native-safe-area-context
   ```

4. Abre `App.tsx` y reemplaza todo con:
   ```tsx
   import { NavigationContainer } from '@react-navigation/native';
   import { Text, View } from 'react-native';

   export default function App() {
     return (
       <NavigationContainer>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
           <Text>¡UTEC Mobile está listo! 🚀</Text>
         </View>
       </NavigationContainer>
     );
   }
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   npx expo start
   ```

6. **Verifica:**
   - En tu teléfono con Expo Go, escanea el código QR
   - O en tu emulador, presiona `a` (Android) o `i` (iOS)
   - Deberías ver el mensaje "¡UTEC Mobile está listo!"

---

### Paso 1 — Bottom Tabs Navigator (Inicio, Cursos, Estudiantes)

El Bottom Tabs Navigator muestra pestañas en la parte inferior de la pantalla.

1. Instala la dependencia:
   ```bash
   npm install @react-navigation/bottom-tabs
   ```

2. Crea las carpetas:
   ```bash
   mkdir -p src/screens src/navigation src/types src/services
   ```

3. En `src/types/index.ts`, define los tipos de navegación:
   ```ts
   export interface Course {
     id: number;
     name: string;
     description: string;
     credits: number;
   }

   export interface Student {
     id: number;
     firstname: string;
     lastname: string;
     email: string;
     phone: string;
     age: number;
     description: string;
   }

   export type TabNavigatorParamList = {
     Home: undefined;
     Courses: undefined;
     Students: undefined;
   };
   ```

4. En `src/screens/HomeScreen.tsx`:
   ```tsx
   import { View, Text, StyleSheet } from 'react-native';

   export function HomeScreen() {
     return (
       <View style={styles.container}>
         <Text style={styles.title}>🏠 Inicio</Text>
         <Text style={styles.subtitle}>Bienvenido a UTEC Mobile</Text>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
     title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
     subtitle: { fontSize: 16, color: '#666' },
   });
   ```

5. En `src/screens/CoursesScreen.tsx`:
   ```tsx
   import { View, Text, StyleSheet } from 'react-native';

   export function CoursesScreen() {
     return (
       <View style={styles.container}>
         <Text style={styles.title}>📚 Cursos</Text>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
     title: { fontSize: 24, fontWeight: 'bold' },
   });
   ```

6. En `src/screens/StudentsScreen.tsx`:
   ```tsx
   import { View, Text, StyleSheet } from 'react-native';

   export function StudentsScreen() {
     return (
       <View style={styles.container}>
         <Text style={styles.title}>👥 Estudiantes</Text>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
     title: { fontSize: 24, fontWeight: 'bold' },
   });
   ```

7. En `src/navigation/TabNavigator.tsx`:
   ```tsx
   import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
   import { Ionicons } from '@expo/vector-icons';
   import { HomeScreen } from '../screens/HomeScreen';
   import { CoursesScreen } from '../screens/CoursesScreen';
   import { StudentsScreen } from '../screens/StudentsScreen';
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
         <Tab.Screen name="Courses" component={CoursesScreen} options={{ title: 'Cursos' }} />
         <Tab.Screen name="Students" component={StudentsScreen} options={{ title: 'Estudiantes' }} />
       </Tab.Navigator>
     );
   }
   ```

8. Actualiza `App.tsx`:
   ```tsx
   import { NavigationContainer } from '@react-navigation/native';
   import { TabNavigator } from './src/navigation/TabNavigator';

   export default function App() {
     return (
       <NavigationContainer>
         <TabNavigator />
       </NavigationContainer>
     );
   }
   ```

9. **Verifica:** Abre la app y deberías ver 3 pestañas en la parte inferior. Puedes presionar cada una.

---

### Paso 2 — Native Stack Navigator (Detalle de curso)

El Native Stack Navigator permite navegar entre pantallas en una pila (push/pop).

1. Instala la dependencia:
   ```bash
   npm install @react-navigation/native-stack
   ```

2. Actualiza `src/types/index.ts`:
   ```ts
   export type CoursesStackParamList = {
     CoursesList: undefined;
     CourseDetail: { courseId: number };
   };
   ```

3. En `src/services/api.ts` (crea el archivo):
   ```ts
   import axios from 'axios';
   import type { Course, Student } from '../types';

   const API_URL = 'http://localhost:8080'; // Ajusta según tu entorno

   const api = axios.create({ baseURL: API_URL });

   export const getCourses = () => api.get<Course[]>('/course').then(r => r.data);
   export const getCourse = (id: number) => api.get<Course>(`/course/${id}`).then(r => r.data);
   export const getStudents = () => api.get<Student[]>('/student').then(r => r.data);
   export const getStudentCourses = (studentId: number) =>
     api.get<Course[]>(`/student/${studentId}/courses`).then(r => r.data);
   ```

4. Instala axios:
   ```bash
   npm install axios
   ```

5. En `src/screens/CourseDetailScreen.tsx`:
   ```tsx
   import { useState, useEffect } from 'react';
   import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
   import type { NativeStackScreenProps } from '@react-navigation/native-stack';
   import type { Course, CoursesStackParamList } from '../types';
   import { getCourse } from '../services/api';

   type Props = NativeStackScreenProps<CoursesStackParamList, 'CourseDetail'>;

   export function CourseDetailScreen({ route }: Props) {
     const [course, setCourse] = useState<Course | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       getCourse(route.params.courseId)
         .then(setCourse)
         .finally(() => setLoading(false));
     }, [route.params.courseId]);

     if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
     if (!course) return <Text>Curso no encontrado</Text>;

     return (
       <ScrollView style={styles.container}>
         <Text style={styles.title}>{course.name}</Text>
         <Text style={styles.label}>Descripción:</Text>
         <Text style={styles.text}>{course.description}</Text>
         <Text style={styles.label}>Créditos:</Text>
         <Text style={styles.text}>{course.credits}</Text>
       </ScrollView>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, padding: 16 },
     title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
     label: { fontSize: 14, fontWeight: '600', marginTop: 12, color: '#333' },
     text: { fontSize: 16, marginTop: 4, color: '#666' },
   });
   ```

6. En `src/screens/CoursesScreen.tsx`, reemplaza con:
   ```tsx
   import { useState, useEffect } from 'react';
   import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
   import type { NativeStackScreenProps } from '@react-navigation/native-stack';
   import type { Course, CoursesStackParamList } from '../types';
   import { getCourses } from '../services/api';

   type Props = NativeStackScreenProps<CoursesStackParamList, 'CoursesList'>;

   export function CoursesScreen({ navigation }: Props) {
     const [courses, setCourses] = useState<Course[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       getCourses()
         .then(setCourses)
         .finally(() => setLoading(false));
     }, []);

     if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

     return (
       <FlatList
         data={courses}
         keyExtractor={item => String(item.id)}
         renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.item}
             onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
           >
             <Text style={styles.itemTitle}>{item.name}</Text>
             <Text style={styles.itemSubtitle}>{item.credits} créditos</Text>
           </TouchableOpacity>
         )}
         contentContainerStyle={styles.list}
       />
     );
   }

   const styles = StyleSheet.create({
     list: { padding: 16 },
     item: {
       backgroundColor: '#f0f0f0',
       padding: 16,
       marginBottom: 12,
       borderRadius: 8,
     },
     itemTitle: { fontSize: 16, fontWeight: '600' },
     itemSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
   });
   ```

7. En `src/navigation/TabNavigator.tsx`, reemplaza la línea `<Tab.Screen name="Courses" ...` con:
   ```tsx
   <Tab.Screen
     name="Courses"
     component={CoursesStackNavigator}
     options={{ title: 'Cursos' }}
   />
   ```
   Y añade al inicio del archivo:
   ```tsx
   import { CoursesStackNavigator } from './CoursesStackNavigator';
   ```

8. En `src/navigation/CoursesStackNavigator.tsx` (crea el archivo):
   ```tsx
   import { createNativeStackNavigator } from '@react-navigation/native-stack';
   import { CoursesScreen } from '../screens/CoursesScreen';
   import { CourseDetailScreen } from '../screens/CourseDetailScreen';
   import type { CoursesStackParamList } from '../types';

   const Stack = createNativeStackNavigator<CoursesStackParamList>();

   export function CoursesStackNavigator() {
     return (
       <Stack.Navigator>
         <Stack.Screen name="CoursesList" component={CoursesScreen} options={{ title: 'Cursos' }} />
         <Stack.Screen
           name="CourseDetail"
           component={CourseDetailScreen}
           options={{ title: 'Detalle del Curso' }}
         />
       </Stack.Navigator>
     );
   }
   ```

9. **Verifica:** Presiona la pestaña de Cursos. Deberías ver una lista de cursos. Al presionar uno, aparece la pantalla de detalle.

---

### Paso 3 — Material Top Tabs Navigator (Todos / Mis Cursos)

Las Material Top Tabs permiten deslizar horizontalmente para cambiar entre vistas.

1. Instala las dependencias:
   ```bash
   npm install @react-navigation/material-top-tabs react-native-tab-view
   npx expo install react-native-pager-view
   ```

2. En `src/screens/AllCoursesTab.tsx`:
   ```tsx
   import { useState, useEffect } from 'react';
   import { FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
   import type { NativeStackScreenProps } from '@react-navigation/native-stack';
   import type { Course, CoursesStackParamList } from '../types';
   import { getCourses } from '../services/api';

   type Props = NativeStackScreenProps<CoursesStackParamList, 'CoursesList'>;

   export function AllCoursesTab({ navigation }: Props) {
     const [courses, setCourses] = useState<Course[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       getCourses()
         .then(setCourses)
         .finally(() => setLoading(false));
     }, []);

     if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

     return (
       <FlatList
         data={courses}
         keyExtractor={item => String(item.id)}
         renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.item}
             onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
           >
             <Text style={styles.itemTitle}>{item.name}</Text>
             <Text style={styles.itemSubtitle}>{item.credits} créditos</Text>
           </TouchableOpacity>
         )}
         contentContainerStyle={styles.list}
       />
     );
   }

   const styles = StyleSheet.create({
     list: { padding: 16 },
     item: {
       backgroundColor: '#f0f0f0',
       padding: 16,
       marginBottom: 12,
       borderRadius: 8,
     },
     itemTitle: { fontSize: 16, fontWeight: '600' },
     itemSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
   });
   ```

3. En `src/screens/MyCoursesTab.tsx`:
   ```tsx
   import { useState, useEffect } from 'react';
   import { FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
   import type { NativeStackScreenProps } from '@react-navigation/native-stack';
   import type { Course, CoursesStackParamList } from '../types';
   import { getStudentCourses } from '../services/api';

   type Props = NativeStackScreenProps<CoursesStackParamList, 'CoursesList'>;

   export function MyCoursesTab({ navigation }: Props) {
     const [courses, setCourses] = useState<Course[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       // Usamos estudiante 1 como ejemplo (Ana García)
       getStudentCourses(1)
         .then(setCourses)
         .finally(() => setLoading(false));
     }, []);

     if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

     if (courses.length === 0) {
       return (
         <Text style={styles.empty}>No tienes cursos matriculados</Text>
       );
     }

     return (
       <FlatList
         data={courses}
         keyExtractor={item => String(item.id)}
         renderItem={({ item }) => (
           <TouchableOpacity
             style={styles.item}
             onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
           >
             <Text style={styles.itemTitle}>{item.name}</Text>
             <Text style={styles.itemSubtitle}>{item.credits} créditos</Text>
           </TouchableOpacity>
         )}
         contentContainerStyle={styles.list}
       />
     );
   }

   const styles = StyleSheet.create({
     list: { padding: 16 },
     item: {
       backgroundColor: '#f0f0f0',
       padding: 16,
       marginBottom: 12,
       borderRadius: 8,
     },
     itemTitle: { fontSize: 16, fontWeight: '600' },
     itemSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
     empty: { flex: 1, textAlign: 'center', marginTop: 20, color: '#999' },
   });
   ```

4. En `src/navigation/CoursesTopTabNavigator.tsx` (crea el archivo):
   ```tsx
   import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
   import { AllCoursesTab } from '../screens/AllCoursesTab';
   import { MyCoursesTab } from '../screens/MyCoursesTab';

   const Tab = createMaterialTopTabNavigator();

   export function CoursesTopTabNavigator() {
     return (
       <Tab.Navigator
         screenOptions={{
           tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
           tabBarActiveTintColor: '#007AFF',
           tabBarInactiveTintColor: '#999',
         }}
       >
         <Tab.Screen
           name="All"
           component={AllCoursesTab}
           options={{ title: 'Todos los Cursos' }}
         />
         <Tab.Screen
           name="MyCourses"
           component={MyCoursesTab}
           options={{ title: 'Mis Cursos' }}
         />
       </Tab.Navigator>
     );
   }
   ```

5. En `src/navigation/CoursesStackNavigator.tsx`, reemplaza:
   ```tsx
   <Stack.Screen name="CoursesList" component={CoursesScreen} options={{ title: 'Cursos' }} />
   ```
   Con:
   ```tsx
   <Stack.Screen name="CoursesList" component={CoursesTopTabNavigator} options={{ title: 'Cursos' }} />
   ```
   Y añade al inicio:
   ```tsx
   import { CoursesTopTabNavigator } from './CoursesTopTabNavigator';
   ```

6. **Verifica:** Presiona la pestaña de Cursos. Deberías ver dos pestañas en la parte superior: "Todos los Cursos" y "Mis Cursos". Puedes deslizar horizontalmente o presionar cada una.

---

### Paso 4 — Drawer Navigator (Perfil y Configuración)

El Drawer Navigator proporciona un menú deslizable desde el borde izquierdo.

1. Instala las dependencias:
   ```bash
   npm install @react-navigation/drawer
   npx expo install react-native-gesture-handler react-native-reanimated
   ```

2. Crea `gesture-handler.native.js` en la raíz:
   ```js
   import 'react-native-gesture-handler';
   ```

3. Crea `gesture-handler.js` en la raíz:
   ```js
   // Solo para web
   ```

4. Actualiza `App.tsx` para importar gesture-handler al inicio:
   ```tsx
   import 'react-native-gesture-handler';
   import { NavigationContainer } from '@react-navigation/native';
   import { DrawerNavigator } from './src/navigation/DrawerNavigator';

   export default function App() {
     return (
       <NavigationContainer>
         <DrawerNavigator />
       </NavigationContainer>
     );
   }
   ```

5. En `src/screens/ProfileScreen.tsx`:
   ```tsx
   import { View, Text, StyleSheet } from 'react-native';

   export function ProfileScreen() {
     return (
       <View style={styles.container}>
         <Text style={styles.title}>👤 Mi Perfil</Text>
         <View style={styles.card}>
           <Text style={styles.label}>Nombre:</Text>
           <Text style={styles.value}>Ana García</Text>
         </View>
         <View style={styles.card}>
           <Text style={styles.label}>Email:</Text>
           <Text style={styles.value}>ana.garcia@utec.edu.pe</Text>
         </View>
         <View style={styles.card}>
           <Text style={styles.label}>Edad:</Text>
           <Text style={styles.value}>20 años</Text>
         </View>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, padding: 16 },
     title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, marginTop: 16 },
     card: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginBottom: 12 },
     label: { fontSize: 12, fontWeight: '600', color: '#666' },
     value: { fontSize: 16, marginTop: 4 },
   });
   ```

6. En `src/screens/SettingsScreen.tsx`:
   ```tsx
   import { View, Text, StyleSheet, Switch, useState } from 'react-native';

   export function SettingsScreen() {
     const [notificaciones, setNotificaciones] = useState(true);

     return (
       <View style={styles.container}>
         <Text style={styles.title}>⚙️ Configuración</Text>
         <View style={styles.setting}>
           <Text style={styles.label}>Notificaciones</Text>
           <Switch value={notificaciones} onValueChange={setNotificaciones} />
         </View>
         <View style={styles.setting}>
           <Text style={styles.label}>Modo Oscuro</Text>
           <Switch value={false} />
         </View>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, padding: 16 },
     title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, marginTop: 16 },
     setting: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       paddingVertical: 12,
       borderBottomWidth: 1,
       borderBottomColor: '#eee',
     },
     label: { fontSize: 16 },
   });
   ```

7. En `src/navigation/DrawerNavigator.tsx` (crea el archivo):
   ```tsx
   import { createDrawerNavigator } from '@react-navigation/drawer';
   import { TabNavigator } from './TabNavigator';
   import { ProfileScreen } from '../screens/ProfileScreen';
   import { SettingsScreen } from '../screens/SettingsScreen';

   const Drawer = createDrawerNavigator();

   export function DrawerNavigator() {
     return (
       <Drawer.Navigator
         screenOptions={{
           headerShown: true,
           drawerLabelStyle: { fontSize: 14 },
         }}
       >
         <Drawer.Screen
           name="MainApp"
           component={TabNavigator}
           options={{ title: 'Inicio', drawerLabel: 'Inicio' }}
         />
         <Drawer.Screen
           name="Profile"
           component={ProfileScreen}
           options={{ title: 'Mi Perfil', drawerLabel: 'Mi Perfil' }}
         />
         <Drawer.Screen
           name="Settings"
           component={SettingsScreen}
           options={{ title: 'Configuración', drawerLabel: 'Configuración' }}
         />
       </Drawer.Navigator>
     );
   }
   ```

8. **Verifica:** Desliza desde el borde izquierdo (o presiona el ícono de menú). Deberías ver el Drawer con opciones de Inicio, Mi Perfil y Configuración.

---

### Paso 5 — Polish con React Native Paper (Componentes Material Design)

React Native Paper proporciona componentes estilizados siguiendo Material Design.

1. Instala la dependencia:
   ```bash
   npm install react-native-paper
   ```

2. Actualiza `App.tsx`:
   ```tsx
   import 'react-native-gesture-handler';
   import { NavigationContainer } from '@react-navigation/native';
   import { PaperProvider } from 'react-native-paper';
   import { DrawerNavigator } from './src/navigation/DrawerNavigator';

   export default function App() {
     return (
       <PaperProvider>
         <NavigationContainer>
           <DrawerNavigator />
         </NavigationContainer>
       </PaperProvider>
     );
   }
   ```

3. Reemplaza `src/screens/HomeScreen.tsx` con:
   ```tsx
   import { View, StyleSheet } from 'react-native';
   import { Card, Text, Button } from 'react-native-paper';

   export function HomeScreen() {
     return (
       <View style={styles.container}>
         <Card style={styles.card}>
           <Card.Content>
             <Text variant="headlineSmall">🏠 Bienvenido a UTEC Mobile</Text>
             <Text variant="bodyMedium" style={{ marginTop: 12 }}>
               Accede a tus cursos, compañeros y perfil desde tu dispositivo móvil.
             </Text>
           </Card.Content>
         </Card>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, padding: 16, justifyContent: 'center' },
     card: { marginBottom: 16 },
   });
   ```

4. **Verifica:** La pantalla de inicio ahora tiene un componente `Card` de React Native Paper con estilos Material Design.

---

## 🔗 Configuración de la API

### Para emulador Android:
Si estás usando Android Studio emulator, la URL del API debe ser `http://10.0.2.2:8080` porque `localhost` dentro del emulador apunta al emulador mismo, no a tu máquina host.

En `src/services/api.ts`:
```ts
const API_URL = 'http://10.0.2.2:8080';
```

### Para iOS o dispositivo real:
Si estás usando un dispositivo real o Expo Go en tu teléfono en la misma red:
```ts
const API_URL = 'http://192.168.X.X:8080'; // reemplaza con tu IP local
```

Puedes obtener tu IP con `ipconfig` (Windows) o `ifconfig` (Mac/Linux).

---

## 🐛 Solución de problemas

### "Cannot find module" en imports
Verifica que las rutas son correctas. Los imports deben comenzar con `../` o `/src/`.

### Emulador no encuentra el backend
- **Android:** usa `http://10.0.2.2:8080` en lugar de `localhost`
- **iOS:** usa tu IP local (ej. `http://192.168.1.5:8080`)

### "gesture-handler" import error
Asegúrate de que `import 'react-native-gesture-handler';` está al inicio de `App.tsx` ANTES de cualquier otro import de navegación.

### App se congela en CoursesScreen
Verifica que el backend está corriendo: `GET http://localhost:8080/course` en tu navegador debe devolver un JSON.

### TypeScript errores de tipos de navegación
Cuando uses `navigation.navigate()`, asegúrate de que el nombre de la ruta está definido en tu `ParamList` y que los parámetros coinciden.

---

## ✅ Checklist final

Antes de entregar, verifica que tu app:

- [ ] Inicia sin errores en Expo Go / emulador
- [ ] Bottom tabs funcionan (Inicio, Cursos, Estudiantes)
- [ ] Presionar un curso abre la pantalla de detalle (Stack push)
- [ ] Hay un botón atrás en la pantalla de detalle que cierra
- [ ] La pestaña de Cursos muestra "Todos" y "Mis Cursos" (top tabs deslizables)
- [ ] Deslizar desde la izquierda abre el Drawer
- [ ] El Drawer tiene items para Inicio, Perfil y Configuración
- [ ] Al menos una pantalla usa componentes de React Native Paper
- [ ] Los datos se cargan desde el backend (no están hardcodeados)

---

## 📚 Referencias

- [React Navigation Documentation](https://reactnavigation.org)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper)
- [Week 11 Backend API](https://github.com/CS2031-DBP/cs2031-2026-1-week11-backend)

---

**¡Buena suerte y a construir! 🚀**
