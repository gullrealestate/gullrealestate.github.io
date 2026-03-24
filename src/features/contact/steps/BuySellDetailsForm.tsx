import React from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { content } from '../../../content';

interface BuySellDetailsFormProps {
    formData: LeadData;
    contactType: ContactType;
    errors: ValidationErrors;
    onFieldChange: (name: keyof LeadData, value: string | boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputField = ({ id, label, value, onChange, placeholder, type = 'text', error, extra }: { 
    id: string; 
    label: string; 
    value: string; 
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>; 
    placeholder?: string; 
    type?: string; 
    error?: string; 
    extra?: React.ReactNode 
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
            {extra}
        </div>
    );
};

export default function BuySellDetailsForm({
    formData, contactType, errors,
    onFieldChange, onInputChange
}: BuySellDetailsFormProps) {
    const demandsLabel = formData.intent === 'sell' ? content.propertyDescription : content.demands;
    const demandsPlaceholder = formData.intent === 'sell' ? content.propertyDescriptionPlaceholder : content.demandsPlaceholder;

    const marlaExtra = formData.marlas && !isNaN(parseFloat(formData.marlas)) ? (
         <p className="text-xs text-ds-on-faint mt-2 italic">
             ≈ {(parseFloat(formData.marlas) * 272.25).toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft
         </p>
    ) : null;

    return (
        <div className="space-y-8 animate-[ds-fade-up_0.5s_ease-out]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InputField id="marlas" label={content.marlas} value={formData.marlas} onChange={onInputChange} placeholder={content.marlasPlaceholder} error={errors.marlas} extra={marlaExtra} />

                {contactType === 'ceo' && (
                    <div className="pt-4">
                        <label className="block font-headline font-bold text-[10px] uppercase tracking-widest text-ds-on-faint mb-3" id="category-label">
                            Category
                        </label>
                        <div className="grid grid-cols-2 gap-px bg-ds-border" role="radiogroup" aria-labelledby="category-label">
                            <button type="button" onClick={() => onFieldChange('plotCategory', 'residential')}
                                className={`py-3.5 transition-all rounded-none ${formData.plotCategory === 'residential'
                                    ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                    : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                                {content.residential}
                            </button>
                            <button type="button" onClick={() => onFieldChange('plotCategory', 'commercial')}
                                className={`py-3.5 transition-all rounded-none ${formData.plotCategory === 'commercial'
                                    ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                    : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                                {content.commercial}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {contactType === 'ceo' && formData.propertyType !== content.commercial && (
                    <div className="pt-4">
                        <label className="block font-headline font-bold text-[10px] uppercase tracking-widest text-ds-on-faint mb-3" id="utilities-label">{content.utilities}</label>
                        <div className="grid grid-cols-2 gap-px bg-ds-border" role="radiogroup" aria-labelledby="utilities-label">
                            <button type="button" role="radio" aria-checked={formData.utilities === 'electricity'}
                                onClick={() => onFieldChange('utilities', 'electricity')}
                                className={`py-3.5 transition-all rounded-none ${formData.utilities === 'electricity'
                                    ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                    : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                                {content.electricity}
                            </button>
                            <button type="button" role="radio" aria-checked={formData.utilities === 'elecGas'}
                                onClick={() => onFieldChange('utilities', 'elecGas')}
                                className={`py-3.5 transition-all rounded-none ${formData.utilities === 'elecGas'
                                    ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                    : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                                {content.elecGas}
                            </button>
                        </div>
                    </div>
                )}

                <InputField id="budget" label={formData.intent === 'buy' ? content.budgetLabel : content.askingPrice} value={formData.budget} onChange={onInputChange} placeholder={formData.intent === 'buy' ? content.budgetPlaceholder : content.askingPricePlaceholder} error={errors.budget} />
            </div>

            <div className="relative group pt-4">
                <textarea
                    id="demands"
                    name="demands"
                    rows={3}
                    value={formData.demands}
                    onChange={onInputChange}
                    className="peer block w-full px-0 py-3.5 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base placeholder-transparent transition-colors duration-200 resize-none"
                    placeholder={demandsPlaceholder}
                />
                <label
                    htmlFor="demands"
                    className={`absolute left-0 pointer-events-none transition-all duration-200 font-headline ${formData.demands && formData.demands.length > 0 ? 'top-0 text-[10px] uppercase tracking-widest text-ds-on-dim font-bold' : 'top-7 text-sm text-ds-on-faint font-normal normal-case tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ds-primary peer-focus:font-bold'}`}
                >
                    {demandsLabel}
                </label>
                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-focus-within:w-full" />
                {errors.demands && <p className="text-ds-error text-xs font-body mt-1.5 flex gap-1 items-center" role="alert">{errors.demands}</p>}
            </div>
        </div>
    );
}
