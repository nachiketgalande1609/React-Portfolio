import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import ScrollToTopButton from "./components/ScrollToTop/ScrollToTop";
import "./styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Experience from "./pages/Experience/Experience";
import Testimonials from "./pages/Testimonials/Testimonials";
import Certificates from "./pages/Certificates/Certificates";
import GitHub from "./pages/GitHub/GitHub";
import Timeline from "./pages/Timeline/Timeline";
import NotFound from "./pages/NotFound/NotFound";

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
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Testimonials />
        <Contact />
        <Footer />
    </>
);

const App: React.FC = () => {
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
                    <Header />
                    <div className="desktop-theme-toggle">
                        <ThemeToggle />
                    </div>
                    <Routes>
                        <Route path="/" element={<PortfolioHome />} />
                        <Route path="/github" element={<><GitHub /><Footer /></>} />
                        <Route path="/timeline" element={<><Timeline /><Footer /></>} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
