import { Send, Edit3 } from 'lucide-react';
import { type LeadData, type ContactType } from '../types';
import { type TranslationSchema } from '../../../locales/types';

interface StepReviewProps {
    formData: LeadData;
    contactType: ContactType;
    isUrdu: boolean;
    t: TranslationSchema;
    onEdit: () => void;
    onConfirm: () => void;
}

function ReviewField({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{label}</div>
            <div className="text-lg font-medium text-gruvbox-fg">{value}</div>
        </div>
    );
}

export default function StepReview({ formData, contactType, isUrdu, t, onEdit, onConfirm }: StepReviewProps) {
    const priceLabel = formData.intent === 'rent'
        ? t.rentBudgetLabel
        : (formData.intent === 'buy' ? t.budgetLabel : t.askingPrice);

    return (
        <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500" role="region" aria-label={isUrdu ? 'جائزہ' : 'Review'}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 bg-gruvbox-bg2/30 p-8 rounded-3xl border border-gruvbox-bg2">
                <ReviewField label={t.fullName} value={formData.name} />
                <ReviewField label={t.whatsappNumber} value={formData.phone} />
                <ReviewField label={t.gender} value={formData.gender === 'male' ? t.male : t.female} />
                <ReviewField label={t.propertyType} value={formData.propertyType} />
                <ReviewField label={priceLabel} value={formData.budget} />
                <ReviewField label={t.location} value={formData.location} />
                <ReviewField label={t.marlas} value={formData.marlas} />

                {formData.intent === 'rent' && (
                    <>
                        <ReviewField label={t.bedrooms} value={formData.bedrooms} />
                        <ReviewField label={t.furnishingLabel} value={formData.furnishing === 'furnished' ? t.furnished : t.unfurnished} />
                        <ReviewField label={t.occupancyLabel} value={formData.occupancyDate} />
                    </>
                )}

                {formData.intent === 'list' && (
                    <>
                        <ReviewField label={t.ownershipType} value={formData.ownershipType} />
                        <ReviewField label={t.paymentLabel} value={formData.paymentMethod === 'cash' ? t.cash : t.installment} />
                    </>
                )}

                {contactType === 'ceo' && formData.intent !== 'rent' && formData.intent !== 'list' && (
                    <ReviewField label={t.utilities} value={formData.utilities === 'electricity' ? t.electricity : t.elecGas} />
                )}

                <div className="sm:col-span-2 space-y-1 bg-gruvbox-bg0/20 p-4 rounded-xl">
                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.demands}</div>
                    <div className="text-base text-gruvbox-fg/90">{formData.demands}</div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={onEdit}
                    className="flex-1 bg-gruvbox-bg2 text-gruvbox-fg font-bold py-4 px-8 rounded-2xl border border-gruvbox-bg3 hover:bg-gruvbox-bg3 transition-all flex items-center justify-center gap-2"
                    aria-label={t.editDetails}>
                    <Edit3 className="h-5 w-5" />
                    {t.editDetails}
                </button>
                <button onClick={onConfirm}
                    className="flex-[2] bg-gruvbox-green text-gruvbox-bg0 font-extrabold text-lg py-4 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-green/80 transition-all flex items-center justify-center gap-3"
                    aria-label={t.confirmAndSend}>
                    <Send className="h-6 w-6" />
                    {t.confirmAndSend}
                </button>
            </div>
        </div>
    );
}
