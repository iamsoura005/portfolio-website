import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
    const [isOpen, setIsOpen] = useState(false);

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
                : 'bg-transparent border-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center md:block">
                {/* Mobile Logo/Brand (Optional, visible only on mobile if needed) */}
                <div className="md:hidden text-terminal-green font-mono text-sm tracking-tighter">
                    NEURAL_ENGINE_v20
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex flex-wrap justify-end gap-8 font-mono text-sm">
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

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-terminal-green p-2 hover:bg-terminal-green/10 rounded"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-black/95 border-b border-terminal-green/30 backdrop-blur-xl"
                >
                    <ul className="flex flex-col p-6 space-y-4 font-mono text-sm">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={`#${item.target}`}
                                    onClick={(e) => {
                                        scrollToSection(item.target, e);
                                        setIsOpen(false);
                                    }}
                                    className="block text-slate-400 hover:text-terminal-green transition-colors py-2 border-l-2 border-transparent hover:border-terminal-green pl-4"
                                >
                                    <span className="text-terminal-green mr-2">&gt;</span>
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </motion.nav>
    );
}
