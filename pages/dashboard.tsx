import { UserContext } from "@/lib/context";
import { Typography } from "@mui/material";
import { useContext } from "react";

type HomeProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Home(props: HomeProps) {
  const { uid, username, update } = useContext(UserContext);
  console.log(uid, username);
  return (
    <>
      <Typography variant="h3">UID:{uid}</Typography>
      <Typography variant="h3">Username:{username}</Typography>
    </>
  );
}
