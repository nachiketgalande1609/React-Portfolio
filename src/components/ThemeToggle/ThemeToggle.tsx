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

        const finish = () => {
            setPhase("enter");
            setTimeout(() => setPhase("idle"), 350);
            busyRef.current = false;
        };

        // After icon exits, start the page spread
        setTimeout(() => {
            const vt = (document as any).startViewTransition;

            // ── Fallback: no View Transition API support ──────────────────
            if (!vt) {
                setTheme(newTheme);
                finish();
                return;
            }

            // Drop backdrop-filter blur for the duration of the transition.
            // Animating clip-path while dozens of blurred cards/navbar need to
            // resample their backdrop every frame is what causes the stutter.
            document.documentElement.classList.add("vt-active");

            // Circle origin/radius, read live by ::view-transition-new(root)'s
            // CSS keyframe animation (see ThemeToggle.css). Measured fresh on
            // every click so the circle always starts at the button's current
            // position, even if the layout shifted since the last toggle.
            document.documentElement.style.setProperty("--vt-x", `${x}px`);
            document.documentElement.style.setProperty("--vt-y", `${y}px`);
            document.documentElement.style.setProperty("--vt-r", `${radius}px`);

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
            transition.updateCallbackDone?.then(() => setTheme(newTheme), () => setTheme(newTheme));

            const cleanup = () => {
                document.documentElement.classList.remove("vt-active");
                finish();
            };

            // `finished` is the only promise guaranteed to settle after the whole
            // transition (including our circle animation) is done — that's what
            // clears busyRef, so the next click can never overlap this one.
            transition.finished.then(cleanup, cleanup);

            // `ready` rejects when the browser skips the transition outright
            // (e.g. reduced-motion, or another transition already active).
            // Nothing to animate in that case — `finished` above still settles
            // and drives cleanup — this just prevents an unhandled rejection.
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
