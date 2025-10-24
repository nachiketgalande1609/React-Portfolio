import React, { useEffect, useRef } from "react";
import { projects } from "../data/portfolioData";
import type { Project } from "../types";
import "../styles/Projects.css";

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");

                        // Add staggered animation for project cards
                        if (entry.target.classList.contains("projects-grid")) {
                            const projectCards = entry.target.querySelectorAll(".project-card");
                            projectCards.forEach((card, index) => {
                                (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
                            });
                        }
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

    const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
        <div className="project-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="project-image">
                <div className="image-placeholder">
                    <span>Project Image</span>
                    <div className="image-shine"></div>
                </div>
                <div className="project-overlay">
                    <div className="project-links">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                            <span>GitHub</span>
                            <div className="link-hover-effect"></div>
                        </a>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                                <span>Live Demo</span>
                                <div className="link-hover-effect"></div>
                            </a>
                        )}
                    </div>
                </div>
                <div className="card-corner"></div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag" style={{ animationDelay: `${techIndex * 0.05}s` }}>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            <div className="card-glow"></div>
        </div>
    );

    return (
        <section ref={sectionRef} id="projects" className="section projects-section">
            <div className="container">
                <div className="projects-header">
                    <div className="header-decoration animate-on-scroll">
                        <div className="decoration-line"></div>
                        <h2 className="section-title">MY PROJECTS</h2>
                        <div className="decoration-line"></div>
                    </div>
                    <p className="section-subtitle animate-on-scroll">A collection of my recent work and creative solutions</p>
                </div>

                <div className="projects-grid animate-on-scroll">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
