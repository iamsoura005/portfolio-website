import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 50, startDelay: number = 0) {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayedText('');
        setIsComplete(false);

        let i = 0;
        let timeoutId: ReturnType<typeof setTimeout>;
        let intervalId: ReturnType<typeof setInterval>;

        const startTyping = () => {
            intervalId = setInterval(() => {
                if (i < text.length) {
                    // Use slice to be idempotent and avoid state dependency issues
                    setDisplayedText(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(intervalId);
                    setIsComplete(true);
                }
            }, speed);
        };

        if (startDelay > 0) {
            timeoutId = setTimeout(startTyping, startDelay);
        } else {
            startTyping();
        }

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, speed, startDelay]);

    return { displayedText, isComplete };
}
