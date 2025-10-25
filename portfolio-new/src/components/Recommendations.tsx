import React, { useEffect, useRef, useState, useCallback } from "react";
import "../styles/Recommendations.css";
import { testimonialsData } from "../data/portfolioData";
import type { Testimonial } from "../types";

const Recommendations: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentCard, setCurrentCard] = useState(0);
    // isHandlingScroll: true when the component controls scroll, false when normal page scroll is enabled
    const [isHandlingScroll, setIsHandlingScroll] = useState(true);

    const handleScroll = useCallback(
        (event: WheelEvent) => {
            if (!sectionRef.current) return;

            // Check if the section is in the viewport
            const rect = sectionRef.current.getBoundingClientRect();
            const inView = rect.top <= window.innerHeight && rect.bottom >= 0;

            if (!inView && isHandlingScroll) {
                // If not in view and we are handling scroll, release control
                setIsHandlingScroll(false);
                return;
            } else if (inView && !isHandlingScroll && currentCard < testimonialsData.testimonials.length - 1 && event.deltaY > 0) {
                // If entering view and trying to scroll down, re-engage handling
                setIsHandlingScroll(true);
            } else if (inView && !isHandlingScroll && currentCard > 0 && event.deltaY < 0) {
                // If entering view and trying to scroll up past the last card, re-engage handling
                setIsHandlingScroll(true);
            }

            if (!isHandlingScroll) return; // If not handling scroll, let default behavior happen

            event.preventDefault(); // Prevent default page scroll when handling

            if (event.deltaY > 0) {
                // Scrolling down
                if (currentCard < testimonialsData.testimonials.length - 1) {
                    setCurrentCard((prev) => prev + 1);
                } else {
                    // Last card revealed, enable normal scrolling
                    setIsHandlingScroll(false);
                }
            } else if (event.deltaY < 0) {
                // Scrolling up
                if (currentCard > 0) {
                    setCurrentCard((prev) => prev - 1);
                } else {
                    // Back to first card, release scroll control
                    setIsHandlingScroll(false);
                }
            }
        },
        [currentCard, testimonialsData.testimonials.length, isHandlingScroll]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "ArrowDown" || event.key === " ") {
                if (currentCard < testimonialsData.testimonials.length - 1) {
                    event.preventDefault();
                    setCurrentCard((prev) => prev + 1);
                    setIsHandlingScroll(true); // Ensure we're handling scroll when using keyboard
                } else if (isHandlingScroll) {
                    // If at last card and still handling, release
                    event.preventDefault(); // Prevent page scroll if trying to go further down
                    setIsHandlingScroll(false);
                }
            } else if (event.key === "ArrowUp") {
                if (currentCard > 0) {
                    event.preventDefault();
                    setCurrentCard((prev) => prev - 1);
                    setIsHandlingScroll(true); // Ensure we're handling scroll when using keyboard
                } else if (!isHandlingScroll) {
                    // If at first card and released scroll, re-engage to handle arrow up
                    event.preventDefault(); // Prevent page scroll if trying to go further up
                    setIsHandlingScroll(true);
                }
            }
        },
        [currentCard, testimonialsData.testimonials.length, isHandlingScroll]
    );

    useEffect(() => {
        const section = sectionRef.current;
        if (section) {
            // We always add/remove the wheel listener on the section
            // The `isHandlingScroll` state inside `handleScroll` will determine
            // if `preventDefault` is called and if state changes.
            section.addEventListener("wheel", handleScroll, { passive: false });
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            if (section) {
                section.removeEventListener("wheel", handleScroll);
            }
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleScroll, handleKeyDown]); // Depend on memoized handlers

    // Reset currentCard to 0 if we scroll past this section and then back up
    // This is a common pattern for "scroll-jacking" sections.
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && isHandlingScroll) {
                    // If section is not visible and we were handling scroll, reset state
                    setCurrentCard(0);
                    setIsHandlingScroll(true); // Reset to true to be ready for re-entry
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isHandlingScroll]);

    const getCardTransform = (index: number) => {
        const stackOffset = 15; // Pixels offset for cards in the stack (increased slightly for more visual depth)
        const unstackOffset = 280; // Pixels offset for unstacked cards to move right (adjusted for aesthetic)
        const pastCardOffset = 80; // Offset for cards that have already been unstacked

        if (index > currentCard) {
            // Cards still in the stack (left side)
            const offsetMultiplier = testimonialsData.testimonials.length - 1 - index; // Deeper cards are further left
            return `translateX(${offsetMultiplier * -stackOffset}px) rotateY(-5deg) scale(${1 - offsetMultiplier * 0.02})`;
        } else if (index === currentCard) {
            // Current active card (unstacking to the right of the stack)
            return `translateX(${unstackOffset}px) rotateY(0deg) scale(1)`;
        } else {
            // Cards that have already been unstacked (further right)
            const previousCardsCount = currentCard - index;
            return `translateX(${unstackOffset + previousCardsCount * pastCardOffset}px) rotateY(0deg) scale(${1 - previousCardsCount * 0.05})`;
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
            const transparencyFactor = (index - currentCard) * 0.2; // Adjusted for better visibility
            return Math.max(0.4, 1 - transparencyFactor); // Ensure minimum opacity
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
        <section ref={sectionRef} id="recommendations" className={`section recommendations-section ${!isHandlingScroll ? "scroll-enabled" : ""}`}>
            <div className="container">
                <div className="recommendations-header">
                    <div className="header-decoration">
                        <h2 className="section-title">Recommendations</h2>
                    </div>
                    <p className="section-subtitle">
                        {isHandlingScroll ? "Scroll or use arrow keys to reveal recommendations" : "What colleagues say about working with me"}
                    </p>
                </div>

                <div className="recommendations-container">
                    <div className="cards-stack">
                        {testimonialsData.testimonials.map((testimonial, index) => (
                            <RecommendationCard key={index} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </div>

                {isHandlingScroll && (
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
