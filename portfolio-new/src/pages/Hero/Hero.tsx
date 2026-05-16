import React from "react";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "../../data/portfolioData";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import "./Hero.css";

// Import MUI icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import profileImage from "../../assets/profile.png";
import resumeFile from "../../assets/resume.pdf";

const Hero: React.FC = () => {
    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToAbout = () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleResumeOpen = () => {
        window.open(resumeFile, "_blank", "noopener,noreferrer");
    };

    const getSocialIcon = (iconName: string) => {
        switch (iconName.toLowerCase()) {
            case "github":
                return <GitHubIcon fontSize="small" />;
            case "linkedin":
                return <LinkedInIcon fontSize="small" />;
            case "twitter":
                return <TwitterIcon fontSize="small" />;
            case "email":
                return <EmailIcon fontSize="small" />;
            default:
                return <span>{iconName}</span>;
        }
    };

    const [firstName, ...rest] = personalInfo.name.split(" ");
    const lastName = rest.join(" ");

    return (
        <section id="home" className="hero">
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-grid-pattern" />
            </div>

            <div className="hero-theme-toggle">
                <ThemeToggle />
            </div>

            <div className="hero-container">
                <div className="hero-grid">
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <div className="hero-pill-row">
                            <span className="hero-status-pill">
                                <span className="hero-status-dot" aria-hidden="true" />
                                <span>Open to opportunities</span>
                            </span>
                            <span className="hero-location-pill">
                                <LocationOnRoundedIcon fontSize="inherit" />
                                <span>{personalInfo.location}</span>
                            </span>
                        </div>

                        <h1 className="hero-title">
                            <span className="hero-title-greet">Hi, I'm</span>
                            <span className="hero-title-name">
                                <span className="hero-title-first">{firstName}</span>
                                {lastName && <span className="hero-title-last">{lastName}</span>}
                            </span>
                        </h1>

                        <h2 className="hero-subtitle">
                            <span className="hero-subtitle-cursor" aria-hidden="true" />
                            {personalInfo.title}
                        </h2>

                        <p className="hero-description">{personalInfo.about}</p>

                        <div className="hero-actions">
                            <button type="button" className="hero-btn hero-btn--primary" onClick={handleResumeOpen}>
                                <ArticleIcon className="hero-btn-icon" fontSize="small" />
                                <span>Resume</span>
                                <NorthEastIcon className="hero-btn-arrow" fontSize="small" />
                            </button>
                            <button type="button" className="hero-btn hero-btn--ghost" onClick={scrollToContact}>
                                <WavingHandIcon className="hero-btn-icon" fontSize="small" />
                                <span>Let's connect</span>
                            </button>
                        </div>

                        <div className="hero-socials" aria-label="Social links">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hero-social"
                                    aria-label={link.name}
                                >
                                    {getSocialIcon(link.icon)}
                                    <span className="hero-social-label">{link.name}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero-portrait"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <div className="hero-portrait-stage">
                            <div className="hero-portrait-ring hero-portrait-ring--outer" aria-hidden="true" />
                            <div className="hero-portrait-ring hero-portrait-ring--inner" aria-hidden="true" />
                            <div className="hero-portrait-halo" aria-hidden="true" />
                            <div className="hero-portrait-frame">
                                <img src={profileImage} alt={`${personalInfo.name} – ${personalInfo.title}`} className="hero-portrait-img" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <button type="button" className="hero-scroll-hint" onClick={scrollToAbout} aria-label="Scroll to next section">
                <span>Scroll</span>
                <KeyboardArrowDownRoundedIcon fontSize="small" />
            </button>
        </section>
    );
};

export default Hero;
