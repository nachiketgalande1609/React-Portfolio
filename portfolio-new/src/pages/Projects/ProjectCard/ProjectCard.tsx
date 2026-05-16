import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { techIcons } from "../../../data/portfolioData";
import "./ProjectCard.css";

export interface Project {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    image: string;
    liveLink?: string;
    githubLink?: string;
}

interface ProjectCardProps {
    project: Project;
    index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 200, damping: 25, restDelta: 0.001 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 25, restDelta: 0.001 });

    const rotateX = useTransform(mouseY, [-150, 150], [4, -4]);
    const rotateY = useTransform(mouseX, [-150, 150], [-4, 4]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const isDesktop = window.innerWidth > 768;
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        e.currentTarget.style.setProperty("--mouse-x", `${(offsetX / rect.width) * 100}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${(offsetY / rect.height) * 100}%`);

        if (isDesktop) {
            x.set(offsetX - rect.width / 2);
            y.set(offsetY - rect.height / 2);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 768) {
            x.set(0);
            y.set(0);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className="project-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: (index % 4) * 0.06 }}
            viewport={{ once: true, amount: 0.2 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: window.innerWidth > 768 ? rotateX : 0,
                rotateY: window.innerWidth > 768 ? rotateY : 0,
            }}
        >
            <div className="project-card-glow" aria-hidden="true" />
            <div className="project-card-border" aria-hidden="true" />

            <div className="project-image-frame">
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                <img src={project.image} alt={project.name} className="project-img" loading="lazy" />
                <div className="project-image-overlay" aria-hidden="true" />
            </div>

            <div className="project-body">
                <header className="project-heading">
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                </header>

                <div className="project-footer">
                    <ul className="project-tech-list">
                        {project.techStack.map((tech) => (
                            <li key={tech} className="project-tech-tag">
                                {techIcons[tech] && <img src={techIcons[tech]} alt="" className="project-tech-icon" aria-hidden="true" />}
                                <span>{tech}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="project-actions">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-action project-action--ghost"
                                aria-label={`${project.name} source code on GitHub`}
                            >
                                <GitHubIcon className="project-action-icon" />
                                <span>Code</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-action project-action--primary"
                                aria-label={`${project.name} live demo`}
                            >
                                <LaunchIcon className="project-action-icon" />
                                <span>Live</span>
                                <NorthEastIcon className="project-action-arrow" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
