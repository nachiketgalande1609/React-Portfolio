"use client";

import React from "react";
import { motion } from "framer-motion";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import "./Testimonials.css";
import { testimonialsData } from "../../data/portfolioData";
import type { Testimonial } from "../../types";
import ShinyText from "../../components/ShinyText/ShinyText";

const trimRole = (role: string) => {
    const firstSegment = role.split("|")[0].trim();
    return firstSegment.length > 70 ? `${firstSegment.slice(0, 68)}…` : firstSegment;
};

interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
    const initials = testimonial.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("");

    return (
        <motion.article
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
            aria-label={`Testimonial from ${testimonial.name}`}
        >
            <div className="testimonial-card-glow" aria-hidden="true" />
            <FormatQuoteRoundedIcon className="testimonial-quote-mark" aria-hidden="true" />

            <header className="testimonial-meta">
                <span className="testimonial-rating" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <StarRoundedIcon key={i} fontSize="inherit" />
                    ))}
                </span>
                <span className="testimonial-counter">{String(index + 1).padStart(2, "0")}</span>
            </header>

            <p className="testimonial-quote">{testimonial.quote}</p>

            <footer className="testimonial-author">
                <div className="testimonial-avatar">
                    {testimonial.image ? (
                        <img
                            src={testimonial.image}
                            alt=""
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.parentElement?.classList.add("has-fallback");
                            }}
                        />
                    ) : null}
                    <div className="testimonial-avatar-fallback" aria-hidden="true">
                        {initials}
                    </div>
                </div>
                <div className="testimonial-author-info">
                    <h4 className="testimonial-author-name">{testimonial.name}</h4>
                    <p className="testimonial-author-role">{trimRole(testimonial.role)}</p>
                </div>
            </footer>
        </motion.article>
    );
};

const Testimonials: React.FC = () => {
    const total = testimonialsData.testimonials.length;

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <div className="testimonials-eyebrow">
                        <span className="testimonials-eyebrow-dot" aria-hidden="true" />
                        <span>Kind Words</span>
                        <span className="testimonials-eyebrow-count">{total} testimonials</span>
                    </div>
                    <ShinyText text="Testimonials" disabled={false} speed={2} className="section-title" />
                    <p className="testimonials-subtitle">What colleagues and collaborators say about working with me.</p>
                </div>

                <div className="testimonials-grid">
                    {testimonialsData.testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
