
import { MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/images/logo.png" alt="GULL Real Estate and Builders" className="h-10 w-auto" />
                            <span className="text-xl font-bold">GULL Real Estate and Builders</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner in finding the perfect property. Building dreams, one home at a time.
                        </p>
                    </div>

                    <div className="md:text-right">
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="flex flex-col gap-3 md:items-end">
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>Sheen Gull Plaza, Swabi Road, Mardan, KPK</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; 2023 - {new Date().getFullYear()} GULL Real Estate and Builders. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
