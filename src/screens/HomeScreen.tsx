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
