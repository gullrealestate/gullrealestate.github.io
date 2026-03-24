import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
    const [scrollPct, setScrollPct] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className="fixed top-0 w-full ds-glass-nav z-50 border-b border-ds-border/[0.06] transition-colors duration-300 pointer-events-auto" dir="ltr" role="banner">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex justify-between items-center h-[68px]">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        aria-label="GULL Real Estate Home">
                        <img
                            src="/images/logo.webp"
                            alt="GULL Real Estate and Builders Mardan"
                            className="h-10 w-auto"
                            width="40"
                            height="40"
                            fetchPriority="high"
                            decoding="sync"
                        />
                        <span className="font-headline font-extrabold tracking-tight text-ds-on text-lg uppercase hidden sm:inline">
                            GULL Real Estate and Builders
                        </span>
                    </Link>

                    <nav className="flex items-center gap-2 sm:gap-4" aria-label="Navigation">
                    </nav>
                </div>
            </div>
            <div style={{ width: `${scrollPct}%` }} className="absolute bottom-0 left-0 h-px bg-ds-primary transition-all duration-75" />
        </header>
    );
}
