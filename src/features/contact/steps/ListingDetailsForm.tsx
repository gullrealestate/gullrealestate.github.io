import { Ruler, Info, Scroll, CreditCard, MessageCircle, MapPin, DollarSign } from 'lucide-react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { type TranslationSchema } from '../../../locales/types';

interface ListingDetailsFormProps {
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

export default function ListingDetailsForm({
    formData, isUrdu, t, errors,
    onFieldChange, onInputChange
}: Omit<ListingDetailsFormProps, 'contactType'>) {
    const toggleBtn = (active: boolean, color = 'blue') =>
        `px-4 py-3 rounded-xl text-sm font-bold border transition-all ${active
            ? `bg-gruvbox-${color} border-gruvbox-${color} text-gruvbox-bg0 shadow-lg scale-105`
            : 'bg-gruvbox-bg2 border-gruvbox-bg2 text-gruvbox-fg hover:bg-gruvbox-bg0'}`;


    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Ownership Type */}
            <div>
                <label htmlFor="ownershipType" className={labelClass}>
                    <div className="flex items-center gap-2">
                        <Scroll className="w-4 h-4 text-gruvbox-blue" />
                        {t.ownershipType}
                    </div>
                </label>
                <select id="ownershipType" name="ownershipType" required value={formData.ownershipType}
                    onChange={onInputChange} className={inputClass}>
                    <option value="" disabled>{t.selectOwnership}</option>
                    <option value="registry">{t.registry}</option>
                    <option value="inteqal">{t.inteqal}</option>
                    <option value="allotment">{t.allotment}</option>
                    <option value="powerOfAttorney">{t.powerOfAttorney}</option>
                </select>
                {errors.ownershipType && <p className="text-gruvbox-red text-xs mt-1">{errors.ownershipType}</p>}
            </div>

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

            {/* Main Road Toggle */}
            <div className="space-y-3">
                <div className={`flex items-center justify-between bg-gruvbox-bg2 px-4 py-4 rounded-xl border transition-all cursor-pointer ${formData.onMainRoad ? 'border-gruvbox-blue' : 'border-gruvbox-bg2'}`}
                    onClick={() => onFieldChange('onMainRoad', !formData.onMainRoad)}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${formData.onMainRoad ? 'bg-gruvbox-blue/20 text-gruvbox-blue' : 'bg-gruvbox-bg0 text-gruvbox-fg/40'}`}>
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gruvbox-fg">{t.mainRoadLabel}</p>
                            <p className="text-[10px] text-gruvbox-fg/40 uppercase tracking-wider">{t.mainRoadToggleHint}</p>
                        </div>
                    </div>
                    <div className={`w-12 h-6 rounded-full transition-all relative ${formData.onMainRoad ? 'bg-gruvbox-blue' : 'bg-gruvbox-bg0/50'}`}>
                        <div className={`w-4 h-4 bg-gruvbox-fg rounded-full absolute top-1 transition-all ${formData.onMainRoad ? 'left-7' : 'left-1'}`} />
                    </div>
                </div>

                {/* Street Width (only if not on main road) */}
                {!formData.onMainRoad && (
                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="relative">
                            <input type="number" id="streetWidth" name="streetWidth"
                                value={formData.streetWidth} onChange={onInputChange}
                                className={`${inputClass} pr-12`} placeholder={t.streetWidthPlaceholder} />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gruvbox-blue/60 pointer-events-none">
                                ft
                            </div>
                        </div>
                        {errors.streetWidth && <p className="text-gruvbox-red text-xs mt-1">{errors.streetWidth}</p>}
                    </div>
                )}
            </div>

            {/* Payment Method */}
            <div>
                <label className={labelClass}>
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gruvbox-green" />
                        {t.paymentLabel}
                    </div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => onFieldChange('paymentMethod', 'cash')}
                        className={toggleBtn(formData.paymentMethod === 'cash', 'green')}>
                        {t.cash}
                    </button>
                    <button type="button" onClick={() => onFieldChange('paymentMethod', 'installment')}
                        className={toggleBtn(formData.paymentMethod === 'installment', 'green')}>
                        {t.installment}
                    </button>
                </div>
            </div>

            {/* Asking Price */}
            <div>
                <label htmlFor="budget" className={labelClass}>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gruvbox-blue" />
                        {t.askingPrice}
                    </div>
                </label>
                <input type="text" id="budget" name="budget" required value={formData.budget}
                    onChange={onInputChange} className={inputClass} placeholder={t.askingPricePlaceholder} />
                {errors.budget && <p className="text-gruvbox-red text-xs mt-1">{errors.budget}</p>}
            </div>

            {/* Property Description */}
            <div>
                <label htmlFor="demands" className={labelClass}>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gruvbox-blue" />
                        {t.propertyDescription}
                    </div>
                </label>
                <textarea id="demands" name="demands" value={formData.demands}
                    onChange={onInputChange} rows={3} className={`${inputClass} resize-none`}
                    placeholder={t.propertyDescriptionPlaceholder} />
            </div>

            {/* Trust Builder */}
            <div className="bg-gruvbox-blue/5 border border-gruvbox-blue/20 rounded-2xl p-5 flex gap-4">
                <div className="bg-gruvbox-blue/20 p-2 h-fit rounded-lg text-gruvbox-blue mt-1">
                    <Info className="w-5 h-5 font-bold" />
                </div>
                <div>
                    <h4 className="text-gruvbox-blue font-bold text-sm mb-1">{t.listingNextStepsTitle}</h4>
                    <p className="text-xs text-gruvbox-fg/60 leading-relaxed">{t.listingNextStepsBody}</p>
                </div>
            </div>
        </div>
    );
}
