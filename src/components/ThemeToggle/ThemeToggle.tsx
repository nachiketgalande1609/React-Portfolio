import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            className={`theme-toggle ${isDark ? "is-dark" : "is-light"}`}
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={!isDark}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-thumb">
                    {isDark ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
                </span>
            </span>
        </button>
    );
};

export default ThemeToggle;
