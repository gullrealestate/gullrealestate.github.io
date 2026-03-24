import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, CheckCircle2, ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';
import { content } from '../../content';
import { useLeadForm } from './hooks/useLeadForm';
import StepUserInfo from './steps/StepUserInfo';
import StepPropertyDetails from './steps/StepPropertyDetails';
import StepReview from './steps/StepReview';
import { type ContactFormProps } from './types';

export default function UniversalContactForm({ contactType, agentNames, agentWhatsApp }: ContactFormProps) {
    const agentName = agentNames.en;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialIntent = searchParams.get('intent');

    const form = useLeadForm({
        contactType,
        agentName,
        agentWhatsApp,
        initialIntent,
    });

    const stepLabels = [content.stepUserInfo, content.stepPropertyInfo, content.stepReview];

    return (
        <div className="min-h-screen bg-ds-bg pt-20 sm:pt-24 pb-16 px-4" dir="ltr">
            <SEO
                title={`Contact - ${agentName}`}
                description={content.contactFormSub}
                lang="en"
                canonical={`/${contactType}`}
            />

            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => form.step === 1 ? navigate('/contact') : form.goToStep(form.step - 1)}
                    className="text-ds-primary font-headline font-bold text-xs uppercase tracking-widest flex gap-2 items-center hover:gap-3 transition-all mb-8"
                    aria-label={form.step === 1 ? content.backToContact : content.previousStep}
                >
                    <ArrowLeft className="h-4 w-4" />
                    {form.step === 1 ? content.backToContact : content.previousStep}
                </button>

                <nav aria-label="Form steps" className="grid grid-cols-3 w-full border-b border-ds-border mb-10">
                    {stepLabels.map((label, i) => {
                        const isCurrent = form.step === i + 1;
                        const isComplete = form.step > i + 1;
                        const stateClass = isComplete
                            ? 'border-ds-primary/40 text-ds-primary/60'
                            : isCurrent
                                ? 'border-ds-primary text-ds-primary'
                                : 'border-transparent text-ds-on-faint';
                        
                        return (
                            <div key={i} className={`py-3 border-b-2 -mb-[1px] transition-colors text-center ${stateClass}`}>
                                <span className="font-headline font-bold text-[10px] uppercase tracking-widest">
                                    0{i + 1} — {label}
                                </span>
                            </div>
                        );
                    })}
                </nav>

                <div className="bg-ds-surface border border-ds-border p-8 md:p-12 shadow-2xl rounded-none relative">
                    <header className="mb-10 text-center">
                        <div className="bg-ds-primary-muted w-11 h-11 flex items-center justify-center mx-auto mb-5 rounded-none">
                            {form.step === 3
                                ? <CheckCircle2 className="h-[22px] w-[22px] text-ds-primary" />
                                : <User className="h-[22px] w-[22px] text-ds-primary" />}
                        </div>
                        <h1 className="font-headline font-bold text-2xl md:text-3xl text-ds-on mt-5 mb-1">
                            {form.step === 3 ? content.reviewTitle : content.contactFormTitle}
                        </h1>
                        <p className="text-ds-secondary font-headline font-bold text-base tracking-wide">{agentName}</p>
                        <p className="text-ds-on-faint text-sm max-w-sm mx-auto mt-2">
                            {form.step === 3 ? content.reviewSub : content.contactFormSub}
                        </p>
                    </header>

                    {form.step === 1 && (
                        <StepUserInfo
                            formData={form.formData}
                            contactType={contactType}
                            errors={form.errors}
                            hasAcceptedFormPolicy={form.hasAcceptedFormPolicy}
                            onAcceptPolicy={form.setHasAcceptedFormPolicy}
                            onFieldChange={form.updateField}
                            onInputChange={form.handleInputChange}
                            onSubmit={form.submitStep1}
                        />
                    )}

                    {form.step === 2 && (
                        <StepPropertyDetails
                            formData={form.formData}
                            contactType={contactType}
                            errors={form.errors}
                            onFieldChange={form.updateField}
                            onInputChange={form.handleInputChange}
                            onSubmit={form.submitStep2}
                        />
                    )}

                    {form.step === 3 && (
                        <StepReview
                            formData={form.formData}
                            contactType={contactType}
                            onEdit={() => form.goToStep(1)}
                            onConfirm={form.confirmAndSend}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
