import React, { useEffect, useRef, useState } from "react";
import "../styles/Recommendations.css";
import AbhishekProfileImage from "../assets/recommendations/abhishek.jpg";
import SumitProfileImage from "../assets/recommendations/sumit.jpg";
import SudarshanProfileImage from "../assets/recommendations/sudarshan.jpg";

interface Testimonial {
    quote: string;
    image: string;
    name: string;
    role: string;
}

interface TestimonialsData {
    testimonials: Testimonial[];
}

const Recommendations: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(true);
    const [currentCard, setCurrentCard] = useState(0);
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);

    const testimonialsData: TestimonialsData = {
        testimonials: [
            {
                quote: "I highly recommend Nachiket, with whom I collaborated on Python-based machine learning and deep learning projects. His strong grasp of cloud technologies, particularly Azure Cloud, has greatly enhanced our project outcomes. Nachiket's passion, adaptability, and eagerness to learn make him a valuable team member. He made a significant impact on our undergraduate projects, driving innovation and achieving objectives. Nachiket's creative problem-solving skills ensure efficient task completion and project success. I confidently endorse Nachiket for any role that matches his skill set and aspirations. He is a talented individual who consistently delivers excellent results.",
                image: "https://media.licdn.com/dms/image/v2/D5603AQHDoPYEUIW5rQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714244228097?e=2147483647&v=beta&t=JoDgwEkks6bNxrZtVf91hQzdcqziI1N6JMC3ni2PEg8",
                name: "Pratik Kakade",
                role: "Software Engineer | MS-CS Grad | 2x Hackathon Winner | ML | DL | NLP | Cloud | Full Stack | Distributed Systems | MLOps | C++, Java, Python, Spring Boot, React.js, Kubernetes",
            },
            {
                quote: "Nachiket is an exceptional software developer with an innate ability to conceive and deliver elegant and efficient software solutions. His meticulous attention to detail, passion for quality, and mastery of multiple programming languages and frameworks set him apart from his peers. Nachiket is also an excellent communicator and collaborative team player, consistently delivering high-quality work that exceeds expectations. It's been a pleasure to work with Nachiket, and I enthusiastically recommend him for any organization in need of a top-tier software developer.",
                image: SumitProfileImage,
                name: "Sumit Biswas",
                role: "Business Analyst + UX Designer @Canadiv",
            },
            {
                quote: "I highly recommend Nachiket for his exceptional skills and expertise in Data Analysis as well as ML/deployment of ML models. I have had the pleasure of working with him on several projects and have been consistently impressed by his professionalism, attention to detail, and ability to deliver outstanding results. Nachiket is a dedicated team player who is always willing to go above and beyond to ensure the success of the project. He possesses excellent communication skills and is able to work effectively with people from diverse backgrounds and cultures.",
                image: SudarshanProfileImage,
                name: "Sudarshan Sahare",
                role: "Data Integrity Specialist - Supply Chain Intelligence/Digital Solutions",
            },
            {
                quote: "I've known Nachiket since we were both students at MIT. Nachiket was always enthusiastic to broaden his horizons by learning new things. He was always keen to add value to every project he worked on. Going forward, I believe Nachiket will be a valuable asset to organisation he works for. I wish you best of luck for your future endeavours Nachiket",
                image: AbhishekProfileImage,
                name: "Abhishek Golhar",
                role: "Business Development Team - Nippon Steel Trading India Pvt Ltd | Ex - Confederation of Indian Industry B20 G20 India Secretariat | G20YEA - Yi Executive Member | International Affairs",
            },
        ],
    };

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
