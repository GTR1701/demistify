import CodeEditorLesson from "@/components/CodeEditorLesson";
import { fetchLessonData } from "@/lib/apiFunctions";
import { Lessons } from "@/types/db";
import { CodeEditorProps } from "@/types/lessons";

export async function getServerSideProps(context: any) {
  const { req } = context;
  const currentPath = req.url;
  // const depth = currentPath.split("/").length - 1;
  // const course = "/" + currentPath.split("/")[1];
  // const chapter = "/" + currentPath.split("/")[2];
  const lesson = "/" + currentPath.split("/")[3];
  console.log(lesson);
  const content: Lessons = await fetchLessonData(lesson);

  return {
    props: {
      lessonMD: content.lessonMD,
      codeLessonDefault: "console.log('hello world')",
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
