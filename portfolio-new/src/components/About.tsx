import React, { useEffect, useRef } from "react";
import "../styles/About.css";

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        // Observe all animate-on-scroll elements
        const animateElements = document.querySelectorAll(".animate-on-scroll");
        animateElements.forEach((el) => observer.observe(el));

        return () => {
            animateElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section about-section">
            <div className="container">
                <div className="about-header">
                    <div className="header-decoration animate-on-scroll">
                        <div className="decoration-line"></div>
                        <h2 className="section-title">About Me</h2>
                        <div className="decoration-line"></div>
                    </div>
                    <p className="section-subtitle animate-on-scroll">Crafting digital experiences with precision and passion</p>
                </div>

                <div className="about-content">
                    <div className="about-main">
                        <div className="personal-info animate-on-scroll">
                            <div className="name-role-container">
                                <h3 className="name-title">Nachiket Galande</h3>
                                <div className="role-badge">
                                    <span>Senior Full Stack Developer</span>
                                </div>
                            </div>
                            <p className="about-description">
                                Senior Full Stack Software Developer with 4+ years of experience in designing, developing, and deploying scalable,
                                high-performance web applications. Proficient in frontend and backend technologies with expertise in database
                                architecture.
                            </p>
                        </div>

                        <div className="personal-details-grid">
                            {[
                                { label: "Birthday", value: "16 Sept 1999" },
                                { label: "Phone", value: "+91 97649 93023" },
                                { label: "Location", value: "Thane, India" },
                                { label: "Age", value: "25" },
                                { label: "Email", value: "nachiketgalande1609@gmail.com" },
                            ].map((detail, index) => (
                                <div key={detail.label} className="detail-card animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="detail-content">
                                        <strong>{detail.label}</strong>
                                        <span>{detail.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="education-section animate-on-scroll">
                            <h3 className="education-title">Education</h3>
                            <div className="education-timeline">
                                {[
                                    {
                                        degree: "Bachelor of Technology in Computer Science & Engineering",
                                        period: "2017 - 2021",
                                        grade: "7.0 CGPA",
                                        institution: "MIT ADT University, Pune",
                                    },
                                    {
                                        degree: "Class XII (HSC)",
                                        period: "2015 - 2017",
                                        grade: "82%",
                                        institution: "Shubham Raje Jr. College",
                                    },
                                    {
                                        degree: "Class X (SSC)",
                                        period: "2015",
                                        grade: "88.40%",
                                        institution: "St. Xavier's English High School",
                                    },
                                ].map((edu, index) => (
                                    <div key={edu.degree} className="education-item animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }}>
                                        <div className="education-header">
                                            <h4 className="education-degree">{edu.degree}</h4>
                                            <span className="education-period">{edu.period}</span>
                                        </div>
                                        <div className="education-details">
                                            <span className="education-grade">{edu.grade}</span>
                                            <span className="education-institution">{edu.institution}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="about-stats">
                        {[
                            { number: "4+", label: "Years Experience" },
                            { number: "50+", label: "Projects Completed" },
                            { number: "20+", label: "Happy Clients" },
                        ].map((stat, index) => (
                            <div key={stat.label} className="stat-card animate-on-scroll" style={{ animationDelay: `${index * 0.2}s` }}>
                                <h3>{stat.number}</h3>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
