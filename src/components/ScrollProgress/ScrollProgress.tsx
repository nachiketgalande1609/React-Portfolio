import React, { useState, useEffect } from "react";
import "./ScrollProgress.css";

const sections = [
    { id: "home",         label: "Home" },
    { id: "about",        label: "About" },
    { id: "skills",       label: "Skills" },
    { id: "experience",   label: "Experience" },
    { id: "projects",     label: "Projects" },
    { id: "certificates", label: "Certificates" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact",      label: "Contact" },
    { id: "footer",       label: "Footer" },
];

const ScrollProgress: React.FC = () => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            // Use getBoundingClientRect so Framer Motion transforms are accounted for
            const threshold = window.innerHeight * 0.5;
            let current = sections[0].id;
            for (const s of sections) {
                const el = document.getElementById(s.id);
                if (el && el.getBoundingClientRect().top <= threshold) {
                    current = s.id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        const navDock = document.querySelector(".nav-dock") as HTMLElement;
        const navBottom = navDock ? navDock.getBoundingClientRect().bottom + 24 : 88;
        const top = el.getBoundingClientRect().top + window.scrollY - navBottom;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    return (
        <nav className="section-nav" aria-label="Page sections">
            <div className="section-nav-line" />
            {sections.map((s) => (
                <button
                    key={s.id}
                    className={`section-nav-item ${activeSection === s.id ? "active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                    aria-label={`Scroll to ${s.label}`}
                >
                    <span className="section-nav-label">{s.label}</span>
                    <span className="section-nav-dot" />
                </button>
            ))}
        </nav>
    );
};

export default ScrollProgress;
