import { AuthForm } from "@/components/authForm";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { sendData } from "@/lib/apiFunctions";
import { useRouter } from "next/dist/client/router";

interface Data {
  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
}

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const sanitizeData = ({ login, password, passwordRepeat, email }: Data) => {
    let counter = 0;
    if (login.length < 3) {
      alert("Login must be at least 3 characters long");
      return;
    } else counter++;
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    } else counter++;
    if (passwordRepeat !== password) {
      alert("Passwords must match");
      return;
    } else counter++;
    if (!email.includes("@")) {
      alert("Email must contain @");
      return;
    } else counter++;
    if (counter === 4) {
      sendData({ login, password, email });
      counter = 0;
      router.push("/");
    }
  };

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
            onSubmit={({ login, password, passwordRepeat, email }) => {
              sanitizeData({ login, password, passwordRepeat, email });
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
