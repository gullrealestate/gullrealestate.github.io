import { useState } from 'react';
import { Home, Key, Briefcase, BadgeDollarSign, ClipboardCheck, Handshake } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ContactModal from './components/ContactModal';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-16">
                <Hero onConsultClick={() => setIsModalOpen(true)} />

                <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">Consultancy Services</h2>
                        <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                        <p className="mt-4 text-xl text-gruvbox-fg/80 max-w-3xl mx-auto">
                            We are a real estate consultancy. We guide your decision, negotiation, and process so you can buy,
                            sell, rent, or list a house for rent with confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Home className="h-8 w-8 text-gruvbox-blue" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">Buy / Sell Consultation</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                Speak directly with our CEO to plan your purchase or sale strategy, market pricing, negotiation,
                                and next legal steps.
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Key className="h-8 w-8 text-gruvbox-orange" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">Tenant Consultation</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                Connect with our office agents for rental support. We help you shortlist options, compare terms,
                                and make safe rental decisions.
                            </p>
                        </article>

                        <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gruvbox-bg2 group">
                            <div className="bg-gruvbox-bg2 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Briefcase className="h-8 w-8 text-gruvbox-green" />
                            </div>
                            <h3 className="text-2xl font-bold text-gruvbox-fg mb-3">Landlord Listing Consultation</h3>
                            <p className="text-gruvbox-fg/70 leading-relaxed">
                                Have a house available for rent? Talk to our CEO or agents to list it through our network and
                                connect with suitable tenants faster.
                            </p>
                        </article>
                    </div>
                </section>

                <section id="how-it-works" className="bg-gruvbox-bg1/50 py-20 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4">How Our Consultancy Works</h2>
                            <div className="w-20 h-1 bg-gruvbox-blue mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <ClipboardCheck className="h-7 w-7 text-gruvbox-blue" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">1. Share Your Requirement</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    Tell us your goal: buy, sell, rent, or list your vacant house. We understand your budget,
                                    location, and timeline first.
                                </p>
                            </article>

                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <Handshake className="h-7 w-7 text-gruvbox-orange" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">2. Expert Guidance</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    We provide practical consultancy, negotiation support, and coordination with the right people
                                    in our network.
                                </p>
                            </article>

                            <article className="bg-gruvbox-bg1 p-8 rounded-2xl shadow-sm border border-gruvbox-bg2 text-center">
                                <div className="bg-gruvbox-bg2 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <BadgeDollarSign className="h-7 w-7 text-gruvbox-green" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gruvbox-fg">3. Close With Confidence</h3>
                                <p className="text-gruvbox-fg/70 leading-relaxed">
                                    You make the final transaction directly. We charge consultancy fees for our professional
                                    advisory and facilitation services.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="fees" className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-3xl p-8 md:p-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-fg mb-4 text-center">Consultancy Fee Policy</h2>
                            <p className="text-gruvbox-fg/75 text-center max-w-3xl mx-auto leading-relaxed">
                                We are consultants and facilitators. We do not own or directly sell/rent properties on this
                                website. Clients spend on property transactions separately, while our charges are consultancy
                                fees for guidance, coordination, and deal support.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="contact-cta" className="py-20 bg-gruvbox-blue transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gruvbox-bg0 mb-6">Ready to Book Your Consultation?</h2>
                        <p className="text-gruvbox-bg0/90 text-xl max-w-3xl mx-auto mb-10 font-medium">
                            Speak with our CEO for buy/sell consultation or connect with our agents for renting and landlord
                            listing support.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-block bg-gruvbox-bg0 text-gruvbox-fg font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:bg-gruvbox-bg1 transition-colors transform hover:-translate-y-1"
                        >
                            Book Consultation Now
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}

export default App;
