import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { personalInfo } from "../../data/portfolioData";
import { GitHub, LinkedIn } from "@mui/icons-material";

import "./Footer.css";

const useVisitorCount = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://api.countapi.xyz/hit/nachiketgalande.vercel.app/visits")
            .then((r) => r.json())
            .then((d) => setCount(d.value))
            .catch(() => {});
    }, []);

    return count;
};

const NAV_LINKS = [
    { label: "Home",         id: "home" },
    { label: "About",        id: "about" },
    { label: "Skills",       id: "skills" },
    { label: "Experience",   id: "experience" },
    { label: "Projects",     id: "projects" },
    { label: "Certificates", id: "certificates" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact",      id: "contact" },
];

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const visitorCount = useVisitorCount();
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (id: string) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: id } });
        } else {
            if (id === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <footer id="footer" className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-info">
                        <h3 className="footer-name">{personalInfo.name}</h3>
                        <p className="footer-role">Senior Full Stack Developer</p>
                        <div className="social-links">
                            <a href="https://github.com/nachiketgalande1609" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile">
                                <GitHub aria-hidden="true" />
                            </a>
                            <a href="https://www.linkedin.com/in/nachiketgalande/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn profile">
                                <LinkedIn aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-wrapper">
                        <div className="footer-links-group">
                            <h4>Navigation</h4>
                            <div className="footer-links">
                                {NAV_LINKS.slice(0, 4).map(({ label, id }) => (
                                    <button key={id} className="footer-link" onClick={() => handleNavClick(id)}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="footer-links-group">
                            <h4>Resources</h4>
                            <div className="footer-links">
                                {NAV_LINKS.slice(4).map(({ label, id }) => (
                                    <button key={id} className="footer-link" onClick={() => handleNavClick(id)}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        &copy; {currentYear} {personalInfo.name}. All rights reserved.
                    </p>
                    <div className="footer-message">
                        <span>Crafted with precision & passion</span>
                    </div>
                    {visitorCount !== null && (
                        <p className="footer-visitor-count">
                            <span className="footer-visitor-dot" aria-hidden="true" />
                            {visitorCount.toLocaleString()} visitors
                        </p>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
