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
