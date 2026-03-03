import React from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';

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

const inputClass = 'w-full bg-gruvbox-bg2 border border-gruvbox-bg3 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all';
const labelClass = 'block text-sm font-semibold text-gruvbox-fg/70 mb-2';

export default function StepPropertyDetails({
    formData, contactType, isUrdu, t, errors,
    onFieldChange, onInputChange, onSubmit,
}: StepPropertyDetailsProps) {
    const toggleBtn = (active: boolean, color = 'blue') =>
        `px-4 py-3 rounded-xl text-sm font-bold border transition-all ${active
            ? `bg-gruvbox-${color} border-gruvbox-${color} text-gruvbox-bg0 shadow-lg scale-105`
            : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3'}`;

    return (
        <form onSubmit={onSubmit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="propertyType" className={labelClass}>{t.propertyType}</label>
                    <select id="propertyType" name="propertyType" required value={formData.propertyType}
                        onChange={onInputChange} className={inputClass}>
                        <option value="" disabled>{t.selectType}</option>
                        <option value={t.house}>{t.house}</option>
                        {formData.intent !== 'rent' && <option value={t.plot}>{t.plot}</option>}
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
                {contactType === 'ceo' && formData.intent !== 'rent' && formData.intent !== 'list' &&
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
                            <button type="button" role="radio" aria-checked={formData.furnishing === 'unfurnished'}
                                onClick={() => onFieldChange('furnishing', 'unfurnished')}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${formData.furnishing === 'unfurnished'
                                    ? 'bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-[1.02]'
                                    : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3'}`}>
                                {t.unfurnished}
                            </button>
                            <button type="button" role="radio" aria-checked={formData.furnishing === 'furnished'}
                                onClick={() => onFieldChange('furnishing', 'furnished')}
                                className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${formData.furnishing === 'furnished'
                                    ? 'bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-[1.02]'
                                    : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3'}`}>
                                {t.furnished}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {formData.intent === 'list' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="ownershipType" className={labelClass}>{t.ownershipType}</label>
                        <select id="ownershipType" name="ownershipType" required value={formData.ownershipType}
                            onChange={onInputChange} className={inputClass}>
                            <option value="registry">{t.registry}</option>
                            <option value="inteqal">{t.inteqal}</option>
                            <option value="allotment">{t.allotment}</option>
                            <option value="powerOfAttorney">{t.powerOfAttorney}</option>
                        </select>
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-4 h-full pt-6">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.onMainRoad}
                                    onChange={(e) => onFieldChange('onMainRoad', e.target.checked)}
                                    className="w-5 h-5 rounded border-gruvbox-bg3 bg-gruvbox-bg2 text-gruvbox-blue focus:ring-gruvbox-blue transition-all"
                                />
                                <span className="text-sm font-semibold text-gruvbox-fg/70 group-hover:text-gruvbox-fg transition-colors">
                                    {t.mainRoadLabel}
                                </span>
                            </label>
                        </div>
                    </div>
                    {!formData.onMainRoad && (
                        <div>
                            <label htmlFor="streetWidth" className={labelClass}>{t.streetWidthLabel}</label>
                            <input type="text" id="streetWidth" name="streetWidth" required={!formData.onMainRoad} value={formData.streetWidth}
                                onChange={onInputChange} className={inputClass} placeholder="e.g. 30"
                                aria-invalid={!!errors.streetWidth} aria-describedby={errors.streetWidth ? 'sw-error' : undefined} />
                            {errors.streetWidth && <p id="sw-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.streetWidth}</p>}
                        </div>
                    )}
                    <div>
                        <label className={labelClass} id="category-label">{t.categoryLabel}</label>
                        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="category-label">
                            <button type="button" role="radio" aria-checked={formData.plotCategory === 'residential'}
                                onClick={() => onFieldChange('plotCategory', 'residential')}
                                className={toggleBtn(formData.plotCategory === 'residential')}>
                                {t.house}
                            </button>
                            <button type="button" role="radio" aria-checked={formData.plotCategory === 'commercial'}
                                onClick={() => onFieldChange('plotCategory', 'commercial')}
                                className={toggleBtn(formData.plotCategory === 'commercial')}>
                                {t.commercial}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className={labelClass} id="payment-label">{t.paymentLabel}</label>
                        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="payment-label">
                            <button type="button" role="radio" aria-checked={formData.paymentMethod === 'cash'}
                                onClick={() => onFieldChange('paymentMethod', 'cash')}
                                className={toggleBtn(formData.paymentMethod === 'cash', 'green')}>
                                {t.cash}
                            </button>
                            <button type="button" role="radio" aria-checked={formData.paymentMethod === 'installment'}
                                onClick={() => onFieldChange('paymentMethod', 'installment')}
                                className={toggleBtn(formData.paymentMethod === 'installment', 'green')}>
                                {t.installment}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="budget" className={labelClass}>
                        {formData.intent === 'rent' ? t.rentBudgetLabel : (formData.intent === 'buy' ? t.budgetLabel : t.askingPrice)}
                    </label>
                    <input type="text" id="budget" name="budget" required value={formData.budget}
                        onChange={onInputChange} className={inputClass}
                        placeholder={formData.intent === 'rent' ? t.rentBudgetPlaceholder : t.budgetPlaceholder}
                        aria-invalid={!!errors.budget} aria-describedby={errors.budget ? 'budget-error' : undefined} />
                    {errors.budget && <p id="budget-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.budget}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="demands" className={labelClass}>{t.demands}</label>
                <textarea id="demands" name="demands" rows={3} required value={formData.demands}
                    onChange={onInputChange} className={inputClass} placeholder={t.demandsPlaceholder}
                    aria-invalid={!!errors.demands} aria-describedby={errors.demands ? 'demands-error' : undefined} />
                {errors.demands && <p id="demands-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.demands}</p>}
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
