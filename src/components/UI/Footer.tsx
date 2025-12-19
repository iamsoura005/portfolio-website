import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="border-t border-terminal-dim bg-terminal-black pt-16 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-20 grid md:grid-cols-2 gap-12">

                {/* Command Line Input */}
                <div>
                    <h3 className="text-terminal-green font-bold mb-6">&gt; INITIATE_CONTACT_PROTOCOL</h3>

                    <form className="space-y-4 font-mono text-sm max-w-sm">
                        <div className="flex flex-col">
                            <label className="text-slate-500 mb-1">TARGET_EMAIL</label>
                            <input type="email" placeholder="enter_your_email" className="bg-terminal-dark border border-terminal-dim p-3 text-white focus:border-terminal-green focus:outline-none placeholder:text-slate-700" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-slate-500 mb-1">DATA_PAYLOAD</label>
                            <textarea rows={3} placeholder="message_content..." className="bg-terminal-dark border border-terminal-dim p-3 text-white focus:border-terminal-green focus:outline-none placeholder:text-slate-700" />
                        </div>

                        <button className="bg-transparent border border-terminal-green text-terminal-green font-bold font-mono py-3 px-6 flex items-center gap-2 hover:bg-terminal-green hover:text-black hover:shadow-[0_0_10px_#00ff41] transition-all w-full justify-center">
                            <Send size={16} />
                            [ TRANSMIT_PACKET ]
                        </button>
                    </form>
                </div>

                {/* Social Links */}
                <div className="space-y-6 md:text-right">
                    <h3 className="text-slate-500 font-bold mb-6">CONNECTIVITY_NODES</h3>

                    <div className="flex flex-col gap-4 md:items-end text-sm text-slate-400">
                        <a href="mailto:sourasantadutta@gmail.com" className="hover:text-terminal-green transition-colors flex items-center gap-2">
                            <Mail size={16} /> sourasantadutta@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/sourasanta-dutta-852345282" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors flex items-center gap-2">
                            <Linkedin size={16} /> linkedin/sourasanta-dutta
                        </a>
                        <a href="https://wa.me/917811035677" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-terminal-dim"
                            >
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            +91 7811035677 (WhatsApp)
                        </a>
                        <a href="https://github.com/iamsoura005" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors flex items-center gap-2">
                            <Github size={16} /> github/iamsoura005
                        </a>
                        <div className="flex items-center gap-2 text-terminal-dim">
                            <MapPin size={16} /> KOLKATA, WB
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-20 border-t border-terminal-dim pt-8 text-center text-xs text-terminal-dim font-mono">
                SYSTEM_STATUS: NOMINAL | © 2025 NEURAL_ENGINE
            </div>
        </footer>
    );
}
