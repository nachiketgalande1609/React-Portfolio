import type { Experience, Project, Skill, SocialLink } from "../types";

// Import project images
import livoImage from "../assets/projects/livo.png";
import rippleImage from "../assets/projects/ripple.png";
import streamlineImage from "../assets/projects/streamline.png";
import urbanImage from "../assets/projects/urban.png";
import echoImage from "../assets/projects/echo.png";
import cryptoImage from "../assets/projects/crypto.jpg";
import flappyBirdImage from "../assets/projects/flappybird.png";
import vocabImage from "../assets/projects/vocab.png";
import tetrisImage from "../assets/projects/tetris.png";

// Import tech stack icons
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

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React, Node.js, and MongoDB",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
        githubUrl: "https://github.com/yourusername/ecommerce",
        liveUrl: "https://yourapp.com",
        image: "/project1.jpg",
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates",
        technologies: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/yourusername/taskapp",
        liveUrl: "https://taskapp.com",
        image: "/project2.jpg",
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather application with location-based forecasts",
        technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
        githubUrl: "https://github.com/yourusername/weather",
        liveUrl: "https://weather-app.com",
        image: "/project3.jpg",
    },
];

export const skills: Skill[] = [
    { name: "React", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "JavaScript", level: 95, category: "frontend" },
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Express", level: 75, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
    { name: "Git", level: 90, category: "tools" },
    { name: "AWS", level: 60, category: "tools" },
    { name: "Docker", level: 65, category: "tools" },
];

