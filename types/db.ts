export interface ICourses {
    id: number;
    courseName: string;
    route: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IChapters {
    id: number;
    chapterName: string;
    course: string;
    route: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ILessons {
    id: string;
    lessonName: string;
    chapter: string;
    route: string;
    description: string;
    codeEditorDefault: string;
    codeEditorSolution: string;
    nextLesson: string;
    previousLesson: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUsers {
    id: string;
    uuid: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISidebar {
    id: string;
    name: string;
    type: string;
    childOf: string;
    route: string;
}