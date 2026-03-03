import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { useTranslation } from './lib/i18n/useTranslation';
import CallErrorModal from './components/CallErrorModal';
import { AGENTS } from './config/contacts';
import { CallErrorContext } from './context/CallErrorContext';
import { PolicyProvider } from './context/PolicyContext';
import PolicyGate from './components/PolicyGate';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy-loaded heavy components
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const UniversalContactForm = React.lazy(() => import('./features/contact/UniversalContactForm'));

function Layout() {
    const { isUrdu, lang } = useTranslation();
    const location = useLocation();
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    const showCallError = () => setIsCallModalOpen(true);

    return (
        <PolicyProvider>
            <CallErrorContext.Provider value={{ showCallError }}>
                <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"}>
                    <Header isUrdu={isUrdu} currentPath={location.pathname} />
                    <main className="flex-grow">
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

                                {/* Redirect old requirements route to contact page */}
                                <Route path="contact/requirements" element={<Navigate to={`/${lang}/contact`} replace />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer isUrdu={isUrdu} />
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
                        <Route path="/:lang/*" element={<Layout />} />
                        <Route path="*" element={<Navigate to="/en" replace />} />
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </HelmetProvider>
    );
}

export default App;
