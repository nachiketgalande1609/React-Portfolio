import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

import LinksModal from "./LinksModal/LinksModal";

const mainNavItemsConfig = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
];

interface DropdownNavItem {
    id: string;
    label: string;
    isRoute?: boolean;
    isModal?: boolean;
}

const dropdownNavItemsConfig: DropdownNavItem[] = [
    { id: "certificates", label: "Certifications" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
    { id: "github", label: "GitHub", isRoute: true },
    { id: "timeline", label: "Timeline", isRoute: true },
    { id: "links", label: "Links", isModal: true },
];

// Viewport width at which all items fit inline (no More dropdown)
const FULL_NAV_BREAKPOINT = 1100;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isGitHubPage = location.pathname === "/github";
    const isTimelinePage = location.pathname === "/timeline";

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isFullNav, setIsFullNav] = useState(window.innerWidth >= FULL_NAV_BREAKPOINT);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const mobilePillRef = useRef<HTMLDivElement | null>(null);
    const mobileDropdownRef = useRef<HTMLDivElement | null>(null);

    const [indicatorStyle, setIndicatorStyle] = useState({});

    const mainNavRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const extraNavRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const moreTabRef = useRef<HTMLButtonElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkViewport = () => {
            setIsMobile(window.innerWidth <= 768);
            const full = window.innerWidth >= FULL_NAV_BREAKPOINT;
            setIsFullNav(full);
            if (full) setIsMoreOpen(false);
        };

        checkViewport();
        window.addEventListener("resize", checkViewport);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ["home", "about", "skills", "experience", "projects", "certificates", "testimonials", "contact"];
            const viewportMiddle = window.innerHeight / 2;
            let currentSection = sections[0];

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
                        currentSection = section;
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", checkViewport);
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        if (isGitHubPage || isTimelinePage) {
            navigate("/", { state: { scrollTo: sectionId } });
            return;
        }
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIsMoreOpen(false);
    };

    const handleMoreClick = () => {
        setIsMoreOpen(!isMoreOpen);
    };

    const handleLinksClick = useCallback(() => {
        setIsLinksModalOpen(true);
        setIsMoreOpen(false);
    }, []);

    const updateDropdownPos = useCallback(() => {
        if (moreTabRef.current) {
            const rect = moreTabRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + 12,
                right: window.innerWidth - rect.right,
            });
        }
    }, []);

    useEffect(() => {
        if (isMoreOpen) {
            updateDropdownPos();
            window.addEventListener("scroll", updateDropdownPos, { passive: true });
            window.addEventListener("resize", updateDropdownPos);
        }
        return () => {
            window.removeEventListener("scroll", updateDropdownPos);
            window.removeEventListener("resize", updateDropdownPos);
        };
    }, [isMoreOpen, updateDropdownPos]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const moreWrapper = document.querySelector(".more-wrapper");
            const insideWrapper = moreWrapper?.contains(event.target as Node);
            const insideDropdown = dropdownRef.current?.contains(event.target as Node);
            if (!insideWrapper && !insideDropdown) {
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const insidePill = mobilePillRef.current?.contains(event.target as Node);
            const insideDropdown = mobileDropdownRef.current?.contains(event.target as Node);
            if (!insidePill && !insideDropdown) {
                setHamburgerOpen(false);
            }
        };

        if (hamburgerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hamburgerOpen]);

    const mainNavItems = useMemo(() => mainNavItemsConfig, []);
    const dropdownNavItems = dropdownNavItemsConfig;

    const isDropdownActive = isGitHubPage || isTimelinePage || dropdownNavItems.some((item) => item.id === activeSection);

    useEffect(() => {
        const calculateIndicatorPosition = () => {
            let activeElement: HTMLButtonElement | null = null;

            if (isGitHubPage || isTimelinePage) {
                const routeId = isGitHubPage ? "github" : "timeline";
                if (isFullNav) {
                    const idx = dropdownNavItems.findIndex((item) => item.id === routeId);
                    if (idx !== -1) activeElement = extraNavRefs.current[idx];
                } else {
                    activeElement = moreTabRef.current;
                }
            } else if (isDropdownActive) {
                if (isFullNav) {
                    // All items are visible — point indicator at the actual dropdown button
                    const activeIdx = dropdownNavItems.findIndex((item) => item.id === activeSection);
                    if (activeIdx !== -1) activeElement = extraNavRefs.current[activeIdx];
                } else {
                    // Collapsed — point indicator at the More tab
                    activeElement = moreTabRef.current;
                }
            } else {
                const activeIndex = mainNavItems.findIndex((item) => item.id === activeSection);
                if (activeIndex !== -1) {
                    activeElement = mainNavRefs.current[activeIndex];
                }
            }

            if (activeElement) {
                const navDock = activeElement.closest('.nav-dock') as HTMLElement;
                if (!navDock) return;

                const header = navDock.closest('.header') as HTMLElement;
                let scale = 1;
                if (header) {
                    const m = window.getComputedStyle(header).transform.match(/matrix\(([^,]+)/);
                    if (m) scale = parseFloat(m[1]) || 1;
                }

                const navDockRect = navDock.getBoundingClientRect();
                const btnRect = activeElement.getBoundingClientRect();

                const btnCenterLayout = ((btnRect.left + btnRect.right) / 2 - navDockRect.left) / scale;
                const indicatorWidth = (btnRect.width / scale) * 0.75;

                setIndicatorStyle({
                    transform: `translateX(${btnCenterLayout - indicatorWidth / 2}px)`,
                    width: `${indicatorWidth}px`,
                });
            } else {
                setIndicatorStyle({ width: "0px", transform: "translateX(0px)" });
            }
        };

        calculateIndicatorPosition();
        window.addEventListener("resize", calculateIndicatorPosition);
        return () => window.removeEventListener("resize", calculateIndicatorPosition);
    }, [activeSection, isMobile, isFullNav, isDropdownActive, mainNavItems, dropdownNavItems, isGitHubPage, isTimelinePage]);

    const allNavItems = [...mainNavItems.map(i => ({ ...i, isRoute: false, isModal: false })), ...dropdownNavItems];

    if (isMobile) {
        return (
            <>
                <header className={`header ${isScrolled ? "scrolled" : ""} mobile`}>
                    <div ref={mobilePillRef} className="mobile-nav-buttons">
                        <div className="mobile-btn-wrap"><ThemeToggle /></div>
                        <div className="mobile-btn-wrap">
                            <button
                                className={`hamburger-btn ${hamburgerOpen ? "open" : ""}`}
                                onClick={() => setHamburgerOpen(o => !o)}
                                aria-label="Open menu"
                                aria-expanded={hamburgerOpen}
                            >
                                <svg className="hamburger-icon" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect className="hline hline-1" x="0" y="0" width="18" height="2" rx="1" />
                                    <rect className="hline hline-2" x="0" y="6" width="18" height="2" rx="1" />
                                    <rect className="hline hline-3" x="0" y="12" width="18" height="2" rx="1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {hamburgerOpen && createPortal(
                    <div
                        ref={mobileDropdownRef}
                        className="mobile-dropdown"
                    >
                        {allNavItems.map((item) => {
                            const isActive = item.id === "github" ? isGitHubPage
                                : item.id === "timeline" ? isTimelinePage
                                : !isGitHubPage && !isTimelinePage && activeSection === item.id;
                            const onClick = item.isRoute ? () => { navigate(`/${item.id}`); setHamburgerOpen(false); }
                                : item.isModal ? () => { setIsLinksModalOpen(true); setHamburgerOpen(false); }
                                : () => { scrollToSection(item.id); setHamburgerOpen(false); };
                            return (
                                <button
                                    key={item.id}
                                    className={`dropdown-item ${isActive ? "active" : ""}`}
                                    onClick={onClick}
                                >
                                    <span>{item.label}</span>
                                    {item.id === "links" && <ChevronRightIcon className="dropdown-chevron" fontSize="small" />}
                                    {isActive && <div className="dropdown-active-indicator" />}
                                </button>
                            );
                        })}
                    </div>,
                    document.body
                )}

                <LinksModal isOpen={isLinksModalOpen} onClose={() => setIsLinksModalOpen(false)} />
            </>
        );
    }

    return (
        <>
            <header className={`header ${isScrolled ? "scrolled" : ""} ${isMobile ? "mobile" : ""}`}>
                <nav
                    className="nav-dock"
                    onMouseEnter={() => !isMobile && setIsHovering(true)}
                    onMouseLeave={() => !isMobile && setIsHovering(false)}
                >
                    <div className="active-indicator" style={indicatorStyle} />

                    {mainNavItems.map((item, index) => (
                        <div key={item.id} className="nav-item-wrapper">
                            <button
                                ref={(el) => { mainNavRefs.current[index] = el; }}
                                className={`nav-item ${!isGitHubPage && activeSection === item.id ? "active" : ""} ${isHovering ? "hover-visible" : ""}`}
                                onClick={() => scrollToSection(item.id)}
                                aria-label={item.label}
                            >
                                <span className="nav-text">{item.label}</span>
                                <span className="nav-tooltip">{item.label}</span>
                            </button>
                        </div>
                    ))}

                    {isFullNav ? (
                        dropdownNavItems.map((item, index) => {
                            const isActive = item.id === "github" ? isGitHubPage
                                : item.id === "timeline" ? isTimelinePage
                                : !isGitHubPage && !isTimelinePage && activeSection === item.id;
                            const onClick = "isRoute" in item ? () => { navigate(`/${item.id}`); setIsMoreOpen(false); }
                                : "isModal" in item ? handleLinksClick
                                : () => scrollToSection(item.id);
                            const isPageNav = !!(item.isRoute || item.isModal);
                            const isFirstPageNav = isPageNav && !dropdownNavItems.slice(0, index).some(i => i.isRoute || i.isModal);
                            return (
                                <React.Fragment key={item.id}>
                                    {isFirstPageNav && <div className="nav-page-separator" aria-hidden="true" />}
                                    <div className="nav-item-wrapper">
                                        <button
                                            ref={(el) => { extraNavRefs.current[index] = el; }}
                                            className={`nav-item ${isActive ? "active" : ""} ${isHovering ? "hover-visible" : ""} ${isPageNav ? "nav-item--page" : ""}`}
                                            onClick={onClick}
                                            aria-label={item.label}
                                        >
                                            <span className="nav-text">{item.label}</span>
                                            <span className="nav-tooltip">{item.label}</span>
                                        </button>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        // Narrow: More dropdown
                        <div className="nav-item-wrapper more-wrapper">
                            <button
                                ref={(el) => { moreTabRef.current = el; }}
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

                            {isMoreOpen && createPortal(
                                <div
                                    ref={dropdownRef}
                                    className="dropdown-menu"
                                    style={{ position: "fixed", top: dropdownPos.top, right: dropdownPos.right }}
                                >
                                    {dropdownNavItems.map((item) => {
                                        const isActive = item.id === "github" ? isGitHubPage
                                            : item.id === "timeline" ? isTimelinePage
                                            : activeSection === item.id;
                                        const onClick = "isRoute" in item ? () => { navigate(`/${item.id}`); setIsMoreOpen(false); }
                                            : "isModal" in item ? handleLinksClick
                                            : () => scrollToSection(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                className={`dropdown-item ${isActive ? "active" : ""}`}
                                                onClick={onClick}
                                            >
                                                <span>{item.label} </span>
                                                {item.id === "links" && <ChevronRightIcon className="dropdown-chevron" fontSize="small" />}
                                                {isActive && <div className="dropdown-active-indicator" />}
                                            </button>
                                        );
                                    })}
                                </div>,
                                document.body
                            )}
                        </div>
                    )}
                </nav>
            </header>

            <LinksModal isOpen={isLinksModalOpen} onClose={() => setIsLinksModalOpen(false)} />
        </>
    );
};

export default Header;
