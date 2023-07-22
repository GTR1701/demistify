import { Box, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      {isMobile ? (
        <Box
          sx={{ display: "flex", width: "100%", height: "calc(100vh - 4rem)" }}
        >
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
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "fit-content",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "50vh",
              scrollbarWidth: "none",
              scrollbarColor: "transparent transparent",
              padding: "1rem",
            }}
          >
            <MuiMarkdown>{lessonMD}</MuiMarkdown>
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Landing codeLessonDefault={codeLessonDefault} />
          </Box>
        </Box>
      )}
    </>
  );
}
