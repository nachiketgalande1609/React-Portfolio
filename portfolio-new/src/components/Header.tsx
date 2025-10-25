import React, { useState, useEffect } from "react";
import "./../styles/Header.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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

    console.log("xxx", activeSection);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "experience", "projects", "testimonials", "contact"];
            const viewportMiddle = window.innerHeight / 2;
            let currentSection = sections[0];

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if viewport middle is within this section
                    if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
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

    const mainNavItems = [
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
    ];

    const dropdownNavItems = [
        {
            id: "testimonials",
            label: "Testimonials",
        },
        {
            id: "contact",
            label: "Contact",
        },
        {
            id: "uses",
            label: "Uses",
            action: handleUsesClick,
        },
        {
            id: "links",
            label: "Links",
            action: handleLinksClick,
        },
    ];

    // Check if any dropdown item is active
    const isDropdownActive = dropdownNavItems.some((item) => item.id === activeSection);

    // Calculate active indicator position
    const getActiveIndicatorPosition = () => {
        // If active section is in dropdown, position indicator on "More" tab
        if (isDropdownActive) {
            if (isMobile) {
                const itemWidth = 60;
                const gap = 2;
                const indicatorWidth = 40;
                const moreTabIndex = mainNavItems.length;

                return moreTabIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
            } else {
                const itemWidth = 80;
                const gap = 4;
                const indicatorWidth = 50;
                const moreTabIndex = mainNavItems.length;

                return moreTabIndex * (itemWidth + gap) + (itemWidth - indicatorWidth) / 2;
            }
        }

        // Otherwise, position indicator on main nav items
        const activeIndex = mainNavItems.findIndex((item) => item.id === activeSection);

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

                    {mainNavItems.map((item) => (
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
                            className={`nav-item more-tab ${isMoreOpen ? "open" : ""} ${isDropdownActive ? "active" : ""}`}
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
                                {dropdownNavItems.map((item) => (
                                    <button
                                        key={item.id}
                                        className={`dropdown-item ${activeSection === item.id ? "active" : ""}`}
                                        onClick={item.action ? item.action : () => scrollToSection(item.id)}
                                    >
                                        <span>{item.label} </span>
                                        {(item.id === "uses" || item.id === "links") && (
                                            <ChevronRightIcon className="dropdown-chevron" fontSize="small" />
                                        )}

                                        {activeSection === item.id && <div className="dropdown-active-indicator" />}
                                    </button>
                                ))}
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
