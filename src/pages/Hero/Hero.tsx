import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo, socialLinks } from "../../data/portfolioData";
import "./Hero.css";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import profileImage from "../../assets/profile.png";

/* Character-by-character animated name */
const AnimatedName: React.FC<{ firstName: string; lastName: string }> = ({ firstName, lastName }) => {
    let idx = 0;
    const renderWord = (word: string, extraClass = "") =>
        word.split("").map((char) => {
            const delay = 0.38 + idx++ * 0.04;
            return (
                <motion.span
                    key={`${char}-${idx}`}
                    className={`hero-title-char ${extraClass}`}
                    initial={{ opacity: 0, y: 32, rotateX: -50 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }}
                >
                    {char}
                </motion.span>
            );
        });

    return (
        <span className="hero-title-name">
            <span className="hero-title-word">{renderWord(firstName)}</span>
            <span className="hero-title-space"> </span>
            <span className="hero-title-word">{renderWord(lastName, "hero-title-char--dim")}</span>
        </span>
    );
};

/* Stagger container variant */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 1.0 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] } },
};

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    /* Scroll-out parallax */
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["end 200px", "end start"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroY       = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const heroScale   = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const heroBlur    = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);

    const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    const scrollToAbout   = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    const handleResumeOpen = () => window.open("/resume.pdf", "_blank", "noopener,noreferrer");

    const getSocialIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case "github":   return <GitHubIcon fontSize="small" />;
            case "linkedin": return <LinkedInIcon fontSize="small" />;
            case "email":    return <EmailIcon fontSize="small" />;
            default:         return <span>{name}</span>;
        }
    };

    const [firstName, ...rest] = personalInfo.name.split(" ");
    const lastName = rest.join(" ");

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-bg" aria-hidden="true">
                <div className="hero-grid-pattern" />
            </div>

            <motion.div
                className="hero-container"
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale, filter: heroBlur }}
            >
                <div className="hero-grid">

                    {/* ── Left: Text ── */}
                    <div className="hero-text">
                        {/* Pills */}
                        <motion.div
                            className="hero-pill-row"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.55 }}
                        >
                            <span className="hero-status-pill">
                                <span className="hero-status-dot" aria-hidden="true" />
                                Open to opportunities
                            </span>
                            <span className="hero-location-pill">
                                <LocationOnRoundedIcon fontSize="inherit" />
                                <span>{personalInfo.location}</span>
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="hero-title">
                            <motion.span
                                className="hero-title-greet"
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.25, duration: 0.45 }}
                            >
                                Hi, I'm
                            </motion.span>
                            <AnimatedName firstName={firstName} lastName={lastName} />
                        </h1>

                        {/* Staggered lower blocks */}
                        <motion.div
                            className="hero-lower"
                            variants={stagger}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.h2 className="hero-subtitle" variants={fadeUp}>
                                <span className="hero-subtitle-cursor" aria-hidden="true" />
                                {personalInfo.title}
                            </motion.h2>

                            <motion.p className="hero-description" variants={fadeUp}>
                                {personalInfo.about}
                            </motion.p>

                            <motion.div className="hero-actions" variants={fadeUp}>
                                <button type="button" className="hero-btn hero-btn--primary" onClick={handleResumeOpen}>
                                    <ArticleIcon className="hero-btn-icon" fontSize="small" />
                                    <span>Resume</span>
                                    <NorthEastIcon className="hero-btn-arrow" fontSize="small" />
                                </button>
                                <button type="button" className="hero-btn hero-btn--ghost" onClick={scrollToContact}>
                                    <WavingHandIcon className="hero-btn-icon" fontSize="small" />
                                    <span>Let's connect</span>
                                </button>
                            </motion.div>

                            <motion.div className="hero-socials" variants={fadeUp} aria-label="Social links">
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
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Right: Portrait ── */}
                    <motion.div
                        className="hero-portrait"
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.85, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }}
                    >
                        <div className="hero-portrait-stage">
                            <div className="hero-portrait-ring hero-portrait-ring--outer" aria-hidden="true" />
                            <div className="hero-portrait-ring hero-portrait-ring--inner" aria-hidden="true" />
                            <div className="hero-portrait-tilt">
                                <div className="hero-portrait-frame">
                                    <img
                                        src={profileImage}
                                        alt={`${personalInfo.name} — ${personalInfo.title}`}
                                        className="hero-portrait-img"
                                        // @ts-ignore
                                        fetchpriority="high"
                                        decoding="async"
                                    />
                                    <div className="hero-portrait-shine" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            <button type="button" className="hero-scroll-hint" onClick={scrollToAbout} aria-label="Scroll to next section">
                <span>Scroll</span>
                <KeyboardArrowDownRoundedIcon fontSize="small" />
            </button>
        </section>
    );
};

export default Hero;
