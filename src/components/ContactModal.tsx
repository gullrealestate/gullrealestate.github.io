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
        // Pre-load images
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-gray-900 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors z-10"
                >
                    <X className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* Buy/Sell Section */}
                    <div className="relative group overflow-hidden h-[300px] md:h-[600px]">
                        <img
                            src={images.buySell}
                            alt="Buy or Sell a House"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                            <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Buy/Sell a House</h3>
                            <p className="text-gray-200 mb-6 text-sm font-medium leading-relaxed">Find your dream home or sell your property at the best market price.</p>
                            <a
                                href="https://wa.me/923000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors text-center"
                            >
                                Contact Now
                            </a>
                        </div>
                    </div>

                    {/* Rent Section */}
                    <div className="relative group overflow-hidden h-[300px] md:h-[600px] border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800">
                        <img
                            src={images.rent}
                            alt="Rent a House"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                            <div className="bg-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Key className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Rent a House</h3>
                            <p className="text-gray-200 mb-6 text-sm font-medium leading-relaxed">Explore premium rental properties that fit your lifestyle and budget.</p>
                            <a
                                href="https://wa.me/923000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-orange-50 transition-colors text-center"
                            >
                                Contact Now
                            </a>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="relative group overflow-hidden h-[300px] md:h-[600px] border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800">
                        <img
                            src={images.list}
                            alt="List Your Property"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                            <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">List Your Property</h3>
                            <p className="text-gray-200 mb-6 text-sm font-medium leading-relaxed">Have a house available for rent? Let us help you find the perfect tenants.</p>
                            <a
                                href="https://wa.me/923000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-green-50 transition-colors text-center"
                            >
                                Contact Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
