import { Box, Typography } from "@mui/material";
import Landing from "./Landing";

export function getServerSideProps() {}

export default function SelectBlockLesson() {
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
        <Typography>Box 1</Typography>
      </Box>
      <Box
        sx={{
          width: "75%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Landing />
      </Box>
    </Box>
  );
}
