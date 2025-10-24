import React, { useEffect, useRef } from "react";
import "../styles/Projects.css";

import livoImage from "../assets/projects/livo.png";
import rippleImage from "../assets/projects/ripple.png";
import streamlineImage from "../assets/projects/streamline.png";
import urbanImage from "../assets/projects/urban.png";
import echoImage from "../assets/projects/echo.png";
import cryptoImage from "../assets/projects/crypto.jpg";
import flappyBirdImage from "../assets/projects/flappybird.png";
import vocabImage from "../assets/projects/vocab.png";
import tetrisImage from "../assets/projects/tetris.png";

// Projects data object
const projectsData = {
    projects: [
        {
            id: 1,
            name: "Workout & Diet Tracker – Livo",
            description:
                "A fitness tracking web application that allows users to manage workouts and diet plans. Features include progress tracking, workout scheduling, meal logging, and personalized dashboards. Backend APIs are built with Flask, while MongoDB stores user activity and nutrition data.",
            techStack: ["React", "Flask", "Python", "MongoDB", "AWS", "Material UI"],
            image: livoImage,
            liveLink: "https://my-ecommerce-demo.netlify.app",
            githubLink: "https://github.com/username/ecommerce-platform",
        },
        {
            id: 2,
            name: "Social Media App (Web & Mobile) - Ripple",
            description:
                "A scalable social media platform with real-time messaging, video calls, and expiring stories. Features include push notifications, media sharing, and end-to-end encryption. Deployed on AWS with containerized architecture using Docker.",
            techStack: ["React", "React Native", "TypeScript", "Node.js", "WebRTC", "AWS"],
            image: rippleImage,
            liveLink: "https://my-taskapp.vercel.app",
            githubLink: "https://github.com/username/task-management-app",
        },
        {
            id: 3,
            name: "MERN-Based ERP System - Streamline",
            description:
                "Comprehensive ERP system with modules for users, inventory, orders, warehouses, customers, and sales. Provides a unified solution for business management with modern UI and efficient data handling.",
            techStack: ["React", "Node.js", "Express.js", "MongoDB", "Material UI"],
            image: streamlineImage,
            liveLink: "https://weather-dashboard-demo.netlify.app",
            githubLink: "https://github.com/username/weather-dashboard",
        },
        {
            id: 4,
            name: "Generative Intelligence Speech Therapy - GIST",
            description:
                "Platform supporting children with autism through interactive modules and personalized learning experiences. Leverages generative AI for real-time therapist interaction and adaptive learning paths.",
            techStack: ["Flask", "Python", "Gen AI", "Open AI", "SQLite"],
            image: "https://github.com/nachiketgalande1609/GIST/blob/main/static/screenshots/profile.png?raw=true",
            liveLink: "https://my-portfolio-website.vercel.app",
            githubLink: "https://github.com/username/portfolio-website",
        },
        {
            id: 5,
            name: "Gen AI Onboarding Assistant",
            description:
                "AI-powered assistant for project knowledge transfer, featuring document summarization and advanced Q&A capabilities. Deployed on Azure to enhance productivity for new team members with contextual understanding.",
            techStack: ["Flask", "Python", "Gen AI", "OpenAI", "Azure"],
            image: "https://github.com/nachiketgalande1609/GenAI-Onboarding-Assistant/blob/main/static/screenshots/snap.png?raw=true",
            liveLink: "https://social-analytics-demo.herokuapp.com",
            githubLink: "https://github.com/username/social-media-analytics",
        },
        {
            id: 6,
            name: "URBAN E-Commerce Platform",
            description:
                "Full-featured e-commerce platform with user authentication, product management, shopping cart, wishlists, and admin dashboard. Built with Flask and MongoDB for efficient data handling.",
            techStack: ["Flask", "MongoDB", "Bootstrap"],
            image: urbanImage,
            liveLink: "https://fitness-tracker-expo.netlify.app",
            githubLink: "https://github.com/username/fitness-tracking-app",
        },
        {
            id: 7,
            name: "Echo - Real-Time Chat",
            description:
                "Dynamic chat application with real-time messaging using WebSockets. Features user authentication, chat rooms, and message persistence with MongoDB for seamless communication experience.",
            techStack: ["Flask", "Socket.IO", "MongoDB"],
            image: echoImage,
            liveLink: "https://fitness-tracker-expo.netlify.app",
            githubLink: "https://github.com/username/fitness-tracking-app",
        },
        {
            id: 8,
            name: "Cryptocurrency Price Prediction",
            description:
                "Web app for predicting Bitcoin and Ethereum prices using machine learning algorithms. Features data analysis, model training with historical data, and interactive visualizations. Published research in ICACCS 2021 journal.",
            techStack: ["Python", "Streamlit", "Machine Learning"],
            image: cryptoImage,
            liveLink: "https://fitness-tracker-expo.netlify.app",
            githubLink: "https://github.com/username/fitness-tracking-app",
        },
        {
            id: 9,
            name: "Flappy Bird Game",
            description:
                "Classic Flappy Bird game implementation with Pygame. Features dynamic obstacle generation, collision detection, gravity mechanics, and sound effects for an engaging gaming experience.",
            techStack: ["Python", "Pygame"],
            image: flappyBirdImage,
            liveLink: "https://fitness-tracker-expo.netlify.app",
            githubLink: "https://github.com/username/fitness-tracking-app",
        },
        {
            id: 10,
            name: "English Vocabulary Builder",
            description:
                "Web application for vocabulary learning with quizzes and pronunciation features. Includes Barron's GRE word lists, multiple-choice quizzes, and text-to-speech functionality.",
            techStack: ["Flask", "Python", "pyttsx3"],
            image: vocabImage,
            liveLink: "https://fitness-tracker-expo.netlify.app",
            githubLink: "https://github.com/username/fitness-tracking-app",
        },
        {
            id: 11,
            name: "Tetris Game",
            description:
                "Classic Tetris implementation with Pygame. Features smooth controls, shape rotation, collision detection, scoring system, and sound effects for an authentic gaming experience.",
            techStack: ["Python", "Pygame"],
            image: tetrisImage,
            liveLink: "https://fitness-tracker-expo.netlify.app",
            githubLink: "https://github.com/username/fitness-tracking-app",
        },
    ],
};

