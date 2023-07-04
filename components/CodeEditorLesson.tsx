import { Box } from "@mui/material";
import Landing from "./Landing";
import { CodeEditorProps } from "@/types/lessons";
import dynamic from "next/dynamic";
const MuiMarkdown = dynamic(() => import("mui-markdown"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function CodeEditorLesson({
  lessonMD,
  codeLessonDefault,
}: CodeEditorProps) {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "calc(100vh - 4rem)" }}>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          overflow: "hidden",
          scrollbarWidth: "none",
          scrollbarColor: "transparent transparent",
          padding: "1rem",
        }}
      >
        <MuiMarkdown>{lessonMD}</MuiMarkdown>
      </Box>
      <Box
        sx={{
          width: "75%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Landing codeLessonDefault={codeLessonDefault} />
      </Box>
    </Box>
  );
}
