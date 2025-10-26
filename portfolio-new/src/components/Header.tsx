import React, { useState, useEffect, useRef } from "react";
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

    // State to hold the dynamic style for the indicator
    const [indicatorStyle, setIndicatorStyle] = useState({});

    // Refs for nav items - fixed type definition
    const mainNavRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const moreTabRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "experience", "projects", "certificates", "testimonials", "contact"];
            const viewportMiddle = window.innerHeight / 2;
            let currentSection = sections[0];

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the middle of the section is within the viewport middle
                    // OR if the entire section is visible and its top is within the viewport.
                    // This creates a more robust active section detection.
                    if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        // Also trigger on load in case the page is already scrolled
        handleScroll();

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
        // setActiveSection(sectionId); // Let scroll handler update this to avoid flicker
        setIsMoreOpen(false);
    };

    const handleMoreClick = () => {
        setIsMoreOpen(!isMoreOpen);
    };

    const handleLinksClick = () => {
        setIsLinksModalOpen(true);
        setIsMoreOpen(false); // Close dropdown when modal opens
    };

    const handleUsesClick = () => {
        setIsUsesModalOpen(true);
        setIsMoreOpen(false); // Close dropdown when modal opens
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const moreWrapper = document.querySelector(".more-wrapper");
            // If the clicked element is not inside the more-wrapper, close the dropdown
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
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
    ];

    const dropdownNavItems = [
        { id: "certificates", label: "Certificates" },
        { id: "testimonials", label: "Testimonials" },
        { id: "contact", label: "Contact" },
        { id: "uses", label: "Uses", action: handleUsesClick },
        { id: "links", label: "Links", action: handleLinksClick },
    ];

    // Determine if any dropdown item is the active section
    const isDropdownActive = dropdownNavItems.some((item) => item.id === activeSection);

    // NEW: useEffect to calculate indicator position dynamically
    useEffect(() => {
        const calculateIndicatorPosition = () => {
            let activeElement: HTMLButtonElement | null = null;
            const sectionsWithoutMainIndicator = ["certificates", "testimonials", "contact", "uses", "links"];

            const shouldHideMainIndicator = sectionsWithoutMainIndicator.includes(activeSection);

            if (shouldHideMainIndicator) {
                // If it's one of these sections, hide the main indicator
                setIndicatorStyle({
                    width: "0px",
                    transform: "translateX(0px)",
                });
                return; // Exit early
            }

            if (isDropdownActive) {
                activeElement = moreTabRef.current;
            } else {
                const activeIndex = mainNavItems.findIndex((item) => item.id === activeSection);
                if (activeIndex !== -1) {
                    activeElement = mainNavRefs.current[activeIndex];
                }
            }

            if (activeElement) {
                const { offsetLeft, offsetWidth } = activeElement;

                setIndicatorStyle({
                    transform: `translateX(${offsetLeft}px)`,
                    width: `${offsetWidth - (25 / 100) * offsetWidth}px`,
                });
            } else {
                // If no active element is found (e.g., on initial render before scroll update),
                // you might want to hide the indicator or place it at a default position.
                // For now, we'll ensure it has a default state or is hidden.
                setIndicatorStyle({
                    width: "0px",
                    transform: "translateX(0px)",
                });
            }
        };

        // Recalculate on activeSection change, mobile state change, or dropdown activation
        calculateIndicatorPosition();

        // Recalculate on resize
        window.addEventListener("resize", calculateIndicatorPosition);
        return () => window.removeEventListener("resize", calculateIndicatorPosition);
    }, [activeSection, isMobile, isDropdownActive, mainNavItems]); // Dependencies ensure this runs when relevant state changes

    return (
        <>
            <header className={`header ${isScrolled ? "scrolled" : ""} ${isMobile ? "mobile" : ""}`}>
                <nav
                    className="nav-dock"
                    onMouseEnter={() => !isMobile && setIsHovering(true)}
                    onMouseLeave={() => !isMobile && setIsHovering(false)}
                >
                    {/* Active indicator bar - now uses style from state */}
                    <div className="active-indicator" style={indicatorStyle} />

                    {mainNavItems.map((item, index) => (
                        <div key={item.id} className="nav-item-wrapper">
                            <button
                                // Fixed ref callback - returns void instead of the element
                                ref={(el) => {
                                    mainNavRefs.current[index] = el;
                                }}
                                className={`nav-item ${activeSection === item.id ? "active" : ""} ${isHovering ? "hover-visible" : ""}`}
                                onClick={() => scrollToSection(item.id)}
                                aria-label={item.label}
                            >
                                <span className="nav-text">{item.label}</span>
                                <span className="nav-tooltip">{item.label}</span>
                            </button>
                        </div>
                    ))}

                    <div className="nav-item-wrapper more-wrapper">
                        <button
                            // Fixed ref callback
                            ref={(el) => {
                                moreTabRef.current = el;
                            }}
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
                    {/* Removed the extra glass-overlay div as it's now handled by ::before on .nav-dock */}
                </nav>
            </header>

            <LinksModal isOpen={isLinksModalOpen} onClose={() => setIsLinksModalOpen(false)} />
            <UsesModal isOpen={isUsesModalOpen} onClose={() => setIsUsesModalOpen(false)} />
        </>
    );
};

export default Header;
