import { useRef, useEffect } from 'react';

export default function TensorRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        // Numbers and Matrix Glitch Characters
        const chars = "0123456789AZ010101001";
        const charsArray = chars.split('');

        const draw = () => {
            // Higher opacity fade for "glitchier" trail
            ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px "JetBrains Mono"`;

            for (let i = 0; i < drops.length; i++) {
                const text = charsArray[Math.floor(Math.random() * charsArray.length)];

                // Glitch visual: Randomly switch colors and brightness
                const isGlitch = Math.random() > 0.98;

                if (isGlitch) {
                    ctx.fillStyle = '#ffffff'; // White flash
                    // Occasionally draw a "corrupted" block
                    if (Math.random() > 0.5) {
                        ctx.fillStyle = '#00ff41';
                        ctx.fillRect(i * fontSize, drops[i] * fontSize, fontSize, fontSize);
                        ctx.fillStyle = '#000'; // Text becomes black on green block
                    }
                } else {
                    // Standard Matrix Green
                    ctx.fillStyle = '#00ff41';
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Random reset with varying speeds creating "rain" unevenness
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
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
