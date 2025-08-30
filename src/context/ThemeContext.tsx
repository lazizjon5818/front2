import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { darkTheme, lightTheme } from "../theme/theme";

type ThemeMode = "light" | "dark";

const ThemeContext = createContext({
  toggleTheme: () => {},
  mode: "light" as ThemeMode,
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        {/* 🔹 Global CSS transition for theme switch */}
        <GlobalStyles
          styles={{
            body: {
              transition: "background-color 0.8s ease, color 0.8s ease",
            },
            "*": {
              transition:
                "background-color 0.8s ease, color 0.8s ease, border-color 0.8s ease",
            },
          }}
        />

        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
