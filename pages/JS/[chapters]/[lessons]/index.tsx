import CodeEditorLesson from "@/components/CodeEditorLesson";
import { fetchLessonData } from "@/lib/apiFunctions";
import { Lessons } from "@/types/db";
import { CodeEditorProps } from "@/types/lessons";

export async function getServerSideProps(context: any) {
  const { req } = context;
  const currentPath = req.url;
  const lesson = currentPath.split("/")[3];
  const content: Lessons = await fetchLessonData(lesson);

  return {
    props: {
      lessonMD: content.lessonMD,
      codeLessonDefault: content.lessonCodeDefault,
    },
  };
}

export default function Lesson({
  lessonMD,
  codeLessonDefault,
}: CodeEditorProps) {
  return (
    <>
      <CodeEditorLesson
        lessonMD={lessonMD}
        codeLessonDefault={codeLessonDefault}
      />
    </>
  );
}
