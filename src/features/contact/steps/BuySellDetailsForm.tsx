import React from 'react';
import { Ruler, MessageCircle, DollarSign } from 'lucide-react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';

interface BuySellDetailsFormProps {
    formData: LeadData;
    contactType: ContactType;
    isUrdu: boolean;
    t: TranslationSchema;
    errors: ValidationErrors;
    onFieldChange: (name: keyof LeadData, value: string | boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const inputClass = 'w-full bg-gruvbox-bg2 border border-gruvbox-bg2 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all';
const labelClass = 'block text-sm font-semibold text-gruvbox-fg/70 mb-2';

export default function BuySellDetailsForm({
    formData, contactType, isUrdu, t, errors,
    onFieldChange, onInputChange
}: BuySellDetailsFormProps) {
    const toggleBtn = (active: boolean, color = 'blue') =>
        `px-4 py-3 rounded-xl text-sm font-bold border transition-all ${active
            ? `bg-gruvbox-${color} border-gruvbox-${color} text-gruvbox-bg0 shadow-lg scale-105`
            : 'bg-gruvbox-bg2 border-gruvbox-bg2 text-gruvbox-fg hover:bg-gruvbox-bg0'}`;

    const demandsLabel = formData.intent === 'sell' ? t.propertyDescription : t.demands;
    const demandsPlaceholder = formData.intent === 'sell' ? t.propertyDescriptionPlaceholder : t.demandsPlaceholder;

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

                {/* Plot Category: Only for CEO buy/sell */}
                {contactType === 'ceo' && (
                    <div>
                        <label className={labelClass} id="category-label">
                            <div className="flex items-center gap-2">
                                {isUrdu ? 'کیٹیگری' : 'Category'}
                            </div>
                        </label>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Utilities: Only for CEO buy/sell, non-commercial only */}
                {contactType === 'ceo' && formData.propertyType !== t.commercial && (
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

                {/* Budget / Asking Price */}
                <div>
                    <label htmlFor="budget" className={labelClass}>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gruvbox-blue" />
                            {formData.intent === 'buy' ? t.budgetLabel : t.askingPrice}
                        </div>
                    </label>
                    <input type="text" id="budget" name="budget" required value={formData.budget}
                        onChange={onInputChange} className={inputClass}
                        placeholder={formData.intent === 'buy' ? t.budgetPlaceholder : t.askingPricePlaceholder} />
                    {errors.budget && <p className="text-gruvbox-red text-xs mt-1">{errors.budget}</p>}
                </div>
            </div>

            {/* Specific Demands / Property Description */}
            <div>
                <label htmlFor="demands" className={labelClass}>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gruvbox-blue" />
                        {demandsLabel}
                    </div>
                </label>
                <textarea id="demands" name="demands" rows={3} value={formData.demands}
                    onChange={onInputChange} className={`${inputClass} resize-none`} placeholder={demandsPlaceholder} />
                {errors.demands && <p className="text-gruvbox-red text-xs mt-1" role="alert">{errors.demands}</p>}
            </div>
        </div>
    );
}
