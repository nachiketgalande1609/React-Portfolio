import React, { useEffect, useState, useRef } from "react";
import { personalInfo, socialLinks } from "../data/portfolioData";
import "../styles/Hero.css";

// Import MUI icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import WavingHandIcon from "@mui/icons-material/WavingHand";

// Import your image - adjust the path according to your project structure
import profileImage from "../assets/profile.png"; // or .png, .webp, etc.

const Hero: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");
    const [isOverHero, setIsOverHero] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });

            // Update CSS variables for interactive background
            document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
            document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);

            // Check if mouse is over hero section
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const isInHero = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

                setIsOverHero(isInHero);

                if (isInHero) {
                    document.body.classList.add("hero-hover");

                    // Move background shapes based on cursor position relative to hero
                    const shapes = document.querySelectorAll(".shape");
                    shapes.forEach((shape, index) => {
                        const speed = (index + 1) * 0.02;
                        const x = ((e.clientX - rect.left) * speed) / 50;
                        const y = ((e.clientY - rect.top) * speed) / 50;
                        (shape as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
                    });
                } else {
                    document.body.classList.remove("hero-hover");
                }
            }
        };

        const handleMouseEnter = (e: Event) => {
            setCursorVariant("hover");
        };

        const handleMouseLeave = (e: Event) => {
            setCursorVariant("default");
        };

        // Add event listeners
        window.addEventListener("mousemove", handleMouseMove);

        // Add event listeners for interactive elements within hero
        if (heroRef.current) {
            const interactiveElements = heroRef.current.querySelectorAll("button, a, .social-link, .btn, .image-wrapper");
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);

            if (heroRef.current) {
                const interactiveElements = heroRef.current.querySelectorAll("button, a, .social-link, .btn, .image-wrapper");
                interactiveElements.forEach((el) => {
                    el.removeEventListener("mouseenter", handleMouseEnter);
                    el.removeEventListener("mouseleave", handleMouseLeave);
                });
            }
        };
    }, []);

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleResumeDownload = () => {
        console.log("Download resume");
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
        <section id="home" className="hero" ref={heroRef}>
            {/* Custom Cursor - Only show when over hero section */}
            {isOverHero && (
                <>
                    <div
                        className="hero-cursor"
                        style={{
                            transform: `translate3d(${mousePosition.x - 10}px, ${mousePosition.y - 10}px, 0)`,
                            scale: cursorVariant === "hover" ? 1.5 : 1,
                        }}
                    />
                    <div
                        className="hero-cursor-follower"
                        style={{
                            transform: `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0)`,
                            scale: cursorVariant === "hover" ? 1.2 : 1,
                        }}
                    />
                </>
            )}

            {/* Animated Background Elements */}
            <div className="hero-bg">
                <div className="bg-gradient"></div>
                {/* Interactive Gradient Overlay */}
                <div className="interactive-gradient"></div>
                {/* Radial Gradient Overlay */}
                <div className="radial-overlay">
                    <div className="radial-gradient"></div>
                </div>
            </div>

            <div className="container">
                {/* Centered Job Seeking Badge */}
                <div className="job-seeking-badge">
                    <span>Actively Seeking Job Opportunities</span>
                </div>

                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Hi, I'm <span className="highlight">{personalInfo.name}</span>
                        </h1>
                        <h2 className="hero-subtitle">{personalInfo.title}</h2>
                        <p className="hero-description">{personalInfo.about}</p>

                        <div className="hero-buttons">
                            <button className="btn" onClick={handleResumeDownload}>
                                <span>My Resume</span>
                                <ArticleIcon />
                            </button>
                            <button className="btn" onClick={handleConnect}>
                                <span>Let's Connect</span>
                                <WavingHandIcon />
                            </button>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="image-container">
                            <div className="main-image">
                                <div className="image-wrapper">
                                    <img src={profileImage} alt={`${personalInfo.name} - ${personalInfo.title}`} className="profile-image" />
                                </div>
                                {/* Animated border effect */}
                                <div className="image-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
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
