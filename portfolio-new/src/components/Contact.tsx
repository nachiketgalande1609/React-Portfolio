import React, { useState, useEffect } from "react";
import { personalInfo, socialLinks } from "../data/portfolioData";
import "../styles/Contact.css";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="contact-header">
                    <div className="header-decoration animate-on-scroll">
                        <div className="decoration-line"></div>
                        <h2 className="section-title">Get In Touch</h2>
                        <div className="decoration-line"></div>
                    </div>
                    <p className="section-subtitle animate-on-scroll">Let's create something amazing together</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="contact-intro animate-on-scroll">
                            <h3 className="contact-title">Let's Connect</h3>
                            <p className="contact-description">
                                I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to work
                                together or just say hello!
                            </p>
                        </div>

                        <div className="contact-details">
                            {[
                                { icon: "📧", label: "Email", value: personalInfo.email },
                                { icon: "📱", label: "Phone", value: personalInfo.phone },
                                { icon: "📍", label: "Location", value: personalInfo.location },
                            ].map((detail, index) => (
                                <div key={detail.label} className="contact-item animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="contact-item-content">
                                        <div className="contact-icon">{detail.icon}</div>
                                        <div className="contact-text">
                                            <strong>{detail.label}</strong>
                                            <span>{detail.value}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="contact-social animate-on-scroll">
                            <h4 className="social-title">Follow Me</h4>
                            <div className="social-links">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <span className="social-name">{link.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form className="contact-form animate-on-scroll" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="form-textarea"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">
                            <span>Send Message</span>
                            <div className="btn-decoration"></div>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
