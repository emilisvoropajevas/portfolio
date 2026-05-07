import { Terminal } from "./Terminal";
import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});

    const fadeUp = {
        hidden : { opacity: 0, y: 20},
        visible : {opacity: 1, y: 0},
    };
    
    const fadeLeft = {
        hidden: {opacity: 0, x: -40},
        visible: {opacity: 1, x: 0}
    }

    const fadeRight = {
        hidden: {opacity: 0, x: 40},
        visible: {opacity: 1, x: 0}
    }

    return (
        <section id="about" className="h-dvh py-32 px-6 grid-background overflow-hidden [mask-image:linear-gradient(to_bottom, _transparent_10%, _black_60%)]">
            <div className="mx-auto max-w-6xl">
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{duration: 0.3, delay: 0}} className="mb-16 text-center">
                    <span className="mb-4 inline-block font-mono text-sm tracking-wider text-primary uppercase text-white">// About</span>
                    <h2 className="mb-4 text-3xl font-bold tracking-light sm:text-4xl text-white">From Physics to Computer Science</h2>
                </motion.div>
                 <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <motion.div ref={ref} variants={fadeRight} initial="hidden" animate={isInView ? "visible": "hidden"} transition={{duration: 0.3, delay: 0.15}} className="relative overflow-hidden rounded-2xl border border-border/50 h-64">
                    <Terminal/>
                    </motion.div>
                    <div>
                        <div className="flex flex-col justify-center space-y-8">
                            <motion.div ref={ref} variants={fadeLeft} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{duration: 0.3, delay: 0.15}} className="space-y-4 text-muted-foreground leading-relaxed text-white">
                                <p>
                                    First paragraph
                                </p>
                                <p>
                                    Second Paragraph
                                </p>
                                <p>
                                    Third Paragraph
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* 
Finish off loading animations
add pcitures?
Add skills and technologies with icons like languages? to fill up space?
add skills, technologies ? Docker etc?

Write intro section

make compatible with mobile
*/