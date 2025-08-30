import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

export const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9", // engil ko'k
      },
      background: {
        default: "#0c1c23",     // asosiy fon rangi
        paper: "#0c1c23",        // karta, nav, modal fon rangi
      },
      text: {
        primary: "#ffffff",      // asosiy matn rangi
        secondary: "#aaaaaa",    // ikkilamchi matn
      },
    },
  });