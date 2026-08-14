import React, { useState, useRef } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

type Phase = "idle" | "exit" | "enter";

const STORAGE_KEY = "portfolio-theme";

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [phase, setPhase] = useState<Phase>("idle");
    const [rippleKey, setRippleKey] = useState(0);
    const [rippleBg, setRippleBg] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    // Tracks whether a transition (icon animation + view transition) is still
    // in flight. Unlike `phase`, this isn't reset by a fixed timer — it only
    // clears once the underlying view transition actually finishes, so a new
    // click can never pile a second transition on top of an unfinished one.
    const busyRef = useRef(false);
    const isDark = theme === "dark";

    const handleClick = () => {
        if (busyRef.current) return;
        busyRef.current = true;

        const x = window.innerWidth + window.innerWidth * 0.25;
        const y = 0;
        const W = window.innerWidth;
        const H = window.innerHeight;
        const radius = Math.ceil(Math.hypot(Math.max(x, W - x), Math.max(y, H - y)));
        const newTheme: Theme = isDark ? "light" : "dark";
        const newRippleBg = isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 70%)";

        // Icon exit animation
        setPhase("exit");
        setRippleKey(k => k + 1);
        setRippleBg(newRippleBg);

        const finish = () => {
            setPhase("enter");
            setTimeout(() => setPhase("idle"), 350);
            busyRef.current = false;
        };

        setTimeout(() => {
            const vt = (document as any).startViewTransition;

            if (!vt) {
                setTheme(newTheme);
                finish();
                return;
            }

            document.documentElement.classList.add("vt-active");

            document.documentElement.style.setProperty("--vt-x", `${x}px`);
            document.documentElement.style.setProperty("--vt-y", `${y}px`);
            document.documentElement.style.setProperty("--vt-r", `${radius}px`);
            console.log(`VT origin: --vt-x=${x}px --vt-y=${y}px --vt-r=${radius}px`);

            const transition = vt.call(document, () => {
                document.documentElement.setAttribute("data-theme", newTheme);
                try { localStorage.setItem(STORAGE_KEY, newTheme); } catch {}
            });

            transition.updateCallbackDone?.then(() => setTheme(newTheme), () => setTheme(newTheme));

            const cleanup = () => {
                document.documentElement.classList.remove("vt-active");
                finish();
            };

            transition.finished.then(cleanup, cleanup);
            transition.ready.catch(() => {});
        }, 180);
    };

    return (
        <button
            ref={buttonRef}
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
