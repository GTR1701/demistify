import CodeEditorLesson from "@/components/CodeEditorLesson";
import { fetchLessonData } from "@/lib/apiFunctions";
import { LessonObject } from "@/types/lessons";

export async function getServerSideProps(context: any) {
  const { req } = context;
  const currentPath = req.url;
  const lessonID = currentPath.split("/")[3];

  const content: LessonObject = await fetchLessonData(lessonID);

  return {
    props: {
      lessonMD: content.lessonMD,
      lessonName: content.lessonName,
      lessonCodeDefault:
        content.lessonCodeDefault || "console.log('hello world')",
      lessonCodeSolution: content.lessonCodeSolution || "",
    },
  };
}

export default function Lesson({
  lessonMD,
  lessonName,
  lessonCodeDefault,
  lessonCodeSolution,
}: LessonObject) {
  return (
    <>
      <CodeEditorLesson
        lessonMD={lessonMD}
        codeLessonDefault={lessonCodeDefault}
      />
    </>
  );
}
