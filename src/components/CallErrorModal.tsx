import { useEffect, useRef, useCallback } from 'react';
import { PhoneOff } from 'lucide-react';
import { content } from '../content';

interface CallErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CallErrorModal({ isOpen, onClose }: CallErrorModalProps) {
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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity"
            role="dialog" aria-modal="true" aria-labelledby="call-error-title">
            {/* Backdrop */}
            <div className="absolute inset-0"
                onClick={onClose} aria-hidden="true" />

            {/* Modal */}
            <div ref={modalRef}
                className="relative bg-ds-surface border border-ds-border w-full max-w-md shadow-2xl p-8 rounded-none animate-[ds-fade-up_0.3s_ease-out]"
                dir="ltr">
                <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-ds-secondary-muted flex-shrink-0">
                        <PhoneOff className="h-5 w-5 text-ds-secondary" />
                    </div>
                    <h2 id="call-error-title" className="font-headline font-bold text-ds-on text-xl ml-3">
                        {content.callErrorTitle}
                    </h2>
                </div>

                <p className="text-ds-on-dim text-sm leading-relaxed mt-4">
                    {content.callErrorMsg}
                </p>

                <p className="text-ds-on-dim text-sm leading-relaxed mt-4 mb-2">
                    {content.callErrorAction}
                </p>

                <button ref={closeButtonRef} onClick={onClose}
                    className="w-full mt-8 border border-ds-border text-ds-on font-headline font-bold uppercase text-[10px] tracking-widest py-4 hover:border-ds-primary hover:text-ds-primary transition-all rounded-none">
                    {content.close}
                </button>
            </div>
        </div>
    );
}
