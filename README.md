# Lab 12 — Navegación en React Native (CS2031 DBP 2026-2)

## 📱 ¿Qué vamos a construir?

En este laboratorio crearemos **UTEC Mobile**, una aplicación de portal estudiantil que demuestra los cuatro navegadores principales de React Navigation. La arquitectura es la que ves en cualquier app profesional:

- Una **Drawer** que envuelve toda la app (Perfil, Configuración)
- **Bottom Tabs** para navegación principal (Inicio, Cursos, Estudiantes)
- **Stack Navigator** dentro de la pestaña de Cursos para drill-down (lista → detalle)
- **Material Top Tabs** dentro de la lista de cursos para filtros (Todos / Mis cursos)

**Stack de tecnologías:**
- React Native + Expo
- React Navigation v6
- React Native Paper (Material Design)
- Axios (HTTP client)
- TypeScript

---

## 🎯 Prerrequisitos

Asegúrate de tener:

- **Node.js 20+** → `node --version`
- **Expo Go app** instalada en tu teléfono o un emulador (Android Studio / Xcode)
- **Git** instalado
- **JDK 26** (para levantar el backend) → `java -version`
- **Backend de Semana 12** corriendo:
  ```bash
  git clone https://github.com/CS2031-DBP/cs2031-2026-2-week12-backend.git
  cd cs2031-2026-2-week12-backend
  ./mvnw spring-boot:run
  ```
  Espera a ver `Started LabWeek11BackendApplication` en la consola. **Deja esa
  terminal abierta** — el backend debe seguir corriendo mientras trabajas en
  el frontend.

  **Verifica que responde** antes de seguir:
  ```bash
  curl http://localhost:8080/student
  ```
  Deberías ver un JSON con 3 estudiantes (Ana, Carlos, Lucía). Si no carga
  nada, el backend no está corriendo — revisa esa terminal.

### 🔌 Verifica la conexión backend ↔ frontend

Con el backend corriendo, inicia este proyecto (`npx expo start --web` es la
forma más rápida de probar sin un emulador) y abre las DevTools del navegador
(`F12`) → pestaña **Network**. Deberías ver peticiones a
`http://localhost:8080/student` y `http://localhost:8080/course` sin errores
de CORS en la pestaña **Console**. Si la petición sale con status `200` y el
JSON correcto, backend y frontend ya están conectados.

| Síntoma | Causa probable |
|---|---|
| `ERR_CONNECTION_REFUSED` en Network | El backend no está corriendo, o escucha en otro puerto. |
| Error de CORS en consola | El backend ya trae `CorsConfig` permitiendo cualquier origen; revisa que la URL en `src/services/api.ts` sea correcta. |
| La request sale a `undefined/student` | Revisa `API_URL` en `src/services/api.ts`. |
| En emulador Android no conecta | Usa `http://10.0.2.2:8080` en vez de `localhost` (ver sección 🔗 Configuración del API). |

---

## 📋 Pasos del Lab

### Paso 0 — Crear el proyecto Expo y configurar NavigationContainer

1. Crea el proyecto:
   ```bash
   npx create-expo-app@latest --template blank-typescript utec-mobile
   cd utec-mobile
   ```

2. Instala React Navigation base:
   ```bash
   npm install @react-navigation/native
   npx expo install react-native-screens react-native-safe-area-context
   ```

3. Abre `App.tsx` y reemplaza con:
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

4. Inicia:
   ```bash
   npx expo start
   ```
   Escanea el QR con Expo Go o presiona `a` (Android) / `i` (iOS) en el emulador.

---

## Paso 1 — Bottom Tabs Navigator

### ¿Qué es?

El **Bottom Tab Navigator** crea un menú de pestañas en la parte inferior de la pantalla. Es el patrón que ves en Instagram, Twitter, Spotify: cada pestaña es una pantalla independiente que puedes acceder en cualquier momento. Dentro de cada pestaña, puedes anidar otros navegadores (como un Stack).

### Ejemplo guiado

Construiremos dos pestañas: **Inicio** y **Cursos**.

**1. Instala la dependencia:**
```bash
npm install @react-navigation/bottom-tabs
```

**2. Crea la carpeta de proyecto:**
```bash
mkdir -p src/screens src/navigation src/types src/services
```

