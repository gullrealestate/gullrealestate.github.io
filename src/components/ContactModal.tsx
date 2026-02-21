
import { useEffect } from 'react';
import { X, Home, Key, Building2, MessageCircle, PhoneCall } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    isUrdu?: boolean;
}

const images = {
    buySell: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    rent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    list: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
};

export default function ContactModal({ isOpen, onClose, isUrdu }: ContactModalProps) {
    const translations = {
        en: {
            buySellTitle: "Buy/Sell Consultation",
            buySellDesc: "Get buy/sell consultation from our CEO with practical guidance on pricing, negotiation, and next steps.",
            rentTitle: "Rent a Property",
            rentDesc: "Consult our agents for rental support and get help shortlisting homes that match your needs and budget.",
            listTitle: "List Your Property",
            listDesc: "Have a vacant property for rent? Consult us to list it through our network and connect with suitable tenants.",
            speakCeo: "Speak with CEO",
            chatAgent1: "Chat with Agent 1",
            chatAgent2: "Chat with Agent 2",
            callOffice: "Call Office"
        },
        ur: {
            buySellTitle: "خرید و فروخت کا مشورہ",
            buySellDesc: "ہمارے سی ای او سے قیمتوں، مذاکرات اور اگلے مراحل کے بارے میں عملی رہنمائی حاصل کریں۔",
            rentTitle: "پراپرٹی کرایہ پر لیں",
            rentDesc: "کرایے کی مدد کے لیے ہمارے ایجنٹوں سے رابطہ کریں اور اپنی ضرورت کے مطابق گھر تلاش کرنے میں مدد لیں۔",
            listTitle: "اپنی پراپرٹی لسٹ کریں",
            listDesc: "کرایے کے لیے پراپرٹی موجود ہے؟ اسے ہمارے نیٹ ورک پر لسٹ کرنے کے لیے ہم سے رابطہ کریں۔",
            speakCeo: "سی ای او سے بات کریں",
            chatAgent1: "ایجنٹ 1 سے بات کریں",
            chatAgent2: "ایجنٹ 2 سے بات کریں",
            callOffice: "آفس کال کریں"
        }
    };

    const t = isUrdu ? translations.ur : translations.en;

    useEffect(() => {
        const preloadImages = () => {
            Object.values(images).forEach((src) => {
                const img = new Image();
                img.src = src;
            });
        };
        preloadImages();
    }, []);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const contactButtonClass = "flex items-center justify-center gap-2 bg-gruvbox-fg text-gruvbox-bg0 font-bold py-2.5 px-4 rounded-xl hover:bg-gruvbox-blue hover:text-gruvbox-bg0 transition-all text-sm shadow-md transform active:scale-95";

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-gruvbox-bg0/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="bg-gruvbox-bg1 w-full max-w-6xl max-h-[90vh] lg:max-h-none rounded-[2rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col"
                onClick={(event) => event.stopPropagation()}
                dir={isUrdu ? "rtl" : "ltr"}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-4 ${isUrdu ? 'left-4' : 'right-4'} p-2 rounded-full bg-gruvbox-bg0/40 hover:bg-gruvbox-bg0/60 transition-colors z-20`}
                >
                    <X className="h-6 w-6 text-gruvbox-fg" />
                </button>

                <div className="overflow-y-auto lg:overflow-y-hidden flex-grow no-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Buy/Sell Section */}
                        <div className="relative group overflow-hidden h-[400px] sm:h-[450px] md:h-[650px]">
                            <img
                                src={images.buySell}
                                alt={t.buySellTitle}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gruvbox-bg0 via-gruvbox-bg0/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                <div className="bg-gruvbox-blue w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                    <Home className="h-6 w-6 text-gruvbox-bg0" />
                                </div>
                                <h3 className="text-2xl font-bold text-gruvbox-fg mb-2">{t.buySellTitle}</h3>
                                <p className="text-gruvbox-fg/80 mb-6 text-sm font-medium leading-relaxed">{t.buySellDesc}</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <a
                                        href="https://wa.me/923149393930"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        {t.speakCeo}
                                    </a>
                                    <a
                                        href="tel:0937861777"
                                        className={contactButtonClass}
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        {t.callOffice}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Rent Section */}
                        <div className="relative group overflow-hidden h-[450px] sm:h-[500px] md:h-[650px] border-t md:border-t-0 md:border-l border-gruvbox-bg2">
                            <img
                                src={images.rent}
                                alt={t.rentTitle}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gruvbox-bg0 via-gruvbox-bg0/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                <div className="bg-gruvbox-orange w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                    <Key className="h-6 w-6 text-gruvbox-bg0" />
                                </div>
                                <h3 className="text-2xl font-bold text-gruvbox-fg mb-2">{t.rentTitle}</h3>
                                <p className="text-gruvbox-fg/80 mb-6 text-sm font-medium leading-relaxed">{t.rentDesc}</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <a
                                        href="https://wa.me/923149624277"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        {t.chatAgent1}
                                    </a>
                                    <a
                                        href="https://wa.me/923142121370"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        {t.chatAgent2}
                                    </a>
                                    <a
                                        href="tel:0937861777"
                                        className={contactButtonClass}
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        {t.callOffice}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="relative group overflow-hidden h-[500px] sm:h-[550px] md:h-[650px] border-t md:border-t-0 md:border-l border-gruvbox-bg2">
                            <img
                                src={images.list}
                                alt={t.listTitle}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gruvbox-bg0 via-gruvbox-bg0/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                <div className="bg-gruvbox-green w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                    <Building2 className="h-6 w-6 text-gruvbox-bg0" />
                                </div>
                                <h3 className="text-2xl font-bold text-gruvbox-fg mb-2">{t.listTitle}</h3>
                                <p className="text-gruvbox-fg/80 mb-6 text-sm font-medium leading-relaxed">{t.listDesc}</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <a
                                        href="https://wa.me/923149393930"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        {t.speakCeo}
                                    </a>
                                    <a
                                        href="https://wa.me/923149624277"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        {t.chatAgent1}
                                    </a>
                                    <a
                                        href="https://wa.me/923142121370"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        {t.chatAgent2}
                                    </a>
                                    <a
                                        href="tel:0937861777"
                                        className={contactButtonClass}
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        {t.callOffice}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
