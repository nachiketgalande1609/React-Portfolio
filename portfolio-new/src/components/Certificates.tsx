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
    const [isAnimating, setIsAnimating] = useState(false);

    // Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            const elementsToAnimate = sectionRef.current.querySelectorAll(".section-title, .section-subtitle, .filter-btn, .certificate-card");
            elementsToAnimate.forEach((el) => observer.observe(el));
        }

        return () => observer.disconnect();
    }, [filteredCertificates, visibleCount]);

    // Extract unique organizations for filter
    const organizations = React.useMemo(() => {
        const orgs = certificatesData.map((cert) => cert.organization);
        return ["all", ...Array.from(new Set(orgs))];
    }, []);

    // Filter certificates
    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            if (filter === "all") {
                setFilteredCertificates(certificatesData);
            } else {
                setFilteredCertificates(certificatesData.filter((cert) => cert.organization === filter));
            }
            setVisibleCount(9);
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [filter]);

    const handleViewMore = () => {
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
        width: { xs: "calc(100% - 24px)", sm: "90%" },
        maxWidth: 900,
        maxHeight: "90vh",
        overflowY: "auto",
        bgcolor: "rgba(25, 25, 30, 0.7)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        p: { xs: "12px", sm: 3 },
        backdropFilter: "blur(20px) saturate(180%)",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
        color: "white",
        outline: "none",
    };

    return (
        <section ref={sectionRef} id="certificates" className="section certificates-section">
            <div className="background-glow"></div>
            <div className="container">
                <div className="certificates-header">
                    <div className="header-decoration">
                        <h2 className="section-title">Certifications</h2>
                    </div>
                    <p className="section-subtitle">A collection of my professional certifications and achievements.</p>
                </div>

                <div className="certificate-filters">
                    {organizations.map((org) => (
                        <button key={org} className={`filter-btn ${filter === org ? "active" : ""}`} onClick={() => setFilter(org)}>
                            {org === "all" ? "All" : org}
                        </button>
                    ))}
                </div>

                <div className={`certificates-grid ${isAnimating ? "animating-out" : ""}`}>
                    {visibleCertificates.map((certificate, index) => (
                        <div key={`${certificate.title}-${index}`} className="certificate-card" onClick={() => handleOpenModal(certificate)}>
                            <div className="certificate-content">
                                <div className="certificate-header">
                                    <div className="certificate-logo">
                                        <img
                                            src={certificate.logo}
                                            alt={`${certificate.organization} logo`}
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
                                        aria-label="View Credential"
                                    >
                                        <LaunchIcon className="link-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMoreCertificates && (
                    <div className="view-more-container">
                        <button className="view-more-btn" onClick={handleViewMore}>
                            View More ({filteredCertificates.length - visibleCount} remaining)
                        </button>
                    </div>
                )}

                <div className="certificates-count">
                    Showing {visibleCertificates.length} of {filteredCertificates.length} certificates
                    {filter !== "all" && ` for ${filter}`}
                </div>

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
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
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
                                                lineHeight: 1.3,
                                                fontSize: { xs: "1.1rem", sm: "1.4rem" },
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
                                                p: { xs: 0.5, sm: 1 },
                                                "&:hover": {
                                                    color: "white",
                                                    background: "rgba(255, 255, 255, 0.2)",
                                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                                    transform: "scale(1.1)",
                                                },
                                            }}
                                        >
                                            <CloseIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
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
                                                        objectFit: "contain",
                                                    }}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                flexDirection: { xs: "column", sm: "row" },
                                                textAlign: { xs: "center", sm: "left" },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: { xs: 50, sm: 80 },
                                                    height: { xs: 50, sm: 80 },
                                                    borderRadius: "12px",
                                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                                    background: "rgba(255, 255, 255, 0.08)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    p: 1,
                                                    backdropFilter: "blur(15px)",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <img
                                                    src={selectedCertificate.logo}
                                                    alt={`${selectedCertificate.organization} logo`}
                                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1, width: "100%" }}>
                                                <Typography sx={{ color: "#10b981", fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 600 }}>
                                                    {selectedCertificate.organization}
                                                </Typography>
                                                <Typography
                                                    sx={{ color: "rgba(255, 255, 255, 0.8)", fontSize: { xs: "0.85rem", sm: "1rem" }, mb: 1.5 }}
                                                >
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
