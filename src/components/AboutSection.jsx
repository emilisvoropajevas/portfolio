import { useRef } from "react";
import { useTypewriter } from "../lib/hooks/useTypewriter";
import { motion, useInView } from "motion/react";
import {fadeUp, fadeLeft, fadeRight} from "../lib/animations";

import { Terminal } from "./Terminal";

import myImage from "../assets/coding-pic-and-cute-cat.webp"

export function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    const {displayText, isComplete} = useTypewriter("My Background", 60, isInView);

    return (
        <section id="about" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 grid-background overflow-hidden [mask-image:linear-gradient(to_bottom, _transparent_10%, _black_60%)]">
            <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{duration: 0.3, delay: 0}} className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block font-mono text-sm tracking-wider text-primary uppercase text-orange-600">// About</span>
                    <h2 className="mb-4 text-3xl sm:text-3xl lg-text-4xl font-bold tracking-light text-white">{displayText}{!isComplete && <span className="animate-blink">|</span>}</h2>
                </div>
                 <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div variants={fadeRight} initial="hidden" animate={isInView ? "visible": "hidden"} transition={{duration: 0.3, delay: 0.15}} className="relative overflow-hidden rounded-2xl border border-border/50 ">
                        <img alt="Cute Cat" width="600" height="600" decoding="async" className="w-full aspect-square object-cover" src={myImage}/>
                    </motion.div>
                    <div>
                        <div className="flex flex-col justify-center space-y-8">
                            <motion.div variants={fadeLeft} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{duration: 0.3, delay: 0.15}} className="space-y-4 text-muted-foreground leading-relaxed text-white">
                                <div className="space-y-6">
                                    <p>
                                        I was obsessed for a long time with relativity and Albert Einstein. I was determined to understand it by studying Theoretical Physics. I went on to 
                                        write a historical breakdown on how black holes were derived. After my physics journey ended, I felt lost and wasn't sure what to do next.
                                    </p>
                                    <p>
                                        I'd had plenty of exposure to tech. At about fifteen I built my first computer and every detail mattered to me, from the motherboard to the CPU, purpose, architecture.
                                        There had to be a reason behind each choice and I would fixate on the tiny details when it came to building. But I was always on the outside of computers, not having understanding on the internals.
                                        Physics gave me the tools, thinking and quick learning to solve problems.
                                    </p>
                                    <p>
                                        I found an intersection of both fields by using machine learning to predict the motion of an accretion disk around a black hole. From then, 
                                        I applied the lessons I learned to Software, where much of the history is the same: each language, framework and piece of software is built on the accumulated work of many people before us.
                                        Curiosity, attention to detail and determination still fuel me now to understand and create.
                                    </p>
                                    <div className="h-64">
                                        <Terminal/>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}