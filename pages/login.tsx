import { AuthForm } from "@/components/authForm";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

interface Data {
  login: string;
  password: string;
  email: string;
}

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  async function sendData({ login, password, email }: Data) {
    await axios.post("/api/auth/register", { login, password, email });
  }

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            margin: "10vh auto",
            backgroundColor: theme.palette.primary.light,
            width: "30%",
            height: "max-content",
            borderRadius: "25px",
            boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
          }}
        >
          <Typography
            variant="h1"
            sx={{ margin: "0 auto", padding: "1rem 0", width: "fit-content" }}
          >
            Login
          </Typography>
          <AuthForm
            onSubmit={({ login, password, email }) => {
              sendData({ login, password, email });
            }}
          />
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h1"
            sx={{ margin: "auto", width: "fit-content" }}
          >
            Login
          </Typography>
          <AuthForm
            onSubmit={({ login, password, passwordRepeat, email }) => {}}
          />
        </Box>
      )}
    </>
  );
}
