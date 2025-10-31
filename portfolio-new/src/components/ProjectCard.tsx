// src/components/ProjectCard.tsx
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { techIcons } from "../data/portfolioData";

// Type definition for Project
export interface Project {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    image: string;
    liveLink?: string;
    githubLink?: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <div
        className="project-card animate-on-scroll"
        style={{
            animationDelay: `${index * 0.1}s`,
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

export default ProjectCard;
