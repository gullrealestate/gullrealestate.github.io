import { useState, type ReactElement } from 'react';
import { CheckCircle2, MessageSquare, Copy, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { content } from '../../../content';

export interface StepSuccessProps {
    readonly leadId: string;
    readonly agentName: string;
    readonly agentWhatsApp: string;
    readonly whatsAppUrl: string;
    readonly message: string;
    readonly onReset: () => void;
}

export default function StepSuccess({
    leadId,
    agentName,
    agentWhatsApp,
    whatsAppUrl,
    message,
    onReset,
}: StepSuccessProps): ReactElement {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Clipboard fallback
            const textarea = document.createElement('textarea');
            textarea.value = message;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <div className="space-y-6 text-center animate-fade-in" data-testid="step-success">
            <div className="bg-ds-primary-muted w-16 h-16 flex items-center justify-center mx-auto rounded-none border border-ds-primary/30">
                <CheckCircle2 className="h-8 w-8 text-ds-primary" />
            </div>

            <div className="space-y-2">
                <h2 className="font-headline font-bold text-2xl text-ds-on">
                    {content.successTitle}
                </h2>
                <p className="text-ds-on-faint text-sm max-w-md mx-auto">
                    {content.successSub}
                </p>
            </div>

            {/* Reference Badge */}
            <div className="bg-ds-surface-low border border-ds-border p-4 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-ds-on-faint uppercase font-headline tracking-wider">
                        {content.leadReference}
                    </span>
                    <span className="font-mono text-ds-secondary font-bold" data-testid="lead-id-badge">
                        {leadId}
                    </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-ds-on-faint uppercase font-headline tracking-wider">
                        {content.assignedAgent}
                    </span>
                    <span className="text-ds-on font-semibold">
                        {agentName}
                    </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-ds-on-faint uppercase font-headline tracking-wider">
                        {content.agentPhoneLabel}
                    </span>
                    <span className="font-mono text-ds-primary">
                        +{agentWhatsApp}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="max-w-md mx-auto space-y-3 pt-2">
                <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase tracking-widest text-sm py-4 px-6 hover:bg-ds-primary/90 transition-all shadow-lg cursor-pointer"
                >
                    <MessageSquare className="h-4 w-4" />
                    {content.openWhatsAppBtn}
                </a>

                <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full inline-flex items-center justify-center gap-2 bg-ds-surface-high border border-ds-border text-ds-on font-headline font-bold uppercase tracking-widest text-xs py-3.5 px-6 hover:border-ds-primary/50 transition-all"
                >
                    {copied ? (
                        <>
                            <Check className="h-4 w-4 text-ds-primary" />
                            <span className="text-ds-primary">{content.messageCopied}</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-4 w-4 text-ds-on-faint" />
                            <span>{content.copyMessageBtn}</span>
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onReset}
                    className="w-full inline-flex items-center justify-center gap-2 text-ds-on-faint hover:text-ds-on font-headline text-xs py-2 transition-colors"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{content.startNewInquiry}</span>
                </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-ds-on-faint">
                <ShieldCheck className="h-4 w-4 text-ds-primary" />
                <span>{content.privacyNote}</span>
            </div>
        </div>
    );
}
