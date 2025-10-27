// App.tsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import AnimatedBackground from "./components/AnimatedBackground";
import "./styles/globals.css";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Certificates from "./components/Certificates";

const App: React.FC = () => {
    return (
        <div className="App">
            {/* <div style={{ width: "100%", height: "100vh", position: "fixed", opacity: 0.3 }}>
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
            </div> */}
            <AnimatedBackground />
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
