import React, { useEffect, useRef, useState } from "react";
import "../styles/Certificates.css";
import LaunchIcon from "@mui/icons-material/Launch";
import { certificatesData } from "../data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
    title: string;
    organization: string;
    date: string;
    credential_url: string;
    logo: string;
}

const Certificates: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [filter, setFilter] = useState<string>("all");
    const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(certificatesData);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

    // Extract unique organizations for filter
    const organizations = React.useMemo(() => {
        const orgs = certificatesData.map((cert) => cert.organization);
        return ["all", ...Array.from(new Set(orgs))];
    }, []);

    // Filter certificates
    useEffect(() => {
        if (filter === "all") {
            setFilteredCertificates(certificatesData);
        } else {
            setFilteredCertificates(certificatesData.filter((cert) => cert.organization === filter));
        }
    }, [filter]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
        hover: {
            y: -5,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
            },
        },
    };

    const CertificateModal: React.FC<{ certificate: Certificate; onClose: () => void }> = ({ certificate, onClose }) => (
        <motion.div className="certificate-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div
                className="certificate-modal"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>{certificate.title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="modal-content">
                    <div className="modal-logo">
                        <img src={certificate.logo} alt={certificate.organization} />
                    </div>
                    <div className="modal-details">
                        <p className="organization">{certificate.organization}</p>
                        <p className="date">Issued: {certificate.date}</p>
                        <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer" className="modal-link">
                            <span>View Credential</span>
                            <LaunchIcon className="link-icon" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );

    return (
        <section ref={sectionRef} id="certificates" className="section certificates-section">
            <div className="container">
                <div className="certificates-header">
                    <motion.div
                        className="header-decoration"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Certifications</h2>
                    </motion.div>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Professional certifications and achievements
                    </motion.p>
                </div>

                {/* Filter Buttons */}
                <motion.div
                    className="certificate-filters"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {organizations.map((org) => (
                        <button key={org} className={`filter-btn ${filter === org ? "active" : ""}`} onClick={() => setFilter(org)}>
                            {org === "all" ? "All" : org}
                        </button>
                    ))}
                </motion.div>

                {/* Certificates Grid */}
                <motion.div
                    className="certificates-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                >
                    <AnimatePresence>
                        {filteredCertificates.map((certificate, index) => (
                            <motion.div
                                key={`${certificate.title}-${index}`}
                                className="certificate-card"
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                exit="hidden"
                                layout
                                onClick={() => setSelectedCertificate(certificate)}
                            >
                                <div className="certificate-content">
                                    <div className="certificate-header">
                                        <div className="certificate-logo">
                                            <img
                                                src={certificate.logo}
                                                alt={certificate.organization}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/fallback-logo.png";
                                                }}
                                            />
                                        </div>
                                        <div className="certificate-info">
                                            <h3 className="certificate-title">{certificate.title}</h3>
                                            <p className="certificate-organization">{certificate.organization}</p>
                                        </div>
                                    </div>

                                    <div className="certificate-footer">
                                        <p className="certificate-date">{certificate.date}</p>
                                        <a
                                            href={certificate.credential_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="certificate-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <LaunchIcon className="link-icon" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Count Display */}
                <motion.div
                    className="certificates-count"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    {filteredCertificates.length} of {certificatesData.length} certificates
                </motion.div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Certificates;
