import { MapPin, Phone } from 'lucide-react';
import { useCallError } from '../context/CallErrorContext';

export default function Footer() {
    const { showCallError } = useCallError();
    return (
        <footer className="bg-[#080807] border-t border-ds-border pt-16 pb-8" dir="ltr">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-start">
                        <div className="flex items-center gap-2 mb-4">
                            <img
                                src="/images/logo.webp"
                                alt="GULL Real Estate and Builders Mardan Logo"
                                className="h-10 w-auto"
                                width="40"
                                height="40"
                                fetchPriority="high"
                                decoding="sync"
                            />
                            <span className="font-headline font-extrabold text-ds-on text-lg uppercase tracking-tight">GULL Real Estate and Builders</span>
                        </div>
                        <p className="font-body text-sm text-ds-on-faint leading-relaxed max-w-xs mt-3">
                            We are a trusted property agency. We help you securely buy, sell, or rent houses and plots easily without any scams.
                        </p>
                    </div>

                    <div className="text-start md:text-end">
                        <h3 className="font-headline font-bold text-ds-secondary text-[10px] uppercase tracking-[0.25em] mb-5">Office Address & Contact</h3>
                        <div className="flex flex-col gap-3 items-start md:items-end">
                            <a
                                href="https://maps.app.goo.gl/n5h9QsixjkC4SAbn7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-ds-on-dim hover:text-ds-primary text-sm transition-colors no-underline"
                                aria-label="View location on Google Maps"
                            >
                                <MapPin className="h-4 w-4" />
                                <span>Sheen Gull Plaza, Swabi Road, Mardan, KPK</span>
                            </a>
                            <div className="flex items-center gap-2 text-ds-on-dim">
                                <Phone className="h-4 w-4" />
                                <button
                                    onClick={showCallError}
                                    className="hover:text-ds-error text-sm font-medium underline decoration-dotted underline-offset-4 transition-colors"
                                    dir="ltr"
                                    aria-label="Call the office"
                                >
                                    0937 861777
                                </button>
                            </div>
                            <a
                                href="mailto:agul40160@gmail.com"
                                className="mt-4 inline-flex items-center justify-center px-5 py-2.5 border border-ds-border text-ds-primary font-headline font-bold uppercase text-[10px] tracking-widest hover:border-ds-primary transition-all rounded-none"
                            >
                                <img src="/images/email.png" alt="Email" width="16" height="16" className="h-4 w-4 mr-2" />
                                Email Us / Report Issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-ds-border text-center text-ds-on-faint text-xs font-body tracking-wide">
                    <p dir="ltr">&copy; {new Date().getFullYear()} GULL Real Estate and Builders. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
