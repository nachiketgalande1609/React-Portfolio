import React, { useEffect, useRef, useState } from "react";
import "../styles/Recommendations.css";

import { testimonialsData } from "../data/portfolioData";
import type { Testimonial } from "../types";

const Recommendations: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (!isAnimating) return;

            event.preventDefault();

            if (event.deltaY > 0) {
                // Scroll down - animate next card
                if (currentCard < testimonialsData.testimonials.length - 1) {
                    setCurrentCard((prev) => prev + 1);
                } else {
                    // All cards animated, enable normal scrolling
                    setIsAnimating(false);
                    setIsScrollEnabled(true);
                }
            } else if (event.deltaY < 0) {
                // Scroll up - animate previous card
                if (currentCard > 0) {
                    setCurrentCard((prev) => prev - 1);
                }
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isAnimating) return;

            if (event.key === "ArrowDown" || event.key === " ") {
                event.preventDefault();
                if (currentCard < testimonialsData.testimonials.length - 1) {
                    setCurrentCard((prev) => prev + 1);
                } else {
                    setIsAnimating(false);
                    setIsScrollEnabled(true);
                }
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                if (currentCard > 0) {
                    setCurrentCard((prev) => prev - 1);
                }
            }
        };

        const section = sectionRef.current;
        if (section && !isScrollEnabled) {
            section.addEventListener("wheel", handleScroll, { passive: false });
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (section) {
                section.removeEventListener("wheel", handleScroll);
            }
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAnimating, currentCard, testimonialsData.testimonials.length, isScrollEnabled]);

    const getCardTransform = (index: number) => {
        if (index > currentCard) {
            // Cards that haven't been animated yet - stacked on left
            const stackOffset = (index - currentCard - 1) * 20;
            return `translateX(${-100 - stackOffset}px) rotate(-5deg)`;
        } else if (index === currentCard) {
            // Current active card - center position
            return "translateX(0) rotate(0deg)";
        } else {
            // Cards that have been animated - moved to right
            const rightOffset = (currentCard - index) * 100;
            return `translateX(${100 + rightOffset}px) rotate(0deg)`;
        }
    };

    const getCardZIndex = (index: number) => {
        return testimonialsData.testimonials.length - Math.abs(index - currentCard);
    };

    const getCardOpacity = (index: number) => {
        if (index > currentCard) {
            return 0.7 - (index - currentCard - 1) * 0.2;
        }
        return 1;
    };

    const RecommendationCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
        <div
            className={`recommendation-card ${index === currentCard ? "active" : ""} ${index <= currentCard ? "animated" : ""}`}
            style={{
                zIndex: getCardZIndex(index),
                transform: getCardTransform(index),
                opacity: getCardOpacity(index),
            }}
        >
            <div className="card-corner"></div>

            <div className="recommendation-content">
                <div className="quote-section">
                    <div className="quote-icon">"</div>
                    <p className="recommendation-quote">{testimonial.quote}</p>
                </div>

                <div className="recommendation-author">
                    <div className="author-image">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            onError={(e) => {
                                // Fallback for missing images
                                (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23333'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='14'%3E👤%3C/text%3E%3C/svg%3E";
                            }}
                        />
                        <div className="image-shine"></div>
                    </div>
                    <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-role">{testimonial.role}</p>
                    </div>
                </div>
            </div>

            <div className="card-glow"></div>
        </div>
    );

    return (
        <section ref={sectionRef} id="recommendations" className={`section recommendations-section ${isScrollEnabled ? "scroll-enabled" : ""}`}>
            <div className="container">
                <div className="recommendations-header">
                    <div className="header-decoration">
                        <h2 className="section-title">Recommendations</h2>
                    </div>
                    <p className="section-subtitle">
                        {isAnimating ? "Scroll or use arrow keys to reveal recommendations" : "What colleagues say about working with me"}
                    </p>
                </div>

                <div ref={containerRef} className="recommendations-container">
                    <div className="cards-stack">
                        {testimonialsData.testimonials.map((testimonial, index) => (
                            <RecommendationCard key={index} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </div>

                {isAnimating && (
                    <div className="scroll-indicator">
                        <div className="scroll-arrow"></div>
                        <span>
                            {currentCard + 1} / {testimonialsData.testimonials.length}
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Recommendations;
