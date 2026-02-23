import { useEffect } from 'react';
import { Home, Key, Building2, MessageCircle, PhoneCall, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface ContactPageProps {
    isUrdu?: boolean;
}

const images = {
    buySell: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    rent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    list: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
};

export default function ContactPage({ isUrdu }: ContactPageProps) {
    const translations = {
        en: {
            title: "Contact Our Agency",
            backHome: "Back to Home",
            buySellTitle: "Buy/Sell Consultation",
            buySellDesc: "Get buy/sell consultation from our CEO with practical guidance on pricing, negotiation, and next steps.",
            rentTitle: "Rent a Property",
            rentDesc: "Consult our agents for rental support and get help shortlisting homes that match your needs and budget.",
            listTitle: "List Your Property",
            listDesc: "Have a vacant property for rent? Consult us to list it through our network and connect with suitable tenants.",
            speakCeo: "Speak with CEO",
            chatAgent1: "Chat with Agent 1",
            chatAgent2: "Chat with Agent 2",
            callOffice: "Call Office",
            metaTitle: "Contact Us - Gull Real Estate and Builders",
            metaDesc: "Get in touch with Gull Real Estate and Builders for property consultation in Mardan and KPK."
        },
        ur: {
            title: "ہماری ایجنسی سے رابطہ کریں",
            backHome: "ہوم پیج پر واپس جائیں",
            buySellTitle: "خرید و فروخت کا مشورہ",
            buySellDesc: "ہمارے سی ای او سے قیمتوں، مذاکرات اور اگلے مراحل کے بارے میں عملی رہنمائی حاصل کریں۔",
            rentTitle: "پراپرٹی کرایہ پر لیں",
            rentDesc: "کرایے کی مدد کے لیے ہمارے ایجنٹوں سے رابطہ کریں اور اپنی ضرورت کے مطابق گھر تلاش کرنے میں مدد لیں۔",
            listTitle: "اپنی پراپرٹی لسٹ کریں",
            listDesc: "کرایے کے لیے پراپرٹی موجود ہے؟ اسے ہمارے نیٹ ورک پر لسٹ کرنے کے لیے ہم سے رابطہ کریں۔",
            speakCeo: "سی ای او سے بات کریں",
            chatAgent1: "ایجنٹ 1 سے بات کریں",
            chatAgent2: "ایجنٹ 2 سے بات کریں",
            callOffice: "آفس کال کریں",
            metaTitle: "رابطہ کریں - گل رئیل اسٹیٹ اینڈ بلڈرز",
            metaDesc: "مردان اور کے پی کے میں پراپرٹی کے مشورے کے لیے گل رئیل اسٹیٹ اینڈ بلڈرز سے رابطہ کریں۔"
        }
    };

    const t = isUrdu ? translations.ur : translations.en;

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
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gruvbox-fg">{t.title}</h1>
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors font-medium whitespace-nowrap"
                    >
                        {isUrdu ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
                        {t.backHome}
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Buy/Sell Section */}
                    <div className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-blue/30 transition-colors">
                        <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                            <img src={images.buySell} alt={t.buySellTitle} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6 sm:p-8 flex-grow flex flex-col">
                            <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <Home className="h-6 w-6 text-gruvbox-blue" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{t.buySellTitle}</h2>
                            <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{t.buySellDesc}</p>
                            <div className="space-y-3 mt-auto">
                                <a href="https://wa.me/923149393930" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                    <MessageCircle className="h-4 w-4" />
                                    {t.speakCeo}
                                </a>
                                <a href="tel:0937861777" className={contactButtonClass}>
                                    <PhoneCall className="h-4 w-4" />
                                    {t.callOffice}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Rent Section */}
                    <div className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-orange/30 transition-colors">
                        <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                            <img src={images.rent} alt={t.rentTitle} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6 sm:p-8 flex-grow flex flex-col">
                            <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <Key className="h-6 w-6 text-gruvbox-orange" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{t.rentTitle}</h2>
                            <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{t.rentDesc}</p>
                            <div className="space-y-3 mt-auto">
                                <a href="https://wa.me/923149624277" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                    <MessageCircle className="h-4 w-4" />
                                    {t.chatAgent1}
                                </a>
                                <a href="https://wa.me/923142121370" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                    <MessageCircle className="h-4 w-4" />
                                    {t.chatAgent2}
                                </a>
                                <a href="tel:0937861777" className={contactButtonClass}>
                                    <PhoneCall className="h-4 w-4" />
                                    {t.callOffice}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="bg-gruvbox-bg1 rounded-[2rem] overflow-hidden shadow-xl border border-gruvbox-bg2 flex flex-col hover:border-gruvbox-green/30 transition-colors md:col-span-2 lg:col-span-1">
                        <div className="h-40 sm:h-48 lg:h-56 relative overflow-hidden">
                            <img src={images.list} alt={t.listTitle} className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                        <div className="p-6 sm:p-8 flex-grow flex flex-col">
                            <div className="bg-gruvbox-bg2 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                <Building2 className="h-6 w-6 text-gruvbox-green" />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gruvbox-fg mb-3">{t.listTitle}</h2>
                            <p className="text-gruvbox-fg/70 mb-8 text-sm sm:text-base leading-relaxed flex-grow">{t.listDesc}</p>
                            <div className="space-y-3 mt-auto">
                                <a href="https://wa.me/923149393930" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                    <MessageCircle className="h-4 w-4" />
                                    {t.speakCeo}
                                </a>
                                <div className="grid grid-cols-2 gap-3">
                                    <a href="https://wa.me/923149624277" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <MessageCircle className="h-4 w-4" />
                                        {isUrdu ? "ایجنٹ 1" : "Agent 1"}
                                    </a>
                                    <a href="https://wa.me/923142121370" target="_blank" rel="noopener noreferrer" className={contactButtonClass}>
                                        <MessageCircle className="h-4 w-4" />
                                        {isUrdu ? "ایجنٹ 2" : "Agent 2"}
                                    </a>
                                </div>
                                <a href="tel:0937861777" className={contactButtonClass}>
                                    <PhoneCall className="h-4 w-4" />
                                    {t.callOffice}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
