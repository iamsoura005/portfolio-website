import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitCommit, Check } from 'lucide-react';
import SectionHeader from './SectionHeader';

const commits = [
    { hash: "8a2b3c", msg: "SIH 2025 QUALIFIED [ACCURACY 100%]" },
    { hash: "4f9e1d", msg: "AVALANCHE BLOCKCHAIN HACKATHON: FINALIST" },
    { hash: "7c3a0b", msg: "HACKLOOP 2025: FINALIST DEPLOYMENT" },
    { hash: "9d2e5f", msg: "HackShastra 2025: FINALIST PATCH" },
];

export default function SystemUnlocked() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [lineIndex, setLineIndex] = useState(-1); // -1 means waiting to start
    const [charIndex, setCharIndex] = useState(0);
    const [completedLines, setCompletedLines] = useState<number[]>([]);

    useEffect(() => {
        if (isInView && lineIndex === -1) {
            // Start sequence
            const timer = setTimeout(() => setLineIndex(0), 500);
            return () => clearTimeout(timer);
        }
    }, [isInView, lineIndex]);

    useEffect(() => {
        if (lineIndex >= 0 && lineIndex < commits.length) {
            const currentCmd = `git commit -m "${commits[lineIndex].msg}"`;

            if (charIndex < currentCmd.length) {
                // Typing effect
                const timeout = setTimeout(() => {
                    setCharIndex(prev => prev + 1);
                }, 30 + Math.random() * 30); // Random typing speed
                return () => clearTimeout(timeout);
            } else {
                // Finished typing line, wait for "Enter" simulation
                const timeout = setTimeout(() => {
                    setCompletedLines(prev => [...prev, lineIndex]);
                    setLineIndex(prev => prev + 1);
                    setCharIndex(0);
                }, 400); // Pause before enter
                return () => clearTimeout(timeout);
            }
        }
    }, [lineIndex, charIndex]);


    return (
        <section id="achievements" className="py-20 px-6 md:px-20 max-w-7xl mx-auto border-t border-terminal-dim/30">
            <SectionHeader title="SYSTEM_UNLOCKED" />

            <div ref={containerRef} className="max-w-4xl mx-auto font-mono text-sm bg-black border border-terminal-dim/50 rounded p-6 shadow-2xl relative overflow-hidden min-h-[400px]">
                {/* Terminal Title Bar */}
                <div className="flex items-center justify-between border-b border-terminal-dim/30 pb-4 mb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-terminal-dim text-xs">gh_achievements.log</div>
                </div>

                <div className="space-y-6">
                    {commits.map((commit, i) => {
                        // Logic for rendering this line
                        // If we passed this line index (it's completed), show full
                        // If we are ON this line index, show partial based on charIndex
                        // If we are before this line index, show nothing

                        if (i > lineIndex && !completedLines.includes(i)) return null;

                        const isTyping = i === lineIndex;
                        const isDone = completedLines.includes(i);
                        const fullCmd = `git commit -m "${commit.msg}"`;
                        const displayedCmd = isDone ? fullCmd : fullCmd.slice(0, charIndex);

                        return (
                            <div key={commit.hash} className="group">
                                {/* Command Line */}
                                <div className="flex items-center gap-2 text-slate-400 mb-1 flex-wrap">
                                    <span className="text-terminal-green shrink-0">➜</span>
                                    <span className="text-blue-400 shrink-0">~/achievements</span>

                                    <span className="text-slate-300 break-all">
                                        {displayedCmd}
                                        {isTyping && <span className="animate-pulse bg-terminal-green text-black px-1 ml-1"> </span>}
                                    </span>
                                </div>

                                {/* Output (Only if done) */}
                                {isDone && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="pl-4 border-l-2 border-terminal-dim group-hover:border-terminal-green transition-colors"
                                    >
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <span className="text-terminal-dim">[{commit.hash}]</span>
                                            <span>{commit.msg}</span>
                                        </div>
                                        <div className="text-terminal-green/80 text-xs mt-1 flex items-center gap-2">
                                            <Check size={12} />
                                            <span>1 achievement committed, 100% verifiable</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}

                    {/* Final Prompt */}
                    {completedLines.length === commits.length && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-slate-500 mt-8 pt-4 border-t border-terminal-dim/30"
                        >
                            <span className="text-terminal-green">➜</span> <span className="text-blue-400">~/achievements</span> <span className="animate-pulse inline-block w-2 h-4 bg-terminal-green align-middle ml-1" />
                        </motion.div>
                    )}
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <GitCommit size={120} />
                </div>
            </div>
        </section>
    );
}
