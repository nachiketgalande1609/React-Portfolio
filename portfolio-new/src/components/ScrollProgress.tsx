// components/ScrollProgress.tsx
import React, { useState, useEffect } from "react";
import "./../styles/ScrollProgress.css";

const ScrollProgress: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("home");

    const sections = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "testimonials", label: "Testimonials" },
        { id: "contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            // Calculate scroll progress
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);

            // Determine active section
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
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

    const handleSectionClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={`scroll-progress`}>
            <div className="progress-track" onClick={handleProgressClick}>
                <div className="progress-fill" style={{ height: `${scrollProgress}%` }}>
                    <div className="progress-glow" />
                    <div className="progress-dot" />
                </div>

                <div className="section-markers">
                    {sections.map((section, index) => {
                        const position = (index / (sections.length - 1)) * 100;
                        return (
                            <div
                                key={section.id}
                                className={`section-marker ${activeSection === section.id ? "active" : ""}`}
                                style={{ top: `${position}%` }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSectionClick(section.id);
                                }}
                                title={section.label}
                            >
                                <div className="marker-dot" />
                                <div className="marker-label">{section.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ScrollProgress;
