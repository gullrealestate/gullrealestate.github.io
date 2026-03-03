import { useEffect, useRef, useCallback } from 'react';
import { PhoneOff, X, MessageSquare } from 'lucide-react';
import { useTranslation } from '../lib/i18n/useTranslation';

interface CallErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CallErrorModal({ isOpen, onClose }: CallErrorModalProps) {
    const { t, isUrdu } = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus trap
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }
        if (e.key !== 'Tab' || !modalRef.current) return;

        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current?.focus();
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
            role="dialog" aria-modal="true" aria-labelledby="call-error-title">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gruvbox-bg0/80 backdrop-blur-sm transition-opacity"
                onClick={onClose} aria-hidden="true" />

            {/* Modal */}
            <div ref={modalRef}
                className="relative bg-gruvbox-bg1 border-2 border-gruvbox-red/30 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                dir={isUrdu ? "rtl" : "ltr"}>
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gruvbox-red/10 to-transparent pointer-events-none" aria-hidden="true" />

                <button ref={closeButtonRef}
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-gruvbox-bg2 text-gruvbox-fg/70 hover:text-gruvbox-red hover:bg-gruvbox-bg3 transition-all z-10"
                    aria-label={t.close}>
                    <X className="h-5 w-5" />
                </button>

                <div className="p-8 sm:p-10 relative z-0">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-gruvbox-red/20 p-4 rounded-3xl mb-6 ring-8 ring-gruvbox-red/5" aria-hidden="true">
                            <PhoneOff className="h-10 w-10 text-gruvbox-red" />
                        </div>

                        <h2 id="call-error-title" className="text-2xl sm:text-3xl font-bold text-gruvbox-fg mb-4">
                            {t.callErrorTitle}
                        </h2>

                        <p className="text-lg text-gruvbox-fg/80 leading-relaxed mb-8">
                            {t.callErrorMsg}
                        </p>

                        <div className="w-full space-y-4">
                            <div className="bg-gruvbox-bg2 p-5 rounded-2xl flex items-start gap-4 text-start border border-gruvbox-bg3">
                                <MessageSquare className="h-6 w-6 text-gruvbox-blue flex-shrink-0 mt-1" aria-hidden="true" />
                                <p className="text-sm sm:text-base text-gruvbox-fg/90">
                                    {t.callErrorAction}
                                </p>
                            </div>

                            <button onClick={onClose}
                                className="w-full bg-gruvbox-fg text-gruvbox-bg0 font-bold py-4 rounded-2xl hover:bg-gruvbox-blue transition-all transform active:scale-95">
                                {t.close}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
