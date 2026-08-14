import React from "react";
import "./Timeline.css";

interface WorkEntry {
    type: "work";
    role: string;
    officialTitle: string;
    company: string;
    location: string;
    period: string;
    current: boolean;
    bullets: string[];
    tech: string[];
}

interface EduEntry {
    type: "education";
    degree: string;
    institution: string;
    period: string;
    grade: string;
}

type TimelineEntry = WorkEntry | EduEntry;

const ENTRIES: TimelineEntry[] = [
    {
        type: "work",
        officialTitle: "Senior Analyst",
        role: "Full Stack Developer",
        company: "Accenture",
        location: "Mumbai, India",
        period: "Jun 2025 – Present",
        current: true,
        bullets: [
            "Built production agentic AI including a RAG-based onboarding assistant that cut training time by 30%",
            "Engineered an AI-powered EBS-to-Cloud migration planning tool on Oracle APEX",
            "Streamlined operations by automating workflows (30% less manual effort, 10–15% cost savings)",
        ],
        tech: ["React", "TypeScript", "Node.js", "Python", "Azure Databricks", "Oracle OCI"],
    },
    {
        type: "work",
        officialTitle: "Analyst",
        role: "Full Stack Developer",
        company: "Accenture",
        location: "Mumbai, India",
        period: "Sep 2022 – May 2025",
        current: false,
        bullets: [
            "Led development of a finance management platform used by 15,000+ enterprise users",
            "Architected scalable microservices, improving overall system throughput by 30%",
            "Optimized database query performance by 15% across 10M+ record datasets and migrated SQL workloads to Azure Databricks, lifting analytics performance 20%",
            "Improved frontend performance by 20% through code-splitting, lazy loading, and optimized state management",
        ],
        tech: ["React", "TypeScript", "Node.js", "Azure SQL Server", "Azure Databricks"],
    },
    {
        type: "work",
        officialTitle: "Associate Software Engineer",
        role: "Full Stack Developer",
        company: "Accenture",
        location: "Mumbai, India",
        period: "Jul 2021 – Aug 2022",
        current: false,
        bullets: [
            "Joined the finance platform team and contributed to core feature development",
            "Built and integrated REST APIs consumed by the frontend dashboard",
            "Collaborated on UI components and data visualization modules",
        ],
        tech: ["React", "Node.js", "SQL Server"],
    },
    {
        type: "education",
        degree: "Bachelor of Technology, Computer Science & Engineering",
        institution: "MIT ADT University, Pune",
        period: "2017 – 2021",
        grade: "7.0 CGPA",
    },
    {
        type: "education",
        degree: "Class XII (HSC)",
        institution: "Shubham Raje Jr. College",
        period: "2015 – 2017",
        grade: "82%",
    },
    {
        type: "education",
        degree: "Class X (SSC)",
        institution: "St. Xavier's English High School",
        period: "2015",
        grade: "88.40%",
    },
];

const STATS = [
    { label: "Experience", value: "4+" },
    { label: "Positions", value: "3" },
    { label: "Institutions", value: "3" },
    { label: "Technologies", value: "7" },
];

function BriefcaseIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
    );
}

function GradCapIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
    );
}

function WorkCard({ entry, align }: { entry: WorkEntry; align: "left" | "right" }) {
    return (
        <div className={`tl-card ${align === "left" ? "tl-card-left" : ""}`}>
            <div className="tl-card-top">
                <span className="tl-badge tl-badge-work">Work</span>
                <span className="tl-period">
                    {entry.current && <span className="tl-current-dot" />}
                    {entry.period}
                </span>
            </div>
            <div className="tl-role">{entry.officialTitle}</div>
            <div className="tl-role-sub">{entry.role} · {entry.company}</div>
            <div className="tl-subtitle">
                {entry.location}
            </div>
            <ul className="tl-bullets">
                {entry.bullets.map((b, i) => (
                    <li key={i}>
                        <span className="tl-bullet-dot">·</span>
                        {b}
                    </li>
                ))}
            </ul>
            <div className="tl-tech-row">
                {entry.tech.map((t) => (
                    <span key={t} className="tl-tech-tag">{t}</span>
                ))}
            </div>
        </div>
    );
}

function EduCard({ entry, align }: { entry: EduEntry; align: "left" | "right" }) {
    return (
        <div className={`tl-card ${align === "left" ? "tl-card-left" : ""}`}>
            <div className="tl-card-top">
                <span className="tl-badge tl-badge-edu">Education</span>
                <span className="tl-period">{entry.period}</span>
            </div>
            <div className="tl-role">{entry.degree}</div>
            <div className="tl-subtitle">
                {entry.institution}
                <span className="tl-grade">{entry.grade}</span>
            </div>
        </div>
    );
}

const Timeline: React.FC = () => {
    return (
        <div className="timeline-page">
            <div className="timeline-inner">
                <div className="timeline-section">
                    <div className="tl-stats">
                        {STATS.map((s) => (
                            <div key={s.label} className="tl-stat-card">
                                <div className="tl-stat-value">{s.value}</div>
                                <div className="tl-stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="timeline-section">
                    <div className="tl-track">
                        <div className="tl-line" />
                        {ENTRIES.map((entry, idx) => {
                            const align: "left" | "right" = idx % 2 === 0 ? "left" : "right";
                            const icon = entry.type === "work" ? <BriefcaseIcon /> : <GradCapIcon />;
                            return (
                                <div key={idx} className={`tl-entry ${align}`}>
                                    {align === "left" ? (
                                        <>
                                            <div className="tl-card-slot">
                                                {entry.type === "work"
                                                    ? <WorkCard entry={entry} align="left" />
                                                    : <EduCard entry={entry} align="left" />}
                                            </div>
                                            <div className="tl-node">{icon}</div>
                                            <div className="tl-spacer" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="tl-spacer" />
                                            <div className="tl-node">{icon}</div>
                                            <div className="tl-card-slot">
                                                {entry.type === "work"
                                                    ? <WorkCard entry={entry} align="right" />
                                                    : <EduCard entry={entry} align="right" />}
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timeline;
