import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Projects.css";
import ShinyText from "../../components/ShinyText/ShinyText";
import ProjectCard, { type Project } from "./ProjectCard/ProjectCard";
import { projectsData } from "../../data/portfolioData";

const FEATURED_COUNT = 4;

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [expanded, setExpanded] = useState(false);

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

    const sorted = [...projectsData.projects].sort((a, b) => a.id - b.id);
    const totalCount = sorted.length;
    const visible = expanded ? sorted : sorted.slice(0, FEATURED_COUNT);

    return (
        <section ref={sectionRef} id="projects" className="section projects-section">
            <div className="container">
                <div className="section-header projects-header">
                    <div className="projects-eyebrow animate-on-scroll">
                        <span className="projects-eyebrow-dot" aria-hidden="true" />
                        <span>Selected work</span>
                        <span className="projects-eyebrow-count">{totalCount} projects</span>
                    </div>
                    <div className="header-decoration true-focus animate-on-scroll">
                        <ShinyText text="My Projects" disabled={false} speed={2} className="section-title" />
                    </div>
                    <p className="projects-subtitle animate-on-scroll">
                        A curated set of products, tools, and experiments I've designed and shipped end-to-end.
                    </p>
                </div>

                <motion.div
                    className="projects-masonry"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                >
                    <AnimatePresence>
                        {visible.map((project: Project, idx) => (
                            <ProjectCard key={project.id} project={project} index={idx} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {totalCount > FEATURED_COUNT && (
                    <div className="projects-expand">
                        <button className="projects-expand-btn" onClick={() => setExpanded((e) => !e)}>
                            {expanded ? `Show less` : `Show ${totalCount - FEATURED_COUNT} more projects`}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
