import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import { personalInfo } from "../../data/portfolioData";
import "./Contact.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import ShinyText from "../../components/ShinyText/ShinyText";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type FormState = "idle" | "sending" | "success" | "error";

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [formState, setFormState] = useState<FormState>("idle");
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [errors, setErrors] = useState<Partial<typeof form>>({});

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["end 200px", "end start"] });
    const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const sectionY = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const sectionBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);

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
                    if (entry.isIntersecting) entry.target.classList.add("animate-in");
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );
        const animateElements = document.querySelectorAll(".animate-on-scroll");
        animateElements.forEach((el) => observer.observe(el));
        return () => animateElements.forEach((el) => observer.unobserve(el));
    }, []);

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
        if (!form.message.trim()) e.message = "Message is required";
        return e;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof form]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }
        setFormState("sending");
        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    subject: form.subject || "Portfolio Contact",
                    message: form.message,
                },
                EMAILJS_PUBLIC_KEY
            );
            setFormState("success");
            setForm({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setFormState("idle"), 5000);
        } catch {
            setFormState("error");
            setTimeout(() => setFormState("idle"), 5000);
        }
    };

    const contactDetails = [
        { icon: <EmailIcon className="contact-mui-icon" />, label: "Email",    value: personalInfo.email,    copyable: true  },
        { icon: <PhoneIcon className="contact-mui-icon" />, label: "Phone",    value: personalInfo.phone,    copyable: true  },
        { icon: <LocationOnIcon className="contact-mui-icon" />, label: "Location", value: personalInfo.location, copyable: false },
    ];

    return (
        <motion.section
            id="contact"
            className="section contact-section"
            ref={sectionRef}
            style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale, filter: sectionBlur }}
        >
            <div className="container">
                <div className="contact-header">
                    <div className="header-decoration animate-on-scroll">
                        <ShinyText text="Get in Touch" disabled={false} speed={2} className="section-title" />
                    </div>
                    <p className="section-subtitle animate-on-scroll">Let's create something amazing together</p>
                </div>

                <div className="contact-content">
                    {/* â”€â”€ Left: info â”€â”€ */}
                    <div className="contact-info">
                        <div className="contact-intro animate-on-scroll">
                            <h3 className="contact-title">Let's Connect</h3>
                            <p className="contact-description">
                                I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to work together!
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

                    {/* â”€â”€ Right: form â”€â”€ */}
                    <div className="contact-form-wrapper animate-on-scroll">
                        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-row">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className={`form-input ${errors.name ? "input-error" : ""}`}
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={handleChange}
                                        disabled={formState === "sending"}
                                    />
                                    {errors.name && <span className="field-error">{errors.name}</span>}
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`form-input ${errors.email ? "input-error" : ""}`}
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={formState === "sending"}
                                    />
                                    {errors.email && <span className="field-error">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-field">
                                <label className="form-label" htmlFor="subject">Subject <span className="optional">(optional)</span></label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    className="form-input"
                                    placeholder="What's this about?"
                                    value={form.subject}
                                    onChange={handleChange}
                                    disabled={formState === "sending"}
                                />
                            </div>

                            <div className="form-field">
                                <label className="form-label" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={`form-input form-textarea ${errors.message ? "input-error" : ""}`}
                                    placeholder="Tell me about your project or opportunity..."
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    disabled={formState === "sending"}
                                />
                                {errors.message && <span className="field-error">{errors.message}</span>}
                            </div>

                            <button
                                type="submit"
                                className={`form-submit ${formState}`}
                                disabled={formState === "sending" || formState === "success"}
                            >
                                {formState === "idle" && <><SendIcon fontSize="small" /> Send Message</>}
                                {formState === "sending" && <><span className="spinner" /> Sendingâ€¦</>}
                                {formState === "success" && <><CheckIcon fontSize="small" /> Message Sent!</>}
                                {formState === "error" && <><SendIcon fontSize="small" /> Failed â€” Try Again</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;

