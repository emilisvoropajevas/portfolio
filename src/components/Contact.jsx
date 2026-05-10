import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useTypewriter } from "../lib/hooks/useTypewriter";
import {fadeUp} from '../lib/animations';
import { Mail, SquareArrowUpRight, Heart } from "lucide-react"
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    const {displayText, isComplete} = useTypewriter("Get in Touch", 60, isInView);
    
    return (
        <section id="contact" className="py-32 px-6 grid-background overflow-hidden [mask-image:linear-gradient(to_bottom, _transparent_10%, _black_60%)]">
            <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{duration: 0.3, delay: 0.2}} className="mx-auto max-w-2xl">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block font-mono text-sm tracking-wider text-primary uppercase text-orange-600">// Contact</span>
                    <h2 className="mb-4 text-3xl sm:text-3xl lg:-text-4xl font-bold tracking-tight text-white">{displayText}{!isComplete && <span className="animate-blink">|</span>}</h2>
                    <p className="mx-auto max-w-2xl text-foreground-muted text-zinc-400">I'd love to hear from you.</p>
                </div>
                <div>
                    <div className="flex flex-col gap-4 overflow-hidden rounded-xl py-4 text-sm border border-border/50 backdrop-blur-sm">
                    <div className="mb-10 space-y-4 flex justify-center">
                        <a href="mailto:emilisvoropajevas@gmail.com" className="group inline-flex items-center gap-3 font-mono text-lg text-orange-600 transition-colors hover:text-orange-300">
                            <Mail className="h-5 w-5"/>emilisvoropajevas@gmail.com<SquareArrowUpRight className="hidden sm:block h-5 w-5"/>
                        </a>
                    </div>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a href="https://github.com/emilisvoropajevas" target="_blank" rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10">
                                <FaGithub className="h-5 w-5"/>GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/emilisvoropajevas/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/20 hover:bg-white/10">
                                <FaLinkedin className="h-5 w-5"/>LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}