// Type definition for Project
interface Project {
    id: number;
    name: string;
    description: string;
    techStack: string[];
    image: string;
    liveLink: string;
    githubLink: string;
}

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");

                        // Add staggered animation for project cards
                        if (entry.target.classList.contains("projects-grid")) {
                            const projectCards = entry.target.querySelectorAll(".project-card");
                            projectCards.forEach((card, index) => {
                                (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
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

    const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
        <div
            className="project-card animate-on-scroll"
            style={{
                animationDelay: `${index * 0.1}s`,
                top: `calc(80px + ${index * 40}px)`,
                zIndex: index, // each next card appears above the previous one
            }}
        >
            <div className="project-content-wrapper">
                <div className="project-content">
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>

                    <div className="project-technologies">
                        {project.techStack.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag" style={{ animationDelay: `${techIndex * 0.05}s` }}>
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="project-links">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                            <span>GitHub</span>
                            <div className="link-hover-effect"></div>
                        </a>
                        {project.liveLink && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live">
                                <span>Live Demo</span>
                                <div className="link-hover-effect"></div>
                            </a>
                        )}
                    </div>
                </div>

                <div className="project-image">
                    <div className="image-placeholder">
                        <img src={project.image} alt={project.name} className="project-img" />
                        {/* Remove the <span>Project Image</span> line */}
                        <div className="image-shine"></div>
                    </div>
                    <div className="project-overlay">
                        <div className="overlay-links">
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="overlay-link">
                                View Code
                            </a>
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="overlay-link live">
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="card-corner"></div>
                </div>
            </div>
            <div className="card-glow"></div>
        </div>
    );

    return (
        <section ref={sectionRef} id="projects" className="section projects-section">
            <div className="container">
                <div className="projects-header">
                    <div className="header-decoration animate-on-scroll">
                        <div className="decoration-line"></div>
                        <h2 className="section-title">MY PROJECTS</h2>
                        <div className="decoration-line"></div>
                    </div>
                    <p className="section-subtitle animate-on-scroll">A collection of my recent work and creative solutions</p>
                </div>

                <div className="projects-grid animate-on-scroll">
                    {projectsData.projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
