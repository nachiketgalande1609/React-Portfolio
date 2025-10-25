// components/GlobalCursor.tsx
import React, { useEffect, useState } from "react";
import "../styles/GlobalCursor.css";

const GlobalCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });

            // Update CSS variables for interactive background
            document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
            document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
        };

        const handleMouseEnter = (e: Event) => {
            setCursorVariant("hover");
            document.body.classList.add("cursor-hover");
        };

        const handleMouseLeave = (e: Event) => {
            setCursorVariant("default");
            document.body.classList.remove("cursor-hover");
        };

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);

        // Add event listeners for interactive elements globally
        const interactiveElements = document.querySelectorAll(
            "button, a, .social-link, .btn, .interactive-element, [role='button'], input, textarea, select"
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);

            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Interactive Background */}
            <div className="interactive-bg" />

            {/* Global Custom Cursor */}
            <div
                className="global-cursor"
                style={{
                    transform: `translate3d(${mousePosition.x - 10}px, ${mousePosition.y - 10}px, 0)`,
                    scale: cursorVariant === "hover" ? 1.5 : 1,
                }}
            />
            <div
                className="global-cursor-follower"
                style={{
                    transform: `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0)`,
                    scale: cursorVariant === "hover" ? 1.2 : 1,
                }}
            />
        </>
    );
};

export default GlobalCursor;
