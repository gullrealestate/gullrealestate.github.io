import { useEffect } from 'react';
import { Home, Key, Building2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { content } from '../content';
import { useCallError } from '../context/CallErrorContext';
import { trackEvent } from '../lib/analytics';
import { setFunnelStage } from '../lib/funnelTracker';

const images = {
    buySell: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    rent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    list: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
);

const CallIcon = ({ className }: { className?: string }) => (
    <img src="/images/call.png" alt="" className={className} width="16" height="16" aria-hidden="true" />
);

export default function ContactPage() {
    const navigate = useNavigate();
    const { showCallError } = useCallError();
    const location = useLocation();

    useEffect(() => {
        Object.values(images).forEach((src) => {
            const img = new Image();
            img.src = src;
        });
        window.scrollTo(0, 0);
        setFunnelStage('cta_clicked', { lang: 'en', route: location.pathname });
    }, [location.pathname]);

    const handleCTA = (route: string, label: string) => {
        trackEvent('cta_click', { category: 'conversion', action: 'cta_click', label });
        navigate(route);
    };

    const contactButtonClassPrimary = "flex items-center justify-center gap-3 bg-ds-primary text-ds-primary-dark font-headline font-bold tracking-widest uppercase py-4 px-6 rounded-none hover:opacity-90 transition-opacity text-[10px] md:text-xs transform active:scale-[0.98] w-full";
    const contactButtonClassSecondary = "flex items-center justify-center gap-3 bg-ds-surface text-ds-on font-headline font-bold tracking-widest uppercase py-4 px-6 border border-ds-border hover:border-ds-border-strong hover:bg-ds-surface-low rounded-none transition-all text-[10px] md:text-xs transform active:scale-[0.98] w-full";
    const contactButtonClassAccent = "flex items-center justify-center gap-3 bg-ds-secondary text-ds-secondary-dark font-headline font-bold tracking-widest uppercase py-4 px-6 rounded-none hover:opacity-90 transition-opacity text-[10px] md:text-xs transform active:scale-[0.98] w-full";

    return (
        <div className="min-h-screen bg-ds-bg pt-20 sm:pt-28 pb-16 sm:pb-24" dir="ltr">
            <SEO title={content.metaTitle} description={content.metaDesc} lang="en" canonical="/contact" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-ds-on uppercase tracking-wider">{content.contactPageTitle}</h1>
                    <div className="flex items-center gap-3">
                        <Link to="/"
                            className="flex items-center gap-2 text-ds-primary hover:text-ds-primary/80 transition-colors font-headline font-bold uppercase text-xs tracking-widest whitespace-nowrap">
                            <ArrowLeft className="h-4 w-4" />
                            {content.contactBackHome}
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-ds-border bg-ds-surface animate-[ds-fade-up_0.5s_ease-out]">
                    {/* Buy/Sell Section */}
                    <article className="border-b lg:border-b-0 lg:border-r border-ds-border flex flex-col group bg-ds-bg hover:bg-ds-surface-low transition-colors duration-500">
                        <div className="h-48 sm:h-56 lg:h-64 relative overflow-hidden border-b border-ds-border">
                            <img src={images.buySell} alt={content.contactBuySellTitle} loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ds-bg to-transparent opacity-80" />
                        </div>
                        <div className="p-8 sm:p-10 flex-grow flex flex-col">
                            <div className="w-14 h-14 bg-ds-surface border border-ds-border flex items-center justify-center mb-8 rounded-none transition-colors group-hover:border-ds-primary/50" aria-hidden="true">
                                <Home className="h-6 w-6 text-ds-primary" />
                            </div>
                            <h2 className="text-2xl font-headline font-bold text-ds-on mb-4 uppercase tracking-wider">{content.contactBuySellTitle}</h2>
                            <p className="text-ds-on-faint mb-10 text-sm sm:text-base leading-relaxed font-body flex-grow">{content.contactBuySellDesc}</p>
                            <div className="space-y-4 auto-mt">
                                <button onClick={() => handleCTA('/contactCEO?intent=buy', 'buy_ceo')} className={contactButtonClassPrimary}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {content.contactSpeakCeo}
                                </button>
                                <button onClick={showCallError} className={contactButtonClassSecondary}>
                                    <CallIcon className="h-4 w-4 opacity-70" />
                                    {content.contactCallOffice}
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Rent Section */}
                    <article className="border-b lg:border-b-0 lg:border-r border-ds-border flex flex-col group bg-ds-bg hover:bg-ds-surface-low transition-colors duration-500">
                        <div className="h-48 sm:h-56 lg:h-64 relative overflow-hidden border-b border-ds-border">
                            <img src={images.rent} alt={content.contactRentTitle} loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ds-bg to-transparent opacity-80" />
                        </div>
                        <div className="p-8 sm:p-10 flex-grow flex flex-col">
                            <div className="w-14 h-14 bg-ds-surface border border-ds-border flex items-center justify-center mb-8 rounded-none transition-colors group-hover:border-ds-secondary/50" aria-hidden="true">
                                <Key className="h-6 w-6 text-ds-secondary" />
                            </div>
                            <h2 className="text-2xl font-headline font-bold text-ds-on mb-4 uppercase tracking-wider">{content.contactRentTitle}</h2>
                            <p className="text-ds-on-faint mb-10 text-sm sm:text-base leading-relaxed font-body flex-grow">{content.contactRentDesc}</p>
                            <div className="space-y-4 auto-mt">
                                <button onClick={() => handleCTA('/contactAgentA?intent=rent', 'rent_agent1')} className={contactButtonClassAccent}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {content.contactChatAgent1}
                                </button>
                                <button onClick={() => handleCTA('/contactAgentB?intent=rent', 'rent_agent2')} className={contactButtonClassAccent}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {content.contactChatAgent2}
                                </button>
                                <button onClick={showCallError} className={contactButtonClassSecondary}>
                                    <CallIcon className="h-4 w-4 opacity-70" />
                                    {content.contactCallOffice}
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* List Section */}
                    <article className="flex flex-col group bg-ds-bg hover:bg-ds-surface-low transition-colors duration-500 md:col-span-2 lg:col-span-1">
                        <div className="h-48 sm:h-56 lg:h-64 relative overflow-hidden border-b border-ds-border">
                            <img src={images.list} alt={content.contactListTitle} loading="lazy"
                                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-ds-bg to-transparent opacity-80" />
                        </div>
                        <div className="p-8 sm:p-10 flex-grow flex flex-col">
                            <div className="w-14 h-14 bg-ds-surface border border-ds-border flex items-center justify-center mb-8 rounded-none transition-colors group-hover:border-ds-primary/50" aria-hidden="true">
                                <Building2 className="h-6 w-6 text-ds-primary" />
                            </div>
                            <h2 className="text-2xl font-headline font-bold text-ds-on mb-4 uppercase tracking-wider">{content.contactListTitle}</h2>
                            <p className="text-ds-on-faint mb-10 text-sm sm:text-base leading-relaxed font-body flex-grow">{content.contactListDesc}</p>
                            <div className="space-y-4 auto-mt">
                                <button onClick={() => handleCTA('/contactCEO?intent=list', 'list_ceo')} className={contactButtonClassPrimary}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {content.contactSpeakCeo}
                                </button>
                                <button onClick={() => handleCTA('/contactAgentA?intent=list', 'list_agent1')} className={contactButtonClassPrimary}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {content.contactChatAgent1}
                                </button>
                                <button onClick={() => handleCTA('/contactAgentB?intent=list', 'list_agent2')} className={contactButtonClassPrimary}>
                                    <WhatsAppIcon className="h-4 w-4" />
                                    {content.contactChatAgent2}
                                </button>
                                <button onClick={showCallError} className={contactButtonClassSecondary}>
                                    <CallIcon className="h-4 w-4 opacity-70" />
                                    {content.contactCallOffice}
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
