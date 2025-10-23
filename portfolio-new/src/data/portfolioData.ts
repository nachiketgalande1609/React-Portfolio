import type { Project, Skill, SocialLink } from "../types";

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
    about: "Full-Stack Developer with 4.5 years of experience delivering scalable, high-performance web applications, specializing in system architecture, database design, performance optimization, and translating complex requirements into efficient solutions.",
};
