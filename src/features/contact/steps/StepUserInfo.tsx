import React from 'react';
import { ShieldCheck, Send, ChevronRight } from 'lucide-react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';

interface StepUserInfoProps {
    formData: LeadData;
    contactType: ContactType;
    isUrdu: boolean;
    t: TranslationSchema;
    errors: ValidationErrors;
    hasAcceptedFormPolicy: boolean;
    onAcceptPolicy: (accepted: boolean) => void;
    onFieldChange: (name: keyof LeadData, value: string) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const inputClass = 'w-full bg-gruvbox-bg2 border border-gruvbox-bg3 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all';
const labelClass = 'block text-sm font-semibold text-gruvbox-fg/70 mb-2';

export default function StepUserInfo({
    formData, contactType, isUrdu, t, errors, hasAcceptedFormPolicy,
    onAcceptPolicy, onFieldChange, onInputChange, onSubmit,
}: StepUserInfoProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500" noValidate>
            {contactType === 'ceo' && formData.intent !== 'list' && (
                <div>
                    <label className={labelClass} id="transaction-type-label">{t.transactionType}</label>
                    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="transaction-type-label">
                        <button type="button" role="radio" aria-checked={formData.intent === 'buy'}
                            onClick={() => onFieldChange('intent', 'buy')}
                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.intent === 'buy'
                                ? 'bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg'
                                : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3'}`}>
                            {t.buy}
                        </button>
                        <button type="button" role="radio" aria-checked={formData.intent === 'sell'}
                            onClick={() => onFieldChange('intent', 'sell')}
                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.intent === 'sell'
                                ? 'bg-gruvbox-orange border-gruvbox-orange text-gruvbox-bg0 shadow-lg'
                                : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3'}`}>
                            {t.sell}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={labelClass}>{t.fullName}</label>
                    <input type="text" id="name" name="name" required value={formData.name}
                        onChange={onInputChange} className={inputClass} placeholder={t.namePlaceholder}
                        aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                    {errors.name && <p id="name-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.name}</p>}
                </div>
                <div>
                    <label className={labelClass} id="gender-label">{t.gender}</label>
                    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby="gender-label">
                        <button type="button" role="radio" aria-checked={formData.gender === 'male'}
                            onClick={() => onFieldChange('gender', 'male')}
                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'male'
                                ? 'bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105'
                                : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3'}`}>
                            {t.male}
                        </button>
                        <button type="button" role="radio" aria-checked={formData.gender === 'female'}
                            onClick={() => onFieldChange('gender', 'female')}
                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'female'
                                ? 'bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105'
                                : 'bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3'}`}>
                            {t.female}
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <label htmlFor="phone" className={labelClass}>{t.whatsappNumber}</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone}
                    onChange={onInputChange} className={inputClass} placeholder={t.phonePlaceholder}
                    aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
                {errors.phone && <p id="phone-error" className="text-gruvbox-red text-xs mt-1" role="alert">{errors.phone}</p>}
            </div>

            <div className="bg-gruvbox-bg2/50 p-4 rounded-xl border border-gruvbox-bg3 mt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox"
                        className="mt-1 h-5 w-5 rounded border-gruvbox-bg3 bg-gruvbox-bg0 text-gruvbox-blue focus:ring-gruvbox-blue transition-all"
                        checked={hasAcceptedFormPolicy} onChange={(e) => onAcceptPolicy(e.target.checked)} required
                        aria-label={t.policyAgree} />
                    <span className="text-sm text-gruvbox-fg/80 group-hover:text-gruvbox-fg transition-colors">
                        {t.policyAgree}
                    </span>
                </label>
            </div>

            <div className="pt-4">
                <button type="submit" disabled={!hasAcceptedFormPolicy}
                    className={`w-full font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${hasAcceptedFormPolicy
                        ? 'bg-gruvbox-blue text-gruvbox-bg0 hover:bg-gruvbox-aqua'
                        : 'bg-gruvbox-bg2 text-gruvbox-fg/30 cursor-not-allowed'}`}>
                    <Send className="h-6 w-6" />
                    {t.submitForm}
                    <ChevronRight className={`h-6 w-6 ${isUrdu ? 'rotate-180' : ''}`} />
                </button>
                <p className="text-center text-xs text-gruvbox-fg/50 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    {t.privacyNote}
                </p>
            </div>
        </form>
    );
}
