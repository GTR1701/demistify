import { AuthForm } from "@/components/authForm";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { sendData } from "@/lib/apiFunctions";
import { useRouter } from "next/dist/client/router";
import { prisma } from "@/prisma/prisma";

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

  const sanitizeData = async ({
    login,
    password,
    passwordRepeat,
    email,
  }: Data) => {
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
      const res = await sendData({ login, password, email });
      if (!res.data) {
        counter = 0;
        router.push("/");
      } else {
        alert(res.data.message);
      }
    }
  };

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            margin: "10vh auto",
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(135deg, rgba(0,74,255,1) 0%, rgba(171,71,188,1) 93%)"
                : "linear-gradient(315deg, rgba(0,146,255,1) 7%, rgba(90,41,150,1) 83%)",
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
