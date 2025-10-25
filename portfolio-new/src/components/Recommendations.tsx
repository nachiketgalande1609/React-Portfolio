import React, { useEffect, useRef, useState } from "react";
import "../styles/Recommendations.css";
import { testimonialsData } from "../data/portfolioData";
import type { Testimonial } from "../types";

const Recommendations: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentCard, setCurrentCard] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true); // True when cards are actively unstacking
    const [isScrollEnabled, setIsScrollEnabled] = useState(false); // True when all cards are unstacked and normal scroll resumes

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (!isAnimating) return; // Only process scroll if animating

            event.preventDefault(); // Prevent default page scroll

            if (event.deltaY > 0) {
                // Scrolling down
                if (currentCard < testimonialsData.testimonials.length - 1) {
                    setCurrentCard((prev) => prev + 1);
                } else {
                    // Last card revealed, enable normal scrolling
                    setIsAnimating(false);
                    setIsScrollEnabled(true);
                }
            } else if (event.deltaY < 0) {
                // Scrolling up
                if (currentCard > 0) {
                    setCurrentCard((prev) => prev - 1);
                } else {
                    // Back to first card, disable scroll if it was enabled
                    setIsScrollEnabled(false);
                    setIsAnimating(true); // Re-enable animating if we scroll back to start
                }
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isAnimating && event.key !== "ArrowUp") return; // Allow arrow up even when scroll is enabled to go back

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
                } else {
                    setIsScrollEnabled(false);
                    setIsAnimating(true);
                }
            }
        };

        const section = sectionRef.current;
        if (section && !isScrollEnabled) {
            // Add scroll listener only if not scroll-enabled
            section.addEventListener("wheel", handleScroll, { passive: false });
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            if (section) {
                section.removeEventListener("wheel", handleScroll);
            }
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isAnimating, currentCard, testimonialsData.testimonials.length, isScrollEnabled]);

    const getCardTransform = (index: number) => {
        const stackOffset = 10; // Pixels offset for cards in the stack
        const unstackOffset = 300; // Pixels offset for unstacked cards to move right

        if (index > currentCard) {
            // Cards still in the stack (left side)
            const offsetMultiplier = testimonialsData.testimonials.length - 1 - index; // Deeper cards are further left
            return `translateX(${offsetMultiplier * -stackOffset}px) rotateY(-5deg)`;
        } else if (index === currentCard) {
            // Current active card (unstacking to the right of the stack)
            return `translateX(${unstackOffset}px) rotateY(0deg)`;
        } else {
            // Cards that have already been unstacked (further right)
            const previousCardsCount = currentCard - index;
            return `translateX(${unstackOffset + previousCardsCount * 100}px) rotateY(0deg)`;
        }
    };

    const getCardZIndex = (index: number) => {
        // Active card on top, then cards in stack, then unstacked cards
        if (index === currentCard) return testimonialsData.testimonials.length + 1;
        if (index > currentCard) return testimonialsData.testimonials.length - index; // Deeper cards in stack have lower z-index
        return testimonialsData.testimonials.length - (index + 1); // Unstacked cards
    };

    const getCardOpacity = (index: number) => {
        if (index > currentCard) {
            // Cards in the stack are partially transparent, becoming more opaque as they get closer to active
            const transparencyFactor = (index - currentCard) * 0.15; // Adjust this for desired transparency
            return 1 - transparencyFactor;
        }
        return 1; // Active and unstacked cards are fully opaque
    };

    const RecommendationCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
        <div
            className={`recommendation-card ${index === currentCard ? "active" : ""} ${index < currentCard ? "unstacked" : ""}`}
            style={{
                zIndex: getCardZIndex(index),
                transform: getCardTransform(index),
                opacity: getCardOpacity(index),
                // pointerEvents: index === currentCard ? 'auto' : 'none', // Only active card is interactive
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

                <div className="recommendations-container">
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
