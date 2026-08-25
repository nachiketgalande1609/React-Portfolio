import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import ScrollToTopButton from "./components/ScrollToTop/ScrollToTop";
import Terminal from "./components/Terminal/Terminal";
import SectionProgress from "./components/SectionProgress/SectionProgress";
import "./styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

// Lazy-load all below-fold sections — reduces initial JS bundle & TBT
const About        = lazy(() => import("./pages/About/About"));
const Skills       = lazy(() => import("./pages/Skills/Skills"));
const Experience   = lazy(() => import("./pages/Experience/Experience"));
const Projects     = lazy(() => import("./pages/Projects/Projects"));
const Certificates = lazy(() => import("./pages/Certificates/Certificates"));
const Testimonials = lazy(() => import("./pages/Testimonials/Testimonials"));
const Contact      = lazy(() => import("./pages/Contact/Contact"));
const GitHub       = lazy(() => import("./pages/GitHub/GitHub"));
const Timeline     = lazy(() => import("./pages/Timeline/Timeline"));
const NotFound     = lazy(() => import("./pages/NotFound/NotFound"));

const ScrollToTop: React.FC = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.state && (location.state as { scrollTo?: string }).scrollTo) return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [location.pathname]);
    return null;
};

const ScrollToSection: React.FC = () => {
    const location = useLocation();
    useEffect(() => {
        const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
        if (!scrollTo) return;
        const attempt = (tries: number) => {
            const el = document.getElementById(scrollTo);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else if (tries > 0) {
                setTimeout(() => attempt(tries - 1), 120);
            }
        };
        attempt(5);
    }, [location.state]);
    return null;
};

const PortfolioHome: React.FC = () => (
    <>
        <ScrollToSection />
        <Hero />
        <Suspense fallback={null}>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certificates />
            <Testimonials />
            <Contact />
            <Footer />
        </Suspense>
    </>
);

const App: React.FC = () => {
    const [terminalOpen, setTerminalOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement).tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            if (e.key === "`") {
                e.preventDefault();
                setTerminalOpen((o) => !o);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <div className="site-background" aria-hidden="true" />

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        pointerEvents: "auto",
                    }}
                >
                    <ScrollToTop />
                    <ScrollProgress />
                    <Analytics />
                    <ScrollToTopButton />
                    <SectionProgress />
                    <Header />
                    <div className="desktop-theme-toggle">
                        <ThemeToggle />
                    </div>
                    <main>
                        <Suspense fallback={null}>
                            <Routes>
                                <Route path="/" element={<PortfolioHome />} />
                                <Route path="/github" element={<Suspense fallback={null}><GitHub /><Footer /></Suspense>} />
                                <Route path="/timeline" element={<Suspense fallback={null}><Timeline /><Footer /></Suspense>} />
                                <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>

                <AnimatePresence>
                    {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}
                </AnimatePresence>
            </div>
        </BrowserRouter>
    );
};

export default App;
