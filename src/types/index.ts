export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
}

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  age: number;
  description: string;
}

export type TabNavigatorParamList = {
  Home: undefined;
  Courses: undefined;
  // TODO (Paso 1 - Tu turno): agrega "Students: undefined" aquí
};

export type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: number };
};

// TODO (Paso 2 - Tu turno): define StudentsStackParamList, similar a
// CoursesStackParamList pero para estudiantes (StudentsList, StudentDetail).

export type CoursesTopTabParamList = {
  All: undefined;
  // TODO (Paso 3 - Tu turno): agrega "Mine: undefined" aquí
};
