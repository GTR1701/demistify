import * as React from "react";
import { Formik, Form, FieldProps, Field } from "formik";
import { Button, TextField, Box } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

interface Values {
  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
}

interface AuthFormProps {
  onSubmit: (values: Values) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
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
            <Field name="login" placeholder="login" component={myField} />
            <Field name="password" placeholder="password" component={myField} />
            <Field
              name="passwordRepeat"
              placeholder="passwordRepeat"
              component={myField}
            />
            <Field
              type="email"
              name="email"
              placeholder="email"
              component={myField}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "transparent" }}
            >
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const myField: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  type,
}) => {
  return (
    <TextField
      type={type}
      variant="filled"
      placeholder={placeholder}
      {...field}
    />
  );
};
