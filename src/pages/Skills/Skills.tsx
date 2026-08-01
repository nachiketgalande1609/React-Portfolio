import React, { useEffect, useRef } from "react";
import "./Skill.css";

// ===== Import all icons =====
import javascriptIcon from "../../assets/icons/javascript.png";
import typescriptIcon from "../../assets/icons/typescript.png";
import reactIcon from "../../assets/icons/react.png";
import nextjsIcon from "../../assets/icons/nextjs.webp";
import nestjsIcon from "../../assets/icons/nestjs.png";
import reduxIcon from "../../assets/icons/redux.png";
import tailwindIcon from "../../assets/icons/tailwind.png";
import sassIcon from "../../assets/icons/sass.webp";
import bootstrapIcon from "../../assets/icons/bootstrap.svg";

import nodejsIcon from "../../assets/icons/node.png";
import expressIcon from "../../assets/icons/express.png";

import mysqlIcon from "../../assets/icons/mysql.svg";
import postgresqlIcon from "../../assets/icons/postgreSQL.webp";
import mongodbIcon from "../../assets/icons/mongodb.svg";
import redisIcon from "../../assets/icons/Redis.svg";

import gitIcon from "../../assets/icons/git.png";
import dockerIcon from "../../assets/icons/docker.svg";
import awsIcon from "../../assets/icons/aws.webp";
import zustandIcon from "../../assets/icons/zustand.svg";
import muiIcon from "../../assets/icons/mui.png";
import mantineIcon from "../../assets/icons/mantine-logo.svg";
import css3Icon from "../../assets/icons/css3.png";
import html5Icon from "../../assets/icons/html-5.png";
import flaskIcon from "../../assets/icons/flask.png";
import fastifyIcon from "../../assets/icons/fastify.png";
import graphQLIcon from "../../assets/icons/GraphQL.svg";
import azureSQLIcon from "../../assets/icons/azure-sql.svg";
import plsqlIcon from "../../assets/icons/plsql.svg";
import pythonIcon from "../../assets/icons/python.svg";
import javaIcon from "../../assets/icons/java.svg";
import azureIcon from "../../assets/icons/azure.png";
import googleCloudIcon from "../../assets/icons/google-cloud.png";
import oracleCloudIcon from "../../assets/icons/Oracle-Symbol.png";
import jestIcon from "../../assets/icons/jest.svg";
import postmanIcon from "../../assets/icons/postman.svg";
// import GlitchText from "../../components/GlitchText/GlitchText";
import ShinyText from "../../components/ShinyText/ShinyText";

interface Skill {
    name: string;
    category: "frontend" | "backend" | "database" | "tools" | "programmingLanguages" | "cloud";
    icon: string;
    website: string;
}

