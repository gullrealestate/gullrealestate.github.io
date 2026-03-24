import { Home, Key, Briefcase, BadgeDollarSign, ClipboardCheck, Handshake, MapPin, ChevronDown, MessageSquare, Award, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import Hero from '../components/Hero';
import { content } from '../content';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';
import { setFunnelStage } from '../lib/funnelTracker';

export default function HomePage() {
    const location = useLocation();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        setFunnelStage('landing', { lang: 'en', route: location.pathname });
    }, [location.pathname]);

    const handleConsultClick = () => {
        trackEvent('cta_click', { category: 'conversion', action: 'hero_cta', label: 'contact' });
        setFunnelStage('cta_clicked', { lang: 'en', route: location.pathname });
        window.location.href = '/contact';
    };

    return (
        <main className="flex-grow pt-16 bg-ds-bg text-ds-on font-body">
            <Helmet>
                <html lang="en" />
                <title>{content.metaTitle}</title>
                <meta name="description" content={content.metaDesc} />
            </Helmet>

            <Hero onConsultClick={handleConsultClick} />

            {/* Trust Bar Section */}
            <section className="bg-ds-surface border-y border-ds-border py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        <div className="flex items-center justify-center space-x-5 md:justify-start group">
                            <div className="bg-ds-primary-muted p-4 rounded-none transition-transform group-hover:scale-105">
                                <Award className="h-6 w-6 sm:h-7 sm:w-7 text-ds-primary" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-base sm:text-lg font-headline font-bold text-ds-on leading-tight">
                                    {content.trustYears}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-5 md:justify-center group border-t md:border-t-0 md:border-l md:border-r border-ds-border pt-6 md:pt-0">
                            <div className="bg-ds-primary-muted p-4 rounded-none transition-transform group-hover:scale-105">
                                <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-ds-primary" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-base sm:text-lg font-headline font-bold text-ds-on leading-tight">
                                    {content.trustDeals}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-5 md:justify-end group border-t md:border-t-0 border-ds-border pt-6 md:pt-0">
                            <div className="bg-ds-secondary/20 p-4 rounded-none transition-transform group-hover:scale-105">
                                <MapPin className="h-6 w-6 sm:h-7 sm:w-7 text-ds-secondary" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-base sm:text-lg font-headline font-bold text-ds-on leading-tight">
                                    {content.trustHQ}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold text-ds-on mb-6 uppercase tracking-wider">{content.servicesTitle}</h2>
                    <div className="w-24 h-px bg-ds-primary mx-auto"></div>
                    <p className="mt-8 text-xl text-ds-on-dim max-w-3xl mx-auto font-body">
                        {content.servicesSub}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-ds-border bg-ds-surface">
                    <article className="p-10 hover:bg-ds-surface-low transition-colors duration-300 border-b md:border-b-0 md:border-r border-ds-border group">
                        <div className="bg-ds-bg w-16 h-16 rounded-none border border-ds-border flex items-center justify-center mb-8 group-hover:bg-ds-primary transition-colors duration-300">
                            <Home className="h-8 w-8 text-ds-primary group-hover:text-ds-primary-dark transition-colors" />
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-ds-on mb-4">{content.buySellTitle}</h3>
                        <p className="text-ds-on-faint leading-relaxed font-body">
                            {content.buySellDesc}
                        </p>
                    </article>

                    <article className="p-10 hover:bg-ds-surface-low transition-colors duration-300 border-b md:border-b-0 md:border-r border-ds-border group">
                        <div className="bg-ds-bg w-16 h-16 rounded-none border border-ds-border flex items-center justify-center mb-8 group-hover:bg-ds-secondary transition-colors duration-300">
                            <Key className="h-8 w-8 text-ds-secondary group-hover:text-ds-secondary-dark transition-colors" />
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-ds-on mb-4">{content.tenantTitle}</h3>
                        <p className="text-ds-on-faint leading-relaxed font-body">
                            {content.tenantDesc}
                        </p>
                    </article>

                    <article className="p-10 hover:bg-ds-surface-low transition-colors duration-300 group">
                        <div className="bg-ds-bg w-16 h-16 rounded-none border border-ds-border flex items-center justify-center mb-8 group-hover:bg-ds-primary transition-colors duration-300">
                            <Briefcase className="h-8 w-8 text-ds-primary group-hover:text-ds-primary-dark transition-colors" />
                        </div>
                        <h3 className="text-2xl font-headline font-bold text-ds-on mb-4">{content.landlordTitle}</h3>
                        <p className="text-ds-on-faint leading-relaxed font-body">
                            {content.landlordDesc}
                        </p>
                    </article>
                </div>
            </section>

            {/* CEO Message Section */}
            <section className="py-24 bg-ds-surface border-y border-ds-border">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-ds-bg border border-ds-border p-12 sm:p-16 relative">
                        <div className="absolute top-0 left-0 w-2 h-full bg-ds-primary"></div>
                        <MessageSquare className="h-10 w-10 text-ds-primary opacity-50 mb-8" />
                        <h2 className="text-3xl font-headline font-bold text-ds-on mb-8 uppercase tracking-wider text-left">{content.ceoMessageTitle}</h2>
                        <p className="text-2xl text-ds-on font-display italic leading-relaxed text-left">
                            "{content.ceoMessageText}"
                        </p>
                        <div className="mt-10 font-headline font-bold uppercase tracking-widest text-sm text-ds-primary text-left">
                            — {content.ceoSignature}
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-headline font-bold text-ds-on mb-6 uppercase tracking-wider">{content.howItWorksTitle}</h2>
                        <div className="w-24 h-px bg-ds-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-[44px] left-[16.66%] right-[16.66%] h-px bg-ds-border z-0"></div>

                        <article className="p-8 text-center relative z-10">
                            <div className="bg-ds-surface w-24 h-24 border border-ds-border flex items-center justify-center mx-auto mb-8 relative">
                                <span className="absolute -top-3 -left-3 bg-ds-primary text-ds-primary-dark font-headline font-bold text-xs h-6 w-6 flex items-center justify-center">01</span>
                                <ClipboardCheck className="h-8 w-8 text-ds-primary" />
                            </div>
                            <h3 className="text-xl font-headline font-bold mb-4 text-ds-on uppercase tracking-wider">{content.step1}</h3>
                            <p className="text-ds-on-faint leading-relaxed font-body">
                                {content.step1Desc}
                            </p>
                        </article>

                        <article className="p-8 text-center relative z-10">
                            <div className="bg-ds-surface w-24 h-24 border border-ds-border flex items-center justify-center mx-auto mb-8 relative">
                                <span className="absolute -top-3 -left-3 bg-ds-secondary text-ds-secondary-dark font-headline font-bold text-xs h-6 w-6 flex items-center justify-center">02</span>
                                <Handshake className="h-8 w-8 text-ds-secondary" />
                            </div>
                            <h3 className="text-xl font-headline font-bold mb-4 text-ds-on uppercase tracking-wider">{content.step2}</h3>
                            <p className="text-ds-on-faint leading-relaxed font-body">
                                {content.step2Desc}
                            </p>
                        </article>

                        <article className="p-8 text-center relative z-10">
                            <div className="bg-ds-surface w-24 h-24 border border-ds-border flex items-center justify-center mx-auto mb-8 relative">
                                <span className="absolute -top-3 -left-3 bg-ds-primary text-ds-primary-dark font-headline font-bold text-xs h-6 w-6 flex items-center justify-center">03</span>
                                <BadgeDollarSign className="h-8 w-8 text-ds-primary" />
                            </div>
                            <h3 className="text-xl font-headline font-bold mb-4 text-ds-on uppercase tracking-wider">{content.step3}</h3>
                            <p className="text-ds-on-faint leading-relaxed font-body">
                                {content.step3Desc}
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Service Area Section */}
            <section className="bg-ds-surface border-y border-ds-border py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-headline font-bold text-ds-on mb-6 uppercase tracking-wider">{content.serviceAreaTitle}</h2>
                        <div className="w-16 h-px bg-ds-secondary mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-ds-border max-w-4xl mx-auto bg-ds-bg">
                        <div className="p-8 border-b md:border-b-0 md:border-r border-ds-border flex items-center gap-6 hover:bg-ds-surface-low transition-colors">
                            <div className="bg-ds-primary-muted border border-ds-primary/20 p-4">
                                <MapPin className="text-ds-primary h-6 w-6" />
                            </div>
                            <div className="text-xl font-headline font-bold text-ds-on">{content.serviceAreaMain}</div>
                        </div>
                        <div className="p-8 flex items-center gap-6 hover:bg-ds-surface-low transition-colors">
                            <div className="bg-ds-secondary/10 border border-ds-secondary/20 p-4">
                                <MapPin className="text-ds-secondary h-6 w-6" />
                            </div>
                            <div className="text-xl font-headline font-bold text-ds-on">{content.serviceAreaKPK}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-ds-bg">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-headline font-bold text-ds-on mb-16 text-center uppercase tracking-wider">{content.faqTitle}</h2>
                    <div className="space-y-0 border border-ds-border bg-ds-surface">
                        {content.faqs.map((faq, index) => (
                            <div key={index} className="border-b border-ds-border last:border-b-0 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none hover:bg-ds-surface-low transition-colors"
                                    dir="ltr"
                                >
                                    <span className="text-lg font-headline font-bold text-ds-on">{faq.q}</span>
                                    <ChevronDown className={`h-5 w-5 text-ds-primary transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 sm:px-8 pb-8 text-ds-on-faint leading-relaxed font-body animate-[ds-fade-in_0.3s_ease-out]">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Geographic SEO Sections (Hidden from visible UI) */}
            <div id="locations" className="hidden" aria-hidden="true">
                {content.citySections.map((city) => (
                    <div key={city.id} id={city.id}>
                        <h2>{city.title}</h2>
                        <p>{city.content}</p>
                    </div>
                ))}
            </div>

            <section id="fees" className="py-24 bg-ds-surface border-t border-ds-border">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-ds-bg border border-ds-border p-8 sm:p-12 md:p-16 relative">
                        <div className="text-left" dir="ltr">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-ds-on mb-6 sm:mb-8 text-center uppercase tracking-wider">
                                {content.title}
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg text-ds-on-dim text-center max-w-3xl mx-auto leading-relaxed mb-10 font-body">
                                {content.description}
                            </p>

                            <ul className="text-sm sm:text-base md:text-lg text-ds-on max-w-3xl mx-auto list-disc list-outside pl-5 pr-5 sm:pl-6 sm:pr-6 space-y-4 font-body">
                                {content.items.map((item, index) => (
                                    <li key={index} className="marker:text-ds-primary">
                                        {typeof item === 'string' ? (
                                            item
                                        ) : (
                                            <>
                                                <strong className="font-bold text-ds-on">{item.label}</strong> <span className="text-ds-on-dim">{item.content}</span>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-ds-border">
                                <p className="text-xs sm:text-sm text-ds-on-faint text-center leading-relaxed font-body uppercase tracking-wider">
                                    {content.footer}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-cta" className="py-24 bg-ds-surface relative overflow-hidden border-t border-ds-border">
                <div className="absolute inset-0 bg-ds-primary opacity-[0.03]"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-ds-primary/10 blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-ds-secondary/10 blur-[100px]"></div>
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold text-ds-on mb-8 uppercase tracking-wider">{content.contactCta}</h2>
                    <p className="text-ds-on-dim text-xl sm:text-2xl max-w-2xl mx-auto mb-12 font-display italic">
                        {content.contactSub}
                    </p>
                    <button
                        onClick={handleConsultClick}
                        className="inline-block bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase tracking-[0.2em] text-sm px-12 py-5 rounded-none hover:bg-ds-primary/90 transition-colors transform active:scale-[0.98]"
                    >
                        {content.contactBtn}
                    </button>
                </div>
            </section>
        </main>
    );
}
