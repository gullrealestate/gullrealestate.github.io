import React from 'react';
import { useTranslation } from '../../lib/i18n/useTranslation';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, User, CheckCircle2, ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';
import { useLeadForm } from './hooks/useLeadForm';
import StepUserInfo from './steps/StepUserInfo';
import StepPropertyDetails from './steps/StepPropertyDetails';
import StepReview from './steps/StepReview';
import { type ContactFormProps } from './types';

export default function UniversalContactForm({ contactType, agentNames, agentWhatsApp }: ContactFormProps) {
    const { t, isUrdu, lang } = useTranslation();
    const agentName = isUrdu ? agentNames.ur : agentNames.en;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialIntent = searchParams.get('intent');

    const form = useLeadForm({
        contactType,
        agentName,
        agentWhatsApp,
        isUrdu,
        lang,
        t,
        initialIntent,
    });

    const stepLabels = [t.stepUserInfo, t.stepPropertyInfo, t.stepReview];

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-20 sm:pt-24 pb-8 sm:pb-20" dir={isUrdu ? 'rtl' : 'ltr'}>
            <SEO
                title={`${isUrdu ? 'رابطہ' : 'Contact'} - ${agentName}`}
                description={t.contactFormSub}
                lang={lang}
                isUrdu={isUrdu}
                canonical={`/${contactType}`}
            />

            <div className="max-w-3xl mx-auto px-4">
                {/* Back button */}
                <button
                    onClick={() => form.step === 1 ? navigate(`/${lang}/contact`) : form.goToStep(form.step - 1)}
                    className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors mb-8 font-medium group"
                    aria-label={form.step === 1 ? t.backToContact : t.previousStep}
                >
                    <ArrowLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1 ${isUrdu ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
                    {form.step === 1 ? t.backToContact : t.previousStep}
                </button>

                {/* Step Progress Indicator */}
                <nav aria-label={isUrdu ? 'فارم مراحل' : 'Form steps'} className="flex items-center justify-center gap-2 mb-8">
                    {stepLabels.map((label, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${form.step > i + 1
                                            ? 'bg-gruvbox-green text-gruvbox-bg0'
                                            : form.step === i + 1
                                                ? 'bg-gruvbox-blue text-gruvbox-bg0 ring-4 ring-gruvbox-blue/20'
                                                : 'bg-gruvbox-bg2 text-gruvbox-fg/40'
                                        }`}
                                    role="img"
                                    aria-label={`${isUrdu ? 'مرحلہ' : 'Step'} ${i + 1}: ${label} — ${form.step > i + 1 ? (isUrdu ? 'مکمل' : 'Complete') :
                                            form.step === i + 1 ? (isUrdu ? 'موجودہ' : 'Current') :
                                                (isUrdu ? 'آنے والا' : 'Upcoming')
                                        }`}
                                >
                                    {form.step > i + 1 ? '✓' : i + 1}
                                </div>
                                <span className={`hidden sm:inline text-sm font-medium ${form.step === i + 1 ? 'text-gruvbox-fg' : 'text-gruvbox-fg/40'}`}>
                                    {label}
                                </span>
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div className={`w-8 sm:w-16 h-0.5 ${form.step > i + 1 ? 'bg-gruvbox-green' : 'bg-gruvbox-bg2'}`} aria-hidden="true" />
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                {/* Form Card */}
                <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 p-8 opacity-[0.03] pointer-events-none" aria-hidden="true">
                        <Building2 className="h-64 w-64 text-gruvbox-fg" />
                    </div>

                    <header className="mb-10 text-center relative z-10">
                        <div className="bg-gruvbox-blue/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            {form.step === 3
                                ? <CheckCircle2 className="h-8 w-8 text-gruvbox-green" />
                                : <User className="h-8 w-8 text-gruvbox-blue" />}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gruvbox-fg mb-2">
                            {form.step === 3 ? t.reviewTitle : t.contactFormTitle}
                        </h1>
                        <p className="text-gruvbox-blue font-bold text-lg mb-4">{agentName}</p>
                        <p className="text-gruvbox-fg/60 max-w-lg mx-auto text-center">
                            {form.step === 3 ? t.reviewSub : t.contactFormSub}
                        </p>
                    </header>

                    {form.step === 1 && (
                        <StepUserInfo
                            formData={form.formData}
                            contactType={contactType}
                            isUrdu={isUrdu}
                            t={t}
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
                            isUrdu={isUrdu}
                            t={t}
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
                            isUrdu={isUrdu}
                            t={t}
                            onEdit={() => form.goToStep(1)}
                            onConfirm={form.confirmAndSend}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
