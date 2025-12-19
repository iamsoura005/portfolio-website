import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { name: '/home', target: 'home' },
    { name: '/about', target: 'about' },
    { name: '/skills', target: 'skills' },
    { name: '/projects', target: 'projects' },
    { name: '/achievements', target: 'achievements' },
    { name: '/contact', target: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-black/50 backdrop-blur-xl border-terminal-green/30 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
                : 'bg-transparent border-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-center md:justify-end">
                <ul className="flex flex-wrap justify-center gap-6 md:gap-8 font-mono text-xs md:text-sm">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <a
                                href={`#${item.target}`}
                                onClick={(e) => scrollToSection(item.target, e)}
                                className="text-slate-400 hover:text-terminal-green transition-colors relative group"
                            >
                                <span className="text-terminal-green opacity-0 group-hover:opacity-100 mr-1">&gt;</span>
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-terminal-green group-hover:w-full transition-all duration-300" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
}
