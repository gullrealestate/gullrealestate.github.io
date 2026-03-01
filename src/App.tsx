import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import UniversalContactForm from './features/contact/UniversalContactForm';
import { useTranslation } from './lib/i18n/useTranslation';
import CallErrorModal from './components/CallErrorModal';
import { useState } from 'react';
import { AGENTS } from './config/contacts';
import { CallErrorContext } from './context/CallErrorContext';


function Layout() {
    const { isUrdu, lang } = useTranslation();
    const location = useLocation();
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);

    const showCallError = () => setIsCallModalOpen(true);

    return (
        <CallErrorContext.Provider value={{ showCallError }}>
            <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"}>
                <Header isUrdu={isUrdu} currentPath={location.pathname} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/contact" element={<ContactPage />} />

                        <Route path="/contactCEO" element={
                            <UniversalContactForm
                                contactType="ceo"
                                agentNames={AGENTS.ceo.name}
                                agentWhatsApp={AGENTS.ceo.whatsapp}
                            />
                        } />

                        <Route path="/contactAgentA" element={
                            <UniversalContactForm
                                contactType="agent1"
                                agentNames={AGENTS.agent1.name}
                                agentWhatsApp={AGENTS.agent1.whatsapp}
                            />
                        } />

                        <Route path="/contactAgentB" element={
                            <UniversalContactForm
                                contactType="agent2"
                                agentNames={AGENTS.agent2.name}
                                agentWhatsApp={AGENTS.agent2.whatsapp}
                            />
                        } />

                        {/* Redirect old requirements route to contact page */}
                        <Route path="/contact/requirements" element={<Navigate to={`/${lang}/contact`} replace />} />
                    </Routes>
                </main>
                <Footer isUrdu={isUrdu} />
                <CallErrorModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
            </div>
        </CallErrorContext.Provider>
    );
}

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/:lang/*" element={<Layout />} />
                    <Route path="*" element={<Navigate to="/en" replace />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;

