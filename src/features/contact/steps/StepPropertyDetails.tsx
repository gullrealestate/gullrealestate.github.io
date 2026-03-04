import React, { useEffect } from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';
import ListingDetailsForm from './ListingDetailsForm';
import BuySellDetailsForm from './BuySellDetailsForm';
import RentDetailsForm from './RentDetailsForm';

interface StepPropertyDetailsProps {
    formData: LeadData;
    contactType: ContactType;
    isUrdu: boolean;
    t: TranslationSchema;
    errors: ValidationErrors;
    onFieldChange: (name: keyof LeadData, value: string | boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const inputClass = 'w-full bg-gruvbox-bg2 border border-gruvbox-bg2 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all';
const labelClass = 'block text-sm font-semibold text-gruvbox-fg/70 mb-2';

export default function StepPropertyDetails({
    formData, contactType, isUrdu, t, errors,
    onFieldChange, onInputChange, onSubmit,
}: StepPropertyDetailsProps) {

    // Auto-reset propertyType if it becomes restricted after intent change
    useEffect(() => {
        const plotRestrictedIntents = ['rent', 'list'];
        if (plotRestrictedIntents.includes(formData.intent) && formData.propertyType === t.plot) {
            onFieldChange('propertyType', t.house); // reset to House as safe default
        }
    }, [formData.intent, formData.propertyType, t.plot, t.house, onFieldChange]);

    const renderIntentSpecificForm = () => {
        switch (formData.intent) {
            case 'list':
                return (
                    <ListingDetailsForm
                        formData={formData}
                        isUrdu={isUrdu}
                        t={t}
                        errors={errors}
                        onFieldChange={onFieldChange}
                        onInputChange={onInputChange}
                    />
                );
            case 'rent':
                return (
                    <RentDetailsForm
                        formData={formData}
                        isUrdu={isUrdu}
                        t={t}
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
                        isUrdu={isUrdu}
                        t={t}
                        errors={errors}
                        onFieldChange={onFieldChange}
                        onInputChange={onInputChange}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="propertyType" className={labelClass}>{t.propertyType}</label>
                    <select id="propertyType" name="propertyType" required value={formData.propertyType}
                        onChange={onInputChange} className={inputClass}>
                        <option value="" disabled>{t.selectType}</option>
                        <option value={t.house}>{t.house}</option>
                        {/* Plot excluded for rent/list — only built properties (House, Commercial) are applicable */}
                        {formData.intent !== 'rent' && formData.intent !== 'list' && (
                            <option value={t.plot}>{t.plot}</option>
                        )}
                        <option value={t.commercial}>{t.commercial}</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="location" className={labelClass}>{t.location}</label>
                    <select id="location" name="location" required value={formData.location}
                        onChange={onInputChange} className={inputClass}
                        aria-invalid={!!errors.location} aria-describedby={errors.location ? 'location-error' : undefined}>
                        <option value="" disabled>{t.locationPlaceholder}</option>
                        {t.landmarks.map((landmark) => (
                            <option key={landmark} value={landmark}>{landmark}</option>
                        ))}
                    </select>
                    {errors.location && <p id="location-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.location}</p>}
                </div>
            </div>

            <div className="pt-2">
                {renderIntentSpecificForm()}
            </div>

            <div className="pt-4">
                <button type="submit"
                    className="w-full bg-gruvbox-blue text-gruvbox-bg0 font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-aqua transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                    {t.nextStep}
                    <span className={isUrdu ? 'rotate-180 inline-block' : ''}>→</span>
                </button>
            </div>
        </form>
    );
}

