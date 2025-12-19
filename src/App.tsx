import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/UI/Navbar';
import MatrixRain from './components/Effects/MatrixRain';
import Hero from './components/UI/Hero';
import AboutSkills from './components/UI/AboutSkills';
import Projects from './components/UI/Projects';
import Footer from './components/UI/Footer';
import SystemUnlocked from './components/UI/SystemUnlocked';
import LoadingScreen from './components/UI/LoadingScreen';
import CustomCursor from './components/UI/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full min-h-screen text-terminal-green overflow-hidden selection:bg-terminal-green selection:text-black">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <MatrixRain />
          <Navbar />
          <main className="relative z-10 w-full animate-in fade-in duration-1000">
            <Hero />
            <AboutSkills />
            <Projects />
            <SystemUnlocked />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
