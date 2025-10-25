import React, { useState, useEffect } from "react";
import "./../styles/Header.css";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "experience", "projects", "contact"];
            const current = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (current) {
                setActiveSection(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setActiveSection(sectionId);
    };

    const navItems = [
        {
            id: "home",
            label: "Home",
            icon: "Home",
        },
        {
            id: "about",
            label: "About",
            icon: "About",
        },
        {
            id: "skills",
            label: "Skills",
            icon: "Skills",
        },
        {
            id: "experience",
            label: "Experience",
            icon: "Experience",
        },
        {
            id: "projects",
            label: "Projects",
            icon: "Work",
        },
        {
            id: "contact",
            label: "Contact",
            icon: "Contact",
        },
    ];

    // Calculate active indicator position
    const getActiveIndicatorPosition = () => {
        const activeIndex = navItems.findIndex((item) => item.id === activeSection);
        const itemWidth = 80; // nav-item width
        const gap = 4; // gap between items
        const indicatorWidth = 50; // active-indicator width

        // Calculate the position for the active indicator to be centered
        const position = activeIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
        return position;
    };

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
            <nav className="nav-dock" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                {/* Active indicator bar */}
                <div
                    className="active-indicator"
                    style={{
                        transform: `translateX(${getActiveIndicatorPosition()}px)`,
                    }}
                />

                {navItems.map((item) => (
                    <div key={item.id} className="nav-item-wrapper">
                        <button
                            className={`nav-item ${activeSection === item.id ? "active" : ""} ${isHovering ? "hover-visible" : ""}`}
                            onClick={() => scrollToSection(item.id)}
                            aria-label={item.label}
                        >
                            <span className="nav-text">{item.icon}</span>
                            <span className="nav-tooltip">{item.label}</span>
                        </button>
                    </div>
                ))}

                {/* Glass morphism background */}
                <div className="glass-overlay" />
            </nav>
        </header>
    );
};

export default Header;
