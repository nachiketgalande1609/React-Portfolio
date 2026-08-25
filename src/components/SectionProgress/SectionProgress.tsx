import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./SectionProgress.css";

const SectionProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? scrollY / total : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="sp-bar">
            <div className="sp-track">
                <motion.div
                    className="sp-fill"
                    animate={{ width: `${progress * 100}%` }}
                    transition={{ duration: 0.08, ease: "linear" }}
                />
            </div>
        </div>
    );
};

export default SectionProgress;
