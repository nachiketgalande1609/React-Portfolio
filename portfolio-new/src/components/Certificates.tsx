import React, { useEffect, useRef, useState } from "react";
import "../styles/Certificates.css";
import LaunchIcon from "@mui/icons-material/Launch";
import { certificatesData } from "../data/portfolioData";

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

    const CertificateModal: React.FC<{ certificate: Certificate; onClose: () => void }> = ({ certificate, onClose }) => (
        <div className="certificate-modal-overlay" onClick={onClose}>
            <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
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
            </div>
        </div>
    );

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
                    {filteredCertificates.map((certificate, index) => (
                        <div key={`${certificate.title}-${index}`} className="certificate-card" onClick={() => setSelectedCertificate(certificate)}>
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

                {/* Count Display */}
                <div className="certificates-count">
                    {filteredCertificates.length} of {certificatesData.length} certificates
                </div>

                {/* Modal */}
                {selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />}
            </div>
        </section>
    );
};

export default Certificates;
