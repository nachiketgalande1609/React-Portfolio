import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Terminal.css";

interface TerminalLine {
    type: "input" | "output" | "error" | "system";
    content: string | React.ReactNode;
}

const PROMPT = "~$";

const COMMANDS: Record<string, () => React.ReactNode> = {
    help: () => (
        <span>
            <span className="t-dim">Available commands:</span>
            {"\n"}
            {"  "}<span className="t-cmd">whoami</span>{"       "}— about me
            {"\n"}
            {"  "}<span className="t-cmd">skills</span>{"       "}— tech stack
            {"\n"}
            {"  "}<span className="t-cmd">projects</span>{"     "}— featured work
            {"\n"}
            {"  "}<span className="t-cmd">experience</span>{"   "}— work history
            {"\n"}
            {"  "}<span className="t-cmd">contact</span>{"      "}— get in touch
            {"\n"}
            {"  "}<span className="t-cmd">goto [section]</span>{"  "}— scroll to section
            {"\n"}
            {"  "}<span className="t-cmd">clear</span>{"        "}— clear terminal
            {"\n"}
            {"  "}<span className="t-cmd">exit</span>{"         "}— close terminal
        </span>
    ),
    whoami: () => (
        <span>
            {"  "}I'm a Senior Full Stack Developer based in Mumbai, India.{"\n"}
            {"  "}5+ years building production systems across industries —{"\n"}
            {"  "}from social platforms to AI tools to enterprise ERP.{"\n\n"}
            {"  "}<span className="t-dim">Currently at</span>{"   "}Accenture{"\n"}
            {"  "}<span className="t-dim">Stack</span>{"         "}React · Node.js · Python · TypeScript · AWS{"\n"}
            {"  "}<span className="t-dim">Status</span>{"        "}Open to new opportunities
        </span>
    ),
    skills: () => (
        <span>
            <span className="t-dim">Frontend</span>{"   "}React, TypeScript, JavaScript, HTML/CSS{"\n"}
            <span className="t-dim">Backend</span>{"    "}Node.js, Express, Flask, FastAPI, Python{"\n"}
            <span className="t-dim">Database</span>{"   "}MongoDB, PostgreSQL, SQLite{"\n"}
            <span className="t-dim">Cloud</span>{"      "}AWS, Azure, Docker{"\n"}
            <span className="t-dim">AI/ML</span>{"      "}OpenAI, PyTorch, Streamlit
        </span>
    ),
    projects: () => (
        <span>
            <span className="t-green">01</span> Ripple{"       "}<span className="t-dim">Social media app — web + mobile</span>{"\n"}
            <span className="t-green">02</span> Vela{"         "}<span className="t-dim">AI wallpaper marketplace</span>{"\n"}
            <span className="t-green">03</span> AI Upscaler{"  "}<span className="t-dim">4× GPU super-resolution, local</span>{"\n"}
            <span className="t-green">04</span> CineLocal{"    "}<span className="t-dim">Netflix-style local media server</span>{"\n"}
            <span className="t-green">05</span> Streamline{"   "}<span className="t-dim">MERN ERP system</span>{"\n"}
            {"\n"}
            <span className="t-dim">Type </span><span className="t-cmd">goto projects</span><span className="t-dim"> to see all 13 projects</span>
        </span>
    ),
    experience: () => (
        <span>
            <span className="t-green">Accenture</span>{"         "}2022 — present{"\n"}
            {"  "}<span className="t-dim">Senior Full Stack Developer</span>{"\n"}
            {"\n"}
            <span className="t-green">Yudiz Solutions</span>{"   "}2021 — 2022{"\n"}
            {"  "}<span className="t-dim">Full Stack Developer</span>
        </span>
    ),
    contact: () => (
        <span>
            <span className="t-dim">Email{"     "}</span>nachiket.galande.in@gmail.com{"\n"}
            <span className="t-dim">LinkedIn{"  "}</span>linkedin.com/in/nachiketgalande{"\n"}
            <span className="t-dim">GitHub{"    "}</span>github.com/nachiketgalande1609
        </span>
    ),
};

