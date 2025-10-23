import React from "react";
import "../styles/About.css";

const About: React.FC = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-header">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>
                </div>

                <div className="about-content">
                    <div className="about-main">
                        <div className="personal-info">
                            <h3 className="name-title">Nachiket Galande</h3>
                            <h4 className="role-title">Full Stack Software Developer</h4>
                            <p className="about-description">
                                Full Stack Software Developer with 4+ years of experience in designing, developing, and deploying scalable,
                                high-performance web applications. Proficient in frontend and backend technologies, with expertise in database
                                architecture.
                            </p>
                            <p className="about-passion">
                                Passionate about transforming complex designs into efficient technical solutions that improve performance and user
                                experience.
                            </p>
                        </div>

                        <div className="personal-details-grid">
                            <div className="detail-row">
                                <div className="detail-item">
                                    <strong>Birthday:</strong>
                                    <span>16 Sept 1999</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Phone:</strong>
                                    <span>+91 9764993023</span>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-item">
                                    <strong>Location:</strong>
                                    <span>Thane, Maharashtra, India</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Age:</strong>
                                    <span>25</span>
                                </div>
                            </div>
                            <div className="detail-row">
                                <div className="detail-item">
                                    <strong>Education:</strong>
                                    <span>B.Tech Computer Science</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Email:</strong>
                                    <span>nachiketgalande1609@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-stats">
                        <div className="stat-card">
                            <h3>4+</h3>
                            <p>Years Experience</p>
                        </div>
                        <div className="stat-card">
                            <h3>50+</h3>
                            <p>Projects Completed</p>
                        </div>
                        <div className="stat-card">
                            <h3>20+</h3>
                            <p>Happy Clients</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
