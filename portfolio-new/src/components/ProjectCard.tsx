import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { techIcons } from "../data/portfolioData";
import "../styles/ProjectCard.css";

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

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    // For 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30, restDelta: 0.001 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30, restDelta: 0.001 });

    const rotateX = useTransform(mouseY, [-150, 150], [3, -3]); // Very subtle
    const rotateY = useTransform(mouseX, [-150, 150], [-3, 3]); // Very subtle

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Staggered animation variants with proper TypeScript types
    const cardVariants = {
        offscreen: {
            opacity: 0,
            y: 50,
        },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                bounce: 0.4,
                duration: 0.8,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        offscreen: { opacity: 0, y: 20 },
        onscreen: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
        >
            <div className="animated-border"></div>
            <motion.div className="project-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ rotateX, rotateY }}>
                <div className="card-glow" />
                <div className="project-content-wrapper">
                    <motion.div className="project-content" variants={itemVariants}>
                        <h3 className="project-title">{project.name}</h3>
                        <p className="project-description">{project.description}</p>

                        <motion.div className="project-technologies" variants={itemVariants}>
                            {project.techStack.map((tech) => (
                                <div key={tech} className="tech-tag">
                                    <img src={techIcons[tech]} alt={tech} className="tech-icon" />
                                    <span className="tech-name">{tech}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div className="project-links" variants={itemVariants}>
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github">
                                    <GitHubIcon className="link-icon" />
                                    <span>Code</span>
                                    <div className="link-shine"></div>
                                </a>
                            )}
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live">
                                    <LaunchIcon className="link-icon" />
                                    <span>Live Demo</span>
                                    <div className="link-shine"></div>
                                </a>
                            )}
                        </motion.div>
                    </motion.div>

                    <motion.div className="project-image-container" variants={itemVariants} style={{ rotateX, rotateY, scale: 1.1 }}>
                        <img src={project.image} alt={project.name} className="project-img" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;
