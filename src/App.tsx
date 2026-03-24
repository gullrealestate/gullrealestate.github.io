import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CallErrorModal from './components/CallErrorModal';
import { AGENTS } from './config/contacts';
import { CallErrorContext } from './context/CallErrorContext';
import { PolicyProvider } from './context/PolicyContext';
import PolicyGate from './components/PolicyGate';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import { initScrollTracking } from './lib/analytics';

// Lazy-loaded heavy components
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const UniversalContactForm = React.lazy(() => import('./features/contact/UniversalContactForm'));

function Layout() {
    const location = useLocation();
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    // Scroll depth tracking lifecycle
    useEffect(() => {
        const cleanup = initScrollTracking();
        return cleanup;
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const showCallError = () => setIsCallModalOpen(true);

    return (
        <PolicyProvider>
            <CallErrorContext.Provider value={{ showCallError }}>
                <div className="min-h-screen flex flex-col bg-ds-bg transition-colors duration-300" dir="ltr">
                    <a href="#main-content" className="skip-link">
                        Skip to content
                    </a>
                    <Header />
                    <main className="flex-grow" id="main-content">
                        <Suspense fallback={<LoadingSpinner />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />

                                {/* Policy Protected Routes */}
                                <Route path="contact" element={<PolicyGate><ContactPage /></PolicyGate>} />

                                <Route path="contactCEO" element={
                                    <PolicyGate>
                                        <UniversalContactForm
                                            contactType="ceo"
                                            agentNames={AGENTS.ceo.name}
                                            agentWhatsApp={AGENTS.ceo.whatsapp}
                                        />
                                    </PolicyGate>
                                } />

                                <Route path="contactAgentA" element={
                                    <PolicyGate>
                                        <UniversalContactForm
                                            contactType="agent1"
                                            agentNames={AGENTS.agent1.name}
                                            agentWhatsApp={AGENTS.agent1.whatsapp}
                                        />
                                    </PolicyGate>
                                } />

                                <Route path="contactAgentB" element={
                                    <PolicyGate>
                                        <UniversalContactForm
                                            contactType="agent2"
                                            agentNames={AGENTS.agent2.name}
                                            agentWhatsApp={AGENTS.agent2.whatsapp}
                                        />
                                    </PolicyGate>
                                } />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                    <CallErrorModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
                </div>
            </CallErrorContext.Provider>
        </PolicyProvider>
    );
}

function App() {
    return (
        <HelmetProvider>
            <ErrorBoundary>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Layout />} />
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </HelmetProvider>
    );
}

export default App;
