import { useEffect, useState } from "react";

export function useTypewriter(text, speed, enabled) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!enabled) return;
        const interval = setInterval(() => {
            setDisplayText(prev => {
                const next = prev + text[prev.length];

                if (next.length === text.length) {
                    clearInterval(interval);
                    setIsComplete(true);
                }
                return next;
            })
        }, speed)
        return () => clearInterval(interval);
    }, [text,speed,enabled]);

    return {displayText, isComplete}
}