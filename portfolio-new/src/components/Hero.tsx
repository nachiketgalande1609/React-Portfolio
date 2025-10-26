import React from "react";
import { personalInfo, socialLinks } from "../data/portfolioData";
import "../styles/Hero.css";

// Import MUI icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import WavingHandIcon from "@mui/icons-material/WavingHand";

// Import your images
import profileImage from "../assets/profile.png";
import resumeFile from "../assets/resume.pdf";

const Hero: React.FC = () => {
    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleResumeOpen = () => {
        window.open(resumeFile, "_blank", "noopener,noreferrer");
    };

    const handleConnect = () => {
        scrollToContact();
    };

    const getSocialIcon = (iconName: string) => {
        switch (iconName.toLowerCase()) {
            case "github":
                return <GitHubIcon />;
            case "linkedin":
                return <LinkedInIcon />;
            case "twitter":
                return <TwitterIcon />;
            case "email":
                return <EmailIcon />;
            default:
                return <span>{iconName}</span>;
        }
    };

    return (
        <section id="home" className="hero">
            {/* Background Elements */}
            <div className="hero-bg">
                <div className="bg-gradient"></div>
            </div>

            <div className="container">
                {/* Centered Job Seeking Badge */}
                <div className="job-seeking-badge">
                    <span>Open to Work</span>
                </div>

                <div className="hero-content">
                    {/* Text Content Section */}
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Hi, I'm <span className="highlight">{personalInfo.name}</span>
                        </h1>
                        <h2 className="hero-subtitle">{personalInfo.title}</h2>
                        <p className="hero-description">{personalInfo.about}</p>
                    </div>

                    {/* Image Section - Centered vertically and potentially horizontally in its grid cell */}
                    <div className="hero-image">
                        <div className="image-container">
                            <div className="main-image">
                                <div className="image-wrapper interactive-element">
                                    <img src={profileImage} alt={`${personalInfo.name} - ${personalInfo.title}`} className="profile-image" />
                                </div>
                                <div className="image-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Outside the grid, centered */}
                <div className="hero-action-buttons">
                    <button className="action-btn" onClick={handleResumeOpen}>
                        <ArticleIcon className="btn-icon" />
                        <span>Resume</span>
                    </button>
                    <button className="action-btn" onClick={handleConnect}>
                        <WavingHandIcon className="btn-icon" />
                        <span>Connect</span>
                    </button>
                </div>

                {/* Social Links */}
                <div className="social-links">
                    {socialLinks.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={link.name}>
                            {getSocialIcon(link.icon)}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
