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
  Students: undefined;
};

export type CoursesStackParamList = {
  CoursesList: undefined;
  CourseDetail: { courseId: number };
};

export type StudentsStackParamList = {
  StudentsList: undefined;
  StudentDetail: { studentId: number };
};

export type CoursesTopTabParamList = {
  All: undefined;
  Mine: undefined;
};

