// No longer using hooks for animation

interface HeroProps {
    onConsultClick: () => void;
    isUrdu?: boolean;
    translations?: {
        heroTitle: string;
        heroSub: string;
        heroBtn: string;
    };
}

export default function Hero({ onConsultClick, isUrdu, translations }: HeroProps) {
    const title = translations?.heroTitle || 'Real Estate Agency in Mardan';
    const subtitle = translations?.heroSub || (isUrdu ? 'سی ای او اور ماہر ایجنٹوں سے بات کریں۔' : 'Speak with CEO & Expert Agents.');

    return (
        <div className="relative h-[600px] flex items-center justify-center text-white" dir={isUrdu ? "rtl" : "ltr"}>
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("/images/hero-bg.jpg")',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    {subtitle}
                </p>
                <button
                    onClick={onConsultClick}
                    className="bg-gruvbox-blue text-gruvbox-bg0 font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-gruvbox-orange transition-all transform hover:-translate-y-1"
                    aria-label={isUrdu ? "مفت مشورہ حاصل کریں" : "Get Free Consultation"}
                >
                    {translations?.heroBtn || 'Contact Us'}
                </button>
            </div>
        </div>
    );
}
