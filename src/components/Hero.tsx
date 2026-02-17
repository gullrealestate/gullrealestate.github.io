

import { useState, useEffect } from 'react';

export default function Hero() {
    const text1 = "Find Your Dream Property in Pakistan";
    const text2 = "with GULL Real Estate and Builders";
    const [displayText1, setDisplayText1] = useState("");
    const [displayText2, setDisplayText2] = useState("");

    useEffect(() => {
        let i = 0;
        let j = 0;
        let currentText1 = "";
        let currentText2 = "";

        const typeInterval = setInterval(() => {
            if (i < text1.length) {
                currentText1 += text1[i];
                setDisplayText1(currentText1);
                i++;
            } else if (j < text2.length) {
                currentText2 += text2[j];
                setDisplayText2(currentText2);
                j++;
            } else {
                clearInterval(typeInterval);
            }
        }, 30);

        return () => clearInterval(typeInterval);
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
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight min-h-[1.2em] md:min-h-[2.4em]">
                    {displayText1}
                    {displayText1 && displayText2 === "" && <span className="typewriter-cursor"></span>}
                    {displayText1.length === text1.length && <br />}
                    <span className="block mt-2">
                        {displayText2}
                        {displayText2 !== "" && displayText2.length < text2.length && <span className="typewriter-cursor"></span>}
                        {displayText2.length === text2.length && <span className="typewriter-cursor"></span>}
                    </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Trusted platform for buying, selling, and renting properties.
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
