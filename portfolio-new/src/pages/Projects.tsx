import React, { useEffect, useRef } from "react";
import "../styles/Projects.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { projectsData, techIcons } from "../data/portfolioData";
import FuzzyText from "../components/FuzzyText";

// Tech stack icons mapping

// Projects data object

// Type definition for Project
interface Project {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    image: string;
    liveLink?: string;
    githubLink?: string;
}

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
        <div
            className="project-card animate-on-scroll"
            style={{
                animationDelay: `${index * 0.1}s`,
                // top: `calc(100px + ${index * 10}px)`,
                zIndex: index,
            }}
        >
            <div className="card-corner"></div>

            <div className="project-content-wrapper">
                <div className="project-content">
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="project-links">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                                <div className="link-content">
                                    <GitHubIcon className="link-icon" />
                                    <span>Code</span>
                                </div>
                                <div className="link-hover-effect"></div>
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live">
                                <div className="link-content">
                                    <PlayArrowRoundedIcon className="link-icon" sx={{ fontSize: "28px !important" }} />
                                    <span>Live Demo</span>
                                </div>
                                <div className="link-hover-effect"></div>
                            </a>
                        )}
                    </div>
                </div>

                <div className="project-image">
                    <img src={project.image} alt={project.name} className="project-img" />
                    <div className="image-shine"></div>
                </div>
            </div>

            <div className="project-technologies">
                {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag" style={{ animationDelay: `${techIndex * 0.05}s` }}>
                        <img
                            src={techIcons[tech]}
                            alt={tech}
                            className="tech-icon"
                            onError={(e) => {
                                // Fallback if icon doesn't exist
                                (e.target as HTMLElement).style.display = "none";
                            }}
                        />
                        <span className="tech-name">{tech}</span>
                    </span>
                ))}
            </div>

            <div className="card-glow"></div>
        </div>
    );

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

                <div className="projects-grid animate-on-scroll">
                    {projectsData.projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
