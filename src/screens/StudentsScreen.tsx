import { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Student, StudentsStackParamList } from '../types';
import { getStudents } from '../services/api';

type Props = NativeStackScreenProps<StudentsStackParamList, 'StudentsList'>;

export function StudentsScreen({ navigation }: Props) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <FlatList
      data={students}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('StudentDetail', { studentId: item.id })}
        >
          <Text style={styles.itemTitle}>
            {item.firstname} {item.lastname}
          </Text>
          <Text style={styles.itemSubtitle}>{item.email}</Text>
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
