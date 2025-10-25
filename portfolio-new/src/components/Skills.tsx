import React, { useEffect, useRef } from "react";
import "../styles/Skill.css";

// ===== Import all icons =====
import javascriptIcon from "../assets/icons/javascript.png";
import typescriptIcon from "../assets/icons/typescript.png";
import reactIcon from "../assets/icons/react.png";
import nextjsIcon from "../assets/icons/nextjs.webp";
import reduxIcon from "../assets/icons/redux.png";
import tailwindIcon from "../assets/icons/tailwind.png";
import sassIcon from "../assets/icons/sass.webp";
import bootstrapIcon from "../assets/icons/bootstrap.svg";

import nodejsIcon from "../assets/icons/node.png";
import expressIcon from "../assets/icons/express.png";

import mysqlIcon from "../assets/icons/mysql.svg";
import postgresqlIcon from "../assets/icons/postgreSQL.webp";
import mongodbIcon from "../assets/icons/mongodb.svg";

import gitIcon from "../assets/icons/git.png";
import dockerIcon from "../assets/icons/docker.svg";
import awsIcon from "../assets/icons/aws.webp";
import zustandIcon from "../assets/icons/zustand.svg";
import muiIcon from "../assets/icons/mui.png";
import mantineIcon from "../assets/icons/mantine-logo.svg";
import css3Icon from "../assets/icons/css3.png";
import html5Icon from "../assets/icons/html-5.png";
import flaskIcon from "../assets/icons/flask.png";
import fastifyIcon from "../assets/icons/fastify.png";
import graphQLIcon from "../assets/icons/GraphQL.svg";
import azureSQLIcon from "../assets/icons/azure-sql.svg";
import plsqlIcon from "../assets/icons/plsql.svg";
import pythonIcon from "../assets/icons/python.svg";
import javaIcon from "../assets/icons/java.svg";
import azureIcon from "../assets/icons/azure.png";
import googleCloudIcon from "../assets/icons/google-cloud.png";
import oracleCloudIcon from "../assets/icons/Oracle-Symbol.png";
import jestIcon from "../assets/icons/jest.svg";
import postmanIcon from "../assets/icons/postman.svg";

interface Skill {
    name: string;
    category: "frontend" | "backend" | "database" | "tools" | "programmingLanguages" | "cloud";
    icon: string;
}

// ===== Skill data =====
const skills: Skill[] = [
    // Frontend
    { name: "React", category: "frontend", icon: reactIcon },
    { name: "TypeScript", category: "frontend", icon: typescriptIcon },
    { name: "JavaScript", category: "frontend", icon: javascriptIcon },
    { name: "React Native", category: "frontend", icon: reactIcon },
    { name: "Zustand", category: "frontend", icon: zustandIcon },
    { name: "Next.Js", category: "frontend", icon: nextjsIcon },
    { name: "Redux", category: "frontend", icon: reduxIcon },
    { name: "Material UI", category: "frontend", icon: muiIcon },
    { name: "mantine UI", category: "frontend", icon: mantineIcon },
    { name: "Tailwind CSS", category: "frontend", icon: tailwindIcon },
    { name: "Sass", category: "frontend", icon: sassIcon },
    { name: "Bootstrap", category: "frontend", icon: bootstrapIcon },
    { name: "CSS3", category: "frontend", icon: css3Icon },
    { name: "HTML5", category: "frontend", icon: html5Icon },

    // Backend
    { name: "Node.Js", category: "backend", icon: nodejsIcon },
    { name: "Flask", category: "backend", icon: flaskIcon },
    { name: "NextJS", category: "backend", icon: nextjsIcon },
    { name: "Express.Js", category: "backend", icon: expressIcon },
    { name: "GraphQL", category: "backend", icon: graphQLIcon },
    { name: "Fastify", category: "backend", icon: fastifyIcon },

    // Database
    { name: "MySQL", category: "database", icon: mysqlIcon },
    { name: "PostgreSQL", category: "database", icon: postgresqlIcon },
    { name: "MongoDB", category: "database", icon: mongodbIcon },
    { name: "Azure SQL", category: "database", icon: azureSQLIcon },
    { name: "PL/SQL", category: "database", icon: plsqlIcon },

    { name: "Python", category: "programmingLanguages", icon: pythonIcon },
    { name: "JavaScript", category: "programmingLanguages", icon: javascriptIcon },
    { name: "Java", category: "programmingLanguages", icon: javaIcon },

    { name: "Azure", category: "cloud", icon: azureIcon },
    { name: "AWS", category: "cloud", icon: awsIcon },
    { name: "Google Cloud", category: "cloud", icon: googleCloudIcon },
    { name: "OCI", category: "cloud", icon: oracleCloudIcon },
    { name: "OIC", category: "cloud", icon: oracleCloudIcon },

    // Tools
    { name: "Jest", category: "tools", icon: jestIcon },
    { name: "Git", category: "tools", icon: gitIcon },
    { name: "Docker", category: "tools", icon: dockerIcon },
    { name: "Postman", category: "tools", icon: postmanIcon },
];

const Skills: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");

                        // Add staggered animation for skill items
                        if (entry.target.classList.contains("technologies-group")) {
                            const skillItems = entry.target.querySelectorAll(".skill-item");
                            skillItems.forEach((item, index) => {
                                (item as HTMLElement).style.animationDelay = `${index * 0.05}s`;
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

    const getSkillsByCategory = (category: Skill["category"]) => skills.filter((skill) => skill.category === category);

    const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
        <div className="skill-item animate-on-scroll">
            <div className="skill-icon">
                <img
                    src={skill.icon}
                    alt={skill.name}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                    }}
                />
                <span className="fallback-icon">{skill.name.charAt(0)}</span>
            </div>
            <span className="skill-name">{skill.name}</span>
            <div className="skill-hover-effect"></div>
        </div>
    );

    const categoryConfig = {
        frontend: { title: "Frontend" },
        backend: { title: "Backend" },
        database: { title: "Database" },
        programmingLanguages: { title: "Programming Languages" },
        cloud: { title: "Cloud" },
        tools: { title: "Tools" },
    };

    return (
        <section ref={sectionRef} id="skills" className="section skills-section">
            <div className="container">
                <div className="skills-header">
                    <div className="header-decoration animate-on-scroll">
                        <h2 className="section-title">My Stack</h2>
                    </div>
                    <p className="section-subtitle animate-on-scroll">Technologies I work with to create amazing experiences</p>
                </div>

                <div className="two-column-layout">
                    {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category, categoryIndex) => (
                        <React.Fragment key={category}>
                            {/* Header Column */}
                            <div className="headers-column">
                                <div className="category-header-item animate-on-scroll" style={{ animationDelay: `${categoryIndex * 0.15}s` }}>
                                    <div className="category-glow"></div>
                                    <h3 className="category-header-title">{categoryConfig[category].title}</h3>
                                </div>
                            </div>

                            {/* Technologies Column */}
                            <div className="technologies-column">
                                <div className="technologies-group animate-on-scroll" style={{ animationDelay: `${categoryIndex * 0.15}s` }}>
                                    <div className="technologies-grid">
                                        {getSkillsByCategory(category).map((skill) => (
                                            <SkillItem key={skill.name} skill={skill} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
