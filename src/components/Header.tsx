import { Link } from 'react-router-dom';
import { trackEvent } from '../lib/analytics';

interface HeaderProps {
    isUrdu?: boolean;
    currentPath: string;
}

export default function Header({ isUrdu, currentPath }: HeaderProps) {
    const langPrefix = isUrdu ? '/ur' : '/en';

    const toggleLanguage = () => {
        const newLang = isUrdu ? 'en' : 'ur';
        trackEvent('language_switch', { category: 'navigation', action: 'language_switch', label: newLang });
        window.location.href = `/${newLang}`;
    };

    return (
        <header className="fixed top-0 w-full bg-gruvbox-bg1/95 backdrop-blur-sm z-50 border-b border-gruvbox-bg2 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"} role="banner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to={langPrefix} className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        aria-label={isUrdu ? "گل رئیل اسٹیٹ ہوم پیج" : "GULL Real Estate Home"}>
                        <img
                            src="/images/logo.webp"
                            alt={isUrdu ? "گل رئیل اسٹیٹ اینڈ بلڈرز مردان" : "GULL Real Estate and Builders Mardan"}
                            className="h-10 w-auto"
                            width="40"
                            height="40"
                            fetchPriority="high"
                            decoding="sync"
                        />
                        <span className="text-xl font-bold text-gruvbox-fg hidden sm:inline">
                            {isUrdu ? "گل رئیل اسٹیٹ اینڈ بلڈرز" : "GULL Real Estate and Builders"}
                        </span>
                    </Link>

                    <nav className="flex items-center gap-2 sm:gap-4" aria-label={isUrdu ? "نیویگیشن" : "Navigation"}>
                        {!currentPath.endsWith('/requirements') && (
                            <button
                                onClick={toggleLanguage}
                                className="px-3 py-1.5 bg-gruvbox-bg2 text-gruvbox-fg text-sm font-medium rounded-lg hover:bg-gruvbox-bg3 transition-colors border border-gruvbox-bg3 shadow-sm"
                                aria-label={isUrdu ? "زبان تبدیل کریں" : "Toggle Language"}
                            >
                                {isUrdu ? "English" : "اردو"}
                            </button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
