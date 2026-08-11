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
    const isDark = theme === "dark";

    const handleClick = () => {
        if (phase !== "idle") return;

        const rect = buttonRef.current?.getBoundingClientRect();
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
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

        // After icon exits, start the page spread
        setTimeout(() => {
            const vt = (document as any).startViewTransition;

            // ── Fallback: no View Transition API support ──────────────────
            if (!vt) {
                setTheme(newTheme);
                setPhase("enter");
                setTimeout(() => setPhase("idle"), 420);
                return;
            }

            // ── View Transition ───────────────────────────────────────────
            // Minimal callback: only update the CSS-variable source attribute.
            // Keeping React out of the callback avoids flushSync conflicts
            // with the scheduler and prevents InvalidStateError.
            const transition = vt.call(document, () => {
                document.documentElement.setAttribute("data-theme", newTheme);
                try { localStorage.setItem(STORAGE_KEY, newTheme); } catch {}
            });

            // Sync React state after the DOM has been captured for the VT snapshot.
            // ::view-transition-new(root) is the live layer — it updates as React
            // re-renders with the new theme, so content is visible during the transition.
            // Using .then(fn, fn) handles both resolve and reject without double-calling.
            const syncReact = () => {
                setTheme(newTheme);
                setPhase("enter");
                setTimeout(() => setPhase("idle"), 420);
            };
            transition.updateCallbackDone?.then(syncReact, syncReact);

            // Suppress unhandled rejection on transition.finished
            transition.finished?.catch(() => {});

            // Animate the new-state layer as a circle expanding from the button
            transition.ready
                .then(() => {
                    document.documentElement.animate(
                        {
                            clipPath: [
                                `circle(0px at ${x}px ${y}px)`,
                                `circle(${radius}px at ${x}px ${y}px)`,
                            ],
                        },
                        {
                            duration: 600,
                            easing: "ease-in-out",
                            pseudoElement: "::view-transition-new(root)",
                        }
                    );
                })
                .catch(() => {
                    // transition.ready rejected — VT was skipped.
                    // Theme + React state already synced via updateCallbackDone handler.
                });
        }, 200);
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
