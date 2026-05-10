import { useTypewriter } from '../lib/hooks/useTypewriter';
import { motion } from 'motion/react';
import { fadeUp } from '../lib/animations';

import backImage from '../assets/background-heroSection.webp';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';

export function HeroSection() {
    const {displayText, isComplete} = useTypewriter("Emilis Voropajevas", 60, true)

    return (
        <section id="home" style={{backgroundImage: `url(${backImage})`}}
        className='h-dvh bg-cover bg-center overflow-hidden rounded-lg flex items-center md:items-start md:pt-80 justify-center relative [mask-image:linear-gradient(to_bottom, _black_60%, _transparent_100%)]'>
            <div className='relative z-10 mx-auto max-w-4xl px-6 md:px-0 mb-20 md:mb-0 text-center'>
                <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{duration: 0.3, delay: 0}} className='mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 border-border/50 bg-secondary/50 text-sm backdrop-blur-sm'>
                    <span className='relative flex h-2 w-2'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-600 opacity-75'></span>
                        <span className='relative inline-flex h-2 w-2 rounded-full bg-orange-600'></span>
                    </span>
                <span className='text-white'>Available for work or projects</span>
                </motion.div>
                <h1 className='mb-4 text-5xl font-bold tracking-tight sm:text-7xl text-white'>{displayText} {!isComplete && <span className='animate-blink'>|</span>}</h1>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{duration: 0.3, delay: 0.15}}
                className='mx-auto mb-10 max-w-2xl text-lg sm:text-xl text-zinc-100'>
                    Software Engineer looking for work
                </motion.p>
                <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{duration: 0.3, delay: 0.3}} className='flex flex-wrap items-center justify-center gap-4'>
                    <a href="#projects" className="inline-flex items-center justify-center rounded-lg h-11 px-6 gap-1.5 font-semibold text-sm bg-orange-600 text-white
                    hover:bg-orange-500 shadow-bg-orange-500 transition-all active:translate-y-px select-none">View Projects</a>
                    <a href="#contact" className='inline-flex items-center justify-center rounded-lg h-11 px-6 gap-1.5 text-sm text-white font-semibold
                    border border-white/20 bg-black transition-all hover:bg-black/40 hover:border-white/40 active:translate-y-px select-none'>Contact</a>
                    <div className=" flex items-center gap-2 text-white">
                        <a href='https://github.com/emilisvoropajevas' rel='noopener noreferrer' target='_blank'> <FaGithub className='h-5 w-5'/></a>
                        <a href='https://www.linkedin.com/in/emilisvoropajevas/' rel='noopener noreferrer' target='_blank'> <FaLinkedin className='h-5 w-5'/></a>
                    </div>
                </motion.div>
            </div>
            <motion.div className='absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group' variants={fadeUp} initial="hidden" animate="visible" transition={{duration: 0.3, delay: 1.5}}>
                <a href="#about" className='text-xs text-white transition-colors group-hover:text-zinc-400'><span className='font-mono'>Scroll</span></a>
                <div>
                    <FaArrowDown className='text-white group-hover:text-zinc-400 transition-colors animate-bounce'/>
                </div>
            </motion.div>
        </section>
    );
}