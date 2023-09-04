export interface CodeEditorProps {
  description: string;
  codeEditorDefault: string;
  codeEditorSolution: string;
  nextLesson: string;
  previousLesson: string;
}

export interface LandingProps {
  codeEditorDefault: string;
  codeEditorSolution: string;
  nextLesson: string;
  previousLesson: string;
}

export interface LessonObject {
  lessonID: number | null;
  lessonName: string | null;
  lessonMD: string | null;
  lessonCodeDefault: string | null;
  lessonCodeSolution: string | null;
}
