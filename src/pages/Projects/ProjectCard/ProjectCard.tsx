import React, { useState, useCallback, useRef, useEffect } from "react";
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

const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `${r},${g},${b}`;
};

const PROJECT_META: Record<number, { category: string; color: string }> = {
    1:  { category: "FULL STACK",    color: "#6366f1" },
    2:  { category: "WEB APP",       color: "#f97316" },
    3:  { category: "AI TOOL",       color: "#8b5cf6" },
    4:  { category: "WEB APP",       color: "#ef4444" },
    5:  { category: "WEB APP",       color: "#10b981" },
    6:  { category: "ERP SYSTEM",    color: "#3b82f6" },
    7:  { category: "AI / ML",       color: "#f59e0b" },
    8:  { category: "AI TOOL",       color: "#06b6d4" },
    9:  { category: "E-COMMERCE",    color: "#ec4899" },
    10: { category: "REAL-TIME APP", color: "#84cc16" },
    11: { category: "DESKTOP APP",   color: "#14b8a6" },
    12: { category: "WEB APP",       color: "#f43f5e" },
    13: { category: "TOOL",          color: "#a855f7" },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
    const [slide, setSlide] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const images = project.images;
    const touchStartX = useRef(0);
    const wheelAccum = useRef(0);
    const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    const meta = PROJECT_META[project.id] ?? { category: "PROJECT", color: "#6366f1" };

    const prev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSlide((s) => (s - 1 + images.length) % images.length);
    }, [images.length]);

    const next = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setSlide((s) => (s + 1) % images.length);
    }, [images.length]);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 40) {
            if (delta > 0) setSlide((s) => (s + 1) % images.length);
            else setSlide((s) => (s - 1 + images.length) % images.length);
        }
    }, [images.length]);

    useEffect(() => {
        const el = frameRef.current;
        if (!el || images.length <= 1) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
            e.preventDefault();
            wheelAccum.current += e.deltaX;
            if (wheelTimer.current) clearTimeout(wheelTimer.current);
            wheelTimer.current = setTimeout(() => {
                if (Math.abs(wheelAccum.current) > 30) {
                    if (wheelAccum.current > 0) setSlide((s) => (s + 1) % images.length);
                    else setSlide((s) => (s - 1 + images.length) % images.length);
                }
                wheelAccum.current = 0;
            }, 50);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [images.length]);

    return (
        <motion.div
            className="pc-card"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1], delay: (index % 4) * 0.06 }}
            viewport={{ once: true, amount: 0.15 }}
        >
            {/* Eyebrow */}
            <div className="pc-eyebrow">
                <span className="pc-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="pc-dash">—</span>
                <span className="pc-category">{meta.category}</span>
            </div>

            {/* Title */}
            <h3 className="pc-title">{project.name}</h3>

            {/* Colored panel */}
            <div className="pc-panel" style={{ "--pc-color-rgb": hexToRgb(meta.color) } as React.CSSProperties}>
                <p className="pc-desc">{project.description}</p>

                {images.length > 0 && (
                    <div
                        ref={frameRef}
                        className="pc-frame"
                        onClick={() => setLightboxOpen(true)}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="pc-browser-chrome">
                            <span /><span /><span />
                        </div>
                        <div className="pc-carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                            {images.map((src, i) => (
                                <img key={i} src={src} alt={`${project.name} screenshot ${i + 1}`} className="pc-img" loading={i === 0 ? "eager" : "lazy"} />
                            ))}
                        </div>
                    </div>
                )}

                {images.length > 1 && (
                    <div className="pc-carousel-controls">
                        <button className="pc-carousel-btn" onClick={prev} aria-label="Previous">
                            <ChevronLeftIcon fontSize="small" />
                        </button>
                        <div className="pc-dots">
                            {images.map((_, i) => (
                                <button key={i} className={`pc-dot ${i === slide ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setSlide(i); }} />
                            ))}
                        </div>
                        <button className="pc-carousel-btn" onClick={next} aria-label="Next">
                            <ChevronRightIcon fontSize="small" />
                        </button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="pc-footer">
                <ul className="pc-tech-list">
                    {project.techStack.map((tech) => (
                        <li key={tech} className="pc-tech-tag">
                        {techIcons[tech] && <img src={techIcons[tech]} alt="" className="pc-tech-icon" aria-hidden="true" />}
                        {tech}
                    </li>
                    ))}
                </ul>

                <div className="pc-footer-bottom">
                    <div className="pc-actions">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="pc-btn pc-btn--ghost">
                                <GitHubIcon fontSize="small" />
                                <span>Code</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="pc-btn pc-btn--primary">
                                <LaunchIcon fontSize="small" />
                                <span>Live</span>
                                <NorthEastIcon fontSize="small" className="pc-arrow" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <ImageLightbox images={images} startIndex={slide} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
        </motion.div>
    );
};

export default ProjectCard;
