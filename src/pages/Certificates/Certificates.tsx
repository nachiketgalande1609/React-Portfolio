import React, { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./Certificates.css";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { certificatesData } from "../../data/portfolioData";
import ShinyText from "../../components/ShinyText/ShinyText";

interface Certificate {
    title: string;
    organization: string;
    date: string;
    credential_url: string;
    logo: string;
    image?: string;
}

const parseYear = (dateStr: string): string => {
    const match = dateStr.match(/\d{4}/);
    return match ? match[0] : "Unknown";
};

const Certificates: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [filter, setFilter] = useState<string>("all");
    const [expanded, setExpanded] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);
    const INITIAL_COUNT = 5;

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["end 200px", "end start"] });
    const sectionOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const sectionY = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const sectionScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
    const sectionBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(3px)"]);

    const organizations = useMemo(() => {
        const orgs = certificatesData.map((c) => c.organization);
        return ["all", ...Array.from(new Set(orgs))];
    }, []);

    const filtered = useMemo(() => {
        const list = filter === "all" ? certificatesData : certificatesData.filter((c) => c.organization === filter);
        return [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [filter]);

    const visibleCerts = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

    const groupedByYear = useMemo(() => {
        const groups: Record<string, Certificate[]> = {};
        visibleCerts.forEach((cert) => {
            const year = parseYear(cert.date);
            if (!groups[year]) groups[year] = [];
            groups[year].push(cert);
        });
        return groups;
    }, [visibleCerts]);

    const toggle = (title: string) => setExpanded((prev) => (prev === title ? null : title));

    return (
        <motion.section
            ref={sectionRef}
            id="certificates"
            className="section certificates-section"
            style={{ opacity: sectionOpacity, y: sectionY, scale: sectionScale, filter: sectionBlur }}
        >
            <div className="container certs-container">
                <div className="section-header">
                    <div className="header-decoration animate-on-scroll">
                        <ShinyText text="Certifications" disabled={false} speed={2} className="section-title" />
                    </div>
                    <p className="section-subtitle">A collection of my professional certifications and achievements.</p>
                </div>

                {/* Filters */}
                <div className="certificate-filters">
                    {organizations.map((org) => (
                        <button
                            key={org}
                            className={`filter-btn ${filter === org ? "active" : ""}`}
                            onClick={() => { setFilter(org); setExpanded(null); }}
                        >
                            {org === "all" ? "All" : org}
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <div className={`timeline ${!showAll ? "timeline--collapsed" : ""}`}>
                    {Object.entries(groupedByYear).sort(([a], [b]) => Number(b) - Number(a)).map(([year, certs]) => (
                        <div key={year} className="timeline-year-group">
                            <div className="timeline-year-label">{year}</div>

                            {certs.map((cert) => {
                                const isOpen = expanded === cert.title;
                                return (
                                    <div key={cert.title} className="timeline-item">
                                        <div className={`cert-card ${isOpen ? "open" : ""}`} onClick={() => toggle(cert.title)}>
                                            <div className="cert-card-header">
                                                <div className="cert-logo">
                                                    <img
                                                        src={cert.logo}
                                                        alt={cert.organization}
                                                        width="20"
                                                        height="20"
                                                        loading="lazy"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                    />
                                                </div>
                                                <div className="cert-info">
                                                    <h3 className="cert-title">{cert.title}</h3>
                                                    <span className="cert-org">{cert.organization}</span>
                                                </div>
                                                <div className="cert-meta">
                                                    <span className="cert-date">{cert.date}</span>
                                                    <KeyboardArrowDownRoundedIcon
                                                        className={`cert-chevron ${isOpen ? "rotated" : ""}`}
                                                    />
                                                </div>
                                            </div>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        className="cert-card-body"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                                    >
                                                        <div className="cert-card-body-inner">
                                                            {cert.image && (
                                                                <img
                                                                    src={cert.image}
                                                                    alt={`${cert.title} certificate preview`}
                                                                    className="cert-preview-image"
                                                                    width="700"
                                                                    height="420"
                                                                    loading="lazy"
                                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                                                                />
                                                            )}
                                                            <a
                                                                href={cert.credential_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="cert-credential-btn"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span>View Credential</span>
                                                                <LaunchIcon style={{ fontSize: "0.9rem" }} />
                                                            </a>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
                {filtered.length > INITIAL_COUNT && (
                    <div className="certs-expand-wrap">
                        <button className="certs-expand-btn" onClick={() => setShowAll((p) => !p)}>
                            {showAll
                                ? "Show less"
                                : `Show ${filtered.length - INITIAL_COUNT} more certifications`}
                            <KeyboardArrowDownRoundedIcon
                                style={{
                                    fontSize: "1.1rem",
                                    transition: "transform 0.25s ease",
                                    transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                            />
                        </button>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default Certificates;
