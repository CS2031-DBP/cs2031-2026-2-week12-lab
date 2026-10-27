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
        options={{ drawerLabel: 'Inicio', headerShown: false }}
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
