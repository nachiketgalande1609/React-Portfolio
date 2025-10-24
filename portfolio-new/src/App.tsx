// App.tsx
import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GlobalCursor from "./components/GlobalCursor";
import ScrollProgress from "./components/ScrollProgress"; // Add this import
import "./styles/globals.css";

const App: React.FC = () => {
    return (
        <div className="App">
            <GlobalCursor />
            <ScrollProgress /> {/* Add ScrollProgress here */}
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </div>
    );
};

export default App;
