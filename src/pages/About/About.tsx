import React from "react";
import "./About.css";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { motion, type Variants } from "framer-motion";
import ShinyText from "../../components/ShinyText/ShinyText";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] } },
};

const personalDetails = [
    { label: "Year of Birth", value: "1999", icon: <CalendarMonthRoundedIcon /> },
    { label: "Phone", value: "+91 97649 93023", icon: <CallRoundedIcon /> },
    { label: "Location", value: "Mumbai, India", icon: <PersonPinCircleRoundedIcon /> },
    { label: "Age", value: "26", icon: <CakeIcon /> },
    { label: "Email", value: "nachiketgalande1609@gmail.com", icon: <EmailRoundedIcon /> },
];

const education = [
    {
        degree: "Bachelor of Technology, Computer Science & Engineering",
        period: "2017 – 2021",
        grade: "7.0 CGPA",
        institution: "MIT ADT University, Pune",
    },
    {
        degree: "Class XII (HSC)",
        period: "2015 – 2017",
        grade: "82%",
        institution: "Shubham Raje Jr. College",
    },
    {
        degree: "Class X (SSC)",
        period: "2015",
        grade: "88.40%",
        institution: "St. Xavier's English High School",
    },
];

const stats = [
    { value: "4+", label: "Years Experience", description: "Shipping production systems across industries." },
    { value: "20+", label: "Projects Shipped", description: "From side experiments to enterprise platforms." },
    { value: "40+", label: "Certifications", description: "Cloud, data, AI/ML and engineering credentials." },
];

const About: React.FC = () => {
    return (
        <motion.section
            id="about"
            className="section about-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container about-container">
                <motion.div className="about-header" variants={itemVariants}>
                    <span className="about-eyebrow">
                        <span className="about-eyebrow-dot" aria-hidden="true" />
                        <span>Get to know me</span>
                    </span>
                    <ShinyText text="About Me" disabled={false} speed={2} className="section-title" />
                    <p className="about-subtitle">A quick look at who I am, what I've built, and where I've learned.</p>
                </motion.div>

                <motion.div className="about-lead" variants={itemVariants}>
                    <p className="about-lead-text">
                        Senior Full Stack Software Developer with <strong>4+ years</strong> of experience designing, developing, and deploying
                        scalable, high-performance web applications — strong across frontend, backend, and database architecture.
                    </p>
                </motion.div>

                <motion.div className="about-stats" variants={containerVariants}>
                    {stats.map((stat) => (
                        <motion.div key={stat.label} className="about-stat" variants={itemVariants}>
                            <div className="about-stat-value">{stat.value}</div>
                            <div className="about-stat-label">{stat.label}</div>
                            <p className="about-stat-description">{stat.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="about-columns">
                    <motion.section className="about-card" variants={itemVariants} aria-labelledby="about-details-heading">
                        <header className="about-card-header">
                            <h3 id="about-details-heading" className="about-card-title">
                                Personal Details
                            </h3>
                            <span className="about-card-meta">At a glance</span>
                        </header>

                        <ul className="about-detail-list">
                            {personalDetails.map((detail) => (
                                <li key={detail.label} className="about-detail-item">
                                    <span className="about-detail-icon" aria-hidden="true">
                                        {detail.icon}
                                    </span>
                                    <span className="about-detail-text">
                                        <span className="about-detail-label">{detail.label}</span>
                                        <span className="about-detail-value">{detail.value}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    <motion.section className="about-card" variants={itemVariants} aria-labelledby="about-education-heading">
                        <header className="about-card-header">
                            <h3 id="about-education-heading" className="about-card-title">
                                Education
                            </h3>
                            <span className="about-card-meta">
                                <SchoolRoundedIcon fontSize="inherit" /> Academic background
                            </span>
                        </header>

                        <ol className="about-timeline">
                            {education.map((edu, idx) => (
                                <li key={edu.degree} className="about-timeline-item">
                                    <span className="about-timeline-marker" aria-hidden="true">
                                        <span className="about-timeline-marker-dot" />
                                    </span>
                                    <div className="about-timeline-content">
                                        <div className="about-timeline-meta">
                                            <span className="about-timeline-period">{edu.period}</span>
                                            <span className="about-timeline-grade">{edu.grade}</span>
                                        </div>
                                        <h4 className="about-timeline-degree">{edu.degree}</h4>
                                        <p className="about-timeline-institution">{edu.institution}</p>
                                    </div>
                                    {idx < education.length - 1 && <span className="about-timeline-connector" aria-hidden="true" />}
                                </li>
                            ))}
                        </ol>
                    </motion.section>
                </div>
            </div>
        </motion.section>
    );
};

export default About;
