import React from "react";
import "./../styles/LinksModal.css";

// Import MUI icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CodeIcon from "@mui/icons-material/Code";
import PaletteIcon from "@mui/icons-material/Palette";
import PhotoIcon from "@mui/icons-material/Photo";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";

interface LinksModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LinksModal: React.FC<LinksModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "github":
                return <GitHubIcon fontSize="small" />;
            case "linkedin":
                return <LinkedInIcon fontSize="small" />;
            case "twitter":
                return <TwitterIcon fontSize="small" />;
            case "email":
                return <EmailIcon fontSize="small" />;
            case "codepen":
                return <CodeIcon fontSize="small" />;
            case "unsplash":
                return <PhotoIcon fontSize="small" />;
            default:
                return <OpenInNewIcon fontSize="small" />;
        }
    };

    const getProjectIcon = (projectName: string) => {
        switch (projectName.toLowerCase()) {
            case "ripple":
                return <DesignServicesIcon fontSize="small" />;
            case "streamline":
                return <RocketLaunchIcon fontSize="small" />;
            case "livo":
                return <AppShortcutIcon fontSize="small" />;
            default:
                return <PaletteIcon fontSize="small" />;
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleLinkClick = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    // Enhanced social links data structure
    const enhancedSocialLinks = [
        { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/nachiketgalande/", description: "@nachiketgalande" },
        { name: "GitHub", icon: "github", url: "https://github.com/nachiketgalande1609", description: "@nachiketgalande1609" },
        { name: "CodePen", icon: "codepen", url: "https://codepen.io/Nachiket-Galande", description: "@Nachiket-Galande" },
        { name: "Twitter", icon: "twitter", url: "https://twitter.com/yourhandle" },
        { name: "Unsplash", icon: "unsplash", url: "https://unsplash.com/@nachiketgalande", description: "@nachiketgalande" },
        { name: "Email", icon: "email", url: "mailto:nachiketgalande1609@gmail.com", description: "nachiketgalande1609@gmail.com" },
    ];

    // Active projects data
    const activeProjects = [
        {
            name: "Ripple",
            description: "Social media platform",
            url: "https://ripple.nachiketgalande.site/",
        },
        {
            name: "Streamline",
            description: "Enterprise management app",
            url: "https://streamline.nachiketgalande.site/",
        },
        {
            name: "Livo",
            description: "Lifestyle tracker",
            url: "https://livo.nachiketgalande.site/",
        },
    ];

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content-wide">
                <div className="modal-header-wide">
                    <div className="modal-title-section">
                        <h2 className="modal-title">Connect & Explore</h2>
                        <p className="modal-subtitle">Find me across platforms and check out my active projects</p>
                    </div>
                    <button className="close-button-wide" onClick={onClose} aria-label="Close modal">
                        <CloseIcon fontSize="small" />
                    </button>
                </div>

                <div className="two-column-layout">
                    {/* Social Links Section - Left Column */}
                    <section className="links-column">
                        <div className="column-header">
                            <h3 className="column-title">Social & Platforms</h3>
                            <p className="column-subtitle">Connect with me across the web</p>
                        </div>
                        <div className="links-grid-column">
                            {enhancedSocialLinks.map((link, index) => (
                                <button
                                    key={index}
                                    className="link-item-column social-item"
                                    onClick={() => handleLinkClick(link.url)}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="link-icon-column">{getSocialIcon(link.icon)}</div>
                                    <div className="link-text-column">
                                        <span className="link-name-column">{link.name}</span>
                                        <span className="link-hint-column">{link.description}</span>
                                    </div>
                                    <div className="link-arrow-column">
                                        <OpenInNewIcon fontSize="small" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section - Right Column */}
                    <section className="links-column">
                        <div className="column-header">
                            <h3 className="column-title">Active Projects</h3>
                            <p className="column-subtitle">Explore my latest work</p>
                        </div>
                        <div className="links-grid-column">
                            {activeProjects.map((project, index) => (
                                <button
                                    key={index}
                                    className="link-item-column project-item"
                                    onClick={() => handleLinkClick(project.url)}
                                    style={{ animationDelay: `${index * 0.05 + 0.2}s` }}
                                >
                                    <div className="link-icon-column">{getProjectIcon(project.name)}</div>
                                    <div className="link-text-column">
                                        <span className="link-name-column">{project.name}</span>
                                        <span className="link-description-column">{project.description}</span>
                                    </div>
                                    <div className="link-arrow-column">
                                        <OpenInNewIcon fontSize="small" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LinksModal;
