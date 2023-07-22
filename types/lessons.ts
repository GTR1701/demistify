export interface CodeEditorProps {
  lessonMD: string;
  codeLessonDefault: string;
}

export interface LandingProps {
  codeLessonDefault: string;
}

export interface LessonObject {
  lessonID: number | null;
  lessonName: string | null;
  lessonMD: string | null;
  lessonCodeDefault: string | null;
  lessonCodeSolution: string | null;
}
