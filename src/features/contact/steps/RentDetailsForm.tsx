import React from 'react';
import { Ruler, MessageCircle, DollarSign, Calendar, Bed, Bath, Sofa } from 'lucide-react';
import { type LeadData, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';

interface RentDetailsFormProps {
    formData: LeadData;
    isUrdu: boolean;
    t: TranslationSchema;
    errors: ValidationErrors;
    onFieldChange: (name: keyof LeadData, value: string | boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const inputClass = 'w-full bg-gruvbox-bg2 border border-gruvbox-bg2 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all';
const labelClass = 'block text-sm font-semibold text-gruvbox-fg/70 mb-2';

export default function RentDetailsForm({
    formData, isUrdu, t, errors,
    onFieldChange, onInputChange
}: RentDetailsFormProps) {
    const toggleBtn = (active: boolean, color = 'blue') =>
        `px-4 py-3 rounded-xl text-sm font-bold border transition-all ${active
            ? `bg-gruvbox-${color} border-gruvbox-${color} text-gruvbox-bg0 shadow-lg scale-105`
            : 'bg-gruvbox-bg2 border-gruvbox-bg2 text-gruvbox-fg hover:bg-gruvbox-bg0'}`;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Marla Input */}
                <div>
                    <label htmlFor="marlas" className={labelClass}>
                        <div className="flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-gruvbox-blue" />
                            {t.marlas}
                        </div>
                    </label>
                    <input
                        type="text"
                        id="marlas"
                        name="marlas"
                        required
                        value={formData.marlas}
                        onChange={onInputChange}
                        className={inputClass}
                        placeholder={t.marlasPlaceholder}
                    />
                    {errors.marlas && <p className="text-gruvbox-red text-xs mt-1">{errors.marlas}</p>}
                    {formData.marlas && !isNaN(parseFloat(formData.marlas)) && (
                        <p className="text-xs text-gruvbox-fg/40 mt-2 italic">
                            ≈ {(parseFloat(formData.marlas) * 272.25).toLocaleString(undefined, { maximumFractionDigits: 0 })} {isUrdu ? 'مربع فٹ' : 'sq ft'}
                        </p>
                    )}
                </div>

                {/* Target Occupancy Date */}
                <div>
                    <label htmlFor="occupancyDate" className={labelClass}>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gruvbox-blue" />
                            {t.occupancyDate}
                        </div>
                    </label>
                    <input type="date" id="occupancyDate" name="occupancyDate" required value={formData.occupancyDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={onInputChange} className={inputClass} />
                    {errors.occupancyDate && <p className="text-gruvbox-red text-xs mt-1">{errors.occupancyDate}</p>}
                </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="bedrooms" className={labelClass}>
                            <div className="flex items-center gap-2">
                                <Bed className="w-4 h-4 text-gruvbox-blue" />
                                {t.bedrooms}
                            </div>
                        </label>
                        <input type="number" id="bedrooms" name="bedrooms" min="0" required value={formData.bedrooms}
                            onChange={onInputChange} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className={labelClass}>
                            <div className="flex items-center gap-2">
                                <Bath className="w-4 h-4 text-gruvbox-blue" />
                                {t.bathrooms}
                            </div>
                        </label>
                        <input type="number" id="bathrooms" name="bathrooms" min="0" required value={formData.bathrooms}
                            onChange={onInputChange} className={inputClass} />
                    </div>
                </div>

                {/* Furnishing Status */}
                <div>
                    <label className={labelClass} id="furnishing-label">
                        <div className="flex items-center gap-2">
                            <Sofa className="w-4 h-4 text-gruvbox-blue" />
                            {t.furnishingLabel}
                        </div>
                    </label>
                    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="furnishing-label">
                        <button type="button" onClick={() => onFieldChange('furnishing', 'unfurnished')}
                            className={toggleBtn(formData.furnishing === 'unfurnished')}>
                            {t.unfurnished}
                        </button>
                        <button type="button" onClick={() => onFieldChange('furnishing', 'furnished')}
                            className={toggleBtn(formData.furnishing === 'furnished')}>
                            {t.furnished}
                        </button>
                    </div>
                </div>
            </div>

            {/* Rent Budget */}
            <div>
                <label htmlFor="budget" className={labelClass}>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gruvbox-blue" />
                        {t.rentBudgetLabel}
                    </div>
                </label>
                <input type="text" id="budget" name="budget" required value={formData.budget}
                    onChange={onInputChange} className={inputClass}
                    placeholder={t.rentBudgetPlaceholder} />
                {errors.budget && <p className="text-gruvbox-red text-xs mt-1">{errors.budget}</p>}
            </div>

            {/* Specific Demands */}
            <div>
                <label htmlFor="demands" className={labelClass}>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gruvbox-blue" />
                        {t.demands}
                    </div>
                </label>
                <textarea id="demands" name="demands" rows={3} value={formData.demands}
                    onChange={onInputChange} className={`${inputClass} resize-none`} placeholder={t.demandsPlaceholder} />
                {errors.demands && <p className="text-gruvbox-red text-xs mt-1" role="alert">{errors.demands}</p>}
            </div>
        </div>
    );
}
