import axios from 'axios';
import type { Course, Student } from '../types';

const API_URL = 'http://localhost:8080'; // Ajusta para Android: 10.0.2.2, iOS/dispositivo: tu IP local

const api = axios.create({ baseURL: API_URL });

export const getCourses = () => api.get<Course[]>('/course').then(r => r.data);
export const getCourse = (id: number) => api.get<Course>(`/course/${id}`).then(r => r.data);
export const getStudents = () => api.get<Student[]>('/student').then(r => r.data);
export const getStudent = (id: number) => api.get<Student>(`/student/${id}`).then(r => r.data);
export const getStudentCourses = (studentId: number) =>
  api.get<Course[]>(`/student/${studentId}/courses`).then(r => r.data);
