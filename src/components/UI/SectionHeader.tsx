import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';

interface SectionHeaderProps {
    title: string;
    className?: string;
}

export default function SectionHeader({ title, className = "" }: SectionHeaderProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Only start typing when in view
    const { displayedText } = useTypewriter(isInView ? title : "", 50);

    return (
        <h2 ref={ref} className={`text-2xl md:text-3xl font-bold text-white mb-12 flex items-center gap-3 ${className}`}>
            <span className="text-terminal-green text-xl">./</span>
            {displayedText}
            <span className="animate-pulse text-terminal-green">_</span>
        </h2>
    );
}
