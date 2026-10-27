import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Course, CoursesTopTabParamList, CoursesStackParamList } from '../types';
import { getCourses } from '../services/api';
import { CourseList } from './CourseListItem';

type Props = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<CoursesTopTabParamList, 'All'>,
    NativeStackNavigationProp<CoursesStackParamList>
  >;
};

export function AllCoursesTab({ navigation }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <CourseList
      courses={courses}
      onPress={courseId => navigation.navigate('CourseDetail', { courseId })}
    />
  );
}
