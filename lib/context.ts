import { createContext } from "react";

export const ThemeContext = createContext({
  toggleColorMode: () => {},
});

export const AccordionContext = createContext({
  accordionState: true,
  setAccordionState: (state: boolean) => {},
});

export const UserContext = createContext({ uid: "", username: "" });
