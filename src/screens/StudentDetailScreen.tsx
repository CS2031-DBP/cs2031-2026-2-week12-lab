import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Student, StudentsStackParamList } from '../types';
import { getStudent } from '../services/api';

type Props = NativeStackScreenProps<StudentsStackParamList, 'StudentDetail'>;

export function StudentDetailScreen({ route }: Props) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent(route.params.studentId)
      .then(setStudent)
      .finally(() => setLoading(false));
  }, [route.params.studentId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!student) return <Text>No encontrado</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {student.firstname} {student.lastname}
      </Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{student.email}</Text>
      <Text style={styles.label}>Edad:</Text>
      <Text style={styles.text}>{student.age}</Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{student.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, color: '#333' },
  text: { fontSize: 16, marginTop: 4, color: '#666' },
});
