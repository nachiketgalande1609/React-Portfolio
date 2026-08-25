import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./ChatBot.css";

interface Message {
    role: "user" | "bot";
    text: string;
}

const SUGGESTIONS = [
    "What's your tech stack?",
    "Tell me about your projects",
    "Are you open to work?",
    "How can I contact you?",
];

const ChatBot: React.FC<{ onOpenChange?: (open: boolean) => void }> = ({ onOpenChange }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = (val: boolean) => {
        setOpen(val);
        onOpenChange?.(val);
    };
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", text: "Hi! I'm Nachiket's AI assistant. Ask me anything about his skills, projects, or experience." },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 200);
    }, [open]);

    const send = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        const userMsg: Message = { role: "user", text: trimmed };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setLoading(true);

        const history = messages
            .filter((m) => m.role !== "bot" || messages.indexOf(m) > 0)
            .map((m) => ({ role: m.role === "user" ? "user" : "model", text: m.text }));

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed, history }),
            });
            const data = await res.json() as { text?: string; error?: string };
            setMessages((m) => [...m, { role: "bot", text: data.text ?? data.error ?? "Something went wrong." }]);
        } catch {
            setMessages((m) => [...m, { role: "bot", text: "Network error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send(input);
        }
    };

    return (
        <>
            <AnimatePresence>
                {open && createPortal(
                    <motion.div
                        className="chatbot-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => toggleOpen(false)}
                    />,
                    document.body
                )}
            </AnimatePresence>

        <div className="chatbot-root">

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, scale: 0.92, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ duration: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-info">
                                <span className="chatbot-avatar">N</span>
                                <div>
                                    <p className="chatbot-name">Ask Me Anything</p>
                                </div>
                            </div>
                            <button className="chatbot-close" onClick={() => toggleOpen(false)} aria-label="Close">✕</button>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
                                    <p>{msg.text}</p>
                                </div>
                            ))}
                            {loading && (
                                <div className="chatbot-msg chatbot-msg--bot">
                                    <span className="chatbot-typing">
                                        <span /><span /><span />
                                    </span>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length === 1 && (
                            <div className="chatbot-suggestions">
                                {SUGGESTIONS.map((s) => (
                                    <button key={s} className="chatbot-suggestion" onClick={() => send(s)}>{s}</button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div className="chatbot-input-row">
                            <input
                                ref={inputRef}
                                className="chatbot-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask something…"
                                disabled={loading}
                                autoComplete="off"
                            />
                            <button
                                className="chatbot-send"
                                onClick={() => send(input)}
                                disabled={!input.trim() || loading}
                                aria-label="Send"
                            >
                                ↑
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bubble */}
            <motion.button
                className="chatbot-bubble"
                onClick={() => toggleOpen(!open)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Chat with AI assistant"
            >
                {open ? <CloseRoundedIcon fontSize="small" /> : <AutoAwesomeRoundedIcon fontSize="small" />}
            </motion.button>
        </div>
        </>
    );
};

export default ChatBot;
