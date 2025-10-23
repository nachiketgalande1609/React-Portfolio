import React, { useState, useEffect } from "react";
import { Home as HomeIcon, Person as PersonIcon, Code as CodeIcon, Work as WorkIcon, Email as EmailIcon } from "@mui/icons-material";
import "./../styles/Header.css";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "projects", "contact"];
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
            icon: <HomeIcon />,
        },
        {
            id: "about",
            label: "About",
            icon: <PersonIcon />,
        },
        {
            id: "skills",
            label: "Skills",
            icon: <CodeIcon />,
        },
        {
            id: "projects",
            label: "Projects",
            icon: <WorkIcon />,
        },
        {
            id: "contact",
            label: "Contact",
            icon: <EmailIcon />,
        },
    ];

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
            <nav className="nav-dock" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                {navItems.map((item) => (
                    <div key={item.id} className="nav-item-wrapper">
                        <button
                            className={`nav-item ${activeSection === item.id ? "active" : ""} ${isHovering ? "hover-visible" : ""}`}
                            onClick={() => scrollToSection(item.id)}
                            aria-label={item.label}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-tooltip">{item.label}</span>
                        </button>
                    </div>
                ))}

                {/* Animated background highlight */}
                <div className="dock-highlight" />
            </nav>
        </header>
    );
};

export default Header;
