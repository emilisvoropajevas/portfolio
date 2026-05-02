import { useState, useEffect, useRef } from "react";
import { MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
    {name : "Home", href : "#home"},
    {name: "About", href: "#about"},
    {name: "Projects", href: "#projects"},
    {name: "Contact", href: "#contact"}
];

export function Navbar() {
    const [activeSection, setActiveSection] = useState("#home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrolYRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            lastScrolYRef.current = currentScrollY;

            const sections = navItems.map((item) => item.href);
            const scrollPosition = currentScrollY + 100;

            for (const section of sections) {
                const element = document.querySelector(section);
                if (element) {
                    const offSetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (
                        scrollPosition >= offSetTop &&
                        scrollPosition < offSetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return (
        <>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <a href="#home" className="font-mono text-sm font-bold tracking-wider text-white">
                <span className="gradient-text">Emilis Voropajevas</span> </a>
            <div className="hidden items-center gap-1 md:flex">
                {navItems.map(item => (
                    <a key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm transition-colors hover:text-zinc-400 text-white">
                    {item.name}</a>
                ))}
            </div>
            <button type="button" aria-label="Toggle Menu" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(prev => !prev)} className="inline-flex md:hidden">
                {isMenuOpen ? <X className="text-white"/> : <MenuIcon className="text-white"/>}
            </button>
        </nav>
        <AnimatePresence>
            {isMenuOpen && <motion.div initial={{height: 0}} animate={{opacity: 1, height: "auto"}} exit={{height: 0}} 
            className="overflow-hidden border-b border-border/50 bg-black md:hidden absolute w-full z-50">
            <div className="flex flex-col gap-1 px-6 py-4">
                {navItems.map(item => (
                    <a key={item.name} href={item.href} className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors">
                    {item.name}</a>
                    ))}
            </div>
                </motion.div>}
        </AnimatePresence>
        </>
    )
}