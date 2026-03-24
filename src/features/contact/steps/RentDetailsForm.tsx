import { type LeadData, type ValidationErrors } from '../types';
import { content } from '../../../content';

interface RentDetailsFormProps {
    formData: LeadData;
    errors: ValidationErrors;
    onFieldChange: (name: keyof LeadData, value: string | boolean) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputField = ({ id, label, value, onChange, placeholder, type = 'text', error, extra, min }: any) => {
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
                min={min}
                className="peer block w-full px-0 py-3.5 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base placeholder-transparent transition-colors duration-200 [&::-webkit-calendar-picker-indicator]:invert-[0.8]"
                placeholder={placeholder}
            />
            <label
                htmlFor={id}
                className={`absolute left-0 pointer-events-none transition-all duration-200 font-headline ${isFilled || type === 'date' ? 'top-0 text-[10px] uppercase tracking-widest text-ds-on-dim font-bold' : 'top-7 text-sm text-ds-on-faint font-normal normal-case tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ds-primary peer-focus:font-bold'}`}
            >
                {label}
            </label>
            <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-focus-within:w-full" />
            {error && <p className="text-ds-error text-xs font-body mt-1.5 flex gap-1 items-center" role="alert">{error}</p>}
            {extra}
        </div>
    );
};

export default function RentDetailsForm({
    formData, errors,
    onFieldChange, onInputChange
}: RentDetailsFormProps) {
    const marlaExtra = formData.marlas && !isNaN(parseFloat(formData.marlas)) ? (
         <p className="text-xs text-ds-on-faint mt-2 italic">
             ≈ {(parseFloat(formData.marlas) * 272.25).toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft
         </p>
    ) : null;

    return (
        <div className="space-y-8 animate-[ds-fade-up_0.5s_ease-out]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InputField id="marlas" label={content.marlas} value={formData.marlas} onChange={onInputChange} placeholder={content.marlasPlaceholder} error={errors.marlas} extra={marlaExtra} />

                <InputField id="occupancyDate" type="date" label={content.occupancyDate} value={formData.occupancyDate} onChange={onInputChange} error={errors.occupancyDate} min={new Date().toISOString().split('T')[0]} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="bedrooms" type="number" min="0" label={content.bedrooms} value={formData.bedrooms} onChange={onInputChange} error={errors.bedrooms} placeholder="0" />
                    <InputField id="bathrooms" type="number" min="0" label={content.bathrooms} value={formData.bathrooms} onChange={onInputChange} error={errors.bathrooms} placeholder="0" />
                </div>

                <div className="pt-4">
                    <label className="block font-headline font-bold text-[10px] uppercase tracking-widest text-ds-on-faint mb-3" id="furnishing-label">{content.furnishingLabel}</label>
                    <div className="grid grid-cols-2 gap-px bg-ds-border" role="radiogroup" aria-labelledby="furnishing-label">
                        <button type="button" onClick={() => onFieldChange('furnishing', 'unfurnished')}
                            className={`py-3.5 transition-all rounded-none ${formData.furnishing === 'unfurnished'
                                ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                            {content.unfurnished}
                        </button>
                        <button type="button" onClick={() => onFieldChange('furnishing', 'furnished')}
                            className={`py-3.5 transition-all rounded-none ${formData.furnishing === 'furnished'
                                ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                                : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                            {content.furnished}
                        </button>
                    </div>
                </div>
            </div>

            <InputField id="budget" label={content.rentBudgetLabel} value={formData.budget} onChange={onInputChange} placeholder={content.rentBudgetPlaceholder} error={errors.budget} />

            <div className="relative group pt-4">
                <textarea
                    id="demands"
                    name="demands"
                    rows={3}
                    value={formData.demands}
                    onChange={onInputChange}
                    className="peer block w-full px-0 py-3.5 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base placeholder-transparent transition-colors duration-200 resize-none"
                    placeholder={content.demandsPlaceholder}
                />
                <label
                    htmlFor="demands"
                    className={`absolute left-0 pointer-events-none transition-all duration-200 font-headline ${formData.demands && formData.demands.length > 0 ? 'top-0 text-[10px] uppercase tracking-widest text-ds-on-dim font-bold' : 'top-7 text-sm text-ds-on-faint font-normal normal-case tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ds-primary peer-focus:font-bold'}`}
                >
                    {content.demands}
                </label>
                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-focus-within:w-full" />
                {errors.demands && <p className="text-ds-error text-xs font-body mt-1.5 flex gap-1 items-center" role="alert">{errors.demands}</p>}
            </div>
        </div>
    );
}
