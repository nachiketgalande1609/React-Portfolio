import React from "react";
import "./LinksModal.css";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CodeIcon from "@mui/icons-material/Code";
import PhotoIcon from "@mui/icons-material/Photo";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import PaletteIcon from "@mui/icons-material/Palette";

interface LinksModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LinksModal: React.FC<LinksModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "github":    return <GitHubIcon />;
            case "linkedin":  return <LinkedInIcon />;
            case "email":     return <EmailIcon />;
            case "codepen":   return <CodeIcon />;
            case "unsplash":  return <PhotoIcon />;
            default:          return <OpenInNewIcon />;
        }
    };

    const getProjectIcon = (projectName: string) => {
        switch (projectName.toLowerCase()) {
            case "ripple":     return <DesignServicesIcon />;
            case "streamline": return <RocketLaunchIcon />;
            case "livo":       return <AppShortcutIcon />;
            default:           return <PaletteIcon />;
        }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleLinkClick = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const socialLinks = [
        { name: "LinkedIn",  icon: "linkedin", url: "https://www.linkedin.com/in/nachiketgalande/",          handle: "@nachiketgalande" },
        { name: "GitHub",    icon: "github",   url: "https://github.com/nachiketgalande1609",                handle: "@nachiketgalande1609" },
        { name: "CodePen",   icon: "codepen",  url: "https://codepen.io/Nachiket-Galande",                   handle: "@Nachiket-Galande" },
        { name: "Unsplash",  icon: "unsplash", url: "https://unsplash.com/@nachiketgalande",                 handle: "@nachiketgalande" },
        { name: "Email",     icon: "email",    url: "mailto:nachiket.galande.in@gmail.com",                  handle: "nachiket.galande.in@gmail.com" },
    ];

    const projects = [
        { name: "Ripple",      description: "Social media platform",    url: "https://ripple.nachiketgalande.com/" },
        { name: "Streamline",  description: "Enterprise management app", url: "https://streamline.nachiketgalande.com/" },
        { name: "Livo",        description: "Lifestyle tracker",         url: "https://livo.nachiketgalande.com/" },
    ];

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-card">
                <div className="modal-header">
                    <div>
                        <h2 className="modal-title">Connect & Explore</h2>
                        <p className="modal-subtitle">Find me across platforms and explore my active projects</p>
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close modal">
                        <CloseIcon fontSize="small" />
                    </button>
                </div>

                <div className="modal-columns">
                    <section className="modal-col">
                        <div className="col-header">
                            <span className="col-tag social-tag">Social</span>
                            <h3 className="col-title">Platforms</h3>
                        </div>
                        <div className="col-items">
                            {socialLinks.map((link, i) => (
                                <button
                                    key={i}
                                    className="link-card social-card"
                                    onClick={() => handleLinkClick(link.url)}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    <div className="card-icon social-icon">{getSocialIcon(link.icon)}</div>
                                    <div className="card-text">
                                        <span className="card-name">{link.name}</span>
                                        <span className="card-handle">{link.handle}</span>
                                    </div>
                                    <OpenInNewIcon className="card-arrow" fontSize="small" />
                                </button>
                            ))}
                        </div>
                    </section>

                    <div className="col-divider" />

                    <section className="modal-col">
                        <div className="col-header">
                            <span className="col-tag project-tag">Work</span>
                            <h3 className="col-title">Live Projects</h3>
                        </div>
                        <div className="col-items">
                            {projects.map((project, i) => (
                                <button
                                    key={i}
                                    className="link-card lm-project-card"
                                    onClick={() => handleLinkClick(project.url)}
                                    style={{ animationDelay: `${i * 0.07 + 0.15}s` }}
                                >
                                    <div className="card-icon project-icon">{getProjectIcon(project.name)}</div>
                                    <div className="card-text">
                                        <span className="card-name">{project.name}</span>
                                        <span className="card-handle">{project.description}</span>
                                    </div>
                                    <OpenInNewIcon className="card-arrow" fontSize="small" />
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

