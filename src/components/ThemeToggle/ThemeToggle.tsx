import React, { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

type Phase = "idle" | "exit" | "enter";

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [phase, setPhase] = useState<Phase>("idle");
    const [rippleKey, setRippleKey] = useState(0);
    const [rippleBg, setRippleBg] = useState("");
    const isDark = theme === "dark";

    const handleClick = () => {
        if (phase !== "idle") return;
        setRippleBg(
            isDark
                ? "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)"
        );
        setRippleKey(k => k + 1);
        setPhase("exit");
        setTimeout(() => {
            toggleTheme();
            setPhase("enter");
            setTimeout(() => setPhase("idle"), 420);
        }, 200);
    };

    return (
        <button
            type="button"
            className={`theme-toggle ${isDark ? "is-dark" : "is-light"} phase-${phase}`}
            onClick={handleClick}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={!isDark}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className="tt-icon" aria-hidden="true">
                {isDark ? <DarkModeIcon /> : <LightModeIcon />}
            </span>
            {rippleKey > 0 && (
                <span
                    key={rippleKey}
                    className="tt-ripple"
                    style={{ background: rippleBg }}
                    aria-hidden="true"
                />
            )}
        </button>
    );
};

export default ThemeToggle;
