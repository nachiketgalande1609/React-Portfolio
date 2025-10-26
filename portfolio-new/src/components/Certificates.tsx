import React, { useEffect, useRef, useState } from "react";
import "../styles/Certificates.css";
import LaunchIcon from "@mui/icons-material/Launch";
import { certificatesData } from "../data/portfolioData";
import { Modal, Box, Typography, IconButton, Backdrop, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Certificate {
    title: string;
    organization: string;
    date: string;
    credential_url: string;
    logo: string;
    image?: string;
}

const Certificates: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [filter, setFilter] = useState<string>("all");
    const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(certificatesData);
    const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(9);

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
        // Reset visible count when filter changes
        setVisibleCount(9);
    }, [filter]);

    const handleViewMore = () => {
        // Load all remaining certificates immediately
        setVisibleCount(filteredCertificates.length);
    };

    const handleOpenModal = (certificate: Certificate) => {
        setSelectedCertificate(certificate);
    };

    const handleCloseModal = () => {
        setSelectedCertificate(null);
    };

    const visibleCertificates = filteredCertificates.slice(0, visibleCount);
    const hasMoreCertificates = visibleCount < filteredCertificates.length;

    const modalStyle = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: 900,
        maxHeight: "90vh",
        overflowY: "auto",
        bgcolor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "24px",
        p: 1.5,
        backdropFilter: "blur(30px) saturate(180%)",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        color: "white",
    };

    return (
        <section ref={sectionRef} id="certificates" className="section certificates-section">
            <div className="container">
                <div className="certificates-header">
                    <div className="header-decoration">
                        <h2 className="section-title">Certifications</h2>
                    </div>
                    <p className="section-subtitle">Professional certifications and achievements</p>
                </div>

                {/* Filter Buttons */}
                <div className="certificate-filters">
                    {organizations.map((org) => (
                        <button key={org} className={`filter-btn ${filter === org ? "active" : ""}`} onClick={() => setFilter(org)}>
                            {org === "all" ? "All" : org}
                        </button>
                    ))}
                </div>

                {/* Certificates Grid */}
                <div className="certificates-grid">
                    {visibleCertificates.map((certificate, index) => (
                        <div key={`${certificate.title}-${index}`} className="certificate-card" onClick={() => handleOpenModal(certificate)}>
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
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                {hasMoreCertificates && (
                    <div className="view-more-container">
                        <button className="view-more-btn" onClick={handleViewMore}>
                            View More ({filteredCertificates.length - visibleCount} remaining)
                        </button>
                    </div>
                )}

                {/* Count Display */}
                <div className="certificates-count">
                    Showing {visibleCertificates.length} of {filteredCertificates.length} certificates
                    {filter !== "all" && ` for ${filter}`}
                </div>

                {/* MUI Modal */}
                <Modal
                    open={selectedCertificate !== null}
                    onClose={handleCloseModal}
                    aria-labelledby="certificate-modal-title"
                    aria-describedby="certificate-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                        sx: { backdropFilter: "blur(10px)" },
                    }}
                >
                    <Fade in={selectedCertificate !== null}>
                        <Box sx={modalStyle}>
                            {selectedCertificate && (
                                <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                        <Typography
                                            id="certificate-modal-title"
                                            variant="h6"
                                            component="h2"
                                            sx={{
                                                background: "linear-gradient(135deg, #ffffff 0%, #cccccc 100%)",
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                flex: 1,
                                                mr: 1,
                                                lineHeight: 1.4,
                                                fontSize: "1.4rem",
                                            }}
                                        >
                                            {selectedCertificate.title}
                                        </Typography>
                                        <IconButton
                                            aria-label="close"
                                            onClick={handleCloseModal}
                                            sx={{
                                                color: "rgba(255, 255, 255, 0.8)",
                                                bgcolor: "rgba(255, 255, 255, 0.1)",
                                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    color: "white",
                                                    background: "rgba(255, 255, 255, 0.2)",
                                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                                    transform: "scale(1.1)",
                                                },
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                    <Box>
                                        {selectedCertificate.image && (
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
                                                <img
                                                    src={selectedCertificate.image}
                                                    alt={`${selectedCertificate.title} Certificate`}
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "500px",
                                                        borderRadius: "16px",
                                                        border: "1px solid rgba(255, 255, 255, 0.15)",
                                                        background: "rgba(255, 255, 255, 0.05)",
                                                        backdropFilter: "blur(15px)",
                                                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                                                        objectFit: "contain",
                                                    }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                            <Box
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: "16px",
                                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                                    background: "rgba(255, 255, 255, 0.08)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    p: 0.75,
                                                    backdropFilter: "blur(15px)",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <img
                                                    src={selectedCertificate.logo}
                                                    alt={selectedCertificate.organization}
                                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography sx={{ color: "#10b981", fontSize: "1.2rem", fontWeight: 600, letterSpacing: "0.02em" }}>
                                                    {selectedCertificate.organization}
                                                </Typography>
                                                <Typography sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1rem", mb: 2 }}>
                                                    Issued: {selectedCertificate.date}
                                                </Typography>
                                                <a
                                                    href={selectedCertificate.credential_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="modal-link"
                                                >
                                                    <span>View Credential</span>
                                                    <LaunchIcon className="link-icon" />
                                                </a>
                                            </Box>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </section>
    );
};

export default Certificates;
