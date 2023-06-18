import { Box, Typography } from "@mui/material";
import Landing from "./Landing";

export function getServerSideProps() {}

export default function SelectBlockLesson() {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "93vh" }}>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "purple",
          overflowY: "scroll",
          scrollbarWidth: "none",
          scrollbarColor: "transparent transparent",
        }}
      >
        <Typography>Box 1</Typography>
      </Box>
      <Box sx={{ width: "75%", height: "100%", backgroundColor: "blue" }}>
        <Landing />
      </Box>
    </Box>
  );
}
