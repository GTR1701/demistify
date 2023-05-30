import { useMemo, useState, useContext } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import { amber, blue, green, grey, purple } from "@mui/material/colors";
import { ThemeContext } from "@/lib/context";
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

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