const SECTIONS = ["about", "skills", "projects", "experience", "certificates", "contact", "testimonials"];

const BOOT_LINES = [
    'Type "help" to see available commands.',
];

interface Props {
    onClose: () => void;
}

const Terminal: React.FC<Props> = ({ onClose }) => {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bootLines: TerminalLine[] = BOOT_LINES.map((content) => ({ type: "system", content }));
        setLines(bootLines);
        setTimeout(() => inputRef.current?.focus(), 80);
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    const runCommand = useCallback((raw: string) => {
        const cmd = raw.trim().toLowerCase();
        const newLines: TerminalLine[] = [{ type: "input", content: raw }];

        if (!cmd) {
            setLines((l) => [...l, ...newLines]);
            return;
        }

        if (cmd === "clear") {
            setLines([]);
            return;
        }

        if (cmd === "exit" || cmd === "quit") {
            onClose();
            return;
        }

        if (cmd.startsWith("goto ")) {
            const section = cmd.slice(5).trim();
            if (SECTIONS.includes(section)) {
                const el = document.getElementById(section);
                if (el) {
                    onClose();
                    setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
                    newLines.push({ type: "output", content: <span>Navigating to <span className="t-green">{section}</span>…</span> });
                } else {
                    newLines.push({ type: "output", content: <span>Navigating to <span className="t-green">{section}</span>…</span> });
                }
            } else {
                newLines.push({ type: "error", content: `Unknown section: "${section}". Try: ${SECTIONS.join(", ")}` });
            }
            setLines((l) => [...l, ...newLines]);
            return;
        }

        if (COMMANDS[cmd]) {
            newLines.push({ type: "output", content: COMMANDS[cmd]() });
        } else {
            newLines.push({ type: "error", content: `Command not found: "${cmd}". Type "help" for available commands.` });
        }

        setLines((l) => [...l, ...newLines]);
    }, [onClose]);

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const val = input;
            setHistory((h) => [val, ...h]);
            setHistIdx(-1);
            setInput("");
            runCommand(val);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = Math.min(histIdx + 1, history.length - 1);
            setHistIdx(next);
            setInput(history[next] ?? "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = Math.max(histIdx - 1, -1);
            setHistIdx(next);
            setInput(next === -1 ? "" : history[next]);
        } else if (e.key === "Escape") {
            onClose();
        }
    };

    return (
        <motion.div
            className="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
        >
            <motion.div
                className="terminal-window"
                initial={{ scale: 0.94, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 24 }}
                transition={{ duration: 0.22, ease: [0.215, 0.61, 0.355, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Chrome bar */}
                <div className="terminal-chrome">
                    <div className="terminal-dots">
                        <button className="t-dot t-dot-red" onClick={onClose} aria-label="Close terminal" />
                        <span className="t-dot t-dot-yellow" />
                        <span className="t-dot t-dot-green" />
                    </div>
                    <span className="terminal-title">terminal</span>
                    <span className="terminal-hint">esc to close</span>
                </div>

                {/* Output area */}
                <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
                    {lines.map((line, i) => (
                        <div key={i} className={`t-line t-line-${line.type}`}>
                            {line.type === "input" && (
                                <span className="t-prompt-echo">
                                    <span className="t-prompt">{PROMPT}</span>{" "}
                                    <span className="t-input-echo">{line.content as string}</span>
                                </span>
                            )}
                            {line.type !== "input" && (
                                <span className="t-output">{line.content}</span>
                            )}
                        </div>
                    ))}

                    {/* Active input row */}
                    <div className="t-line t-input-row">
                        <span className="t-prompt">{PROMPT}</span>
                        <input
                            ref={inputRef}
                            className="t-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKey}
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                            aria-label="Terminal input"
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Terminal;
