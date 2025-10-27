// App.tsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
// import AnimatedBackground from "./components/AnimatedBackground";
import "./styles/globals.css";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Certificates from "./components/Certificates";
import LightRays from "./components/LightRays";
import LiquidEther from "./components/LiquidEther";

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
            <div style={{ width: "100%", height: "100vh", position: "fixed" }}>
                {isMobile ? (
                    <LiquidEther
                        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                        mouseForce={20}
                        cursorSize={100}
                        isViscous={false}
                        viscous={30}
                        iterationsViscous={32}
                        iterationsPoisson={32}
                        resolution={0.5}
                        isBounce={false}
                        autoDemo={true}
                        autoSpeed={0.5}
                        autoIntensity={2.2}
                        takeoverDuration={0.25}
                        autoResumeDelay={3000}
                        autoRampDuration={0.6}
                    />
                ) : (
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#00ffff"
                        raysSpeed={1.5}
                        lightSpread={0.8}
                        rayLength={1.2}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.1}
                        distortion={0.05}
                        className="custom-rays"
                    />
                )}
            </div>
            {/* <AnimatedBackground /> */}
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
    );
};

export default App;
