// src/components/CardsCarousel.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/CardsCarousel.css";
import { projectsData } from "../data/portfolioData";
import ProjectCard, { type Project } from "./ProjectCard";

export default function CardsCarousel() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    return (
        <div className="carousel" ref={targetRef}>
            <div className="contentContainer">
                <motion.div className="images" style={{ x }}>
                    {projectsData.projects.map((project: Project, index: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 150 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
