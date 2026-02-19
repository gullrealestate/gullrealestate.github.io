
import { useEffect } from 'react';
import { X, Home, Key, Building2, MessageCircle, PhoneCall } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const images = {
    buySell: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000",
    rent: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    list: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-gruvbox-bg0/80 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
            role="presentation"
        >
            <div
                className="bg-gruvbox-bg1 w-full max-w-6xl max-h-[95vh] lg:max-h-none rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gruvbox-bg0/40 hover:bg-gruvbox-bg0/60 transition-colors z-20"
                >
                    <X className="h-6 w-6 text-gruvbox-fg" />
                </button>

                <div className="overflow-y-auto lg:overflow-y-hidden flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Buy/Sell Section */}
                        <div className="relative group overflow-hidden h-[400px] sm:h-[450px] md:h-[650px]">
                            <img
                                src={images.buySell}
                                alt="Buy or Sell a House"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gruvbox-bg0 via-gruvbox-bg0/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                <div className="bg-gruvbox-blue w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                    <Home className="h-6 w-6 text-gruvbox-bg0" />
                                </div>
                                <h3 className="text-2xl font-bold text-gruvbox-fg mb-2">Buy/Sell a House</h3>
                                <p className="text-gruvbox-fg/80 mb-6 text-sm font-medium leading-relaxed">Find your dream home or sell your property at the best market price.</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <a
                                        href="https://wa.me/923149393930"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Speak with CEO
                                    </a>
                                    <a
                                        href="tel:0937861777"
                                        className={contactButtonClass}
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        Call Office
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Rent Section */}
                        <div className="relative group overflow-hidden h-[450px] sm:h-[500px] md:h-[650px] border-t md:border-t-0 md:border-l border-gruvbox-bg2">
                            <img
                                src={images.rent}
                                alt="Rent a House"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gruvbox-bg0 via-gruvbox-bg0/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                <div className="bg-gruvbox-orange w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                    <Key className="h-6 w-6 text-gruvbox-bg0" />
                                </div>
                                <h3 className="text-2xl font-bold text-gruvbox-fg mb-2">Rent a House</h3>
                                <p className="text-gruvbox-fg/80 mb-6 text-sm font-medium leading-relaxed">Explore premium rental properties that fit your lifestyle and budget.</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <a
                                        href="https://wa.me/923142121370"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Chat with Agent 2
                                    </a>
                                    <a
                                        href="https://wa.me/923149624277"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Chat with Agent 1
                                    </a>
                                    <a
                                        href="tel:0937861777"
                                        className={contactButtonClass}
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        Call Office
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="relative group overflow-hidden h-[500px] sm:h-[550px] md:h-[650px] border-t md:border-t-0 md:border-l border-gruvbox-bg2">
                            <img
                                src={images.list}
                                alt="List Your Property"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gruvbox-bg0 via-gruvbox-bg0/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                                <div className="bg-gruvbox-green w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                    <Building2 className="h-6 w-6 text-gruvbox-bg0" />
                                </div>
                                <h3 className="text-2xl font-bold text-gruvbox-fg mb-2">List Your Property</h3>
                                <p className="text-gruvbox-fg/80 mb-6 text-sm font-medium leading-relaxed">Have a house available for rent? Let us help you find the perfect tenants.</p>

                                <div className="grid grid-cols-1 gap-3">
                                    <a
                                        href="https://wa.me/923142121370"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Chat with Agent 2
                                    </a>
                                    <a
                                        href="https://wa.me/923149624277"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Chat with Agent 1
                                    </a>
                                    <a
                                        href="https://wa.me/923149393930"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={contactButtonClass}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Speak with CEO
                                    </a>
                                    <a
                                        href="tel:0937861777"
                                        className={contactButtonClass}
                                    >
                                        <PhoneCall className="h-4 w-4" />
                                        Call Office
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
