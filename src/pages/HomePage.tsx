import { Home, Key, Briefcase, BadgeDollarSign, ClipboardCheck, Handshake } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { useTranslation } from '../lib/i18n/useTranslation';

export default function HomePage() {
    const { t, isUrdu, lang } = useTranslation();

    return (
        <main className="flex-grow pt-16">
            <Helmet>
                <html lang={isUrdu ? "ur" : "en"} />
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
            </Helmet>

            <Hero
                onConsultClick={() => {
                    const contactSection = document.getElementById('contact-cta');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                isUrdu={isUrdu}
                translations={{
                    heroTitle: t.heroTitle,
                    heroSub: t.heroSub,
                    heroBtn: t.heroBtn
                }}
            />

            <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">{t.servicesTitle}</h2>
                    <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                    <p className="mt-4 text-xl text-gruvbox-fg/80 max-w-3xl mx-auto">
                        {t.servicesSub}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                        <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Home className="h-8 w-8 text-gruvbox-blue" />
                        </div>
                        <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">{t.buySellTitle}</h3>
                        <p className="text-gruvbox-fg/70 leading-relaxed">
                            {t.buySellDesc}
                        </p>
                    </article>

                    <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                        <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Key className="h-8 w-8 text-gruvbox-orange" />
                        </div>
                        <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">{t.tenantTitle}</h3>
                        <p className="text-gruvbox-fg/70 leading-relaxed">
                            {t.tenantDesc}
                        </p>
                    </article>

                    <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                        <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="h-8 w-8 text-gruvbox-green" />
                        </div>
                        <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">{t.landlordTitle}</h3>
                        <p className="text-gruvbox-fg/70 leading-relaxed">
                            {t.landlordDesc}
                        </p>
                    </article>
                </div>
            </section>

            <section id="how-it-works" className="bg-gruvbox-bg1/50 py-20 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">{t.howItWorksTitle}</h2>
                        <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                            <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                <ClipboardCheck className="h-7 w-7 text-gruvbox-blue" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">{t.step1}</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                {t.step1Desc}
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                            <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                <Handshake className="h-7 w-7 text-gruvbox-orange" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">{t.step2}</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                {t.step2Desc}
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                            <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                <BadgeDollarSign className="h-7 w-7 text-gruvbox-green" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">{t.step3}</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                {t.step3Desc}
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Geographic SEO Sections (Hidden from visible UI to avoid false claims) */}
            <div id="locations" className="hidden" aria-hidden="true">
                {t.citySections.map((city) => (
                    <div key={city.id} id={city.id}>
                        <h2>{city.title}</h2>
                        <p>{city.content}</p>
                    </div>
                ))}
            </div>

            <section id="fees" className="py-14 sm:py-16 md:py-20">
                <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative">
                        <div className={isUrdu ? "text-right" : "text-left"} dir={isUrdu ? "rtl" : "ltr"}>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4 sm:mb-6 text-center">
                                {t.title}
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg text-gruvbox-fg/80 text-center max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
                                {t.description}
                            </p>

                            <ul className="text-sm sm:text-base md:text-lg text-gruvbox-fg/80 max-w-3xl mx-auto list-disc list-outside pl-5 pr-5 sm:pl-6 sm:pr-6 space-y-3 sm:space-y-4">
                                {t.items.map((item, index) => (
                                    <li key={index}>
                                        {typeof item === 'string' ? (
                                            item
                                        ) : (
                                            <>
                                                <strong>{item.label}</strong> {item.content}
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xs sm:text-sm text-gruvbox-fg/60 max-w-3xl mx-auto mt-8 text-center leading-relaxed">
                                {t.footer}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-cta" className="py-20 bg-gruvbox-blue transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-bg0 mb-6">{t.contactCta}</h2>
                    <p className="text-gruvbox-bg0/90 text-xl max-w-3xl mx-auto mb-10 font-medium">
                        {t.contactSub}
                    </p>
                    <Link
                        to={`/${lang}/contact`}
                        className="inline-block bg-gruvbox-bg0 text-gruvbox-fg font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-gruvbox-bg1 transition-colors transform hover:-translate-y-1"
                    >
                        {t.contactBtn}
                    </Link>
                </div>
            </section>
        </main>
    );
}

