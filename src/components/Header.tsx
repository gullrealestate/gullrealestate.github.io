import React from 'react';
import { Building2, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-8 w-8 text-blue-600" />
                        <span className="text-xl font-bold text-gray-900">Gull Real Estate</span>
                    </div>

                    <nav className="hidden md:flex gap-8">
                        <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
                        <a href="#featured" className="text-gray-600 hover:text-blue-600 font-medium">Properties</a>
                        <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
                        <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
                    </nav>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 w-full bg-white border-b border-gray-100">
                    <div className="flex flex-col p-4 gap-4">
                        <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
                        <a href="#featured" className="text-gray-600 hover:text-blue-600 font-medium">Properties</a>
                        <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
                        <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
                    </div>
                </div>
            )}
        </header>
    );
}
