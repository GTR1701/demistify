import { FormInput } from "@/components/FormInput";
import { LoginFormProps } from "@/types/formInput";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Field, Form, Formik } from "formik";
import * as React from "react";

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  field1,
  field2,
  field1text,
  field2text,
}) => {
  const theme = useTheme();
  return (
    <Formik
      initialValues={{ login: "", password: "" }}
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
              marginTop: "1rem",
              paddingBottom: "1rem",
              color: theme.palette.text.primary,
            }}
          >
            <Field
              error={field1}
              name="login"
              placeholder="Nazwa Użytkownika lub Email"
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
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "transparent" }}
            >
              Zaloguj
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
