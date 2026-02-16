import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import PropertyCard from './components/PropertyCard'
import { properties } from './data/properties'

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
                <Hero />

                <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Properties</h2>
                        <p className="mt-4 text-xl text-gray-500">
                            Explore our hand-picked selection of properties for sale and rent.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </section>

                <section id="about" className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6">
                                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
                                <p className="text-gray-600">Verified properties and transparent dealings for your peace of mind.</p>
                            </div>
                            <div className="p-6">
                                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                                <p className="text-gray-600">Professional real estate agents to guide you through every step.</p>
                            </div>
                            <div className="p-6">
                                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Fast Process</h3>
                                <p className="text-gray-600">Streamlined procedures to help you find your dream property quickly.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default App
