import { useEffect } from 'react';
import { Home, Key, Building2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../lib/i18n/useTranslation';
import { useCallError } from '../context/CallErrorContext';
import { trackEvent, trackFunnel } from '../lib/analytics';

const images = {
    buySell: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    rent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    list: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <img src="/images/whatsapp.png" alt="" className={className} width="16" height="16" aria-hidden="true" />
);

const CallIcon = ({ className }: { className?: string }) => (
    <img src="/images/call.png" alt="" className={className} width="16" height="16" aria-hidden="true" />
);

export default function ContactPage() {
    const { t, isUrdu, lang } = useTranslation();
    const navigate = useNavigate();
    const { showCallError } = useCallError();

    useEffect(() => {
        Object.values(images).forEach((src) => {
            const img = new Image();
            img.src = src;
        });
        window.scrollTo(0, 0);
        trackFunnel('cta');
    }, []);

    const handleCTA = (route: string, label: string) => {
        trackEvent('cta_click', { category: 'conversion', action: 'cta_click', label });
        trackFunnel('form_start');
        navigate(route);
    };

    const contactButtonClass = "flex items-center justify-center gap-2 bg-gruvbox-fg text-gruvbox-bg0 font-bold py-3 px-6 rounded-xl hover:bg-gruvbox-blue hover:text-gruvbox-bg0 transition-all text-sm shadow-md transform active:scale-95 w-full";

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-20" dir={isUrdu ? "rtl" : "ltr"}>
            <SEO title={t.metaTitle} description={t.metaDesc} lang={lang} isUrdu={isUrdu} canonical="/contact" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gruvbox-fg">{t.contactPageTitle}</h1>
                    <div className="flex items-center gap-3">
                        <Link to={`/${lang}`}
                            className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors font-medium whitespace-nowrap">
                            {isUrdu ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
                            {t.contactBackHome}
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Buy/Sell Section */}
                    <article className="bg-gruvbox-bg1 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-blue/30 transition-colors">
                        <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                            <img src={images.buySell} alt={t.contactBuySellTitle} loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6 sm:p-8 flex-grow flex flex-col">
                            <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg" aria-hidden="true">
                                <Home className="h-6 w-6 text-gruvbox-blue" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{t.contactBuySellTitle}</h2>
                            <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{t.contactBuySellDesc}</p>
                            <div className="space-y-3 mt-auto">
                                <button onClick={() => handleCTA(`/${lang}/contactCEO?intent=buy`, 'buy_ceo')} className={contactButtonClass}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.contactSpeakCeo}
                                </button>
                                <button onClick={showCallError} className={contactButtonClass}>
                                    <CallIcon className="h-4 w-4" />
                                    {t.contactCallOffice}
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Rent Section */}
                    <article className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-orange/30 transition-colors">
                        <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                            <img src={images.rent} alt={t.contactRentTitle} loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6 sm:p-8 flex-grow flex flex-col">
                            <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg" aria-hidden="true">
                                <Key className="h-6 w-6 text-gruvbox-orange" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{t.contactRentTitle}</h2>
                            <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{t.contactRentDesc}</p>
                            <div className="space-y-3 mt-auto">
                                <button onClick={() => handleCTA(`/${lang}/contactAgentA?intent=rent`, 'rent_agent1')} className={contactButtonClass}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.contactChatAgent1}
                                </button>
                                <button onClick={() => handleCTA(`/${lang}/contactAgentB?intent=rent`, 'rent_agent2')} className={contactButtonClass}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.contactChatAgent2}
                                </button>
                                <button onClick={showCallError} className={contactButtonClass}>
                                    <CallIcon className="h-4 w-4" />
                                    {t.contactCallOffice}
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* List Section */}
                    <article className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-green/30 transition-colors md:col-span-2 lg:col-span-1">
                        <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                            <img src={images.list} alt={t.contactListTitle} loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6 sm:p-8 flex-grow flex flex-col">
                            <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg" aria-hidden="true">
                                <Building2 className="h-6 w-6 text-gruvbox-green" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{t.contactListTitle}</h2>
                            <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{t.contactListDesc}</p>
                            <div className="space-y-3 mt-auto">
                                <button onClick={() => handleCTA(`/${lang}/contactCEO?intent=sell`, 'sell_ceo')} className={contactButtonClass}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.contactSpeakCeo}
                                </button>
                                <button onClick={() => handleCTA(`/${lang}/contactAgentA?intent=list`, 'list_agent1')} className={contactButtonClass}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.contactChatAgent1}
                                </button>
                                <button onClick={() => handleCTA(`/${lang}/contactAgentB?intent=list`, 'list_agent2')} className={contactButtonClass}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {t.contactChatAgent2}
                                </button>
                                <button onClick={showCallError} className={contactButtonClass}>
                                    <CallIcon className="h-4 w-4" />
                                    {t.contactCallOffice}
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
