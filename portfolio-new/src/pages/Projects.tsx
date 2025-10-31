import React, { useEffect, useRef } from "react";
import "../styles/Projects.css";
import FuzzyText from "../components/FuzzyText";
import CardsCarousel from "../components/CardsCarousel";

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
                    <div className="header-decoration animate-on-scroll">
                        <FuzzyText baseIntensity={0.1} hoverIntensity={0.5} enableHover={true}>
                            My Projects
                        </FuzzyText>
                    </div>
                    <p className="section-subtitle animate-on-scroll">A collection of my recent work and creative solutions</p>
                </div>
                <CardsCarousel />
            </div>
        </section>
    );
};

export default Projects;
