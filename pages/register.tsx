import { RegisterForm } from "@/components/RegisterForm";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { callRegisterUser } from "@/lib/apiFunctions";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

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
  const [field1, setField1] = useState(false);
  const [field1text, setField1text] = useState("");
  const [field2, setField2] = useState(false);
  const [field2text, setField2text] = useState("");
  const [field3, setField3] = useState(false);
  const [field3text, setField3text] = useState("");
  const [field4, setField4] = useState(false);
  const [field4text, setField4text] = useState("");

  const sanitizeData = async ({
    login,
    password,
    passwordRepeat,
    email,
  }: Data) => {
    let counter = 0;
    if (login.length < 3) {
      setField1(true);
      setField1text("Nazwa użytkownika musi mieć co najmniej 3 znaki");
    } else {
      counter++;
      setField1(false);
      setField1text("");
    }
    if (password.length < 8) {
      setField2(true);
      setField2text("Hasło musi mieć co najmniej 8 znaków");
    } else {
      counter++;
      setField2(false);
      setField2text("");
    }
    if (passwordRepeat !== password) {
      setField3(true);
      setField3text("Hasła muszą być takie same");
    } else {
      counter++;
      setField3(false);
      setField3text("");
    }
    if (!email.includes("@" && ".")) {
      setField4(true);
      setField4text("Niepoprawny adres email");
    } else {
      counter++;
      setField4(false);
      setField4text("");
    }
    if (counter === 4) {
      const res = await callRegisterUser({ login, password, email });
      if (res.data.message !== "Użytkownik został utworzony") {
        alert(res.data.message);
      } else {
        counter = 0;
        router.push("/");
        setField1(false);
        setField1text("");
        setField2(false);
        setField2text("");
        setField3(false);
        setField3text("");
        setField4(false);
        setField4text("");
      }
    } else return;
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
            sx={{
              margin: "0 auto",
              padding: "3rem 0 1rem 0",
              width: "95%",
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            Zarejestruj się
          </Typography>
          <RegisterForm
            onSubmit={({ login, password, passwordRepeat, email }) => {
              sanitizeData({ login, password, passwordRepeat, email });
            }}
            field1={field1}
            field2={field2}
            field3={field3}
            field4={field4}
            field1text={field1text}
            field2text={field2text}
            field3text={field3text}
            field4text={field4text}
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
            Zarejestruj się
          </Typography>
          <RegisterForm
            onSubmit={({ login, password, passwordRepeat, email }) => {
              sanitizeData({ login, password, passwordRepeat, email });
            }}
            field1={field1}
            field2={field2}
            field3={field3}
            field4={field4}
            field1text={field1text}
            field2text={field2text}
            field3text={field3text}
            field4text={field4text}
          />
        </Box>
      )}
    </>
  );
}
