import React, { useState, useEffect, useRef } from "react";
import { personalInfo } from "../../data/portfolioData";
import "./Contact.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = async (text: string, field: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        const animateElements = document.querySelectorAll(".animate-on-scroll");
        animateElements.forEach((el) => observer.observe(el));

        return () => {
            animateElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const contactDetails = [
        {
            icon: <EmailIcon className="contact-mui-icon" />,
            label: "Email",
            value: personalInfo.email,
            copyable: true,
        },
        {
            icon: <PhoneIcon className="contact-mui-icon" />,
            label: "Phone",
            value: personalInfo.phone,
            copyable: true,
        },
        {
            icon: <LocationOnIcon className="contact-mui-icon" />,
            label: "Location",
            value: personalInfo.location,
            copyable: false,
        },
    ];

    return (
        <section id="contact" className="section contact-section" ref={sectionRef}>
            <div className="container">
                <div className="contact-header">
                    <div className="header-decoration animate-on-scroll">
                        <h2 className="section-title">Get In Touch</h2>
                    </div>
                    <p className="section-subtitle animate-on-scroll">Let's create something amazing together</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-intro animate-on-scroll">
                            <h3 className="contact-title">Let's Connect</h3>
                            <p className="contact-description">
                                I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to work
                                together!
                            </p>
                        </div>

                        <div className="contact-details-grid">
                            {contactDetails.map((detail, index) => (
                                <div key={detail.label} className="contact-grid-item animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="contact-item-content">
                                        <div className="contact-icon-wrapper">{detail.icon}</div>
                                        <div className="contact-text">
                                            <strong>{detail.label}</strong>
                                            <div className="contact-value-wrapper">
                                                <span className="contact-value">{detail.value}</span>
                                                {detail.copyable && (
                                                    <button
                                                        className={`copy-btn ${copiedField === detail.label ? "copied" : ""}`}
                                                        onClick={() => copyToClipboard(detail.value, detail.label)}
                                                        aria-label={`Copy ${detail.label}`}
                                                    >
                                                        {copiedField === detail.label ? (
                                                            <CheckIcon className="copy-icon" />
                                                        ) : (
                                                            <ContentCopyIcon className="copy-icon" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
