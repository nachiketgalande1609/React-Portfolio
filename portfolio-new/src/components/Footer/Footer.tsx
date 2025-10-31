import React from "react";
import { personalInfo } from "../../data/portfolioData"; // Assuming personalInfo is available
import { GitHub, LinkedIn, X } from "@mui/icons-material";

import "./Footer.css";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-info">
                        <h3 className="footer-name">{personalInfo.name}</h3>
                        <p className="footer-role">Senior Full Stack Developer</p>
                        <div className="social-links">
                            <a href="https://github.com/nachiketgalande1609" target="_blank" rel="noopener noreferrer" className="social-link">
                                <GitHub />
                            </a>
                            <a href="https://www.linkedin.com/in/nachiketgalande/" target="_blank" rel="noopener noreferrer" className="social-link">
                                <LinkedIn />
                            </a>
                            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-link">
                                <X />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h4>Navigation</h4>
                        <div className="footer-links">
                            {["Home", "About", "Skills", "Experience"].map((link) => (
                                <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h4>Resources</h4>
                        <div className="footer-links">
                            {["Projects", "Certificates", "Testimonials", "Contact"].map((link) => (
                                <a key={link} href={`#${link.toLowerCase()}`} className="footer-link">
                                    {link}
                                </a>
                            ))}
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
                </div>
            </div>
        </footer>
    );
};

export default Footer;
