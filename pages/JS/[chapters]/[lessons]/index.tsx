import CodeEditorLesson from "@/components/CodeEditorLesson";
import { CodeEditorProps } from "@/types/lessons";
import { useRouter } from "next/router";

export function getServerSideProps() {
  const router = useRouter();
  const { chapter, lesson } = router.query;
  console.log(chapter, lesson);
  return {
    props: {
      lessonMD: `#lessonMD`,
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
