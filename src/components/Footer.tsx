
import { Building2, Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Building2 className="h-8 w-8 text-blue-500" />
                            <span className="text-xl font-bold">Gull Real Estate</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your trusted partner in finding the perfect property. Building dreams, one home at a time.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-500"><Instagram className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-400 hover:text-blue-500"><Twitter className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Phone className="h-4 w-4" />
                                <span>+92 300 1234567</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail className="h-4 w-4" />
                                <span>info@gullrealestate.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="h-4 w-4" />
                                <span>123 Real Estate Avenue, Islamabad</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="text-gray-400 hover:text-blue-500">Home</a>
                            <a href="#featured" className="text-gray-400 hover:text-blue-500">Properties</a>
                            <a href="#about" className="text-gray-400 hover:text-blue-500">About Us</a>
                            <a href="#contact" className="text-gray-400 hover:text-blue-500">Contact</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Gull Real Estate and Builders. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
