


export default function Hero() {
    return (
        <div className="relative h-[600px] flex items-center justify-center text-white">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("/images/hero-bg.jpg")',
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Find Your Dream Property in Pakistan
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Trusted platform for buying, selling, and renting properties.
                </p>


            </div>
        </div>
    );
}
