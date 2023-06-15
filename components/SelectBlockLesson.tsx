import { Box, Typography } from "@mui/material";

export function getServerSideProps() {}

export default function SelectBlockLesson() {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "95vh" }}>
      <Box sx={{ width: "50%", height: "100%", backgroundColor: "purple" }}>
        <Typography>Box 1</Typography>
      </Box>
      <Box sx={{ width: "50%", height: "100%", backgroundColor: "blue" }}>
        <Typography>Box 2</Typography>
      </Box>
    </Box>
  );
}
