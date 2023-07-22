export interface RegisterValues {
  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
}
export interface LoginValues {
  login: string;
  password: string;
}

export interface RegisterFormProps {
  onSubmit: (values: any) => void;
  field1: boolean;
  field2: boolean;
  field3: boolean;
  field4: boolean;
  field1text: string;
  field2text: string;
  field3text: string;
  field4text: string;
}

export interface LoginFormProps {
  onSubmit: (values: any) => void;
  field1: boolean;
  field2: boolean;
  field1text: string;
  field2text: string;
}
