import React from "react";
import { personalInfo } from "../data/portfolioData";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-info">
                        <h3>{personalInfo.name}</h3>
                        <p>Full Stack Developer</p>
                    </div>

                    <div className="footer-links">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {currentYear} {personalInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background: var(--text-color);
                    color: white;
                    padding: 3rem 0 1rem;
                }

                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .footer-info h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .footer-info p {
                    color: #9ca3af;
                }

                .footer-links {
                    display: flex;
                    gap: 2rem;
                }

                .footer-links a {
                    color: #9ca3af;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-links a:hover {
                    color: white;
                }

                .footer-bottom {
                    border-top: 1px solid #374151;
                    padding-top: 1rem;
                    text-align: center;
                    color: #9ca3af;
                }

                @media (max-width: 768px) {
                    .footer-content {
                        flex-direction: column;
                        gap: 1.5rem;
                        text-align: center;
                    }

                    .footer-links {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
