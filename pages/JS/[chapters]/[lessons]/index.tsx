import CodeEditorLesson from "@/components/CodeEditorLesson";
import { CodeEditorProps } from "@/types/lessons";
import { useRouter } from "next/router";

export function getServerSideProps() {
  const pathname = window.location.pathname;
  console.log("pathname...", pathname);
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
