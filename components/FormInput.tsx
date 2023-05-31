import { TextField, TextFieldProps, useTheme } from "@mui/material";
import { FieldProps } from "formik";

export const FormInput: React.FC<FieldProps & TextFieldProps> = ({
  placeholder,
  field,
  type,
  error,
  helperText,
}) => {
  const theme = useTheme();
  return (
    <TextField
      error={error}
      helperText={helperText}
      type={type}
      variant="filled"
      label={placeholder}
      {...field}
      InputLabelProps={{ sx: { color: theme.palette.text.primary } }}
    />
  );
};
