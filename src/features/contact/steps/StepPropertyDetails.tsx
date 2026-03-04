import React, { useEffect } from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';
import ListingDetailsForm from './ListingDetailsForm';

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
    const toggleBtn = (active: boolean, color = 'blue') =>
        `px-4 py-3 rounded-xl text-sm font-bold border transition-all ${active
            ? `bg-gruvbox-${color} border-gruvbox-${color} text-gruvbox-bg0 shadow-lg scale-105`
            : 'bg-gruvbox-bg2 border-gruvbox-bg2 text-gruvbox-fg hover:bg-gruvbox-bg0'}`;

    // Auto-reset propertyType if it becomes restricted after intent change
    useEffect(() => {
        const plotRestrictedIntents = ['rent', 'list'];
        if (plotRestrictedIntents.includes(formData.intent) && formData.propertyType === t.plot) {
            onFieldChange('propertyType', t.house); // reset to House as safe default
        }
    }, [formData.intent, formData.propertyType, t.plot, t.house, onFieldChange]);

    const demandsLabel = (formData.intent === 'list' || formData.intent === 'sell') ? t.propertyDescription : t.demands;
    const demandsPlaceholder = (formData.intent === 'list' || formData.intent === 'sell') ? t.propertyDescriptionPlaceholder : t.demandsPlaceholder;

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

            {formData.intent === 'list' ? (
                <ListingDetailsForm
                    formData={formData}
                    isUrdu={isUrdu}
                    t={t}
                    errors={errors}
                    onFieldChange={onFieldChange}
                    onInputChange={onInputChange}
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="marlas" className={labelClass}>{t.marlas}</label>
                            <input type="text" id="marlas" name="marlas" required value={formData.marlas}
                                onChange={onInputChange} className={inputClass} placeholder={t.marlasPlaceholder}
                                aria-invalid={!!errors.marlas} aria-describedby={errors.marlas ? 'marlas-error' : undefined} />
                            {errors.marlas && <p id="marlas-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.marlas}</p>}
                        </div>

                        {formData.intent === 'rent' && (
                            <div>
                                <label htmlFor="occupancyDate" className={labelClass}>{t.occupancyDate}</label>
                                <input type="date" id="occupancyDate" name="occupancyDate" required value={formData.occupancyDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={onInputChange} className={inputClass}
                                    aria-invalid={!!errors.occupancyDate} aria-describedby={errors.occupancyDate ? 'occ-error' : undefined} />
                                {errors.occupancyDate && <p id="occ-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.occupancyDate}</p>}
                            </div>
                        )}

                        {/* Plot Category: Only for CEO buy/sell */}
                        {contactType === 'ceo' && (formData.intent === 'buy' || formData.intent === 'sell') && (
                            <div>
                                <label className={labelClass} id="category-label">{isUrdu ? 'کیٹیگری' : 'Category'}</label>
                                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="category-label">
                                    <button type="button" onClick={() => onFieldChange('plotCategory', 'residential')}
                                        className={toggleBtn(formData.plotCategory === 'residential')}>
                                        {t.residential}
                                    </button>
                                    <button type="button" onClick={() => onFieldChange('plotCategory', 'commercial')}
                                        className={toggleBtn(formData.plotCategory === 'commercial')}>
                                        {t.commercial}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Utilities: Only for CEO non-rent/non-list buy/sell */}
                        {contactType === 'ceo' && (formData.intent === 'buy' || formData.intent === 'sell') &&
                            formData.propertyType !== t.commercial && (
                                <div>
                                    <label className={labelClass} id="utilities-label">{t.utilities}</label>
                                    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="utilities-label">
                                        <button type="button" role="radio" aria-checked={formData.utilities === 'electricity'}
                                            onClick={() => onFieldChange('utilities', 'electricity')}
                                            className={toggleBtn(formData.utilities === 'electricity')}>
                                            {t.electricity}
                                        </button>
                                        <button type="button" role="radio" aria-checked={formData.utilities === 'elecGas'}
                                            onClick={() => onFieldChange('utilities', 'elecGas')}
                                            className={toggleBtn(formData.utilities === 'elecGas')}>
                                            {t.elecGas}
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>

                    {formData.intent === 'rent' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="bedrooms" className={labelClass}>{t.bedrooms}</label>
                                <input type="number" id="bedrooms" name="bedrooms" min="0" required value={formData.bedrooms}
                                    onChange={onInputChange} className={inputClass} />
                            </div>
                            <div>
                                <label htmlFor="bathrooms" className={labelClass}>{t.bathrooms}</label>
                                <input type="number" id="bathrooms" name="bathrooms" min="0" required value={formData.bathrooms}
                                    onChange={onInputChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass} id="furnishing-label">{t.furnishingLabel}</label>
                                <div className="flex flex-col gap-2" role="radiogroup" aria-labelledby="furnishing-label">
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
                    )}

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="budget" className={labelClass}>
                                {formData.intent === 'rent' ? t.rentBudgetLabel : t.budgetLabel}
                            </label>
                            <input type="text" id="budget" name="budget" required value={formData.budget}
                                onChange={onInputChange} className={inputClass}
                                placeholder={formData.intent === 'rent' ? t.rentBudgetPlaceholder : t.budgetPlaceholder}
                                aria-invalid={!!errors.budget} aria-describedby={errors.budget ? 'budget-error' : undefined} />
                            {errors.budget && <p id="budget-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.budget}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="demands" className={labelClass}>{demandsLabel}</label>
                        <textarea id="demands" name="demands" rows={3} value={formData.demands}
                            onChange={onInputChange} className={inputClass} placeholder={demandsPlaceholder}
                            aria-invalid={!!errors.demands} aria-describedby={errors.demands ? 'demands-error' : undefined} />
                        {errors.demands && <p id="demands-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.demands}</p>}
                    </div>
                </>
            )}

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