**3. Tipos (`src/types/index.ts`):**
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
};
```

**4. Pantalla de Inicio (`src/screens/HomeScreen.tsx`):**
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

**5. Pantalla de Cursos placeholder (`src/screens/CoursesScreen.tsx`):**
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

**6. Navegador de tabs (`src/navigation/TabNavigator.tsx`):**
```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { CoursesScreen } from '../screens/CoursesScreen';
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
          };
          return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
        },
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Courses" component={CoursesScreen} options={{ title: 'Cursos' }} />
    </Tab.Navigator>
  );
}
```

**7. Actualiza `App.tsx`:**
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

**Verifica:** Abre la app. Deberías ver dos pestañas en la parte inferior. Al presionar cada una, cambias entre Inicio y Cursos.

### Tu turno 🧩

Ahora añade una tercera pestaña: **Estudiantes** (📋).

Qué debes hacer:
1. Actualiza `TabNavigatorParamList` en `src/types/index.ts` para incluir `Students: undefined`
2. Crea `src/screens/StudentsScreen.tsx` (sigue el mismo patrón que `HomeScreen` y `CoursesScreen`)
3. Importa `StudentsScreen` en `TabNavigator.tsx`
4. Añade un nuevo `<Tab.Screen>` para Estudiantes
5. Actualiza el objeto `icons` para incluir un ícono para Estudiantes (ej. `'people'`)

**Resultado esperado:** Tres pestañas en la parte inferior. La tercera muestra "👥 Estudiantes".

---

## Paso 2 — Native Stack Navigator

### ¿Qué es?

El **Native Stack Navigator** organiza las pantallas en una pila (stack). Cuando navegas a una nueva pantalla, se apila encima de la anterior. Presionar "atrás" la elimina de la pila y vuelves a la anterior. Es el patrón de "ir adentro de detalles" (lista → detalle → más detalles).

También introduce el concepto de **ParamList** con tipos: cuando navegas, llevas parámetros tipados (ej. courseId) que la pantalla de destino puede recibir.

### Ejemplo guiado

Construiremos: **Cursos (lista)** → **Detalle del curso** usando Stack.

**1. Instala:**
```bash
npm install @react-navigation/native-stack
npm install axios
```

**2. Servicio de API (`src/services/api.ts`):**
```ts
import axios from 'axios';
import type { Course, Student } from '../types';

const API_URL = 'http://localhost:8080'; // Ajusta para Android: 10.0.2.2, iOS: tu IP local

const api = axios.create({ baseURL: API_URL });

export const getCourses = () => api.get<Course[]>('/course').then(r => r.data);
export const getCourse = (id: number) => api.get<Course>(`/course/${id}`).then(r => r.data);
export const getStudents = () => api.get<Student[]>('/student').then(r => r.data);
export const getStudent = (id: number) => api.get<Student>(`/student/${id}`).then(r => r.data);
export const getStudentCourses = (studentId: number) =>
  api.get<Course[]>(`/student/${studentId}/courses`).then(r => r.data);
