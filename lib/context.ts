import { createContext } from "react";

export const UserContext = createContext({ user: null, username: null });
export const ThemeContext = createContext({
  toggleColorMode: () => {},
});
