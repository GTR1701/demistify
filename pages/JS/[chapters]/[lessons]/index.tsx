import CodeEditorLesson from "@/components/CodeEditorLesson";
import { fetchLessonData } from "@/lib/apiFunctions";
import { CodeEditorProps } from "@/types/lessons";

export async function getServerSideProps(context: any) {
  const { req } = context;
  const currentPath = req.url;
  const depth = currentPath.split("/").length - 1;
  const course = "/" + currentPath.split("/")[1];
  const chapter = "/" + currentPath.split("/")[2];
  const lesson = "/" + currentPath.split("/")[3];
  console.log(course, chapter, lesson);
  const content = await fetchLessonData(course, chapter, lesson);

  return {
    props: {
      lessonMD: `content`,
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
