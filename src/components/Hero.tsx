
import { Search } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative h-[600px] flex items-center justify-center text-white">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url("./images/hero-bg.jpg")',
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

                <div className="bg-white p-4 rounded-lg shadow-lg  max-w-2xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by location, property type..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                            <Search className="h-5 w-5" />
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
