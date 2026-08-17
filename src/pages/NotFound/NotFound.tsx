import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const prev = document.title;
        document.title = "Page Not Found | Nachiket Galande";
        return () => { document.title = prev; };
    }, []);

    return (
        <div className="notfound">
            <div className="notfound-bg" aria-hidden="true" />

            <div className="notfound-content">
                <div className="notfound-code">404</div>
                <div className="notfound-divider" />
                <h1 className="notfound-title">Page not found</h1>
                <p className="notfound-desc">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button className="notfound-btn" onClick={() => navigate("/")}>
                    Go back home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
