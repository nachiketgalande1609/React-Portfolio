import React from "react";
import "../styles/About.css";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { motion, useScroll, useTransform, type Variants } from "framer-motion"; // Import Variants

const About: React.FC = () => {
    const { scrollYProgress } = useScroll();

    // Header animation: float + fade-in
    const headerY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-5%"]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.3]);

    // Animation variants for staggered appearance
    const containerVariants: Variants = {
        // Explicitly type as Variants
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        // Explicitly type as Variants
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const slideInLeftVariants: Variants = {
        // Explicitly type as Variants
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const slideInRightVariants: Variants = {
        // Explicitly type as Variants
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <motion.section
            id="about"
            className="section about-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="container">
                {/* Enhanced Header with Floating Animation */}
                <motion.div
                    className="about-header"
                    style={{ y: headerY, opacity: headerOpacity }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div className="header-decoration">
                        <h2 className="section-title">About Me</h2>
                    </motion.div>
                </motion.div>

                <div className="about-content">
                    <motion.div className="about-main" variants={itemVariants}>
                        {/* Personal Info with Enhanced Typography */}
                        <motion.div className="personal-info-compact" variants={itemVariants}>
                            <div className="name-role-compact">
                                <div className="name-glow"></div>
                                <h3 className="name-title">Nachiket Galande</h3>
                                <div className="role-badge">Senior Full Stack Developer</div>
                            </div>
                            <p className="about-description">
                                Senior Full Stack Software Developer with 4+ years of experience in designing, developing, and deploying scalable,
                                high-performance web applications. Proficient in frontend and backend technologies with expertise in database
                                architecture.
                            </p>
                        </motion.div>

                        {/* Combined Details Grid with Enhanced Cards */}
                        <div className="combined-details-grid">
                            {/* Personal Details */}
                            <motion.div className="details-group" variants={slideInLeftVariants}>
                                <h4 className="details-group-title">Personal Details</h4>
                                <motion.div className="details-grid" variants={containerVariants}>
                                    {[
                                        { label: "Year of Birth", value: "1999", icon: <CalendarMonthRoundedIcon /> },
                                        { label: "Phone", value: "+91 97649 93023", icon: <CallRoundedIcon /> },
                                        { label: "Location", value: "Mumbai, India", icon: <PersonPinCircleRoundedIcon /> },
                                        { label: "Age", value: "26", icon: <CakeIcon /> },
                                        { label: "Email", value: "nachiketgalande1609@gmail.com", icon: <EmailRoundedIcon /> },
                                    ].map((detail, index) => (
                                        <motion.div
                                            key={detail.label}
                                            className="detail-item"
                                            variants={itemVariants}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.4)", zIndex: 10 }}
                                        >
                                            <div className="detail-icon">{detail.icon}</div>
                                            <div className="detail-content">
                                                <strong>{detail.label}</strong>
                                                <span>{detail.value}</span>
                                            </div>
                                            <div className="detail-hover-effect"></div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Education Timeline with Enhanced Markers */}
                            <motion.div className="timeline-group" variants={slideInRightVariants}>
                                <h4 className="details-group-title">Education Timeline</h4>
                                <motion.div className="timeline" variants={containerVariants}>
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
                                        <motion.div
                                            key={edu.degree}
                                            className="timeline-item"
                                            variants={itemVariants}
                                            transition={{ delay: index * 0.08 }}
                                            whileHover={{ x: 10, boxShadow: "0 10px 25px rgba(0,0,0,0.4)", zIndex: 5 }}
                                        >
                                            <div className="timeline-marker">
                                                <motion.div
                                                    className="marker-pulse"
                                                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                ></motion.div>
                                            </div>
                                            <div className="timeline-content">
                                                <div className="timeline-glow"></div>
                                                <div className="timeline-header">
                                                    <h5 className="timeline-degree">{edu.degree}</h5>
                                                    <span className="timeline-period">{edu.period}</span>
                                                </div>
                                                <div className="timeline-details">
                                                    <span className="timeline-grade">{edu.grade}</span>
                                                    <span className="timeline-institution">{edu.institution}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Enhanced Achievements Section */}
                        <motion.div className="achievements-section" variants={itemVariants}>
                            <h3 className="achievements-title">Achievements</h3>
                            <motion.div className="achievements-grid" variants={containerVariants}>
                                {[
                                    {
                                        number: "4+",
                                        label: "Years Experience",
                                        description: "Full stack development across multiple industries",
                                        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    },
                                    {
                                        number: "20+",
                                        label: "Projects Completed",
                                        description: "From personal projects to enterprise applications",
                                        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                    },
                                    {
                                        number: "40+",
                                        label: "Certifications",
                                        description: "Recognized courses in various technologies",
                                        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                                    },
                                ].map((achievement, index) => (
                                    <motion.div
                                        key={achievement.label}
                                        className="achievement-card"
                                        // Removed `variants={itemVariants}` here as it's already on the parent `achievements-section`
                                        // and `itemVariants` for `achievements-grid` might be creating an issue with staggerChildren
                                        // Instead, we ensure the parent `motion.div` for the grid has `containerVariants` and children `motion.div` have `itemVariants`
                                        variants={itemVariants} // Re-added if each card needs its own animation
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10, scale: 1.03, boxShadow: "0 25px 50px rgba(0,0,0,0.5)", zIndex: 10 }}
                                    >
                                        <div className="achievement-bg" style={{ background: achievement.gradient }}></div>
                                        <div className="achievement-main">
                                            <div className="achievement-number">{achievement.number}</div>
                                            <div className="achievement-content">
                                                <h4 className="achievement-label">{achievement.label}</h4>
                                                <p className="achievement-description">{achievement.description}</p>
                                            </div>
                                        </div>
                                        <div className="achievement-glow"></div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;
