import React from "react";
import { projects } from "../data/portfolioData";
import type { Project } from "../types";

const Projects: React.FC = () => {
    const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
        <div className="project-card">
            <div className="project-image">
                <div className="image-placeholder">
                    <span>Project Image</span>
                </div>
                <div className="project-overlay">
                    <div className="project-links">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                            GitHub
                        </a>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link live">
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <section id="projects" className="section">
            <div className="container">
                <h2 className="section-title">My Projects</h2>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2rem;
                }

                .project-card {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: var(--shadow);
                    transition: all 0.3s ease;
                }

                .project-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-lg);
                }

                .project-image {
                    position: relative;
                    height: 200px;
                    background: var(--background-alt);
                    overflow: hidden;
                }

                .image-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-light);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .project-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .project-card:hover .project-overlay {
                    opacity: 1;
                }

                .project-links {
                    display: flex;
                    gap: 1rem;
                }

                .project-link {
                    padding: 10px 20px;
                    background: var(--primary-color);
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }

                .project-link.live {
                    background: #10b981;
                }

                .project-link:hover {
                    transform: translateY(-2px);
                }

                .project-content {
                    padding: 1.5rem;
                }

                .project-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: var(--text-color);
                }

                .project-description {
                    color: var(--text-light);
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .project-technologies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .tech-tag {
                    background: var(--background-alt);
                    color: var(--primary-color);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
            `}</style>
        </section>
    );
};

export default Projects;
