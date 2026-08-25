import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Greeting.css";

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", sub: "Hope your day is off to a great start." };
    if (hour < 17) return { text: "Good afternoon", sub: "Thanks for stopping by." };
    return { text: "Good evening", sub: "Glad you're here." };
};

interface Props {
    onDone: () => void;
}

const Greeting: React.FC<Props> = ({ onDone }) => {
    const [visible, setVisible] = useState(true);
    const { text, sub } = getGreeting();

    const dismiss = () => {
        setVisible(false);
        onDone();
    };

    useEffect(() => {
        const t = setTimeout(dismiss, 1500);
        return () => clearTimeout(t);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="greeting-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    onClick={dismiss}
                >
                    <motion.div
                        className="greeting-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        <p className="greeting-text">{text}</p>
                        <p className="greeting-sub">{sub}</p>
                        <motion.div
                            className="greeting-bar"
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: 1.5, ease: "linear" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Greeting;
