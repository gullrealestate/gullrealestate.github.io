import React, { useEffect } from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { content } from '../../../content';
import ListingDetailsForm from './ListingDetailsForm';
import BuySellDetailsForm from './BuySellDetailsForm';
import RentDetailsForm from './RentDetailsForm';

interface StepPropertyDetailsProps {
    formData: LeadData;
    contactType: ContactType;
    errors: ValidationErrors;
    onFieldChange: (name: keyof LeadData, value: string | boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const SelectField = ({ id, label, value, onChange, options, placeholder, error }: {
    id: string;
    label: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
    options: { value: string; label: string }[];
    placeholder?: string;
    error?: string;
}) => {
    const isFilled = value && value.length > 0;
    return (
        <div className="relative group pt-4">
            <select
                id={id}
                name={id}
                required
                value={value}
                onChange={onChange}
                className="peer block w-full px-0 py-3.5 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base transition-colors duration-200 appearance-none rounded-none"
            >
                <option value="" disabled className="bg-ds-surface text-ds-on-faint">{placeholder}</option>
                {options.map((opt: { value: string; label: string }) => (
                    <option key={opt.value} value={opt.value} className="bg-ds-surface text-ds-on">{opt.label}</option>
                ))}
            </select>
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

export default function StepPropertyDetails({
    formData, contactType, errors,
    onFieldChange, onInputChange, onSubmit,
}: StepPropertyDetailsProps) {

    useEffect(() => {
        const plotRestrictedIntents = ['rent', 'list'];
        if (plotRestrictedIntents.includes(formData.intent) && formData.propertyType === content.plot) {
            onFieldChange('propertyType', content.house);
        }
    }, [formData.intent, formData.propertyType, onFieldChange]);

    const renderIntentSpecificForm = () => {
        switch (formData.intent) {
            case 'list':
                return (
                    <ListingDetailsForm
                        formData={formData}
                        errors={errors}
                        onFieldChange={onFieldChange}
                        onInputChange={onInputChange}
                    />
                );
            case 'rent':
                return (
                    <RentDetailsForm
                        formData={formData}
                        errors={errors}
                        onFieldChange={onFieldChange}
                        onInputChange={onInputChange}
                    />
                );
            case 'buy':
            case 'sell':
                return (
                    <BuySellDetailsForm
                        formData={formData}
                        contactType={contactType}
                        errors={errors}
                        onFieldChange={onFieldChange}
                        onInputChange={onInputChange}
                    />
                );
            default:
                return null;
        }
    };

    const propertyOptions = [];
    propertyOptions.push({ value: content.house, label: content.house });
    if (formData.intent !== 'rent' && formData.intent !== 'list') {
        propertyOptions.push({ value: content.plot, label: content.plot });
    }
    propertyOptions.push({ value: content.commercial, label: content.commercial });

    const locationOptions = content.landmarks.map(l => ({ value: l, label: l }));

    return (
        <form onSubmit={onSubmit} className="space-y-8 animate-[ds-fade-up_0.5s_ease-out]" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <SelectField id="propertyType" label={content.propertyType} value={formData.propertyType} onChange={onInputChange} options={propertyOptions} placeholder={content.selectType} />
                <SelectField id="location" label={content.location} value={formData.location} onChange={onInputChange} options={locationOptions} placeholder={content.locationPlaceholder} error={errors.location} />
            </div>

            <div className="pt-2">
                {renderIntentSpecificForm()}
            </div>

            <div className="pt-8">
                <button type="submit"
                    className="w-full bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-xs tracking-[0.2em] px-10 py-4 rounded-none hover:opacity-85 transition-opacity active:scale-[0.99]">
                    {content.nextStep}
                </button>
            </div>
        </form>
    );
}
