import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text size={64} label="AG" />
        <Text variant="headlineSmall" style={styles.name}>
          Ana García
        </Text>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="labelMedium">Email</Text>
          <Text variant="bodyLarge">ana.garcia@utec.edu.pe</Text>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="labelMedium">Edad</Text>
          <Text variant="bodyLarge">20 años</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { alignItems: 'center', marginVertical: 16 },
  name: { marginTop: 12 },
  card: { marginBottom: 12 },
});
