import React from 'react';
import { usePolicy } from '../context/PolicyContext';
import { ShieldCheck } from 'lucide-react';
import { content } from '../content';
import SEO from './SEO';

export default function PolicyGate({ children }: { children: React.ReactNode }) {
    const { hasAcceptedPolicy, acceptPolicy } = usePolicy();

    if (hasAcceptedPolicy) {
        return <>{children}</>;
    }

    const policyHeader = "Agency Rules & Fees";
    const overline = "Please Read Carefully";
    const agreeBtn = "I Have Read and Agreed to the Rules";

    const handleAccept = () => {
        acceptPolicy();
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-ds-bg pt-24 sm:pt-32 pb-20" dir="ltr">
            <SEO
                title={policyHeader}
                description={content.description}
                lang="en"
            />

            <div className="max-w-3xl mx-auto px-4">
                <article className="bg-ds-surface border border-ds-border rounded-none p-10 md:p-14 shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none before:content-[''] before:absolute before:top-0 before:right-0 before:w-full before:h-full before:border-t before:border-ds-primary-muted before:border-r" />

                    <div className="relative z-10">
                        <header className="flex items-center mb-8">
                            <div className="bg-ds-primary-muted w-12 h-12 flex items-center justify-center rounded-none flex-shrink-0">
                                <ShieldCheck className="h-6 w-6 text-ds-primary" />
                            </div>
                            <h2 className="ml-4 font-headline font-bold text-2xl md:text-3xl text-ds-on">
                                {policyHeader}
                            </h2>
                        </header>

                        <div className="space-y-6 text-left">
                            <span className="block text-ds-secondary font-headline text-[10px] uppercase tracking-[0.25em] mb-5">
                                {overline}
                            </span>
                            <p className="text-ds-on-dim leading-relaxed text-base">
                                {content.description}
                            </p>

                            <div className="space-y-4 pt-2">
                                {content.items.map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="mt-1.5 h-6 w-px bg-ds-primary-muted flex-shrink-0 mr-4" />
                                        <p className="text-ds-on-dim text-sm leading-relaxed">
                                            {typeof item === 'string' ? (
                                                item
                                            ) : (
                                                <>
                                                    <strong className="text-ds-on">{item.label}</strong> {item.content}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-ds-on-faint text-xs italic pt-4">
                                {content.footer}
                            </p>
                        </div>

                        <footer className="mt-12">
                            <button
                                onClick={handleAccept}
                                className="w-full bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-sm tracking-[0.15em] py-5 px-8 rounded-none hover:opacity-90 transition-opacity active:scale-[0.99] flex items-center justify-center gap-3"
                            >
                                <ShieldCheck className="h-5 w-5" />
                                {agreeBtn}
                            </button>
                        </footer>
                    </div>
                </article>
            </div>
        </div>
    );
}
