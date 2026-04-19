import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ef5b2b",
      dark: "#c6461c",
      light: "#f48a67",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#111111",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ef5b2b",
      dark: "#c6461c",
      light: "#f48a67",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f7f3ec",
      paper: "#ffffff",
    },
    text: {
      primary: "#171717",
      secondary: "#4b5563",
    },
  },
  typography: {
    fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Aptos Display", "Trebuchet MS", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontFamily: '"Aptos Display", "Trebuchet MS", sans-serif',
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontFamily: '"Aptos Display", "Trebuchet MS", sans-serif',
      fontWeight: 700,
    },
    body2: {
      color: "#4b5563",
      lineHeight: 1.65,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        ":root": {
          "--sam-warning-main": themeParam.palette.warning.main,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 24,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
);
