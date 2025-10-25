import React from "react";
import { personalInfo } from "../data/portfolioData";
import "../styles/Footer.css";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-info">
                        <h3 className="footer-name">{personalInfo.name}</h3>
                        <p className="footer-role">Senior Full Stack Developer</p>
                    </div>

                    <div className="footer-links">
                        {["Home", "About", "Skills", "Experience", "Projects", "Testimonials", "Contact"].map((link) => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-copyright">
                        &copy; {currentYear} {personalInfo.name}. All rights reserved.
                    </p>
                    <div className="footer-message">
                        <span>Crafted with precision</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
