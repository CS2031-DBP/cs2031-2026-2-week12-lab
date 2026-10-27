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
        options={{ drawerLabel: 'Inicio', headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Mi Perfil', drawerLabel: 'Mi Perfil' }}
      />
      {/* TODO (Paso 4 - Tu turno): agrega un tercer item "Settings"
          1. Crea src/screens/SettingsScreen.tsx (puedes incluir un Switch
             para notificaciones, otro para modo oscuro, o lo que quieras)
          2. Impórtalo aquí
          3. Añade un tercer <Drawer.Screen name="Settings" .../> */}
    </Drawer.Navigator>
  );
}
