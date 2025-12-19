import { useState, useEffect } from 'react';

export default function VisitorStats() {
    const [time, setTime] = useState('');
    const [impression] = useState((90 + Math.random() * 9).toFixed(2));
    const [graphPoints, setGraphPoints] = useState<number[]>([10, 15, 8, 20, 25, 18, 30, 22, 35, 28]);

    // Time Update
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Live Graph Update
    useEffect(() => {
        const interval = setInterval(() => {
            setGraphPoints(prev => {
                const next = Math.floor(Math.random() * 40) + 5; // Valid height 5-45
                return [...prev.slice(1), next];
            });
        }, 500); // 2Hz update
        return () => clearInterval(interval);
    }, []);

    // Generate SVG path from points
    const generatePath = () => {
        // SVG Viewbox: 100 x 50
        const stepX = 100 / (graphPoints.length - 1);
        let d = `M 0 ${50 - graphPoints[0]}`;

        graphPoints.forEach((p, i) => {
            d += ` L ${i * stepX} ${50 - p}`;
        });

        return d;
    };

    return (
        <div className="w-72 border border-terminal-green/50 bg-black p-5 font-mono text-xs cyber-corner shadow-[0_0_25px_rgba(0,255,65,0.2)] relative backdrop-blur-xl">
            <div className="flex justify-between border-b border-terminal-green/30 pb-2 mb-3 text-terminal-green font-bold tracking-wider">
                <span>SESSION_METRICS</span>
                <span className="text-green-400 animate-pulse">● LIVE</span>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between font-bold">
                    <span className="text-slate-300">CLIENT_TIME:</span>
                    <span className="text-white">{time}</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span className="text-slate-300">IMPRESSION:</span>
                    <span className="text-white">{impression}%</span>
                </div>

                {/* Live Graph Area */}
                <div className="border-t border-terminal-dim/30 pt-2 mt-2">
                    <div className="flex justify-between text-[9px] text-slate-400 mb-1 font-bold">
                        <span>TRAFFIC_LOAD</span>
                        <span>{(Math.random() * 100 + 40).toFixed(0)} ms</span>
                    </div>
                    <div className="h-16 w-full border border-terminal-dim/30 bg-terminal-dark/80 relative overflow-hidden">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-2">
                            <div className="border-r border-terminal-dim/20"></div>
                            <div className="border-r border-terminal-dim/20"></div>
                            <div className="border-r border-terminal-dim/20"></div>
                            <div className="border-b border-terminal-dim/20 absolute w-full top-1/2"></div>
                        </div>

                        {/* The Line Graph */}
                        <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
                            <path
                                d={generatePath()}
                                fill="none"
                                stroke="#00ff41"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                                filter="drop-shadow(0 0 2px #00ff41)"
                            />
                            {/* Area fill under curve */}
                            <path
                                d={`${generatePath()} V 50 H 0 Z`}
                                fill="rgba(0, 255, 65, 0.2)"
                                stroke="none"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex justify-between border-t border-terminal-green/30 pt-2 font-bold">
                    <span className="text-slate-300">LATENCY:</span>
                    <span className="text-green-400">24ms</span>
                </div>
            </div>

            {/* Decor */}
            <div className="absolute -left-1 top-4 w-1 h-4 bg-terminal-green shadow-[0_0_5px_#00ff41]" />
            <div className="absolute -right-1 bottom-4 w-1 h-4 bg-terminal-green shadow-[0_0_5px_#00ff41]" />
        </div>
    );
}
