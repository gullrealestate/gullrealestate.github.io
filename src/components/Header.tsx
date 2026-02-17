

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-gruvbox-bg1/95 backdrop-blur-sm z-50 border-b border-gruvbox-bg2 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="GULL Real Estate and Builders" className="h-10 w-auto" />
                        <span className="text-xl font-bold text-gruvbox-fg">GULL Real Estate and Builders</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
