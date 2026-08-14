import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import "./ImageLightbox.css";

interface ImageLightboxProps {
    images: string[];
    startIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, startIndex, isOpen, onClose }) => {
    const [current, setCurrent] = useState(startIndex);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setCurrent(startIndex);
            // Trigger fade-in on next frame
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [isOpen, startIndex]);

    const prev = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            setCurrent((c) => (c - 1 + images.length) % images.length);
            setVisible(true);
        }, 150);
    }, [images.length]);

    const next = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            setCurrent((c) => (c + 1) % images.length);
            setVisible(true);
        }, 150);
    }, [images.length]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft") prev();
            else if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose, prev, next]);

    if (!isOpen) return null;

    return createPortal(
        <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
                <CloseIcon />
            </button>

            <div className="lightbox-counter">
                {current + 1} / {images.length}
            </div>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img
                    key={current}
                    src={images[current]}
                    alt={`Image ${current + 1} of ${images.length}`}
                    className={`lightbox-image ${visible ? "lightbox-image--visible" : ""}`}
                />
            </div>

            {images.length > 1 && (
                <>
                    <button className="lightbox-arrow lightbox-arrow--left" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image">
                        <ChevronLeftIcon fontSize="large" />
                    </button>
                    <button className="lightbox-arrow lightbox-arrow--right" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image">
                        <ChevronRightIcon fontSize="large" />
                    </button>

                    <div className="lightbox-dots" onClick={(e) => e.stopPropagation()}>
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`lightbox-dot ${i === current ? "lightbox-dot--active" : ""}`}
                                onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 150); }}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>,
        document.body
    );
};

export default ImageLightbox;
