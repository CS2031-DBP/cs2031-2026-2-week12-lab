import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
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
