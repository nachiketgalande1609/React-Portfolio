// components/AnimatedBackground.tsx
import React, { useEffect } from "react";
import "./AnimatedBackground.css";

const AnimatedBackground: React.FC = () => {
    useEffect(() => {
        let rafId = 0;

        const handleMouseMove = (e: MouseEvent) => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;

                document.documentElement.style.setProperty("--mouse-x", `${x}%`);
                document.documentElement.style.setProperty("--mouse-y", `${y}%`);
                rafId = 0;
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return <div className="animated-background" />;
};

export default AnimatedBackground;
