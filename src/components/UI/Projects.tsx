import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { Folder, FileCode, Terminal, Award } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function Projects() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <section id="projects" className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
            <SectionHeader title="MODEL_ZOO_REPOSITORY" />

            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <motion.a
                        key={project.id}
                        href={project.repoUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onHoverStart={() => setHovered(project.id)}
                        onHoverEnd={() => setHovered(null)}
                        className="group relative border border-terminal-dim bg-terminal-dark/40 hover:border-terminal-green transition-all duration-300 block overflow-hidden"
                    >
                        {/* Hover Grid Effect */}
                        {hovered === project.id && (
                            <div className="absolute inset-0 bg-terminal-green/5 pointer-events-none grid-pattern opacity-50" />
                        )}

                        {/* Scanner Effect */}
                        <div className="absolute top-0 bottom-0 w-1 bg-terminal-green/50 left-[-10px] group-hover:left-[100%] transition-all duration-1000 rotate-12 blur-sm z-20" />

                        <div className="p-8 h-full flex flex-col justify-between relative z-10">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <Folder className="text-terminal-green" size={24} />
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-xs font-mono text-terminal-dim border border-terminal-dim px-2 py-1">
                                            ID: {project.id.toUpperCase()}
                                        </span>
                                        {/* Achievement Badge */}
                                        {project.achievement && (
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-400 animate-pulse border border-yellow-500/30 px-2 py-0.5 bg-yellow-500/10">
                                                <Award size={10} />
                                                <span>{project.achievement}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-terminal-green transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                <div className="h-px w-full bg-terminal-dim mb-4 group-hover:bg-terminal-green/50 transition-colors" />
                                <div className="flex gap-3 text-xs text-slate-400 text-wrap">
                                    {project.tech.map(t => (
                                        <span key={t} className="flex items-center gap-1">
                                            <FileCode size={12} /> {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Corner L-shapes */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-terminal-green opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-terminal-green opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-terminal-green opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-terminal-green opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* ML Insight Popup */}
                        <AnimatePresence>
                            {hovered === project.id && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="absolute bottom-4 right-4 bg-black border border-terminal-green/50 p-3 rounded-none shadow-lg shadow-terminal-green/10 max-w-[200px] hidden md:block"
                                >
                                    <div className="flex items-center gap-2 mb-2 text-terminal-green text-xs border-b border-terminal-green/30 pb-1">
                                        <Terminal size={10} />
                                        <span>MODEL_ARCH</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-300 space-y-1">
                                        <div>&gt; Input: Tensor[B, H, W, 3]</div>
                                        <div>&gt; Hidden: {project.type === 'cnn' ? 'Conv2D + MaxPool' : 'Dense + Dropout'}</div>
                                        <div className="text-terminal-green">&gt; Output: Logits</div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.a>
                ))}
            </div>
        </section>
    );
}
