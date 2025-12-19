import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LoadingPhase = 'boot' | 'coding' | 'training' | 'message';

export default function InferenceLoader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<LoadingPhase>('boot');
    const [bootLogs, setBootLogs] = useState<string[]>([]);
    const [typedCode, setTypedCode] = useState('');
    const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
    const [accuracy, setAccuracy] = useState(0);

    // Final Message State
    const [finalCommand, setFinalCommand] = useState('');
    const [commandExecuted, setCommandExecuted] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    // Phase 1: Boot Logs
    useEffect(() => {
        const logs = [
            "Initializing kernel...",
            "Loading neural hyperparameters...",
            "Mounting file system...",
            "Allocating VRAM (24GB)...",
            "Checking CUDA version... 12.1 DETECTED",
            "System nominal."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setBootLogs(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('coding'), 500);
            }
        }, 150);
        return () => clearInterval(interval);
    }, []);

    // Phase 2: Coding
    useEffect(() => {
        if (phase !== 'coding') return;

        const code = "python train_agent.py --model transformer --epochs 10";
        let i = 0;
        const interval = setInterval(() => {
            if (i <= code.length) {
                setTypedCode(code.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('training'), 500);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [phase]);

    // Phase 3: Training
    useEffect(() => {
        if (phase !== 'training') return;

        let epoch = 1;
        const maxEpochs = 10;

        const interval = setInterval(() => {
            if (epoch <= maxEpochs) {
                const currentAcc = 0.5 + (epoch / maxEpochs) * 0.49; // Ends at 0.99
                setAccuracy(currentAcc);

                const log = `Epoch ${epoch}/${maxEpochs} - loss: ${(1 - currentAcc).toFixed(4)} - accuracy: ${currentAcc.toFixed(4)}`;
                setTrainingLogs(prev => [...prev.slice(-4), log]); // Keep last 5 logs

                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
                epoch++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('message'), 800);
            }
        }, 300); // Speed of epochs

        return () => clearInterval(interval);
    }, [phase]);

    // Phase 4: Final Message (Terminal Style)
    useEffect(() => {
        if (phase !== 'message') return;

        const command = "Knock, knock, Neo. Wake up...";
        let i = 0;

        // Step 1: Type the command
        const typeInterval = setInterval(() => {
            if (i <= command.length) {
                setFinalCommand(command.slice(0, i));
                i++;
            } else {
                clearInterval(typeInterval);

                // Step 2: "Press Enter" delay
                setTimeout(() => {
                    setCommandExecuted(true);

                    // Step 3: Redirect
                    setTimeout(onComplete, 1000);
                }, 800);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, [phase, onComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-terminal-green p-4 selection:bg-terminal-green selection:text-black">
            <AnimatePresence mode="wait">
                {phase !== 'message' ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-2xl border border-terminal-green/30 bg-terminal-dark/50 p-6 rounded relative overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex justify-between border-b border-terminal-green/30 pb-2 mb-4 text-xs">
                            <span>TERMINAL_SESSION_01</span>
                            <span>{phase.toUpperCase()}</span>
                        </div>

                        <div className="h-64 font-mono text-sm space-y-2 overflow-y-auto" ref={scrollRef}>
                            {/* Boot History */}
                            {bootLogs.map((log, i) => (
                                <div key={`boot-${i}`} className="text-slate-500">&gt; {log}</div>
                            ))}

                            {/* Code Typing Area */}
                            {(phase === 'coding' || phase === 'training') && (
                                <div className="text-white mt-4">
                                    <span className="text-terminal-green">user@cortex:~$</span> {typedCode}
                                    {phase === 'coding' && <span className="animate-pulse">_</span>}
                                </div>
                            )}

                            {/* Training Output */}
                            {phase === 'training' && (
                                <div className="mt-4 space-y-1">
                                    <div className="text-white">Training process initiated...</div>
                                    {trainingLogs.map((log, i) => (
                                        <div key={`train-${i}`} className="text-terminal-green">
                                            {log}
                                            {i === trainingLogs.length - 1 && <span className="animate-pulse">_</span>}
                                        </div>
                                    ))}

                                    {/* Progres Bar */}
                                    <div className="mt-2 w-full bg-terminal-dim h-2 rounded max-w-md">
                                        <div
                                            className="bg-terminal-green h-full rounded transition-all duration-300"
                                            style={{ width: `${accuracy * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-right mt-1">{(accuracy * 100).toFixed(2)}% ACCURACY</div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    // The Final Message - Terminal Style
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-3xl text-left"
                    >
                        <div className="text-2xl md:text-4xl font-mono text-terminal-green tracking-wide leading-relaxed">
                            <span className="text-slate-500 mr-4">&gt;</span>
                            {finalCommand}
                            {!commandExecuted && <span className="animate-pulse">_</span>}
                        </div>

                        {commandExecuted && (
                            <div className="mt-4 text-slate-500 animate-pulse">
                                Redirecting to host...
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
