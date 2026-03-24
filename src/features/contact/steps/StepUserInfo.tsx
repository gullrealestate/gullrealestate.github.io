import React from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { content } from '../../../content';

interface StepUserInfoProps {
    formData: LeadData;
    contactType: ContactType;
    errors: ValidationErrors;
    hasAcceptedFormPolicy: boolean;
    onAcceptPolicy: (accepted: boolean) => void;
    onFieldChange: (name: keyof LeadData, value: string) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const InputField = ({ id, label, value, onChange, placeholder, type = 'text', error }: { 
    id: string; 
    label: string; 
    value: string; 
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>; 
    placeholder?: string; 
    type?: string; 
    error?: string; 
}) => {
    const isFilled = value && value.length > 0;
    return (
        <div className="relative group pt-4">
            <input
                type={type}
                id={id}
                name={id}
                required
                value={value}
                onChange={onChange}
                className="peer block w-full px-0 py-3.5 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base placeholder-transparent transition-colors duration-200"
                placeholder={placeholder}
            />
            <label
                htmlFor={id}
                className={`absolute left-0 pointer-events-none transition-all duration-200 font-headline ${isFilled ? 'top-0 text-[10px] uppercase tracking-widest text-ds-on-dim font-bold' : 'top-7 text-sm text-ds-on-faint font-normal normal-case tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ds-primary peer-focus:font-bold'}`}
            >
                {label}
            </label>
            <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-focus-within:w-full" />
            {error && <p className="text-ds-error text-xs font-body mt-1.5 flex gap-1 items-center" role="alert">{error}</p>}
        </div>
    );
};

export default function StepUserInfo({
    formData, contactType, errors, hasAcceptedFormPolicy,
    onAcceptPolicy, onFieldChange, onInputChange, onSubmit,
}: StepUserInfoProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-8 animate-[ds-fade-up_0.5s_ease-out]" noValidate>
            {contactType === 'ceo' && formData.intent !== 'list' && (
                <div className="pt-2">
                    <label className="block font-headline font-bold text-[10px] uppercase tracking-widest text-ds-on-faint mb-3" id="transaction-type-label">{content.transactionType}</label>
                    <div className="grid grid-cols-2 gap-px bg-ds-border" role="radiogroup" aria-labelledby="transaction-type-label">
                        <button type="button" role="radio" aria-checked={formData.intent === 'buy'}
                            onClick={() => onFieldChange('intent', 'buy')}
                            className={`py-4 transition-all rounded-none ${formData.intent === 'buy'
                                ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                            {content.buy}
                        </button>
                        <button type="button" role="radio" aria-checked={formData.intent === 'sell'}
                            onClick={() => onFieldChange('intent', 'sell')}
                            className={`py-4 transition-all rounded-none ${formData.intent === 'sell'
                                ? 'bg-ds-secondary text-ds-secondary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                            {content.sell}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InputField id="name" label={content.fullName} value={formData.name} onChange={onInputChange} placeholder={content.namePlaceholder} error={errors.name} />
                
                <div className="pt-4">
                    <label className="block font-headline font-bold text-[10px] uppercase tracking-widest text-ds-on-faint mb-3" id="gender-label">{content.gender}</label>
                    <div className="grid grid-cols-2 gap-px bg-ds-border" role="radiogroup" aria-labelledby="gender-label">
                        <button type="button" role="radio" aria-checked={formData.gender === 'male'}
                            onClick={() => onFieldChange('gender', 'male')}
                            className={`py-3.5 transition-all rounded-none ${formData.gender === 'male'
                                ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                            {content.male}
                        </button>
                        <button type="button" role="radio" aria-checked={formData.gender === 'female'}
                            onClick={() => onFieldChange('gender', 'female')}
                            className={`py-3.5 transition-all rounded-none ${formData.gender === 'female'
                                ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                            {content.female}
                        </button>
                    </div>
                </div>
            </div>

            <InputField id="phone" label={content.whatsappNumber} value={formData.phone} onChange={onInputChange} placeholder={content.phonePlaceholder} type="tel" error={errors.phone} />

            <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox"
                        className="mt-1 h-5 w-5 rounded-none border border-ds-border bg-transparent checked:bg-ds-primary checked:border-ds-primary focus:ring-0 transition-all appearance-none flex items-center justify-center relative checked:after:content-['✓'] checked:after:absolute checked:after:text-ds-primary-dark checked:after:text-xs checked:after:font-bold"
                        checked={hasAcceptedFormPolicy} onChange={(e) => onAcceptPolicy(e.target.checked)} required
                        aria-label={content.policyAgree} />
                    <span className="text-sm text-ds-on-dim group-hover:text-ds-on transition-colors">
                        {content.policyAgree}
                    </span>
                </label>
            </div>

            <div className="pt-6">
                <button type="submit" disabled={!hasAcceptedFormPolicy}
                    className={`w-full font-headline font-bold uppercase text-xs tracking-[0.2em] px-10 py-4 transition-opacity rounded-none ${hasAcceptedFormPolicy
                        ? 'bg-ds-primary text-ds-primary-dark hover:opacity-85 active:scale-[0.99]'
                        : 'bg-ds-surface text-ds-on-faint cursor-not-allowed border border-ds-border'}`}>
                    {content.submitForm}
                </button>
                <p className="text-center text-xs text-ds-on-faint mt-4 flex items-center justify-center gap-1">
                    {content.privacyNote}
                </p>
            </div>
        </form>
    );
}
