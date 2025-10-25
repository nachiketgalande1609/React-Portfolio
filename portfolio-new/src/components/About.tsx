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

        const animateElements = document.querySelectorAll(".animate-on-scroll");
        animateElements.forEach((el) => observer.observe(el));

        return () => {
            animateElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section about-section">
            <div className="container">
                {/* Compact Header */}
                <div className="about-header">
                    <div className="header-decoration animate-on-scroll">
                        <div className="decoration-line"></div>
                        <h2 className="section-title">About Me</h2>
                        <div className="decoration-line"></div>
                    </div>
                </div>

                <div className="about-content">
                    <div className="about-main">
                        {/* Personal Info Compact */}
                        <div className="personal-info-compact animate-on-scroll">
                            <div className="name-role-compact">
                                <h3 className="name-title">Nachiket Galande</h3>
                            </div>
                            <p className="about-description">
                                Senior Full Stack Software Developer with 4+ years of experience in designing, developing, and deploying scalable,
                                high-performance web applications. Proficient in frontend and backend technologies with expertise in database
                                architecture.
                            </p>
                        </div>

                        {/* Combined Details Grid */}
                        <div className="combined-details-grid">
                            {/* Personal Details */}
                            <div className="details-group">
                                <h4 className="details-group-title">Personal Details</h4>
                                <div className="details-grid">
                                    {[
                                        { label: "Birthday", value: "16 Sept 1999" },
                                        { label: "Phone", value: "+91 97649 93023" },
                                        { label: "Location", value: "Thane, India" },
                                        { label: "Age", value: "25" },
                                        { label: "Email", value: "nachiketgalande1609@gmail.com" },
                                    ].map((detail, index) => (
                                        <div
                                            key={detail.label}
                                            className="detail-item animate-on-scroll"
                                            style={{ animationDelay: `${index * 0.05}s` }}
                                        >
                                            <strong>{detail.label}</strong>
                                            <span>{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Education Timeline */}
                            <div className="timeline-group">
                                <h4 className="details-group-title">Education Timeline</h4>
                                <div className="timeline">
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
                                        <div
                                            key={edu.degree}
                                            className="timeline-item animate-on-scroll"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-header">
                                                    <h5 className="timeline-degree">{edu.degree}</h5>
                                                    <span className="timeline-period">{edu.period}</span>
                                                </div>
                                                <div className="timeline-details">
                                                    <span className="timeline-grade">{edu.grade}</span>
                                                    <span className="timeline-institution">{edu.institution}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Achievements Section */}
                        <div className="achievements-section animate-on-scroll">
                            <h3 className="achievements-title">Achievements</h3>
                            <div className="achievements-grid">
                                {[
                                    {
                                        number: "4+",
                                        label: "Years Experience",
                                        description: "Full stack development across multiple industries",
                                    },
                                    {
                                        number: "20+",
                                        label: "Projects Completed",
                                        description: "From personal projects to enterprise applications",
                                    },
                                    {
                                        number: "40+",
                                        label: "Certifications",
                                        description: "Recognized courses in various technologies",
                                    },
                                ].map((achievement, index) => (
                                    <div
                                        key={achievement.label}
                                        className="achievement-card animate-on-scroll"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="achievement-main">
                                            <div className="achievement-number">{achievement.number}</div>
                                            <div className="achievement-content">
                                                <h4 className="achievement-label">{achievement.label}</h4>
                                                <p className="achievement-description">{achievement.description}</p>
                                            </div>
                                        </div>
                                        <div className="achievement-glow"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
