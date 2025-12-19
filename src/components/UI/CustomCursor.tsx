import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        const handleMouseDown = () => setClicking(true);
        const handleMouseUp = () => setClicking(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* Main Cursor (Crosshair) */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 border-l border-t border-terminal-green pointer-events-none z-[100] mix-blend-screen"
                animate={{
                    x: position.x - 3,
                    y: position.y - 3,
                    scale: clicking ? 0.8 : 1
                }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            >
                {/* Extended lines */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] h-[200vh] -translate-y-[100vh] bg-terminal-green opacity-10" />
                <div className="absolute left-0 right-0 top-0 h-[1px] w-[200vh] -translate-x-[100vh] bg-terminal-green opacity-10" />
            </motion.div>
        </>
    );
}
