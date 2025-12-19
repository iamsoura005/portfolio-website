import { useRef, useEffect } from 'react';

export default function LLMLearningBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const vocab = [
            "tensor", "gradient", "loss", "optimizer", "activation",
            "bias", "weight", "epoch", "learning_rate", "sigmoid",
            "relu", "softmax", "convolution", "recurrent", "attention",
            "transformer", "token", "embedding", "vector", "matrix",
            "0.001", "1e-4", "NaN", "batch_size", "dropout", "query", "key", "value"
        ];

        const tokens: {
            x: number,
            y: number,
            text: string,
            alpha: number,
            speed: number
        }[] = [];

        // Increased token count for density
        const tokenCount = 50;

        for (let i = 0; i < tokenCount; i++) {
            tokens.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                text: vocab[Math.floor(Math.random() * vocab.length)],
                alpha: Math.random() * 0.5 + 0.1,
                speed: Math.random() * 0.5 + 0.2
            });
        }

        let frame = 0;

        const draw = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Tokens
            tokens.forEach(t => {
                t.y -= t.speed;
                if (t.y < -20) {
                    t.y = canvas.height + 20;
                    t.x = Math.random() * canvas.width;
                    t.text = vocab[Math.floor(Math.random() * vocab.length)];
                }

                ctx.fillStyle = '#00ff41';
                ctx.globalAlpha = t.alpha * 0.3;
                ctx.font = '12px "JetBrains Mono"';
                ctx.fillText(t.text, t.x, t.y);
            });

            // 2. Single Head Attention Animation (Slow)
            const scanSpeed = 0.5; // Slow movement
            const scanY = (frame * scanSpeed) % canvas.height;
            const beamWidth = 100;

            // Draw Scan Beam
            const gradient = ctx.createLinearGradient(0, scanY - beamWidth / 2, 0, scanY + beamWidth / 2);
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(0.5, "rgba(0, 255, 65, 0.05)");
            gradient.addColorStop(1, "transparent");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, scanY - beamWidth / 2, canvas.width, beamWidth);

            // Scan Line
            ctx.beginPath();
            ctx.moveTo(0, scanY);
            ctx.lineTo(canvas.width, scanY);
            ctx.strokeStyle = '#00ff41';
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.3;
            ctx.stroke();

            // Highlight and Connect Tokens in Beam
            const activeTokens: typeof tokens = [];

            tokens.forEach(t => {
                if (Math.abs(t.y - scanY) < beamWidth / 2) {
                    activeTokens.push(t);
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(t.text, t.x, t.y);
                }
            });

            // Connect active tokens (Self-Attention)
            ctx.strokeStyle = '#00ff41';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < activeTokens.length; i++) {
                for (let j = i + 1; j < activeTokens.length; j++) {
                    const t1 = activeTokens[i];
                    const t2 = activeTokens[j];
                    const dist = Math.hypot(t1.x - t2.x, t1.y - t2.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(t1.x, t1.y - 4);
                        ctx.lineTo(t2.x, t2.y - 4);
                        ctx.globalAlpha = 1 - (dist / 150);
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            frame++;
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
