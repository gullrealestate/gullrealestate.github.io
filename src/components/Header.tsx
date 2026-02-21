interface HeaderProps {
    isUrdu?: boolean;
    setIsUrdu?: (val: boolean) => void;
}

export default function Header({ isUrdu, setIsUrdu }: HeaderProps) {
    return (
        <header className="fixed top-0 w-full bg-gruvbox-bg1/95 backdrop-blur-sm z-50 border-b border-gruvbox-bg2 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <img
                            src="/images/logo.png"
                            alt={isUrdu ? "گل رئیل اسٹیٹ اینڈ بلڈرز مردان" : "GULL Real Estate and Builders Mardan"}
                            className="h-10 w-auto"
                            width="40"
                            height="40"
                        />
                        <span className="text-xl font-bold text-gruvbox-fg">
                            {isUrdu ? "گل رئیل اسٹیٹ اینڈ بلڈرز" : "GULL Real Estate and Builders"}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsUrdu?.(!isUrdu)}
                            className="px-3 py-1.5 bg-gruvbox-bg2 text-gruvbox-fg text-sm font-medium rounded-lg hover:bg-gruvbox-bg3 transition-colors border border-gruvbox-bg3 shadow-sm"
                        >
                            {isUrdu ? "English" : "اردو"}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
