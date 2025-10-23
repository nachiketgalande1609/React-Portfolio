import React, { useState } from "react";
import { personalInfo, socialLinks } from "../data/portfolioData";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
        alert("Thank you for your message! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <section id="contact" className="section" style={{ background: "var(--background-alt)" }}>
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to work together!
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <strong>Email:</strong>
                                <span>{personalInfo.email}</span>
                            </div>
                            <div className="contact-item">
                                <strong>Phone:</strong>
                                <span>{personalInfo.phone}</span>
                            </div>
                            <div className="contact-item">
                                <strong>Location:</strong>
                                <span>{personalInfo.location}</span>
                            </div>
                        </div>

                        <div className="contact-social">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .contact-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: start;
                }

                .contact-info h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: var(--text-color);
                }

                .contact-info p {
                    color: var(--text-light);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .contact-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .contact-item {
                    display: flex;
                    gap: 1rem;
                }

                .contact-item strong {
                    min-width: 80px;
                    color: var(--text-color);
                }

                .contact-social {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .social-btn {
                    padding: 10px 20px;
                    background: var(--primary-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .social-btn:hover {
                    background: var(--secondary-color);
                    transform: translateY(-2px);
                }

                .contact-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: var(--shadow);
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid var(--border-color);
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }

                @media (max-width: 768px) {
                    .contact-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;
