
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gruvbox-bg1 border-t border-gruvbox-bg2 text-gruvbox-fg pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/images/logo.png" alt="GULL Real Estate and Builders" className="h-10 w-auto" />
                            <span className="text-xl font-bold">GULL Real Estate and Builders</span>
                        </div>
                        <p className="text-gruvbox-fg/70 mb-4">
                            Your trusted partner in finding the perfect property. Building dreams, one home at a time.
                        </p>
                    </div>

                    <div className="md:text-right">
                        <h3 className="text-lg font-semibold mb-4">Contact Detail</h3>
                        <div className="flex flex-col gap-3 md:items-end">
                            <a
                                href="https://maps.app.goo.gl/n5h9QsixjkC4SAbn7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gruvbox-fg/70 hover:text-gruvbox-blue transition-colors"
                            >
                                <MapPin className="h-4 w-4" />
                                <span>Sheen Gull Plaza, Swabi Road, Mardan, KPK</span>
                            </a>
                            <div className="flex items-center gap-2 text-gruvbox-fg/70">
                                <Phone className="h-4 w-4" />
                                <a href="tel:0937861777" className="hover:text-gruvbox-blue transition-colors">0937 861777</a>
                            </div>
                            <a
                                href="mailto:agul40160@gmail.com"
                                className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gruvbox-bg0 bg-gruvbox-blue hover:bg-gruvbox-blue/80 transition-colors"
                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Email Us
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gruvbox-bg2 pt-8 text-center text-gruvbox-gray text-sm">
                    <p>&copy; 2023 - {new Date().getFullYear()} GULL Real Estate and Builders. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
