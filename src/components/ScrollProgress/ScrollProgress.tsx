// components/ScrollProgress.tsx
import React, { useState, useEffect } from "react";
import "./ScrollProgress.css";

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", throttledScroll);
        };
    }, []);

    const handleProgressClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const percentage = clickY / rect.height;

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = percentage * totalHeight;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });
    };

    return (
        <div className={`scroll-progress`}>
            <div className="progress-track" onClick={handleProgressClick}>
                <div className="progress-fill" style={{ height: `${scrollProgress}%` }}>
                    <div className="progress-glow" />
                    <div className="progress-dot" />
                </div>
            </div>
        </div>
    );
};

export default ScrollProgress;
