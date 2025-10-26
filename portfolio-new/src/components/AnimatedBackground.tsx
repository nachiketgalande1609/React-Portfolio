// components/AnimatedBackground.tsx
import React, { useEffect, useRef } from "react";
import "../styles/AnimatedBackground.css";

const AnimatedBackground: React.FC = () => {
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;

            document.documentElement.style.setProperty("--mouse-x", `${x}%`);
            document.documentElement.style.setProperty("--mouse-y", `${y}%`);
        };

        const createParticles = () => {
            const container = backgroundRef.current;
            if (!container) return;

            // Clear existing particles
            const existingParticles = container.querySelectorAll(".particle");
            existingParticles.forEach((particle) => particle.remove());

            // Create more particles for starfield effect
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement("div");
                particle.className = "particle";

                // Random properties
                const size = Math.random() * 4 + 1;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const delay = Math.random() * 8;

                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${left}%`;
                particle.style.top = `${top}%`;
                particle.style.animationDelay = `${delay}s`;

                container.querySelector(".particles-container")?.appendChild(particle);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        createParticles();

        // Regenerate particles every 20 seconds
        const particleInterval = setInterval(createParticles, 20000);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(particleInterval);
        };
    }, []);

    return (
        <div className="animated-background" ref={backgroundRef}>
            {/* <div className="particles-container"></div> */}
        </div>
    );
};

export default AnimatedBackground;
