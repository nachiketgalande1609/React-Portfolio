import React from "react";
import { socialLinks } from "../data/portfolioData";
import "./../styles/UsesModal.css";

// Import MUI icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface LinksModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LinksModal: React.FC<LinksModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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
                return <OpenInNewIcon />;
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

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Quick Links</h2>
                    <button className="close-button" onClick={onClose} aria-label="Close modal">
                        <CloseIcon />
                    </button>
                </div>

                <div className="links-grid">
                    {socialLinks.map((link, index) => (
                        <div key={index} className="link-card" onClick={() => handleLinkClick(link.url)}>
                            <div className="link-icon">{getSocialIcon(link.icon)}</div>
                            <div className="link-info">
                                <h3 className="link-name">{link.name}</h3>
                                <p className="link-url">{link.url.replace(/^https?:\/\//, "")}</p>
                            </div>
                            <div className="link-arrow">
                                <OpenInNewIcon fontSize="small" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="modal-footer">
                    <button className="done-button" onClick={onClose}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinksModal;
