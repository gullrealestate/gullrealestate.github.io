import { type LeadData, type ContactType } from '../types';
import { content } from '../../../content';

interface StepReviewProps {
    formData: LeadData;
    contactType: ContactType;
    onEdit: () => void;
    onConfirm: () => void;
}

function ReviewField({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
        <div className="flex justify-between items-center py-4 border-b border-ds-border">
             <div className="text-ds-on-faint font-headline text-[10px] uppercase tracking-widest">{label}</div>
             <div className="text-ds-on font-body text-sm text-right">{value}</div>
        </div>
    );
}

export default function StepReview({ formData, contactType, onEdit, onConfirm }: StepReviewProps) {
    const priceLabel = formData.intent === 'rent'
        ? content.rentBudgetLabel
        : (formData.intent === 'buy' ? content.budgetLabel : content.askingPrice);

    return (
        <div className="space-y-8 animate-[ds-fade-up_0.5s_ease-out]" role="region" aria-label="Review">
            <div className="border border-ds-border bg-ds-surface rounded-none p-6">
                <ReviewField label={content.fullName} value={formData.name} />
                <ReviewField label={content.whatsappNumber} value={formData.phone} />
                <ReviewField label={content.gender} value={formData.gender === 'male' ? content.male : content.female} />
                <ReviewField label={content.propertyType} value={formData.propertyType} />
                <ReviewField label={priceLabel} value={formData.budget} />
                <ReviewField label={content.location} value={formData.location} />
                <ReviewField label={content.marlas} value={formData.marlas} />

                {formData.intent === 'rent' && (
                    <>
                        <ReviewField label={content.bedrooms} value={formData.bedrooms} />
                        <ReviewField label={content.furnishingLabel} value={formData.furnishing === 'furnished' ? content.furnished : content.unfurnished} />
                        <ReviewField label={content.occupancyLabel} value={formData.occupancyDate} />
                    </>
                )}

                {formData.intent === 'list' && (
                    <>
                        <ReviewField label={content.ownershipType} value={formData.ownershipType} />
                        <ReviewField label={content.paymentLabel} value={formData.paymentMethod === 'cash' ? content.cash : content.installment} />
                    </>
                )}

                {contactType === 'ceo' && formData.intent !== 'rent' && formData.intent !== 'list' && (
                    <ReviewField label={content.utilities} value={formData.utilities === 'electricity' ? content.electricity : content.elecGas} />
                )}

                <div className="py-4 border-b border-ds-border flex flex-col items-start gap-2">
                     <div className="text-ds-on-faint font-headline text-[10px] uppercase tracking-widest">
                         {formData.intent === 'list' || formData.intent === 'sell' ? content.propertyDescription : content.demands}
                     </div>
                     <div className="text-ds-on font-body text-sm leading-relaxed text-left">
                         {formData.demands || 'Not provided'}
                     </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={onEdit}
                    className="flex-1 border border-ds-border text-ds-on-dim font-headline font-bold uppercase text-xs tracking-[0.2em] px-8 py-4 hover:border-ds-border-strong hover:text-ds-on transition-all rounded-none text-center"
                    aria-label={content.editDetails}>
                    {content.editDetails}
                </button>
                <button onClick={onConfirm}
                    className="flex-[2] bg-ds-primary text-ds-primary-dark font-headline font-bold uppercase text-xs tracking-[0.2em] px-10 py-4 hover:opacity-85 transition-opacity active:scale-[0.99] rounded-none text-center"
                    aria-label={content.confirmAndSend}>
                    {content.confirmAndSend}
                </button>
            </div>
        </div>
    );
}
