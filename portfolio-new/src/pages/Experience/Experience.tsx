import React from "react";
import { motion, type Variants } from "framer-motion";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./Experience.css";
import { experienceData } from "../../data/portfolioData";

import reactIcon from "../../assets/icons/react.png";
import flaskIcon from "../../assets/icons/flask.png";
import pythonIcon from "../../assets/icons/python.svg";
import mongodbIcon from "../../assets/icons/mongodb.svg";
import awsIcon from "../../assets/icons/aws.webp";
import materialuiIcon from "../../assets/icons/mui.png";
import reactnativeIcon from "../../assets/icons/react.png";
import typescriptIcon from "../../assets/icons/typescript.png";
import nodejsIcon from "../../assets/icons/node.png";
import webrtcIcon from "../../assets/icons/webrtc.svg";
import expressIcon from "../../assets/icons/express.png";
import openaiIcon from "../../assets/icons/openai.webp";
import azureIcon from "../../assets/icons/azure.png";
import bootstrapIcon from "../../assets/icons/bootstrap.svg";
import socketioIcon from "../../assets/icons/socketio.webp";
import streamlitIcon from "../../assets/icons/Streamlit.svg";
import pygameIcon from "../../assets/icons/python.svg";
import pyttsx3Icon from "../../assets/icons/python.svg";
import sqliteIcon from "../../assets/icons/SQLite.svg";
import reduxIcon from "../../assets/icons/redux.png";
import databricksIcon from "../../assets/icons/databricks.svg";
import azureSqlIcon from "../../assets/icons/azure-sql.svg";
import azureDevOpsIcon from "../../assets/icons/azure-devops.svg";
import oracleIcon from "../../assets/icons/Oracle-Symbol.png";
import ShinyText from "../../components/ShinyText/ShinyText";

const techIcons: { [key: string]: string } = {
    "React.js": reactIcon,
    TypeScript: typescriptIcon,
    "Material-UI": materialuiIcon,
    Bootstrap: bootstrapIcon,
    Databricks: databricksIcon,
    "Azure DevOps": azureDevOpsIcon,
    "React Native": reactnativeIcon,
    "Node.js": nodejsIcon,
    "Azure SQL Server": azureSqlIcon,
    "Express.js": expressIcon,
    Python: pythonIcon,
    Flask: flaskIcon,
    "Socket.io": socketioIcon,
    MongoDB: mongodbIcon,
    SQLite: sqliteIcon,
    AWS: awsIcon,
    Azure: azureIcon,
    OpenAI: openaiIcon,
    WebRTC: webrtcIcon,
    Streamlit: streamlitIcon,
    Pygame: pygameIcon,
    pyttsx3: pyttsx3Icon,
    Redux: reduxIcon,
    "Oracle OCI": oracleIcon,
    "Oracle OIC": oracleIcon,
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] } },
};

const isCurrentRole = (period: string) => /present|current/i.test(period);

const Experience: React.FC = () => {
    return (
        <motion.section
            id="experience"
            className="section experience-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
        >
            <div className="container experience-container">
                <motion.header className="experience-header" variants={itemVariants}>
                    <span className="experience-eyebrow">
                        <span className="experience-eyebrow-dot" aria-hidden="true" />
                        <span>Career</span>
                        <span className="experience-eyebrow-count">
                            {experienceData.length} {experienceData.length === 1 ? "role" : "roles"}
                        </span>
                    </span>
                    <ShinyText text="Professional Experience" disabled={false} speed={2} className="section-title" />
                    <p className="experience-subtitle">My journey through the tech industry — roles, teams, and the impact I've delivered.</p>
                </motion.header>

                <div className="experience-timeline">
                    <span className="experience-rail" aria-hidden="true" />

                    {experienceData.map((exp) => {
                        const current = isCurrentRole(exp.period);
                        return (
                            <motion.article key={exp.id} className="experience-card" variants={itemVariants}>
                                <span className="experience-marker" aria-hidden="true">
                                    <WorkRoundedIcon fontSize="inherit" />
                                </span>

                                <header className="experience-card-header">
                                    <div className="experience-card-meta">
                                        <span className="experience-period">{exp.period}</span>
                                        {current && (
                                            <span className="experience-current-badge">
                                                <span className="experience-current-dot" aria-hidden="true" />
                                                Current
                                            </span>
                                        )}
                                    </div>

                                    <div className="experience-titles">
                                        <h3 className="experience-role">{exp.role}</h3>
                                        <p className="experience-company">
                                            <span className="experience-company-name">{exp.company}</span>
                                            {exp.location && <span className="experience-company-location"> · {exp.location}</span>}
                                        </p>
                                    </div>
                                </header>

                                <ul className="experience-bullets">
                                    {exp.description.map((item, idx) => (
                                        <li key={idx} className="experience-bullet">
                                            <CheckCircleRoundedIcon className="experience-bullet-icon" fontSize="inherit" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {exp.technologies.length > 0 && (
                                    <footer className="experience-tech">
                                        <span className="experience-tech-label">Stack</span>
                                        <ul className="experience-tech-list">
                                            {exp.technologies.map((tech) => {
                                                const iconSrc = techIcons[tech];
                                                return (
                                                    <li key={tech} className="experience-tech-chip">
                                                        {iconSrc && <img src={iconSrc} alt="" className="experience-tech-icon" aria-hidden="true" />}
                                                        <span>{tech}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </footer>
                                )}
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};

export default Experience;
