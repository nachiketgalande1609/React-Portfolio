"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/Testimonials.css";
import { testimonialsData } from "../data/portfolioData";
import type { ReconmendationCardProps } from "../types";

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [currentCard, setCurrentCard] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const cardIndex = Math.floor(latest * testimonialsData.testimonials.length);
            setCurrentCard(Math.min(cardIndex, testimonialsData.testimonials.length - 1));
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={sectionRef} id="testimonials" className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <h2 className="section-title">Testimonials</h2>
                    <p className="section-subtitle">What colleagues say about working with me</p>
                </div>

                <div className="testimonials-cards">
                    {testimonialsData.testimonials.map((testimonial, index) => (
                        <RecommendationCard
                            key={index}
                            testimonial={testimonial}
                            index={index}
                            currentCard={currentCard}
                            totalCards={testimonialsData.testimonials.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const RecommendationCard: React.FC<ReconmendationCardProps> = ({ testimonial, index, currentCard, totalCards }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(cardProgress, [0, 1], [80, -80]);
    const opacity = useTransform(cardProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(cardProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23333'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='14'%3E👤%3C/text%3E%3C/svg%3E";

    return (
        <motion.div ref={cardRef} className={`testimonials-card ${index === currentCard ? "active" : ""}`} style={{ opacity, scale }}>
            <div className="testimonials-content">
                <div className="quote-section">
                    <div className="quote-icon">"</div>
                    <p className="testimonials-quote">{testimonial.quote}</p>
                </div>

                <div className="testimonials-author">
                    <div className="author-image">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = fallbackImage;
                            }}
                        />
                    </div>
                    <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-role">{testimonial.role}</p>
                    </div>
                </div>
            </div>

            <motion.div
                className="card-counter"
                style={{
                    y,
                    opacity: useTransform(cardProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
                }}
            >
                {index + 1}/{totalCards}
            </motion.div>
        </motion.div>
    );
};

export default Testimonials;
