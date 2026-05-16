// App.tsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
// import AnimatedBackground from "./components/AnimatedBackground";
import "./styles/globals.css";
import Experience from "./pages/Experience/Experience";
import Testimonials from "./pages/Testimonials/Testimonials";
import Certificates from "./pages/Certificates/Certificates";
import LiquidEther from "./components/LiquidEther/LiquidEther";

const App: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1200);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <div className="App">
            {/* Content layer */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    pointerEvents: "auto",
                }}
            >
                <ScrollProgress />
                <Header />
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Certificates />
                <Testimonials />
                <Contact />
                <Footer />
            </div>
        </div>
    );
};

export default App;