export const socialLinks: SocialLink[] = [
    { name: "GitHub", url: "https://github.com/nachiketgalande1609", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/nachiketgalande", icon: "linkedin" },
    { name: "Email", url: "mailto:your.email@example.com", icon: "email" },
];

export const personalInfo = {
    name: "Nachiket Galande",
    title: "Senior Full Stack Developer",
    location: "Mumbai, India",
    email: "nachiketgalande1609@gmail.com",
    phone: "+91 97649 93023",
    about: "Senior Full Stack Developer with 4.5 years of experience delivering scalable, high-performance web applications, specializing in system architecture, database design, performance optimization, and translating complex requirements into efficient solutions.",
};

export const projectsData = {
    projects: [
        {
            id: 1,
            name: "Workout & Diet Tracker – Livo",
            description:
                "A fitness tracking web application that allows users to manage workouts and diet plans. Features include progress tracking, workout scheduling, meal logging, and personalized dashboards. Backend APIs are built with Flask, while MongoDB stores user activity and nutrition data.",
            techStack: ["React", "Flask", "Python", "MongoDB", "AWS", "Material UI"],
            image: livoImage,
            liveLink: "https://livo.nachiketgalande.site/",
            githubLink: "https://github.com/nachiketgalande1609/dietplanner",
        },
        {
            id: 2,
            name: "Social Media App (Web & Mobile) - Ripple",
            description:
                "A scalable social media platform with real-time messaging, video calls, and expiring stories. Features include push notifications, media sharing, and end-to-end encryption. Deployed on AWS with containerized architecture using Docker.",
            techStack: ["React", "React Native", "TypeScript", "Node.js", "WebRTC", "AWS"],
            image: rippleImage,
            liveLink: "https://ripple.nachiketgalande.site/",
            githubLink: "https://nachiketgalande1609.github.io/ripple-links/",
        },
        {
            id: 3,
            name: "MERN-Based ERP System - Streamline",
            description:
                "Comprehensive ERP system with modules for users, inventory, orders, warehouses, customers, and sales. Provides a unified solution for business management with modern UI and efficient data handling.",
            techStack: ["React", "Node.js", "Express.js", "MongoDB", "Material UI"],
            image: streamlineImage,
            liveLink: "https://streamline.nachiketgalande.site/",
            githubLink: "https://github.com/nachiketgalande1609/Streamline",
        },
        {
            id: 4,
            name: "Generative Intelligence Speech Therapy - GIST",
            description:
                "Platform supporting children with autism through interactive modules and personalized learning experiences. Leverages generative AI for real-time therapist interaction and adaptive learning paths.",
            techStack: ["Flask", "Python", "Open AI", "SQLite"],
            image: "https://github.com/nachiketgalande1609/GIST/blob/main/static/screenshots/profile.png?raw=true",
            githubLink: "https://github.com/nachiketgalande1609/GIST",
        },
        {
            id: 5,
            name: "Gen AI Onboarding Assistant",
            description:
                "AI-powered assistant for project knowledge transfer, featuring document summarization and advanced Q&A capabilities. Deployed on Azure to enhance productivity for new team members with contextual understanding.",
            techStack: ["Flask", "Python", "OpenAI", "Azure"],
            image: "https://github.com/nachiketgalande1609/GenAI-Onboarding-Assistant/blob/main/static/screenshots/snap.png?raw=true",
            githubLink: "https://github.com/nachiketgalande1609/GenAI-Onboarding-Assistant",
        },
        {
            id: 6,
            name: "URBAN E-Commerce Platform",
            description:
                "Full-featured e-commerce platform with user authentication, product management, shopping cart, wishlists, and admin dashboard. Built with Flask and MongoDB for efficient data handling.",
            techStack: ["Flask", "MongoDB", "Bootstrap"],
            image: urbanImage,
            githubLink: "https://github.com/nachiketgalande1609/urban",
        },
        {
            id: 7,
            name: "Echo - Real-Time Chat",
            description:
                "Dynamic chat application with real-time messaging using WebSockets. Features user authentication, chat rooms, and message persistence with MongoDB for seamless communication experience.",
            techStack: ["Flask", "Socket.IO", "MongoDB"],
            image: echoImage,
            githubLink: "https://github.com/nachiketgalande1609/Echo",
        },
        {
            id: 8,
            name: "Cryptocurrency Price Prediction",
            description:
                "Web app for predicting Bitcoin and Ethereum prices using machine learning algorithms. Features data analysis, model training with historical data, and interactive visualizations. Published research in ICACCS 2021 journal.",
            techStack: ["Python", "Streamlit"],
            image: cryptoImage,
            githubLink: "https://github.com/nachiketgalande1609/Cryptocurrency_Price_Prediction_Using_Neural_Networks_and_Deep_Learning",
        },
        {
            id: 9,
            name: "Flappy Bird Game",
            description:
                "Classic Flappy Bird game implementation with Pygame. Features dynamic obstacle generation, collision detection, gravity mechanics, and sound effects for an engaging gaming experience.",
            techStack: ["Python", "Pygame"],
            image: flappyBirdImage,
            githubLink: "https://github.com/nachiketgalande1609/FlappyBird",
        },
        {
            id: 10,
            name: "English Vocabulary Builder",
            description:
                "Web application for vocabulary learning with quizzes and pronunciation features. Includes Barron's GRE word lists, multiple-choice quizzes, and text-to-speech functionality.",
            techStack: ["Flask", "Python", "pyttsx3"],
            image: vocabImage,
            githubLink: "https://github.com/nachiketgalande1609/English-Vocalbulary-Builder",
        },
        {
            id: 11,
            name: "Tetris Game",
            description:
                "Classic Tetris implementation with Pygame. Features smooth controls, shape rotation, collision detection, scoring system, and sound effects for an authentic gaming experience.",
            techStack: ["Python", "Pygame"],
            image: tetrisImage,
        },
    ],
};

export const techIcons: { [key: string]: string } = {
    React: reactIcon,
    Flask: flaskIcon,
    Python: pythonIcon,
    MongoDB: mongodbIcon,
    AWS: awsIcon,
    "Material UI": materialuiIcon,
    "React Native": reactnativeIcon,
    TypeScript: typescriptIcon,
    "Node.js": nodejsIcon,
    WebRTC: webrtcIcon,
    "Express.js": expressIcon,
    "Open AI": openaiIcon,
    Azure: azureIcon,
    Bootstrap: bootstrapIcon,
    "Socket.IO": socketioIcon,
    Streamlit: streamlitIcon,
    Pygame: pygameIcon,
    pyttsx3: pyttsx3Icon,
    SQLite: sqliteIcon,
};

export const experienceData: Experience[] = [
    {
        id: 1,
        company: "AB InBev (Via Accenture)",
        location: "",
        role: "Full Stack Software Developer",
        period: "May 2022 - Present",
        description: [
            "Collaborated directly with AB InBev’s product team to develop a financial management solution that automated key workflows, reducing manual work by 30% and operational costs by 10–15%.",
            "Optimized database query performance by 15% on 10M+ records datasets through database optimization techniques.",
            "Reduced frontend load time by 20% using code splitting and lazy loading techniques.",
            "Scaled application performance by over 30% with a microservice architecture, supporting 1500+ concurrent users.",
            "Improved user experience by implementing asynchronous data export actions with Azure Function Apps.",
            "Engineered a 20% performance uplift by migrating large SQL datasets to Azure Databricks for efficient processing and analysis.",
            "Designed CI/CD pipelines on Azure DevOps, enabling automated builds and deployments",
            "Collaborated with stakeholders and UI/UX teams, conducted code reviews, supported UAT and Go-Live activities.",
        ],
        technologies: ["React.js", "Redux", "TypeScript", "Flask", "Databricks", "Azure SQL Server", "Azure DevOps"],
    },
    {
        id: 2,
        company: "Accenture",
        location: "",
        role: "Packaged Application Developer",
        period: "Jul 2021 - May 2022",
        description: [
            "Automated Oracle ERP user provisioning, reducing time from 5–10 hours to under 5 minutes.",
            "Utilized Dash and Plotly to create interactive dashboards for visualizing B2B EDI X12 transactions.",
            "Streamlined employee onboarding by developing a generative AI-powered tool, reducing training time by 30%.",
        ],
        technologies: ["Oracle OCI", "Oracle OIC", "Python", "OpenAI", "Azure"],
    },
];
