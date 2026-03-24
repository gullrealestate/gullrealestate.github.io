import { type LeadData, type ValidationErrors } from '../types';
import { content } from '../../../content';

interface ListingDetailsFormProps {
    formData: LeadData;
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

export default function ListingDetailsForm({
    formData, errors,
    onFieldChange, onInputChange
}: ListingDetailsFormProps) {
    const marlaExtra = formData.marlas && !isNaN(parseFloat(formData.marlas)) ? (
         <p className="text-xs text-ds-on-faint mt-2 italic">
             ≈ {(parseFloat(formData.marlas) * 272.25).toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft
         </p>
    ) : null;

    const ownershipOptions = [
        { value: 'registry', label: content.registry },
        { value: 'inteqal', label: content.inteqal },
        { value: 'allotment', label: content.allotment },
        { value: 'powerOfAttorney', label: content.powerOfAttorney }
    ];

    return (
        <div className="space-y-8 animate-[ds-fade-up_0.5s_ease-out]">
            <SelectField id="ownershipType" label={content.ownershipType} value={formData.ownershipType} onChange={onInputChange} options={ownershipOptions} placeholder={content.selectOwnership} error={errors.ownershipType} />
            
            <InputField id="marlas" label={content.marlas} value={formData.marlas} onChange={onInputChange} placeholder={content.marlasPlaceholder} error={errors.marlas} extra={marlaExtra} />

            <div className="space-y-4">
                <div className={`flex items-center justify-between border-b py-4 cursor-pointer transition-colors ${formData.onMainRoad ? 'border-ds-primary' : 'border-ds-border'}`}
                    onClick={() => onFieldChange('onMainRoad', !formData.onMainRoad)}>
                    <div>
                        <p className={`font-headline font-bold text-sm ${formData.onMainRoad ? 'text-ds-primary' : 'text-ds-on'}`}>{content.mainRoadLabel}</p>
                        <p className={`text-[10px] uppercase tracking-wider mt-1 ${formData.onMainRoad ? 'text-ds-primary/70' : 'text-ds-on-faint'}`}>{content.mainRoadToggleHint}</p>
                    </div>
                    <div className={`w-10 h-5 rounded-none border border-ds-border flex items-center transition-colors relative ${formData.onMainRoad ? 'bg-ds-primary border-ds-primary' : 'bg-transparent'}`}>
                        <div className={`w-3 h-3 rounded-none absolute transition-all ${formData.onMainRoad ? 'bg-ds-primary-dark translate-x-[22px]' : 'bg-ds-on-dim translate-x-1'}`} />
                    </div>
                </div>

                {!formData.onMainRoad && (
                    <div className="animate-[ds-fade-up_0.3s_ease-out]">
                        <div className="relative group pt-4">
                            <input type="number" id="streetWidth" name="streetWidth"
                                value={formData.streetWidth} onChange={onInputChange}
                                className="peer block w-full px-0 py-3.5 pr-12 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base placeholder-transparent transition-colors duration-200" placeholder={content.streetWidthPlaceholder} />
                            <label
                                htmlFor="streetWidth"
                                className={`absolute left-0 pointer-events-none transition-all duration-200 font-headline ${formData.streetWidth && formData.streetWidth.length > 0 ? 'top-0 text-[10px] uppercase tracking-widest text-ds-on-dim font-bold' : 'top-7 text-sm text-ds-on-faint font-normal normal-case tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ds-primary peer-focus:font-bold'}`}
                            >
                                Street Width
                            </label>
                            <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-focus-within:w-full" />
                            <div className="absolute right-0 top-[30px] font-headline font-bold text-ds-on-dim pointer-events-none">
                                ft
                            </div>
                            {errors.streetWidth && <p className="text-ds-error text-xs font-body mt-1.5 flex gap-1 items-center" role="alert">{errors.streetWidth}</p>}
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-2">
                <label className="block font-headline font-bold text-[10px] uppercase tracking-widest text-ds-on-faint mb-3">{content.paymentLabel}</label>
                <div className="grid grid-cols-2 gap-px bg-ds-border">
                    <button type="button" onClick={() => onFieldChange('paymentMethod', 'cash')}
                        className={`py-3.5 transition-all rounded-none ${formData.paymentMethod === 'cash'
                            ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                            : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                        {content.cash}
                    </button>
                    <button type="button" onClick={() => onFieldChange('paymentMethod', 'installment')}
                        className={`py-3.5 transition-all rounded-none ${formData.paymentMethod === 'installment'
                            ? 'bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-[10px] tracking-widest'
                            : 'bg-ds-surface text-ds-on-dim hover:bg-ds-surface-low font-headline font-bold uppercase text-[10px] tracking-widest'}`}>
                        {content.installment}
                    </button>
                </div>
            </div>

            <InputField id="budget" label={content.askingPrice} value={formData.budget} onChange={onInputChange} placeholder={content.askingPricePlaceholder} error={errors.budget} />

            <div className="relative group pt-4">
                <textarea
                    id="demands"
                    name="demands"
                    rows={3}
                    value={formData.demands}
                    onChange={onInputChange}
                    className="peer block w-full px-0 py-3.5 bg-transparent border-0 border-b border-ds-border focus:outline-none focus:border-b focus:border-ds-primary text-ds-on text-base placeholder-transparent transition-colors duration-200 resize-none"
                    placeholder={content.propertyDescriptionPlaceholder}
                />
                <label
                    htmlFor="demands"
                    className={`absolute left-0 pointer-events-none transition-all duration-200 font-headline ${formData.demands && formData.demands.length > 0 ? 'top-0 text-[10px] uppercase tracking-widest text-ds-on-dim font-bold' : 'top-7 text-sm text-ds-on-faint font-normal normal-case tracking-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-ds-primary peer-focus:font-bold'}`}
                >
                    {content.propertyDescription}
                </label>
                <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-ds-primary transition-all duration-300 group-focus-within:w-full" />
                {errors.demands && <p className="text-ds-error text-xs font-body mt-1.5 flex gap-1 items-center" role="alert">{errors.demands}</p>}
            </div>

            <div className="bg-ds-surface-low border border-ds-border p-5 rounded-none mt-8 border-l-[3px] border-l-ds-secondary">
                <h4 className="text-ds-on font-headline font-bold text-sm mb-2">{content.listingNextStepsTitle}</h4>
                <p className="text-ds-on-dim text-sm leading-relaxed">{content.listingNextStepsBody}</p>
            </div>
        </div>
    );
}
