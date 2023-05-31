import { useMemo, useState, useContext } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import { amber, blue, green, grey, purple } from "@mui/material/colors";
import { ThemeContext, AccordionContext, UserContext } from "@/lib/context";
import Navbar from "@/components/Navbar";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: blue,
          divider: amber[200],
          background: {
            default: grey[50],
            paper: purple[400],
          },
          text: {
            primary: "#fff",
            secondary: grey[900],
          },
        }
      : {
          // palette values for dark mode
          primary: blue,
          divider: blue[700],
          background: {
            default: grey[900],
            paper: purple[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[900],
          },
          overrides: {
            MuiInputLabel: {
              root: {
                color: "rgba(255, 255, 255, 0.87)",
              },
            },
          },
        }),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const [accordionState, setAccordionState] = useState(false);

  return (
    <UserContext.Provider value={{ uid: "", username: "" }}>
      <ThemeContext.Provider value={colorMode}>
        <AccordionContext.Provider
          value={{ accordionState, setAccordionState }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Component {...pageProps} />
          </ThemeProvider>
        </AccordionContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
