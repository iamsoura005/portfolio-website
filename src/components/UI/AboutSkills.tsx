import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const skills = {
    encoders: ["Python", "JavaScript", "TypeScript", "SQL"],
    processors: ["React", "Next.js", "Node.js", "Flask", "Tailwind"],
    decoders: ["TensorFlow", "PyTorch", "Scikit", "OpenCV", "Keras", "NumPy"]
};

export default function AboutSkills() {
    return (
        <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto space-y-24">

            {/* About Terminal */}
            <motion.div
                id="about"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="cyber-border p-8 relative"
            >
                <div className="absolute top-0 right-0 p-2 text-xs text-terminal-dim">UID: 8472-A</div>

                <SectionHeader title="ABOUT_ME" />

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="font-mono text-slate-400 space-y-4 break-words text-sm md:text-base">
                        <p>
                            &gt; Pursuit: B.Tech in Computer Science (AI & ML).
                        </p>
                        <p>
                            &gt; Current_State: UEM Kolkata.
                        </p>
                        <p>
                            &gt; Objective: optimizing real-world problem solving through neural architecture search.
                        </p>
                    </div>

                    <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center border-b border-terminal-dark pb-2 text-sm md:text-base">
                            <span className="text-terminal-green">CGPA_METRIC</span>
                            <span className="text-white">8.39 / 10.0</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-terminal-dark pb-2 text-sm md:text-base">
                            <span className="text-terminal-green">SGPA_EPOCH</span>
                            <span className="text-white">8.99 / 10.0</span>
                        </div>

                        {/* Affiliations Terminal Block */}
                        <div className="mt-6 font-mono text-xs border border-red-500/50 p-4 bg-red-950/20 relative overflow-hidden group hover:border-red-500 transition-colors w-full break-all">
                            <div className="flex items-center gap-2 text-red-500 mb-3 border-b border-red-500/30 pb-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping shrink-0" />
                                <span className="font-bold whitespace-nowrap">CRITICAL_AFFILIATIONS_LOG</span>
                            </div>

                            <div className="space-y-2 text-red-300">
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                    <span className="opacity-50 min-w-fit">[ERROR_01]</span>
                                    <span className="min-w-fit">DETECTED_ROLE:</span>
                                    <span className="text-white font-bold">"PR Lead"</span>
                                    <span className="text-red-400">@INNOFUSION</span>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:gap-2">
                                    <span className="opacity-50 min-w-fit">[ERROR_02]</span>
                                    <span className="min-w-fit">DETECTED_ROLE:</span>
                                    <span className="text-white font-bold">"Member"</span>
                                    <span className="text-red-400">@GDG_UEMK</span>
                                </div>
                                <div className="text-[10px] opacity-70 mt-2 pt-2 border-t border-red-500/20 italic">
                                    &gt; Stack trace detected. Authorization required.
                                </div>
                            </div>

                            {/* Background Glitch Effect */}
                            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Corner Decorations */}
                <div className="cyber-corner absolute inset-0 pointer-events-none" />
            </motion.div>

            {/* Skills Terminal */}
            <div className="space-y-8">
                <SectionHeader title="SYSTEM_CAPABILITIES" />

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Group 1 */}
                    <div className="border border-terminal-dim p-6 bg-terminal-dark/30 hover:border-terminal-green transition-colors group">
                        <h3 className="text-terminal-green text-sm mb-4 group-hover:underline">ENCODERS (LANGUAGES)</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.encoders.map(s => (
                                <span key={s} className="px-2 py-1 bg-terminal-dim/20 text-slate-300 text-xs border border-transparent hover:border-terminal-green cursor-crosshair">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Group 2 */}
                    <div className="border border-terminal-dim p-6 bg-terminal-dark/30 hover:border-terminal-green transition-colors group">
                        <h3 className="text-terminal-green text-sm mb-4 group-hover:underline">PROCESSORS (WEB)</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.processors.map(s => (
                                <span key={s} className="px-2 py-1 bg-terminal-dim/20 text-slate-300 text-xs border border-transparent hover:border-terminal-green cursor-crosshair">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Group 3 */}
                    <div className="border border-terminal-dim p-6 bg-terminal-dark/30 hover:border-terminal-green transition-colors group">
                        <h3 className="text-terminal-green text-sm mb-4 group-hover:underline">DECODERS (ML/AI)</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.decoders.map(s => (
                                <span key={s} className="px-2 py-1 bg-terminal-dim/20 text-slate-300 text-xs border border-transparent hover:border-terminal-green cursor-crosshair">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
