
import { useEffect } from 'react';
import { X, Home, Key, Building2 } from 'lucide-react';

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-gruvbox-bg0/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-gruvbox-bg1 w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gruvbox-bg0/40 hover:bg-gruvbox-bg0/60 transition-colors z-20"
                >
                    <X className="h-6 w-6 text-gruvbox-fg" />
                </button>

                <div className="overflow-y-auto flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Buy/Sell Section */}
                        <div className="relative group overflow-hidden h-[300px] sm:h-[400px] md:h-[600px]">
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
                                <a
                                    href="https://wa.me/923000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gruvbox-fg text-gruvbox-bg0 font-bold py-3 px-6 rounded-xl hover:bg-gruvbox-blue hover:text-gruvbox-bg0 transition-all text-center shadow-lg transform active:scale-95"
                                >
                                    Contact Now
                                </a>
                            </div>
                        </div>

                        {/* Rent Section */}
                        <div className="relative group overflow-hidden h-[300px] sm:h-[400px] md:h-[600px] border-t md:border-t-0 md:border-l border-gruvbox-bg2">
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
                                <a
                                    href="https://wa.me/923000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gruvbox-fg text-gruvbox-bg0 font-bold py-3 px-6 rounded-xl hover:bg-gruvbox-orange hover:text-gruvbox-bg0 transition-all text-center shadow-lg transform active:scale-95"
                                >
                                    Contact Now
                                </a>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="relative group overflow-hidden h-[300px] sm:h-[400px] md:h-[600px] border-t md:border-t-0 md:border-l border-gruvbox-bg2">
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
                                <a
                                    href="https://wa.me/923000000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gruvbox-fg text-gruvbox-bg0 font-bold py-3 px-6 rounded-xl hover:bg-gruvbox-green hover:text-gruvbox-bg0 transition-all text-center shadow-lg transform active:scale-95"
                                >
                                    Contact Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
