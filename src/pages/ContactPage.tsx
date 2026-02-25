import { useEffect, useState } from 'react';
import { Home, Key, Building2, ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface PolicyItem {
    label: string;
    content: string;
}

interface ContactPageProps {
    isUrdu?: boolean;
    t: {
        title: string;
        description: string;
        items: (string | PolicyItem)[];
        footer: string;
        metaTitle: string;
        metaDesc: string;
    };
}

const images = {
    buySell: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    rent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    list: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <img
        src="/images/whatsapp.png"
        alt="WhatsApp"
        className={className}
        width="16"
        height="16"
    />
);

const CallIcon = ({ className }: { className?: string }) => (
    <img
        src="/images/call.png"
        alt="Call"
        className={className}
        width="16"
        height="16"
    />
);

export default function ContactPage({ isUrdu, t }: ContactPageProps) {
    const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

    const translations = {
        en: {
            pageTitle: "Contact Our Agency",
            backHome: "Back to Home",
            buySellTitle: "Buy / Sell",
            buySellDesc: "Get buy/sell consultation from our CEO with practical guidance on pricing, negotiation, and next steps.",
            rentTitle: "Rent a Property",
            rentDesc: "Consult our agents for rental support and get help shortlisting homes that match your needs and budget.",
            listTitle: "List Your Property",
            listDesc: "Have a vacant property for rent? Consult us to list it through our network and connect with suitable tenants.",
            speakCeo: "Speak with CEO",
            chatAgent1: "Chat with Agent 1",
            chatAgent2: "Chat with Agent 2",
            callOffice: "Call Office",
            agreeBtn: "I Have Carefully Read the Agency Policy",
            policyHeader: "Agency Fee & Liability Policy"
        },
        ur: {
            pageTitle: "ابھی رابطہ کریں",
            backHome: "واپس جائیں",
            buySellTitle: "خرید و فروخت",
            buySellDesc: "سی ای او خود آپ کے ساتھ ہیں۔ بہترین قیمت اور صحیح وقت پر ڈیل کریں۔",
            rentTitle: "کرایے پر لیں",
            rentDesc: "مناسب گھر ڈھونڈنا مشکل ہے۔ ہمارے ایجنٹ آپ کی پسند اور بجٹ کے مطابق آپشن لائیں گے۔",
            listTitle: "پراپرٹی لسٹ کریں",
            listDesc: "خالی پراپرٹی سے کمائیں۔ ہمارے نیٹ ورک سے صحیح کرایہ دار جلدی ملتا ہے۔",
            speakCeo: "سی ای او سے بات کریں",
            chatAgent1: "ایجنٹ ۱ سے بات کریں",
            chatAgent2: "ایجنٹ ۲ سے بات کریں",
            callOffice: "آفس کال کریں",
            agreeBtn: "میں نے ایجنسی کی پالیسی کو غور سے پڑھ لیا ہے",
            policyHeader: "ایجنسی فیس اور ذمہ داری کی پالیسی"
        }
    };

    const contactT = isUrdu ? translations.ur : translations.en;

    useEffect(() => {
        Object.values(images).forEach((src) => {
            const img = new Image();
            img.src = src;
        });
        window.scrollTo(0, 0);
    }, []);

    const contactButtonClass = "flex items-center justify-center gap-2 bg-gruvbox-fg text-gruvbox-bg0 font-bold py-3 px-6 rounded-xl hover:bg-gruvbox-blue hover:text-gruvbox-bg0 transition-all text-sm shadow-md transform active:scale-95 w-full";

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-24 sm:pt-32 pb-12 sm:pb-20" dir={isUrdu ? "rtl" : "ltr"}>
            <Helmet>
                <title>{t.metaTitle}</title>
                <meta name="description" content={t.metaDesc} />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gruvbox-fg">{contactT.pageTitle}</h1>
                    <Link
                        to={isUrdu ? "/ur" : "/en"}
                        className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors font-medium whitespace-nowrap"
                    >
                        {isUrdu ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
                        {contactT.backHome}
                    </Link>
                </div>

                {!hasAcceptedPolicy ? (
                    <div className="max-w-4xl mx-auto">
                        <article className="bg-gruvbox-bg1 border-2 border-gruvbox-blue/30 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <ShieldCheck className="h-32 w-32 text-gruvbox-blue" />
                            </div>

                            <div className="relative z-10">
                                <header className="flex items-center gap-4 mb-8">
                                    <div className="bg-gruvbox-blue/20 p-3 rounded-2xl">
                                        <Info className="h-8 w-8 text-gruvbox-blue" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gruvbox-fg">
                                        {contactT.policyHeader}
                                    </h2>
                                </header>

                                <div className={`space-y-6 ${isUrdu ? "text-right" : "text-left"}`}>
                                    <p className="text-lg text-gruvbox-fg/90 leading-relaxed font-medium">
                                        {t.description}
                                    </p>

                                    <ul className="space-y-4 list-none">
                                        {t.items.map((item: any, index: number) => (
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
                                        onClick={() => {
                                            setHasAcceptedPolicy(true);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="w-full bg-gruvbox-blue text-gruvbox-bg0 font-extrabold text-lg py-5 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-aqua transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <ShieldCheck className="h-6 w-6" />
                                        {contactT.agreeBtn}
                                    </button>
                                </footer>
                            </div>
                        </article>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Buy/Sell Section */}
                        <div className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-blue/30 transition-colors">
                            <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                                <img src={images.buySell} alt={contactT.buySellTitle} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                            <div className="p-6 sm:p-8 flex-grow flex flex-col">
                                <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <Home className="h-6 w-6 text-gruvbox-blue" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{contactT.buySellTitle}</h2>
                                <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{contactT.buySellDesc}</p>
                                <div className="space-y-3 mt-auto">
                                    <a href="https://wa.me/923149393930" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {contactT.speakCeo}
                                    </a>
                                    <a href="tel:0937861777" className={contactButtonClass}>
                                        <CallIcon className="h-4 w-4" />
                                        {contactT.callOffice}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Rent Section */}
                        <div className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-orange/30 transition-colors">
                            <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                                <img src={images.rent} alt={contactT.rentTitle} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                            <div className="p-6 sm:p-8 flex-grow flex flex-col">
                                <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <Key className="h-6 w-6 text-gruvbox-orange" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{contactT.rentTitle}</h2>
                                <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{contactT.rentDesc}</p>
                                <div className="space-y-3 mt-auto">
                                    <a href="https://wa.me/923149624277" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {contactT.chatAgent1}
                                    </a>
                                    <a href="https://wa.me/923142121370" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {contactT.chatAgent2}
                                    </a>
                                    <a href="tel:0937861777" className={contactButtonClass}>
                                        <CallIcon className="h-4 w-4" />
                                        {contactT.callOffice}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-green/30 transition-colors md:col-span-2 lg:col-span-1">
                            <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                                <img src={images.list} alt={contactT.listTitle} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>
                            <div className="p-6 sm:p-8 flex-grow flex flex-col">
                                <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <Building2 className="h-6 w-6 text-gruvbox-green" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{contactT.listTitle}</h2>
                                <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{contactT.listDesc}</p>
                                <div className="space-y-3 mt-auto">
                                    <a href="https://wa.me/923149393930" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {contactT.speakCeo}
                                    </a>
                                    <a href="https://wa.me/923149624277" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {contactT.chatAgent1}
                                    </a>
                                    <a href="https://wa.me/923142121370" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <WhatsAppIcon className="h-4 w-4" />
                                        {contactT.chatAgent2}
                                    </a>
                                    <a href="tel:0937861777" className={contactButtonClass}>
                                        <CallIcon className="h-4 w-4" />
                                        {contactT.callOffice}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
