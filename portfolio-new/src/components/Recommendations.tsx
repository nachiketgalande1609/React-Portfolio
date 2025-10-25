import React from "react";
import "../styles/Recommendations.css";
import { testimonialsData } from "../data/portfolioData";
import type { Testimonial } from "../types";

const Recommendations: React.FC = () => {
    const RecommendationCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
        <div className="recommendation-card">
            <div className="recommendation-content">
                <div className="quote-section">
                    <div className="quote-icon">"</div>
                    <p className="recommendation-quote">{testimonial.quote}</p>
                </div>

                <div className="recommendation-author">
                    <div className="author-image">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23333'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='14'%3E👤%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>
                    <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <p className="author-role">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section id="recommendations" className="recommendations-section">
            <div className="container">
                <div className="recommendations-header">
                    <h2 className="section-title">Recommendations</h2>
                    <p className="section-subtitle">What colleagues say about working with me</p>
                </div>

                <div className="recommendations-list">
                    {testimonialsData.testimonials.map((testimonial, index) => (
                        <RecommendationCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
