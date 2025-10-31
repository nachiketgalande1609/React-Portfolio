import React, { useEffect, useRef } from "react";
import "./Projects.css";
import CardsCarousel from "./CardsCarousel/CardsCarousel";
import TrueFocus from "../../components/TrueFocus/TrueFocus";

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const animateElements = document.querySelectorAll(".animate-on-scroll");
        animateElements.forEach((el) => observer.observe(el));

        return () => {
            animateElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section ref={sectionRef} id="projects" className="section projects-section">
            <div className="container">
                <div className="section-header">
                    <div className="header-decoration true-focus animate-on-scroll">
                        <TrueFocus
                            sentence="My Projets"
                            manualMode={false}
                            blurAmount={5}
                            borderColor="#ff8000"
                            animationDuration={2}
                            pauseBetweenAnimations={1}
                        />
                    </div>
                </div>
                <CardsCarousel />
            </div>
        </section>
    );
};

export default Projects;
