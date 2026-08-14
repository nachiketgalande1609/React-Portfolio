import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { techIcons } from "../../../data/portfolioData";
import ImageLightbox from "../../../components/ImageLightbox/ImageLightbox";
import "./ProjectCard.css";

export interface Project {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    images: string[];
    liveLink?: string;
    githubLink?: string;
}

interface ProjectCardProps {
    project: Project;
    index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [slide, setSlide] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const images = project.images;

    const prev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSlide((s) => (s - 1 + images.length) % images.length);
    }, [images.length]);

    const next = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSlide((s) => (s + 1) % images.length);
    }, [images.length]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--mouse-x", `${(offsetX / rect.width) * 100}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${(offsetY / rect.height) * 100}%`);
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
        >

            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>

            <div
                className="project-image-frame"
                style={{ cursor: images.length > 0 ? "pointer" : "default" }}
                onClick={() => images.length > 0 && setLightboxOpen(true)}
            >
                {images.length > 0 ? (
                    <>
                        <div className="project-carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                            {images.map((src, i) => (
                                <img key={i} src={src} alt={`${project.name} screenshot ${i + 1}`} className="project-img" loading="lazy" />
                            ))}
                        </div>
                        <div className="project-image-overlay" aria-hidden="true" />
                    </>
                ) : (
                    <div className="project-img-empty">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span>No preview available</span>
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <div className="project-carousel-controls">
                    <button className="project-carousel-btn" onClick={prev} aria-label="Previous image">
                        <ChevronLeftIcon fontSize="small" />
                    </button>
                    <div className="project-carousel-dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`project-carousel-dot ${i === slide ? "active" : ""}`}
                                onClick={(e) => { e.stopPropagation(); setSlide(i); }}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button className="project-carousel-btn" onClick={next} aria-label="Next image">
                        <ChevronRightIcon fontSize="small" />
                    </button>
                </div>
            )}

            <ImageLightbox images={images} startIndex={slide} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />

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
