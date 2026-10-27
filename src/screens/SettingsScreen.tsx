import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Text } from 'react-native-paper';

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        ⚙️ Configuración
      </Text>
      <List.Item
        title="Notificaciones"
        right={() => <Switch value={notifications} onValueChange={setNotifications} />}
      />
      <List.Item
        title="Modo oscuro"
        right={() => <Switch value={darkMode} onValueChange={setDarkMode} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginTop: 16, marginBottom: 8 },
});
