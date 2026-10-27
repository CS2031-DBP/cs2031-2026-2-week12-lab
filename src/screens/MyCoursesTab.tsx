import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Course, CoursesTopTabParamList, CoursesStackParamList } from '../types';
import { getStudentCourses } from '../services/api';
import { CourseList } from './CourseListItem';

type Props = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<CoursesTopTabParamList, 'Mine'>,
    NativeStackNavigationProp<CoursesStackParamList>
  >;
};

const CURRENT_STUDENT_ID = 1; // Ana García, usada como estudiante de ejemplo

export function MyCoursesTab({ navigation }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentCourses(CURRENT_STUDENT_ID)
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <CourseList
      courses={courses}
      onPress={courseId => navigation.navigate('CourseDetail', { courseId })}
      emptyMessage="No tienes cursos matriculados"
    />
  );
}
