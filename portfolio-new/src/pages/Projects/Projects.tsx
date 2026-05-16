import React, { useEffect, useRef } from "react";
import "./Projects.css";
import CardsCarousel from "./CardsCarousel/CardsCarousel";
import ShinyText from "../../components/ShinyText/ShinyText";
import { projectsData } from "../../data/portfolioData";

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

    const projectCount = projectsData.projects.length;

    return (
        <section ref={sectionRef} id="projects" className="section projects-section">
            <div className="container">
                <div className="section-header projects-header">
                    <div className="projects-eyebrow animate-on-scroll">
                        <span className="projects-eyebrow-dot" aria-hidden="true" />
                        <span>Selected work</span>
                        <span className="projects-eyebrow-count">{projectCount} projects</span>
                    </div>
                    <div className="header-decoration true-focus animate-on-scroll">
                        <ShinyText text="My Projects" disabled={false} speed={2} className="section-title" />
                    </div>
                    <p className="projects-subtitle animate-on-scroll">
                        A curated set of products, tools, and experiments I've designed and shipped end-to-end.
                    </p>
                </div>
                <CardsCarousel />
            </div>
        </section>
    );
};

export default Projects;
