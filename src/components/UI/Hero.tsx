import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Terminal, Download, ChevronRight } from 'lucide-react';
import VisitorStats from './VisitorStats';

export default function Hero() {
    const { displayedText: nameText, isComplete: nameComplete } = useTypewriter("Hi, I'm Soura", 100, 1000);
    const { displayedText: roleText } = useTypewriter("AI_ENGINEER | ML_RESEARCHER | DATA_SCIENTIST", 50, 2500);
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        if (nameComplete) {
            const timer = setTimeout(() => setShowStats(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [nameComplete]);

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto pt-20 relative">

            {/* HUD Elements */}
            <div className="absolute top-20 right-4 md:top-24 md:right-20 border border-terminal-green/30 p-2 md:p-4 bg-terminal-black/80 font-mono text-[10px] md:text-xs cyber-corner scale-90 md:scale-100 origin-top-right z-30">
                <div className="flex gap-4 mb-2">
                    <span className="text-terminal-dim">STATUS:</span>
                    <span className="animate-pulse">ONLINE</span>
                </div>
                <div className="flex gap-4">
                    <span className="text-terminal-dim">LOCATION:</span>
                    <span>KOLKATA_IN</span>
                </div>
            </div>

            <div className="space-y-8 z-10 w-full max-w-4xl">

                {/* Terminal Header */}
                <div className="flex items-center gap-2 text-terminal-dim mb-4">
                    <Terminal size={16} />
                    <span>user@neural-net:~$ ./init_portfolio.sh</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight relative w-fit">
                    <span className="text-terminal-green mr-4">&gt;</span>
                    {nameText}
                    <span className="animate-pulse text-terminal-green">_</span>
                </h1>

                <div className="h-8 md:h-12 flex items-center gap-2">
                    <ChevronRight className="text-terminal-green" />
                    <p className="text-lg md:text-xl text-slate-400 font-mono tracking-widest">
                        [{roleText}]
                    </p>
                </div>

                <p className="text-slate-500 max-w-xl leading-relaxed border-l-2 border-terminal-dark pl-6 ml-2 text-lg">
                    Architecting intelligence through deep learning algorithms and neural networks.
                    Optimizing loss functions and deploying scalable models.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-8">
                    <motion.a
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#00ff41",
                            color: "#000000",
                            boxShadow: "0 0 10px #00ff41"
                        }}
                        transition={{ duration: 0.1 }}
                        href="/cv.pdf"
                        download="CV_Sourasanta_Dutta.pdf"
                        className="px-6 py-3 border border-terminal-green text-terminal-green font-bold font-mono flex items-center gap-2 transition-all bg-transparent"
                    >
                        <Download size={18} />
                        [ DOWNLOAD_CV.EXE ]
                    </motion.a>

                    <motion.a
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "#00ff41",
                            color: "#000000",
                            boxShadow: "0 0 10px #00ff41"
                        }}
                        transition={{ duration: 0.1 }}
                        href="#projects"
                        className="px-6 py-3 border border-terminal-green text-terminal-green font-bold font-mono transition-all bg-transparent"
                    >
                        [ EXPLORE_MODELS ]
                    </motion.a>
                </div>
            </div>

            {/* Visitor Stats - Absolute Positioned to Section Right with Delay */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showStats ? 1 : 0, x: showStats ? 0 : 20 }}
                transition={{ duration: 0.8 }}
                className="hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 z-20"
            >
                <VisitorStats />
            </motion.div>
        </section>
    );
}