// ===== Skill data =====
const skills: Skill[] = [
    // Frontend
    { name: "React", category: "frontend", icon: reactIcon, website: "https://react.dev/" },
    { name: "Next.Js", category: "frontend", icon: nextjsIcon, website: "https://nextjs.org/" },
    { name: "Redux", category: "frontend", icon: reduxIcon, website: "https://redux.js.org/" },
    { name: "TypeScript", category: "frontend", icon: typescriptIcon, website: "https://www.typescriptlang.org/" },
    { name: "JavaScript", category: "frontend", icon: javascriptIcon, website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "React Native", category: "frontend", icon: reactIcon, website: "https://reactnative.dev/" },
    { name: "Zustand", category: "frontend", icon: zustandIcon, website: "https://zustand-demo.pmnd.rs/" },
    { name: "Material UI", category: "frontend", icon: muiIcon, website: "https://mui.com/" },
    { name: "Mantine UI", category: "frontend", icon: mantineIcon, website: "https://mantine.dev/" },
    { name: "Tailwind CSS", category: "frontend", icon: tailwindIcon, website: "https://tailwindcss.com/" },
    { name: "Sass", category: "frontend", icon: sassIcon, website: "https://sass-lang.com/" },
    { name: "Bootstrap", category: "frontend", icon: bootstrapIcon, website: "https://getbootstrap.com/" },
    { name: "CSS3", category: "frontend", icon: css3Icon, website: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "HTML5", category: "frontend", icon: html5Icon, website: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" },

    // Backend
    { name: "Node.Js", category: "backend", icon: nodejsIcon, website: "https://nodejs.org/" },
    { name: "NestJS", category: "backend", icon: nestjsIcon, website: "https://nestjs.com/" },
    { name: "Flask", category: "backend", icon: flaskIcon, website: "https://flask.palletsprojects.com/" },
    { name: "Express.Js", category: "backend", icon: expressIcon, website: "https://expressjs.com/" },
    { name: "GraphQL", category: "backend", icon: graphQLIcon, website: "https://graphql.org/" },
    { name: "Fastify", category: "backend", icon: fastifyIcon, website: "https://www.fastify.io/" },

    // Database
    { name: "PostgreSQL", category: "database", icon: postgresqlIcon, website: "https://www.postgresql.org/" },
    { name: "Redis", category: "database", icon: redisIcon, website: "https://redis.io/" },
    { name: "MySQL", category: "database", icon: mysqlIcon, website: "https://www.mysql.com/" },
    { name: "MongoDB", category: "database", icon: mongodbIcon, website: "https://www.mongodb.com/" },
    { name: "Azure SQL", category: "database", icon: azureSQLIcon, website: "https://azure.microsoft.com/en-us/products/azure-sql/database/" },
    { name: "PL/SQL", category: "database", icon: plsqlIcon, website: "https://www.oracle.com/database/technologies/appdev/plsql.html" },

    { name: "Python", category: "programmingLanguages", icon: pythonIcon, website: "https://www.python.org/" },
    {
        name: "JavaScript",
        category: "programmingLanguages",
        icon: javascriptIcon,
        website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    { name: "Java", category: "programmingLanguages", icon: javaIcon, website: "https://www.java.com/" },

    { name: "Azure", category: "cloud", icon: azureIcon, website: "https://azure.microsoft.com/" },
    { name: "AWS", category: "cloud", icon: awsIcon, website: "https://aws.amazon.com/" },
    { name: "Google Cloud", category: "cloud", icon: googleCloudIcon, website: "https://cloud.google.com/" },
    { name: "OCI", category: "cloud", icon: oracleCloudIcon, website: "https://www.oracle.com/cloud/" },
    { name: "OIC", category: "cloud", icon: oracleCloudIcon, website: "https://www.oracle.com/integration/what-is-oic/" },

    // Tools
    { name: "Jest", category: "tools", icon: jestIcon, website: "https://jestjs.io/" },
    { name: "Git", category: "tools", icon: gitIcon, website: "https://git-scm.com/" },
    { name: "Docker", category: "tools", icon: dockerIcon, website: "https://www.docker.com/" },
    { name: "Postman", category: "tools", icon: postmanIcon, website: "https://www.postman.com/" },
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
        <a href={skill.website} target="_blank" rel="noopener noreferrer" className="skill-item-link">
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
        </a>
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
                <div className="section-header">
                    <div className="header-decoration animate-on-scroll">
                        {/* <GlitchText speed={2} enableShadows={true} enableOnHover={false} className="custom-class">
                            My Skills
                        </GlitchText> */}
                        <ShinyText text="My Skill" disabled={false} speed={2} className="section-title" />
                    </div>
                    <p className="section-subtitle animate-on-scroll">Technologies I work with to create amazing experiences</p>
                </div>

                <div className="two-column-layout">
                    {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category, categoryIndex) => (
                        // Each category now gets its own grid row within two-column-layout
                        <React.Fragment key={category}>
                            {/* Header Column */}
                            <div className="category-header-item-wrapper">
                                {" "}
                                {/* New wrapper for sticky behavior */}
                                <div className="category-header-item animate-on-scroll" style={{ animationDelay: `${categoryIndex * 0.15}s` }}>
                                    <div className="category-glow"></div>
                                    <h3 className="category-header-title">{categoryConfig[category].title}</h3>
                                </div>
                            </div>

                            {/* Technologies Column */}
                            <div className="technologies-group-wrapper">
                                {" "}
                                {/* New wrapper to manage padding/borders */}
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
