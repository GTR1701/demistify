import { UserContext } from "@/lib/context";
import { Typography } from "@mui/material";
import { useContext } from "react";

type HomeProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Home(props: HomeProps) {
  const { uid, username } = useContext(UserContext);
  return (
    <>
      <Typography variant="h1">
        {uid}, {username}
      </Typography>
    </>
  );
}
