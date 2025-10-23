import React from "react";
import { personalInfo } from "../data/portfolioData";

const About: React.FC = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <h2 className="section-title">About Me</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p className="about-description">{personalInfo.about}</p>

                        <div className="about-details">
                            <div className="detail-item">
                                <strong>Location:</strong>
                                <span>{personalInfo.location}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Email:</strong>
                                <span>{personalInfo.email}</span>
                            </div>
                            <div className="detail-item">
                                <strong>Phone:</strong>
                                <span>{personalInfo.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-stats">
                        <div className="stat-card">
                            <h3>3+</h3>
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

            <style jsx>{`
                .about-content {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 4rem;
                    align-items: start;
                }

                .about-description {
                    font-size: 1.2rem;
                    line-height: 1.8;
                    color: var(--text-light);
                    margin-bottom: 2rem;
                }

                .about-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .detail-item {
                    display: flex;
                    gap: 1rem;
                }

                .detail-item strong {
                    min-width: 80px;
                    color: var(--text-color);
                }

                .about-stats {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .stat-card {
                    background: var(--background-alt);
                    padding: 2rem;
                    border-radius: 12px;
                    text-align: center;
                    border-left: 4px solid var(--primary-color);
                }

                .stat-card h3 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                }

                .stat-card p {
                    color: var(--text-light);
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .about-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .about-stats {
                        flex-direction: row;
                        justify-content: space-around;
                    }

                    .stat-card {
                        flex: 1;
                        padding: 1.5rem 1rem;
                    }

                    .stat-card h3 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default About;
