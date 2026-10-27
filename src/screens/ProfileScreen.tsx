import { View, Text, StyleSheet } from 'react-native';

// TODO (Paso 5 - Tu turno): reescribe esta pantalla usando al menos 2
// componentes de React Native Paper (ej. Card para las tarjetas, Text con
// variant="headlineSmall", etc). Documentación: https://callstack.github.io/react-native-paper/docs/guides/getting-started

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
