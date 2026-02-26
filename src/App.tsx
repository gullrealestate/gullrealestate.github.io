import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import RequirementsForm from './features/requirements/RequirementsForm';
import { useTranslation } from './lib/i18n/useTranslation';

function Layout() {
    const { isUrdu } = useTranslation();
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-gruvbox-bg0 transition-colors duration-300" dir={isUrdu ? "rtl" : "ltr"}>
            <Header isUrdu={isUrdu} currentPath={location.pathname} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/contact/requirements" element={<RequirementsForm />} />
                </Routes>
            </main>
            <Footer isUrdu={isUrdu} />
        </div>
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

