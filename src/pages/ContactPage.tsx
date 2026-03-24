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
    <img src="/images/whatsapp.png" alt="" className={className} width="16" height="16" aria-hidden="true" />
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
                                    <WhatsAppIcon className="h-4 w-4 invert brightness-0" />
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
                                <button onClick={() => handleCTA('/contactAgentA?intent=rent', 'rent_agent1')} className={contactButtonClassPrimary}>
                                    <WhatsAppIcon className="h-4 w-4 invert brightness-0" />
                                    {content.contactChatAgent1}
                                </button>
                                <button onClick={() => handleCTA('/contactAgentB?intent=rent', 'rent_agent2')} className={contactButtonClassPrimary}>
                                    <WhatsAppIcon className="h-4 w-4 invert brightness-0" />
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
                                    <WhatsAppIcon className="h-4 w-4 invert brightness-0" />
                                    {content.contactSpeakCeo}
                                </button>
                                <button onClick={() => handleCTA('/contactAgentA?intent=list', 'list_agent1')} className={contactButtonClassSecondary}>
                                    <WhatsAppIcon className="h-4 w-4 opacity-70" />
                                    {content.contactChatAgent1}
                                </button>
                                <button onClick={() => handleCTA('/contactAgentB?intent=list', 'list_agent2')} className={contactButtonClassSecondary}>
                                    <WhatsAppIcon className="h-4 w-4 opacity-70" />
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
