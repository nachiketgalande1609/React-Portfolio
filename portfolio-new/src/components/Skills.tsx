import React from "react";
import { skills } from "../data/portfolioData";
import type { Skill } from "../types";

const Skills: React.FC = () => {
    const getSkillsByCategory = (category: Skill["category"]) => {
        return skills.filter((skill) => skill.category === category);
    };

    const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
        <div className="skill-item">
            <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-bar">
                <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
            </div>
        </div>
    );

    return (
        <section id="skills" className="section" style={{ background: "var(--background-alt)" }}>
            <div className="container">
                <h2 className="section-title">Skills & Technologies</h2>

                <div className="skills-grid">
                    <div className="skill-category">
                        <h3>Frontend</h3>
                        <div className="skills-list">
                            {getSkillsByCategory("frontend").map((skill, index) => (
                                <SkillBar key={index} skill={skill} />
                            ))}
                        </div>
                    </div>

                    <div className="skill-category">
                        <h3>Backend</h3>
                        <div className="skills-list">
                            {getSkillsByCategory("backend").map((skill, index) => (
                                <SkillBar key={index} skill={skill} />
                            ))}
                        </div>
                    </div>

                    <div className="skill-category">
                        <h3>Tools & Others</h3>
                        <div className="skills-list">
                            {getSkillsByCategory("tools").map((skill, index) => (
                                <SkillBar key={index} skill={skill} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .skills-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .skill-category h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    color: var(--text-color);
                    text-align: center;
                }

                .skills-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .skill-item {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 8px;
                    box-shadow: var(--shadow);
                }

                .skill-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .skill-name {
                    font-weight: 600;
                    color: var(--text-color);
                }

                .skill-percentage {
                    color: var(--primary-color);
                    font-weight: 600;
                }

                .skill-bar {
                    height: 8px;
                    background: var(--border-color);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .skill-progress {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                    border-radius: 4px;
                    transition: width 1s ease-in-out;
                }
            `}</style>
        </section>
    );
};

export default Skills;
