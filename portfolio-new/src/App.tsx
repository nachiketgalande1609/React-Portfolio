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
            {/* Background with interactive canvas */}
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
            >
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
                    // <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
                    //  <LightRays
                    //     raysOrigin="top-center"
                    //     raysColor="#00ffff"
                    //     raysSpeed={1.5}
                    //     lightSpread={0.8}
                    //     rayLength={1.2}
                    //     followMouse={true}
                    //     mouseInfluence={0.1}
                    //     noiseAmount={0.1}
                    //     distortion={0.05}
                    //     className="custom-rays"
                    // />
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
                )}
            </div>

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
