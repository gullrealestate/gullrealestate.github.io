

import { useState, useEffect } from 'react';

export default function Hero() {
    const text1 = "Find Your Dream Property in Pakistan";
    const text2 = "with GULL Real Estate and Builders.";
    const text3 = "Trusted platform for buying, selling, and renting properties.";
    const [displayText1, setDisplayText1] = useState("");
    const [displayText2, setDisplayText2] = useState("");
    const [displayText3, setDisplayText3] = useState("");

    useEffect(() => {
        let i = 0;
        let j = 0;
        let k = 0;
        let timeoutId: number;

        const type = () => {
            if (i < text1.length) {
                setDisplayText1(text1.substring(0, i + 1));
                i++;
                timeoutId = window.setTimeout(type, 30);
            } else if (j < text2.length) {
                if (j === text2.length - 1) {
                    timeoutId = window.setTimeout(() => {
                        setDisplayText2(text2.substring(0, j + 1));
                        j++;
                        type();
                    }, 1000);
                } else {
                    setDisplayText2(text2.substring(0, j + 1));
                    j++;
                    timeoutId = window.setTimeout(type, 30);
                }
            } else if (k < text3.length) {
                setDisplayText3(text3.substring(0, k + 1));
                k++;
                timeoutId = window.setTimeout(type, 15);
            }
        };

        timeoutId = window.setTimeout(type, 30);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="relative h-[600px] flex items-center justify-center text-white">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("/images/hero-bg.jpg")',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight min-h-[3em] flex flex-col items-center">
                    <span>
                        {displayText1}
                        {displayText1.length > 0 && displayText1.length < text1.length && (
                            <span className="typewriter-cursor">&nbsp;</span>
                        )}
                    </span>
                    {displayText1.length === text1.length && (
                        <span className="block mt-2 relative">
                            {displayText2.substring(0, text2.length - 1)}
                            {displayText2.length === text2.length && (
                                <span style={{ marginLeft: '2mm' }}>.</span>
                            )}
                            {displayText2.length < text2.length && (
                                <span className="typewriter-cursor">&nbsp;</span>
                            )}
                        </span>
                    )}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 min-h-[1.5em]">
                    {displayText3}
                    {displayText2.length === text2.length && displayText3.length < text3.length && (
                        <span className="typewriter-cursor">&nbsp;</span>
                    )}
                </p>
                <button
                    onClick={() => {
                        document.getElementById('contact-cta')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-gruvbox-blue text-gruvbox-bg0 font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-gruvbox-orange transition-all transform hover:-translate-y-1"
                >
                    Consult Our Experts
                </button>
            </div>
        </div>
    );
}
