// App.tsx
import React from "react";
import Header from "./components/Header/Header";
import Hero from "./pages/Hero/Hero";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import "./styles/globals.css";
import Experience from "./pages/Experience/Experience";
import Testimonials from "./pages/Testimonials/Testimonials";
import Certificates from "./pages/Certificates/Certificates";

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="site-background" aria-hidden="true" />

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
