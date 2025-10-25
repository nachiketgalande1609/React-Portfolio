import React, { useState, useEffect } from "react";
import "./../styles/Header.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinksModal from "./LinksModal";
import UsesModal from "./UsesModal";

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
    const [isUsesModalOpen, setIsUsesModalOpen] = useState(false);

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
        setIsMoreOpen(false); // Close dropdown when navigating
    };

    const handleMoreClick = () => {
        setIsMoreOpen(!isMoreOpen);
    };

    const handleLinksClick = () => {
        setIsLinksModalOpen(true);
        setIsMoreOpen(false);
    };

    const handleUsesClick = () => {
        setIsUsesModalOpen(true);
        setIsMoreOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const moreWrapper = document.querySelector(".more-wrapper");
            if (moreWrapper && !moreWrapper.contains(event.target as Node)) {
                setIsMoreOpen(false);
            }
        };

        if (isMoreOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMoreOpen]);

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
            const itemWidth = 60;
            const gap = 2;
            const indicatorWidth = 40;

            return activeIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
        } else {
            const itemWidth = 80;
            const gap = 4;
            const indicatorWidth = 50;

            return activeIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
        }
    };

    return (
        <>
            <header className={`header ${isScrolled ? "scrolled" : ""} ${isMobile ? "mobile" : ""}`}>
                <nav
                    className="nav-dock"
                    onMouseEnter={() => !isMobile && setIsHovering(true)}
                    onMouseLeave={() => !isMobile && setIsHovering(false)}
                >
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

                    {/* More Tab with Dropdown - Click only */}
                    <div className="nav-item-wrapper more-wrapper">
                        <button
                            className={`nav-item more-tab ${isMoreOpen ? "open" : ""}`}
                            onClick={handleMoreClick}
                            aria-label="More options"
                            aria-expanded={isMoreOpen}
                        >
                            <span className="nav-text">More</span>
                            <span className="chevron-icon">
                                <ExpandMoreIcon fontSize="small" />
                            </span>
                            <span className="nav-tooltip">More Options</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isMoreOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" onClick={handleUsesClick}>
                                    <span>Uses</span>
                                </button>
                                <button className="dropdown-item" onClick={handleLinksClick}>
                                    <span>Links</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Glass morphism background */}
                    <div className="glass-overlay" />
                </nav>
            </header>

            {/* Links Modal */}
            <LinksModal isOpen={isLinksModalOpen} onClose={() => setIsLinksModalOpen(false)} />
            {/* Uses Modal */}
            <UsesModal isOpen={isUsesModalOpen} onClose={() => setIsUsesModalOpen(false)} />
        </>
    );
};

export default Header;
