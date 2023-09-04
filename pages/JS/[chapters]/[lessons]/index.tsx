import CodeEditorLesson from "@/components/CodeEditorLesson";
import { fetchLessonData } from "@/lib/apiFunctions";
import { ILessons } from "@/types/db";
import { CodeEditorProps } from "@/types/lessons";

export async function getServerSideProps(context: any) {
  const { req } = context;
  const currentPath = req.url;
  const lessonRoute = currentPath.split("/")[3];
  const chapterRoute = currentPath.split("/")[2];
  const courseRoute = currentPath.split("/")[1];
  const res = await fetchLessonData(lessonRoute, chapterRoute, courseRoute);
  //@ts-expect-error
  const content: ILessons[] = await res.data;

  return {
    props: {
      description: content[0].description,
      codeEditorDefault: content[0].codeEditorDefault,
      codeEditorSolution: content[0].codeEditorSolution,
      nextLesson: content[0].nextLesson,
      previousLesson: content[0].previousLesson,
    },
  };
}

export default function Lesson({
  description,
  codeEditorDefault,
  codeEditorSolution,
  nextLesson,
  previousLesson,
}: CodeEditorProps) {
  return (
    <>
      <CodeEditorLesson
        description={description}
        codeEditorDefault={codeEditorDefault}
        codeEditorSolution={codeEditorSolution} 
        nextLesson={nextLesson}
        previousLesson={previousLesson}
        />
    </>
  );
}
