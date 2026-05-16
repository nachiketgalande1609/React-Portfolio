// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3b82f6",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </MuiThemeProvider>
        </ThemeProvider>
    </React.StrictMode>
);
