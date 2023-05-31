import { FormInput } from "@/components/FormInput";
import { RegisterFormProps } from "@/types/formInput";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import * as React from "react";

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  field1,
  field2,
  field3,
  field4,
  field1text,
  field2text,
  field3text,
  field4text,
}) => {
  const theme = useTheme();
  return (
    <Formik
      initialValues={{ login: "", password: "", passwordRepeat: "", email: "" }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({}) => (
        <Form>
          <Box
            sx={{
              display: "grid",
              rowGap: "1rem",
              width: "90%",
              margin: "auto",
              marginTop: "5rem",
              paddingBottom: "1rem",
              color: theme.palette.text.primary,
            }}
          >
            <Field
              error={field1}
              name="login"
              placeholder="Nazwa Użytkownika"
              component={FormInput}
              helperText={field1text}
            />
            <Field
              error={field2}
              type="password"
              name="password"
              placeholder="Hasło"
              component={FormInput}
              helperText={field2text}
            />
            <Field
              error={field3}
              type="password"
              name="passwordRepeat"
              placeholder="Powtórz hasło"
              component={FormInput}
              helperText={field3text}
            />
            <Field
              error={field4}
              type="email"
              name="email"
              placeholder="Email"
              component={FormInput}
              helperText={field4text}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "transparent" }}
            >
              Zarejestruj
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
