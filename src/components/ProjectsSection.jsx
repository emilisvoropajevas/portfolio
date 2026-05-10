import { useEffect, useState,useRef } from "react";
import { useTypewriter } from "../lib/hooks/useTypewriter";
import { motion, useInView } from "motion/react";
import { repoConfig } from "../lib/data";
import { fadeUp } from "../lib/animations";

export function ProjectsSection() {
    const [repoData, setRepoData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true});
    const {displayText, isComplete} = useTypewriter("Things I've Built", 60, isInView);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("https://api.github.com/users/emilisvoropajevas/repos");

                if (!response.ok) {
                    throw new Error("Github API unavailable");
                }
                
                const data = await response.json();
                setRepoData(data);
            }
            catch (err) {
                console.log(err);
                setError("Unable to load projects right now.");
            }
            finally {
                setLoading(false);
            }
        };

        fetchRepos();
    },[]);

    return (
        <section id="projects" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 grid-background overflow-hidden [mask-image:linear-gradient(to_bottom, _transparent_10%, _black_60%)]">
            <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{duration: 0.3, delay: 0}} className="mx-auto max-w-6xl">
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block font-mono text-sm tracking-wider text-primary uppercase text-orange-600">// Projects</span>
                    <h2 className="mb-4 text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">{displayText}{!isComplete && <span className="animate-blink">|</span>}</h2>
                </div>
                <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {loading && (
                        <div className="col-span-full text-center text-zinc-400">
                            Loading projects...
                        </div>
                    )}
                    {error && (
                        <div className="col-span-full rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-300">
                            {error}
                        </div>
                    )}
                    {!loading && !error && repoData.filter(repo => repo.name in repoConfig).map(repo => {
                        const Icon = repoConfig[repo.name]?.icon;
                        return (

                            <div key={repo.name} className="group flex flex-col gap-4 rounded-2xl py-4 text-sm h-full overflow-hidden border border-white/10 bg-zinc-900/70 backdrop-blur-sm hover:border-orange-500/30 hover:bg-zinc-900">
                                <div className="relative flex h-full flex-col p-5 sm:p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/30">
                                            <Icon className="text-orange-600"/>
                                        </div>
                                        <a href={repo.svn_url} rel="noopener noreferrer" target="_blank" className="text-lg font-semibold text-white transition-colors hover:text-orange-400">{repo.name}</a>
                                    </div>
                                    <p className="mb-6 text-sm leading-7 text-zinc-400">{repo.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {repo.topics.map(topic => (
                                            <span key={topic} className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300">
                                                {topic}</span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </motion.div>
        </section>
    )
}