
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
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
                <span className="testimonial-counter">{String(index + 1).padStart(2, "0")}</span>
            </header>

            <p className="testimonial-quote">{testimonial.quote}</p>

            <footer className="testimonial-author">
                <div className="testimonial-avatar">
                    {testimonial.image ? (
                        <img
                            src={testimonial.image}
                            alt=""
                            loading="lazy"
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
                <a
                    href="https://www.linkedin.com/in/nachiketgalande"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="testimonial-linkedin-badge"
                    aria-label="View on LinkedIn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2" width="14" height="14">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                </a>
            </footer>
        </motion.article>
    );
};

const Testimonials: React.FC = () => {
    const total = testimonialsData.testimonials.length;
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["end 200px", "end start"] });
    const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const sectionY = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const sectionBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);

    return (
        <motion.section
            id="testimonials"
            className="testimonials-section"
            ref={sectionRef}
            style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale, filter: sectionBlur }}
        >
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
        </motion.section>
    );
};

export default Testimonials;

