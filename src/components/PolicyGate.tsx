import React from 'react';
import { useTranslation } from '../lib/i18n/useTranslation';
import { usePolicy } from '../context/PolicyContext';
import { ShieldCheck, Info } from 'lucide-react';
import SEO from './SEO';

export default function PolicyGate({ children }: { children: React.ReactNode }) {
    const { hasAcceptedPolicy, acceptPolicy } = usePolicy();
    const { t, isUrdu, lang } = useTranslation();

    if (hasAcceptedPolicy) {
        return <>{children}</>;
    }

    const translations = {
        en: {
            policyHeader: "Agency Policy & Liability",
            agreeBtn: "I Have Carefully Read the Agency Policy",
        },
        ur: {
            policyHeader: "ایجنسی پالیسی اور ذمہ داری",
            agreeBtn: "میں نے ایجنسی کی پالیسی کو غور سے پڑھ لیا ہے",
        }
    };

    const pt = isUrdu ? translations.ur : translations.en;

    const handleAccept = () => {
        acceptPolicy();
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-24 sm:pt-32 pb-12 sm:pb-20" dir={isUrdu ? "rtl" : "ltr"}>
            <SEO
                title={pt.policyHeader}
                description={t.description}
                lang={lang}
                isUrdu={isUrdu}
            />

            <div className="max-w-4xl mx-auto px-4">
                <article className="bg-gruvbox-bg1 border-2 border-gruvbox-blue/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 p-8 opacity-5">
                        <ShieldCheck className="h-32 w-32 text-gruvbox-blue" />
                    </div>

                    <div className="relative z-10">
                        <header className="flex items-center gap-4 mb-8">
                            <div className="bg-gruvbox-blue/20 p-3 rounded-2xl">
                                <Info className="h-8 w-8 text-gruvbox-blue" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gruvbox-fg">
                                {pt.policyHeader}
                            </h2>
                        </header>

                        <div className={`space-y-6 ${isUrdu ? "text-right" : "text-left"}`}>
                            <p className="text-lg text-gruvbox-fg/90 leading-relaxed font-medium">
                                {t.description}
                            </p>

                            <ul className="space-y-4 list-none">
                                {t.items.map((item, index) => (
                                    <li key={index} className="flex gap-4 items-start">
                                        <div className="mt-1.5 h-2 w-2 rounded-full bg-gruvbox-blue flex-shrink-0" />
                                        <div className="text-gruvbox-fg/80 leading-relaxed">
                                            {typeof item === 'string' ? (
                                                item
                                            ) : (
                                                <>
                                                    <strong className="text-gruvbox-fg">{item.label}</strong> {item.content}
                                                </>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-sm text-gruvbox-fg/60 italic pt-4">
                                {t.footer}
                            </p>
                        </div>

                        <footer className="mt-12">
                            <button
                                onClick={handleAccept}
                                className="w-full bg-gruvbox-blue text-gruvbox-bg0 font-extrabold text-lg py-5 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-aqua transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                            >
                                <ShieldCheck className="h-6 w-6" />
                                {pt.agreeBtn}
                            </button>
                        </footer>
                    </div>
                </article>
            </div>
        </div>
    );
}
