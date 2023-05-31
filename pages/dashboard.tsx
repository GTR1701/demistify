import { Typography } from "@mui/material";

type HomeProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Home(props: HomeProps) {
  return (
    <>
      <Typography variant="h1">Dashboard</Typography>
    </>
  );
}
