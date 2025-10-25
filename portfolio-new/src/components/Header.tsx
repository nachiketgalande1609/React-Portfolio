import React, { useState, useEffect } from "react";
import "./../styles/Header.css";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

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
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkMobile);
        };
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
        },
        {
            id: "about",
            label: "About",
        },
        {
            id: "skills",
            label: "Skills",
        },
        {
            id: "experience",
            label: "Experience",
        },
        {
            id: "projects",
            label: "Projects",
        },
        {
            id: "contact",
            label: "Contact",
        },
    ];

    // Calculate active indicator position
    const getActiveIndicatorPosition = () => {
        const activeIndex = navItems.findIndex((item) => item.id === activeSection);

        if (isMobile) {
            const itemWidth = 60; // mobile nav-item width
            const gap = 2; // reduced gap for mobile
            const indicatorWidth = 40; // smaller indicator for mobile

            return activeIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
        } else {
            const itemWidth = 80;
            const gap = 4;
            const indicatorWidth = 50;

            return activeIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
        }
    };

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""} ${isMobile ? "mobile" : ""}`}>
            <nav className="nav-dock" onMouseEnter={() => !isMobile && setIsHovering(true)} onMouseLeave={() => !isMobile && setIsHovering(false)}>
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
                            <span className="nav-text">{item.label}</span>
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
