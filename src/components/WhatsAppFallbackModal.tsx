import { useState } from 'react';
import { Copy, CheckCircle2, ExternalLink, X } from 'lucide-react';

interface WhatsAppFallbackModalProps {
    message: string;
    waUrl: string;
    isUrdu: boolean;
    popupBlocked: boolean;
    onConfirmSent: () => void;
    onClose: () => void;
}

export default function WhatsAppFallbackModal({
    message,
    waUrl,
    isUrdu,
    popupBlocked,
    onConfirmSent,
    onClose,
}: WhatsAppFallbackModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback: select text in textarea for manual copy
            const textarea = document.getElementById('wa-fallback-message') as HTMLTextAreaElement | null;
            if (textarea) {
                textarea.select();
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-label={isUrdu ? 'واٹس ایپ فال بیک' : 'WhatsApp Fallback'}
        >
            <div className="bg-gruvbox-bg1 border border-gruvbox-bg3 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-gruvbox-fg/40 hover:text-gruvbox-fg transition-colors"
                    aria-label={isUrdu ? 'بند کریں' : 'Close'}
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="bg-gruvbox-yellow/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-bold text-gruvbox-fg mb-2">
                        {popupBlocked
                            ? (isUrdu ? 'واٹس ایپ نہیں کھلا' : 'WhatsApp could not open')
                            : (isUrdu ? 'کیا واٹس ایپ کھلا؟' : 'Did WhatsApp open?')}
                    </h2>
                    <p className="text-gruvbox-fg/60 text-sm">
                        {popupBlocked
                            ? (isUrdu
                                ? 'براہ کرم نیچے دیے گئے پیغام کو کاپی کریں اور واٹس ایپ میں بھیجیں۔'
                                : 'Your browser blocked the popup. Please copy the message below and send it via WhatsApp manually.')
                            : (isUrdu
                                ? 'اگر واٹس ایپ نہیں کھلا تو نیچے دیے گئے پیغام کو کاپی کر کے بھیجیں۔'
                                : 'If WhatsApp did not open or you cancelled, copy the message below and send it manually.')}
                    </p>
                </div>

                {/* Message preview */}
                <textarea
                    id="wa-fallback-message"
                    readOnly
                    value={message}
                    className="w-full bg-gruvbox-bg0 border border-gruvbox-bg3 rounded-xl p-4 text-gruvbox-fg text-sm font-mono resize-none mb-4"
                    rows={8}
                    dir={isUrdu ? 'rtl' : 'ltr'}
                />

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    {/* Copy button */}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium transition-all ${copied
                            ? 'bg-gruvbox-green text-gruvbox-bg0'
                            : 'bg-gruvbox-blue text-gruvbox-bg0 hover:bg-gruvbox-blue/90'
                            }`}
                    >
                        {copied ? (
                            <>
                                <CheckCircle2 className="h-5 w-5" />
                                {isUrdu ? 'کاپی ہو گیا!' : 'Copied!'}
                            </>
                        ) : (
                            <>
                                <Copy className="h-5 w-5" />
                                {isUrdu ? 'پیغام کاپی کریں' : 'Copy Message'}
                            </>
                        )}
                    </button>

                    {/* Direct WhatsApp link */}
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium bg-gruvbox-green text-gruvbox-bg0 hover:bg-gruvbox-green/90 transition-all"
                    >
                        <ExternalLink className="h-5 w-5" />
                        {isUrdu ? 'واٹس ایپ کھولیں' : 'Open WhatsApp'}
                    </a>

                    {/* Confirm sent */}
                    <button
                        onClick={onConfirmSent}
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium border border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg2 transition-all"
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        {isUrdu ? 'میں نے پیغام بھیج دیا ہے' : 'I have sent this message'}
                    </button>
                </div>
            </div>
        </div>
    );
}
