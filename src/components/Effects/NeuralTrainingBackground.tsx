import { useRef, useEffect } from 'react';

export default function NeuralTrainingBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // --- ANN Visualizer Config ---
        const nodes: { x: number, y: number, layer: number }[] = [];
        const layers = [6, 8, 8, 4]; // Structure
        const layerGap = canvas.width / (layers.length + 1);

        // Initialize Nodes
        layers.forEach((count, lIndex) => {
            const x = layerGap * (lIndex + 1);
            const yGap = canvas.height / (count + 1);
            for (let i = 0; i < count; i++) {
                nodes.push({ x, y: yGap * (i + 1), layer: lIndex });
            }
        });

        // --- Graph Config ---
        const graphHistory: number[] = [];
        const maxGraphPoints = 100;
        let epoch = 0;

        const draw = () => {
            // Clear with fade trail (Creates motion blur)
            ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Network
            ctx.lineWidth = 1;
            nodes.forEach((node) => {
                // Draw Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = '#005f00'; // Brighter inactive green
                ctx.fill();

                // Draw Connections to next layer
                nodes.forEach((targetNode) => {
                    if (targetNode.layer === node.layer + 1) {
                        // Randomly pulse connection
                        const isActive = Math.sin(epoch * 0.1 + node.y + targetNode.y) > 0.95;

                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(targetNode.x, targetNode.y);

                        if (isActive) {
                            ctx.strokeStyle = '#00ff41'; // Active Terminal Green
                            ctx.globalAlpha = 0.8;
                            ctx.lineWidth = 1.5;
                        } else {
                            ctx.strokeStyle = '#004400'; // Visible Inactive
                            ctx.globalAlpha = 0.1;
                            ctx.lineWidth = 0.5;
                        }
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                });
            });

            // 2. Learning Graph (Bottom Left Overlay)
            const graphW = 300;
            const graphH = 100;
            const graphX = 50;
            const graphY = canvas.height - 150;

            // Draw Axes
            ctx.strokeStyle = '#005f00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(graphX, graphY); // Top-left of graph area (actually bottom-left origin visually)
            ctx.lineTo(graphX, graphY + graphH); // Y axis done
            ctx.lineTo(graphX + graphW, graphY + graphH); // X axis
            ctx.stroke();

            // Update Data (Loss decreasing simulation)
            if (epoch % 5 === 0) {
                const progress = Math.min(graphHistory.length / maxGraphPoints, 1);
                const baseLoss = Math.exp(-progress * 3);
                const noise = (Math.random() - 0.5) * 0.1;
                graphHistory.push(baseLoss + noise);
                if (graphHistory.length > maxGraphPoints) graphHistory.shift();
            }

            // Draw Line
            ctx.beginPath();
            ctx.strokeStyle = '#00ff41';
            ctx.lineWidth = 2;

            graphHistory.forEach((val, i) => {
                const px = graphX + (i / maxGraphPoints) * graphW;
                const py = (graphY + graphH) - (val * (graphH - 10)); // Scale Y
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.stroke();

            // Label
            ctx.fillStyle = '#00ff41';
            ctx.font = '10px "JetBrains Mono"';
            ctx.fillText(`LOSS: ${(graphHistory[graphHistory.length - 1] || 1).toFixed(4)}`, graphX, graphY - 10);
            ctx.fillText(`EPOCH: ${epoch}`, graphX + 200, graphY - 10);

            epoch++;
            requestAnimationFrame(draw);
        };

        const interval = requestAnimationFrame(draw);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 bg-terminal-black"
        />
    );
}
