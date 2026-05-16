import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./CardsCarousel.css";
import { projectsData } from "../../../data/portfolioData";
import ProjectCard, { type Project } from "../ProjectCard/ProjectCard";

export default function CardsCarousel() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="cards-carousel" ref={targetRef}>
            <div className="cards-carousel-sticky">
                <div className="cards-carousel-hint" aria-hidden="true">
                    <span>Scroll</span>
                    <KeyboardDoubleArrowRightIcon fontSize="small" />
                </div>

                <motion.div className="cards-carousel-track" style={{ x }}>
                    {projectsData.projects.map((project: Project, idx) => (
                        <ProjectCard key={project.id} project={project} index={idx} />
                    ))}
                </motion.div>

                <div className="cards-carousel-progress" aria-hidden="true">
                    <motion.span className="cards-carousel-progress-fill" style={{ width: progressWidth }} />
                </div>
            </div>
        </div>
    );
}
