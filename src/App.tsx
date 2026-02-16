
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import { Home, Hammer, Key } from 'lucide-react';


function App() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-16">
                <Hero />

                <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Premium Services</h2>
                        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Comprehensive real estate solutions tailored to your unique needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                            <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Home className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Buy & Sell</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Whether you're looking for your dream home or selling an asset, we ensure a smooth, transparent, and profitable transaction process.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                            <div className="bg-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Hammer className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Construction</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                From residential homes to commercial plazas, our construction team delivers superior quality with modern architectural designs.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                            <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Key className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Rent a House</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Find your ideal rental home with ease. We offer a wide range of rental properties to suit your lifestyle and budget.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="why-us" className="bg-gray-50 dark:bg-gray-900/50 py-20 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why GULL Real Estate and Builders?</h2>
                            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                    🏆
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Trusted Heritage</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Years of experience building trust through transparent dealings and delivering on our promises. We are a name you can rely on.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                    🏗️
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Modern Construction</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    We don't just sell plots; we build dreams. Our construction division brings state-of-the-art designs to life with premium quality.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-50 dark:border-gray-700">
                                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                    🤝
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Client-Centric Approach</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Your satisfaction is our priority. Our dedicated team provides personalized guidance every step of the way.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact-cta" className="py-20 bg-blue-600 dark:bg-blue-700 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Dream Property?</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Whether you want to buy, sell, or build, our experts are just a call away. Let's make your real estate goals a reality.
                        </p>
                        <a
                            href="#contact"
                            className="inline-block bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors transform hover:-translate-y-1"
                        >
                            Contact Us Today
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default App
