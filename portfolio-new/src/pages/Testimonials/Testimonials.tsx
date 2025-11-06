"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./Testimonials.css";
import { testimonialsData } from "../../data/portfolioData";
import type { ReconmendationCardProps } from "../../types";
import ShinyText from "../../components/ShinyText/ShinyText";

const Testimonials: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const cards = sectionRef.current.querySelectorAll(".testimonials-card");
            const viewportCenter = window.innerHeight / 2;

            let closestCard = activeCard;
            let minDistance = Infinity;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(cardCenter - viewportCenter);

                if (distanceFromCenter < minDistance) {
                    minDistance = distanceFromCenter;
                    closestCard = index;
                }
            });

            if (closestCard !== activeCard) {
                setActiveCard(closestCard);
            }
        };

        // Use requestAnimationFrame for smoother performance
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", scrollHandler, { passive: true });
        window.addEventListener("resize", scrollHandler, { passive: true });

        // Initial check
        handleScroll();

        return () => {
            window.removeEventListener("scroll", scrollHandler);
            window.removeEventListener("resize", scrollHandler);
        };
    }, [activeCard]);

    return (
        <section ref={sectionRef} id="testimonials" className="testimonials-section">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    {/* <h2 className="section-title">Testimonials</h2> */}
                    <ShinyText text="Testimonials" disabled={false} speed={2} className="section-title" />
                    <p className="section-subtitle">What colleagues say about working with me</p>
                </div>

                <div className="testimonials-cards">
                    {testimonialsData.testimonials.map((testimonial, index) => (
                        <RecommendationCard
                            key={index}
                            testimonial={testimonial}
                            index={index}
                            isActive={index === activeCard}
                            totalCards={testimonialsData.testimonials.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const RecommendationCard: React.FC<ReconmendationCardProps & { isActive: boolean }> = ({ testimonial, index, isActive, totalCards }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(cardProgress, [0, 1], [80, -80]);
    const opacity = useTransform(cardProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(cardProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    // Enhanced active state styling
    const activeScale = useSpring(isActive ? 1.05 : 1, {
        stiffness: 300,
        damping: 30,
    });

    const activeShadow = useTransform(
        cardProgress,
        [0, 0.3, 0.5, 0.7, 1],
        [
            "0 4px 8px rgba(0,0,0,0.1)",
            "0 8px 16px rgba(0,0,0,0.15)",
            "0 12px 24px rgba(0,0,0,0.2)",
            "0 8px 16px rgba(0,0,0,0.15)",
            "0 4px 8px rgba(0,0,0,0.1)",
        ]
    );

    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23333'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='14'%3E👤%3C/text%3E%3C/svg%3E";

    return (
        <motion.div
            ref={cardRef}
            className={`testimonials-card ${isActive ? "active" : ""}`}
            style={{
                opacity,
                scale: isActive ? activeScale : scale,
                boxShadow: activeShadow,
            }}
        >
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
