export interface Chapters {
  chapterID: number;
  chapterName: number;
  courseID: number;
  route: string;
  content: string;
}

export interface Courses {
  courseID: number;
  courseName: number;
  route: string;
}

export interface Lessons {
  [x: string]: any;
  lessonID: number;
  lessonName?: number;
  lessonMD: string;
  lessonCodeDefault: string;
  lessonCodeSolution: string;
}

export interface LessonNames {
  lessonNameID: number;
  lessonName?: string;
  chapterID: number;
  courseID: number;
  route: string;
}

export interface ChapterNames {
  ID: number;
  chapterName: string;
  courseID: number;
  Route: string;
}

export interface CourseNames {
  ID: number;
  courseName: string;
  Route: string;
}

export interface User {
  ID: number;
  uid: string;
  username: string;
  password: string;
  email: string;
  hasJS: boolean;
  hasReact: boolean;
  hasPython: boolean;
  hasNode: boolean;
}
