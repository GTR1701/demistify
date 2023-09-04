export interface ICustomDrawer<T, U, V> {
    courses: T;
    chapters: U;
    lessons: V;
}
export interface ICustomDrawerCourses<T, U, V> {
    index: number;
    course: T;
    chapters: U;
    lessons: V;
}
export interface ICustomDrawerChapters<T, U, V> {
    index: number;
    course: T;
    chapter: U;
    lessons: V;
    bgColor: string;
}
export interface ICustomDrawerLessons<T, U, V> {
    index: number;
    course: T;
    chapter: U;
    lesson: V;
    bgColor: string;
}