```

**3. Actualiza tipos (`src/types/index.ts`), añade:**
```ts
export type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: number };
};
```

**4. Pantalla de detalle (`src/screens/CourseDetailScreen.tsx`):**
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
  if (!course) return <Text>No encontrado</Text>;

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

**5. Pantalla de Cursos actualizada (`src/screens/CoursesScreen.tsx`), reemplaza:**
```tsx
import { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
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

**6. Stack Navigator (`src/navigation/CoursesStackNavigator.tsx`):**
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

**7. Reemplaza la pestaña de Cursos en `TabNavigator.tsx`:**
Cambia:
```tsx
<Tab.Screen name="Courses" component={CoursesScreen} options={{ title: 'Cursos' }} />
```
Por:
```tsx
<Tab.Screen name="Courses" component={CoursesStackNavigator} options={{ title: 'Cursos' }} />
```

Y añade al inicio del archivo:
```tsx
import { CoursesStackNavigator } from './CoursesStackNavigator';
```

**Verifica:** Presiona la pestaña de Cursos. Deberías ver una lista de cursos. Al presionar uno, la pantalla de detalle aparece. Hay un botón "atrás" que te lleva a la lista.

### Tu turno 🧩

Implementa el equivalente para **Estudiantes**: `StudentsScreen → StudentDetailScreen`.

Qué debes hacer:
1. Actualiza `src/types/index.ts` con `StudentsStackParamList` (similar a `CoursesStackParamList`, pero para estudiantes)
2. Crea `src/screens/StudentDetailScreen.tsx` (copia el patrón de `CourseDetailScreen`, pero para estudiantes)
   - Usa `NativeStackScreenProps<StudentsStackParamList, 'StudentDetail'>`
   - Llama a `getStudent(route.params.studentId)` del API
   - Muestra campos del estudiante: nombre, email, edad, descripción
3. Actualiza `src/screens/StudentsScreen.tsx` para hacer una lista de estudiantes (usa `getStudents()` del API, sigue el patrón de `CoursesScreen`)
4. Crea `src/navigation/StudentsStackNavigator.tsx` (similar a `CoursesStackNavigator`)
5. Reemplaza el `Tab.Screen` de Estudiantes en `TabNavigator.tsx` para usar `StudentsStackNavigator`

**Resultado esperado:** Presionas "Estudiantes" → ves lista de estudiantes → presionas uno → ves su detalle completo.

---

## Paso 3 — Material Top Tabs Navigator

### ¿Qué es?

El **Material Top Tab Navigator** crea pestañas horizontales en la parte superior de la pantalla, y puedes deslizar entre ellas. A diferencia de Bottom Tabs (que son para navegación principal), Top Tabs son para *filtrar o segmentar* contenido dentro de una pantalla: "Todos los cursos" vs. "Mis cursos", o "Activos" vs. "Archivados".

### Ejemplo guiado

Dentro de la pantalla de Cursos, crearemos dos Top Tabs: **Todos** (todos los cursos del sistema) y **Mis Cursos** (solo los que cursa el estudiante actual).

**1. Instala:**
```bash
npm install @react-navigation/material-top-tabs react-native-tab-view
npx expo install react-native-pager-view
```

**2. Tab "Todos" (`src/screens/AllCoursesTab.tsx`):**
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

**3. Top Tab Navigator (`src/navigation/CoursesTopTabNavigator.tsx`):**
```tsx
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllCoursesTab } from '../screens/AllCoursesTab';

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
    </Tab.Navigator>
  );
}
```

**4. Reemplaza `CoursesStackNavigator.tsx`:**
Cambia:
```tsx
<Stack.Screen name="CoursesList" component={CoursesScreen} ...
```
Por:
```tsx
<Stack.Screen name="CoursesList" component={CoursesTopTabNavigator} ...
```

E importa al inicio:
```tsx
import { CoursesTopTabNavigator } from './CoursesTopTabNavigator';
```

**Verifica:** Presiona "Cursos" → ves la pestaña "Todos los Cursos" en la parte superior. (Por ahora solo hay una, así que no puedes deslizar aún.)

### Tu turno 🧩

Añade la segunda tab: **Mis Cursos**.

Qué debes hacer:
1. Crea `src/screens/MyCoursesTab.tsx` (similar a `AllCoursesTab`, pero llama a `getStudentCourses(1)` en lugar de `getCourses()`)
   - Usa el estudiante ID 1 (Ana García) como ejemplo
   - Si no hay cursos, muestra "No tienes cursos matriculados"
2. Importa `MyCoursesTab` en `CoursesTopTabNavigator.tsx`
3. Añade un segundo `<Tab.Screen>` con el nombre "Mis Cursos"

**Resultado esperado:** Dos pestañas horizontales en la parte superior de Cursos. Puedes deslizar entre "Todos los Cursos" (todos del sistema) y "Mis Cursos" (solo del estudiante 1).

---

## Paso 4 — Drawer Navigator

### ¿Qué es?

El **Drawer Navigator** es un menú que se abre desde el borde izquierdo (o derecho) de la pantalla. Es lo que ves en Gmail, Slack, etc. El patrón típico es: Drawer envuelve los navegadores principales (Bottom Tabs) y añade opciones adicionales (Perfil, Configuración) que no están en las tabs principales.

### Ejemplo guiado

Crearemos un Drawer con tres items:
- **Inicio** (que contiene el TabNavigator)
- **Mi Perfil**
- Dejaremos el tercero para ti 😉

**1. Instala:**
```bash
npm install @react-navigation/drawer
npx expo install react-native-gesture-handler react-native-reanimated
```

**2. Gesture handler (imports condicionales):**

Crea `gesture-handler.native.js` en la raíz:
```js
import 'react-native-gesture-handler';
```

Crea `gesture-handler.js` en la raíz:
```js
// Solo para web
```

**3. Actualiza `App.tsx`:**
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

**4. Pantalla de Perfil (`src/screens/ProfileScreen.tsx`):**
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

**5. Drawer Navigator (`src/navigation/DrawerNavigator.tsx`):**
```tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './TabNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';

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
    </Drawer.Navigator>
  );
}
```

**Verifica:** Abre la app. Desliza desde el borde izquierdo (o presiona el ícono de menú en el header). El Drawer aparece con "Inicio" y "Mi Perfil". Presiona cada uno para navegar.

### Tu turno 🧩

Añade **Configuración** como un tercer item del Drawer.

Qué debes hacer:
1. Crea `src/screens/SettingsScreen.tsx` (puedes incluir un Switch para notificaciones, otro para modo oscuro, o lo que quieras)
2. Importa `SettingsScreen` en `DrawerNavigator.tsx`
3. Añade un tercer `<Drawer.Screen>` con el nombre "Settings"

**Resultado esperado:** El Drawer tiene 3 items: Inicio, Mi Perfil, Configuración. Puedes navegar entre todos.

---

## Paso 5 — React Native Paper (Polish)

### ¿Qué es?

**React Native Paper** es una librería de componentes que implementa Material Design. En lugar de construir UI desde cero con `View`, `Text`, etc., usas componentes pre-diseñados como `Card`, `Button`, `AppBar` que se ven profesionales.

### Ejemplo guiado

Reescribimos `HomeScreen` con componentes de Paper.

**1. Instala:**
```bash
npm install react-native-paper
```

**2. Actualiza `App.tsx` para usar `PaperProvider`:**
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

**3. Reemplaza `src/screens/HomeScreen.tsx`:**
```tsx
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

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

**Verifica:** Presiona "Inicio". La pantalla ahora tiene un `Card` de Paper con estilos modernos.

### Tu turno 🧩

Reescribe **ProfileScreen** usando al menos 2 componentes de React Native Paper.

Qué debes hacer:
1. Reemplaza las `View` y `Text` simples por componentes de Paper
   - Puedes usar `Card` para las tarjetas de información
   - Puedes usar `Text` con `variant` (ej. `variant="headlineSmall"`)
   - Puedes explorar otros componentes en la [documentación de Paper](https://callstack.github.io/react-native-paper/docs/guides/getting-started)

**Resultado esperado:** ProfileScreen se ve más pulida y profesional, con componentes Material Design.

---

## 🔗 Configuración del API

El servicio de API en `src/services/api.ts` necesita apuntar a la URL correcta según tu entorno:

### Android Emulator
```ts
const API_URL = 'http://10.0.2.2:8080';
```
(El emulador de Android usa `10.0.2.2` como alias para `localhost` en tu máquina host)

### iOS Simulator o Dispositivo Real
```ts
const API_URL = 'http://TU-IP-LOCAL:8080';
```
Obtén tu IP con:
- **Mac/Linux:** `ifconfig` → busca `inet 192.168.x.x`
- **Windows:** `ipconfig` → busca `IPv4 Address: 192.168.x.x`

---

## 🐛 Solución de problemas

**"Cannot find module"**
- Verifica que la ruta en el import es correcta (relativa desde el archivo actual)

**API no responde / conexión rechazada**
- Verifica que el backend está corriendo: `./mvnw spring-boot:run`
- Verifica que estás usando la URL correcta (ver sección 🔗 Configuración del API)

**"gesture-handler is not configured"**
- Asegúrate de que `import 'react-native-gesture-handler';` está al inicio de `App.tsx`, ANTES de cualquier otro import

**App congela o se reinicia infinitamente**
- Revisa la consola de Expo para errores de TypeScript o JavaScript
- Si es un error de types, verifica que los `ParamList` están bien definidos

**Emulador no abre / no carga la app**
- Intenta `npm run dev` en lugar de `npx expo start`
- O reconecta el emulador/teléfono

---

## ✅ Checklist Final

Antes de entregar, verifica que tu app:

- [ ] Inicia sin errores
- [ ] **Bottom Tabs:** 3 pestañas funcionan (Inicio, Cursos, Estudiantes)
- [ ] **Stack:** Presionar un curso abre detalle; hay botón atrás
- [ ] **Stack:** Presionar un estudiante abre su detalle
- [ ] **Top Tabs:** En Cursos, hay 2 pestañas horizontales deslizables
- [ ] **Drawer:** Deslizar desde la izquierda abre menú con 3 opciones
- [ ] **Paper:** Al menos una pantalla usa componentes de Paper
- [ ] **Backend:** Los datos se cargan desde `/course`, `/student`, etc., no están hardcodeados

---

## 📚 Referencias

- [React Navigation Docs](https://reactnavigation.org)
- [Expo Docs](https://docs.expo.dev)
- [React Native Paper Components](https://callstack.github.io/react-native-paper/docs/guides/getting-started)
- [Backend API Endpoints](https://github.com/CS2031-DBP/cs2031-2026-2-week12-backend#endpoints)

---

**¡Buena suerte construyendo! 🚀**
