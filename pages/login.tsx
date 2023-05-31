import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { callLoginUser } from "@/lib/apiFunctions";
import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";
import { UserContext } from "@/lib/context";

interface Data {
  login: string;
  password: string;
}

export default function Login() {
  const { uid, username, update } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [field1, setField1] = useState(false);
  const [field1text, setField1text] = useState("");
  const [field2, setField2] = useState(false);
  const [field2text, setField2text] = useState("");

  const logIn = async ({ login, password }: Data) => {
    console.log(login, password);
    const res = await callLoginUser({ login, password });
    if (res.data === "User not found") {
      setField1(true);
      setField1text("Niepoprawna nazwa użytkownika lub email");
    } else if (res.data === "Invalid password") {
      setField2(true);
      setField2text("Niepoprawne hasło");
    } else if (res.status === 200) {
      console.log(res.data.uid, res.data.username);
      await update(res.data.uid, res.data.username).then(() => {
        router.push("/dashboard");
      });
    }
  };

  return (
    <>
      {!isMobile ? (
        <Box
          sx={{
            margin: "20vh auto",
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
            sx={{
              margin: "0 auto",
              padding: "3rem 0 1rem 0",
              width: "95%",
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            Zaloguj się
          </Typography>
          <Typography
            variant="h6"
            sx={{ margin: "0 auto", width: "90%", padding: "2rem 0 1rem 0" }}
          >
            Nie masz konta?{" "}
            <Link style={{ color: "inherit" }} href="/register">
              Zarejestruj się
            </Link>
          </Typography>
          <LoginForm
            onSubmit={({ login, password }) => {
              logIn({ login, password });
            }}
            field1={field1}
            field2={field2}
            field1text={field1text}
            field2text={field2text}
          />
        </Box>
      ) : (
        <Box
          sx={{
            margin: "10vh auto",
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(135deg, rgba(0,74,255,1) 0%, rgba(171,71,188,1) 93%)"
                : "linear-gradient(315deg, rgba(0,146,255,1) 7%, rgba(90,41,150,1) 83%)",
            height: "max-content",
            width: "90%",
            borderRadius: "25px",
            boxShadow: "8px 8px 24px 0px rgba(66, 68, 90, 1)",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              margin: "0 auto",
              padding: "3rem 0 1rem 0",
              width: "95%",
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            Zaloguj się
          </Typography>
          <LoginForm
            onSubmit={({ login, password }) => {
              logIn({ login, password });
            }}
            field1={field1}
            field2={field2}
            field1text={field1text}
            field2text={field2text}
          />
        </Box>
      )}
    </>
  );
}
