import { content } from '../content';

interface HeroProps {
    onConsultClick: () => void;
}

export default function Hero({ onConsultClick }: HeroProps) {
    return (
        <div className="relative w-full h-[640px] sm:h-[700px] flex items-center justify-center overflow-hidden" dir="ltr">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("/images/hero-bg.webp")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-ds-bg"></div>
            </div>

            <div className="absolute bottom-[-10%] left-[-5%] text-[20vw] font-serif italic text-ds-primary opacity-[0.04] z-0 pointer-events-none aria-hidden">
                G
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <span className="ds-anim-fade-in ds-delay-1 block text-ds-primary font-body font-semibold text-xs tracking-[0.3em] uppercase mb-6">
                    Real Estate Agency in Mardan
                </span>
                <h1 className="font-serif italic font-bold text-5xl sm:text-6xl md:text-7xl leading-tight text-ds-on ds-anim-fade-up ds-delay-2">
                    {content.heroTitle}
                </h1>
                <p className="font-body font-light text-lg sm:text-xl text-ds-on-dim max-w-xl mx-auto mt-6 ds-anim-fade-up ds-delay-3">
                    {content.heroSub}
                </p>
                <button
                    onClick={onConsultClick}
                    className="inline-block mt-10 px-10 py-4 bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-xs tracking-[0.2em] hover:opacity-90 transition-opacity ds-anim-fade-up ds-delay-4 rounded-none"
                    aria-label="Contact Us"
                >
                    {content.heroBtn}
                </button>
            </div>
        </div>
    );
}
