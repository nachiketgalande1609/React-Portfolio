import React, { useEffect, useRef } from "react";
import "../styles/Experience.css";
import { experienceData } from "../data/portfolioData";

import reactIcon from "../assets/icons/react.png";
import flaskIcon from "../assets/icons/flask.png";
import pythonIcon from "../assets/icons/python.svg";
import mongodbIcon from "../assets/icons/mongodb.svg";
import awsIcon from "../assets/icons/aws.webp";
import materialuiIcon from "../assets/icons/mui.png";
import reactnativeIcon from "../assets/icons/react.png";
import typescriptIcon from "../assets/icons/typescript.png";
import nodejsIcon from "../assets/icons/node.png";
import webrtcIcon from "../assets/icons/webrtc.svg";
import expressIcon from "../assets/icons/express.png";
import openaiIcon from "../assets/icons/openai.webp";
import azureIcon from "../assets/icons/azure.png";
import bootstrapIcon from "../assets/icons/bootstrap.svg";
import socketioIcon from "../assets/icons/socketio.webp";
import streamlitIcon from "../assets/icons/Streamlit.svg";
import pygameIcon from "../assets/icons/python.svg";
import pyttsx3Icon from "../assets/icons/python.svg";
import sqliteIcon from "../assets/icons/SQLite.svg";
import reduxIcon from "../assets/icons/redux.png";
import databricksIcon from "../assets/icons/databricks.svg";
import azureSqlIcon from "../assets/icons/azure-sql.svg";
import azureDevOpsIcon from "../assets/icons/azure-devops.svg";
import oracleIcon from "../assets/icons/Oracle-Symbol.png";

// Create a mapping object for technology icons
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

const Experience: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");

                        // Add staggered animation for timeline items
                        if (entry.target.classList.contains("experience-content")) {
                            const experienceItems = entry.target.querySelectorAll(".experience-item");
                            experienceItems.forEach((item, index) => {
                                (item as HTMLElement).style.animationDelay = `${index * 0.15}s`;
                            });
                        }
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

    // Function to get icon for a technology - returns undefined if not found
    const getTechIcon = (tech: string): string | undefined => {
        return techIcons[tech];
    };

    return (
        <section ref={sectionRef} id="experience" className="section experience-section">
            <div className="container">
                <div className="experience-header">
                    <div className="header-decoration animate-on-scroll">
                        <h2 className="section-title">Professional Experience</h2>
                    </div>
                    <p className="section-subtitle animate-on-scroll">My journey through the tech industry</p>
                </div>

                <div className="experience-content animate-on-scroll">
                    <div className="timeline-container">
                        {/* Continuous Timeline Line */}
                        <div className="timeline-line-main"></div>

                        {experienceData.map((experience, index) => (
                            <div key={experience.id} className="experience-item">
                                {/* Left Side - Company Details */}
                                <div className="company-details">
                                    <div className="company-card">
                                        <div className="period-header">
                                            <span className="period-text">{experience.period}</span>
                                        </div>

                                        <div className="company-main">
                                            <div className="company-info">
                                                <h3 className="company-name">{experience.company}</h3>
                                                {experience.location && (
                                                    <div className="company-location">
                                                        <span>{experience.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="tech-skills-section">
                                            <div className="technologies-section">
                                                <div className="tags-container">
                                                    {experience.technologies.map((tech, techIndex) => {
                                                        const iconSrc = getTechIcon(tech);
                                                        return (
                                                            <span key={techIndex} className="tech-tag">
                                                                {iconSrc && <img src={iconSrc} alt={tech} className="tech-icon" />}
                                                                <span className="tech-text">{tech}</span>
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-section"></div>

                                {/* Right Side - Work Details */}
                                <div className="work-details">
                                    <div className="work-card">
                                        <div className="card-corner"></div>

                                        <div className="role-section">
                                            <h4 className="role-title">{experience.role}</h4>
                                        </div>
                                        <div className="experience-description">
                                            <ul className="description-list">
                                                {experience.description.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="description-item">
                                                        <span className="bullet"></span>
                                                        <span className="description-text">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="card-glow"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
