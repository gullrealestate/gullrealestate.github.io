import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/i18n/useTranslation';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Send, ArrowLeft, Building2, User, CheckCircle2, Edit3, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';
import { trackEvent } from '../../lib/analytics';

interface UniversalContactFormProps {
    contactType: 'ceo' | 'agent1' | 'agent2';
    agentNames: {
        en: string;
        ur: string;
    };
    agentWhatsApp: string;
}

const STORAGE_KEY = 'gull_form_data';
const LEADS_KEY = 'gull_leads';

interface FormDataType {
    name: string;
    phone: string;
    gender: string;
    budget: string;
    location: string;
    propertyType: string;
    demands: string;
    intent: string;
    marlas: string;
    utilities: string;
    bedrooms: string;
    bathrooms: string;
    furnishing: string;
    plotCategory: string;
    paymentMethod: string;
    streetWidth: string;
    occupancyDate: string;
    ownershipType: string;
}

function getStoredFormData() {
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

function saveFormData(data: Record<string, string>) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* ignore quota errors */ }
}

function saveLead(data: Record<string, string>, agentName: string) {
    try {
        const existing = JSON.parse(sessionStorage.getItem(LEADS_KEY) || '[]');
        existing.push({ ...data, agent: agentName, timestamp: new Date().toISOString() });
        sessionStorage.setItem(LEADS_KEY, JSON.stringify(existing));
    } catch { /* ignore */ }
}

export default function UniversalContactForm({ contactType, agentNames, agentWhatsApp }: UniversalContactFormProps) {
    const { t, isUrdu, lang } = useTranslation();
    const agentName = isUrdu ? agentNames.ur : agentNames.en;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialIntent = searchParams.get('intent') as 'buy' | 'sell' | null;

    const [step, setStep] = useState(1);
    const [hasAcceptedFormPolicy, setHasAcceptedFormPolicy] = useState(false);

    const defaultData = {
        name: '',
        phone: '',
        gender: 'male',
        budget: '',
        location: '',
        propertyType: t.house,
        demands: '',
        intent: initialIntent || 'buy',
        marlas: '',
        utilities: 'electricity',
        bedrooms: '3',
        bathrooms: '2',
        furnishing: 'unfurnished',
        plotCategory: 'residential',
        paymentMethod: 'cash',
        streetWidth: '',
        occupancyDate: '',
        ownershipType: 'registry'
    };

    const [formData, setFormData] = useState(() => {
        const stored = getStoredFormData();
        return stored ? { ...defaultData, ...stored, intent: initialIntent || stored.intent || 'buy' } : defaultData;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    useEffect(() => {
        trackEvent('form_opened', { contactType, lang });
    }, [contactType, lang]);

    // Persist form data
    useEffect(() => {
        saveFormData(formData);
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: FormDataType) => ({ ...prev, [name]: value }));
    };

    const generateWhatsAppMessage = () => {
        const { name, phone, budget, location, propertyType, demands, gender, intent, marlas, utilities } = formData;
        const brand = isUrdu ? "*گل رئیل اسٹیٹ اینڈ بلڈرز، مردان*" : "*Gull Real Estate & Builders, Mardan*";
        const greeting = "Assalam-o-Alaikum!";

        let message = `${greeting}\n${brand}\n\n`;
        const actionSuffix = isUrdu ? (gender === 'female' ? "رہی" : "رہا") : "";
        const wantSuffix = isUrdu ? (gender === 'female' ? "چاہتی" : "چاہتا") : "";

        const agentRole = contactType === 'ceo' ? t.ceoTitle : (contactType === 'agent1' ? t.agent1Title : t.agent2Title);

        if (isUrdu) {
            const intentText = contactType === 'ceo' ? (intent === 'buy' ? "خریدنے" : "بیچنے") : (intent === 'rent' ? "کرایہ پر لینے" : "لسٹنگ کروانے");
            message += `جناب *${agentName}* (${agentRole})، میں *${name}* بات کر ${actionSuffix} ہوں۔ میں آپ کی کمپنی کے ذریعے ${intentText} میں دلچسپی ${wantSuffix} ہوں۔ میری تفصیلات درج ذیل ہیں:\n\n`;
            message += `📍 *مقام:* ${location}\n`;
            message += `🏠 *نوعیت:* ${propertyType || "کوئی بھی"}\n`;
            message += `📐 *رقبہ:* ${marlas} مرلے\n`;

            if (intent === 'rent') {
                message += `🛏️ *کمرے:* ${formData.bedrooms}\n`;
                message += `🚿 *باتھ روم:* ${formData.bathrooms}\n`;
                message += `🛋️ *فرنیچر:* ${formData.furnishing === 'furnished' ? t.furnished : t.unfurnished}\n`;
                message += `📅 *قبضہ درکار:* ${formData.occupancyDate}\n`;
            } else if (intent === 'list') {
                message += `🏷️ *کیٹیگری:* ${formData.plotCategory === 'residential' ? t.plot : t.commercial}\n`;
                message += `📜 *ملکیت:* ${formData.ownershipType}\n`;
                message += `🛣️ *گلی:* ${formData.streetWidth} فٹ\n`;
                message += `💳 *ادائیگی:* ${formData.paymentMethod === 'cash' ? t.cash : t.installment}\n`;
            } else if (contactType === 'ceo') {
                if (propertyType !== t.commercial) {
                    message += `⚡ *سہولیات:* ${utilities === 'electricity' ? "بجلی" : "بجلی اور گیس"}\n`;
                }
            }

            message += `💰 *${intent === 'buy' ? t.budgetLabel : (intent === 'rent' ? t.rentBudgetLabel : t.askingPrice)}:* ${budget}\n`;
            message += `📝 *مطالبات:* ${demands}\n`;
            message += `📞 *رابطہ نمبر:* ${phone}\n\n`;
            message += `براہ کرم اس معاملے میں میری مدد کریں۔ شکریہ!`;
        } else {
            const intentText = contactType === 'ceo' ? (intent === 'buy' ? "buy" : "sell") : (intent === 'rent' ? "rent" : "list");
            message += `Dear *${agentName}* (${agentRole}), my name is *${name}*. I am looking to ${intentText} property through your company. Here are my details:\n\n`;
            message += `📍 *Location:* ${location}\n`;
            message += `🏠 *Property Type:* ${propertyType || "Any"}\n`;
            message += `📐 *Area:* ${marlas} Marlas\n`;

            if (intent === 'rent') {
                message += `🛏️ *Bedrooms:* ${formData.bedrooms}\n`;
                message += `🚿 *Bathrooms:* ${formData.bathrooms}\n`;
                message += `🛋️ *Furnishing:* ${formData.furnishing}\n`;
                message += `📅 *Occupancy Date:* ${formData.occupancyDate}\n`;
            } else if (intent === 'list') {
                message += `🏷️ *Category:* ${formData.plotCategory}\n`;
                message += `📜 *Ownership:* ${formData.ownershipType}\n`;
                message += `🛣️ *Street Width:* ${formData.streetWidth} ft\n`;
                message += `💳 *Payment:* ${formData.paymentMethod}\n`;
            } else if (contactType === 'ceo') {
                if (propertyType !== t.commercial) {
                    message += `⚡ *Utilities:* ${utilities === 'electricity' ? "Electricity" : "Elec & Gas"}\n`;
                }
            }

            message += `💰 *${intent === 'buy' ? t.budgetLabel : (intent === 'rent' ? t.rentBudgetLabel : t.askingPrice)}:* ${budget}\n`;
            message += `📝 *Demands:* ${demands}\n`;
            message += `📞 *Contact Number:* ${phone}\n\n`;
            message += `Please assist me in this regard. Thank you!`;
        }

        return encodeURIComponent(message);
    };

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        trackEvent('step_1_completed', { contactType });
        setStep(2);
    };

    const handleStep2Submit = (e: React.FormEvent) => {
        e.preventDefault();
        trackEvent('step_2_completed', { contactType });
        setStep(3);
    };

    const handleConfirm = () => {
        trackEvent('whatsapp_clicked', { contactType, agent: agentName });
        saveLead(formData, agentName);
        sessionStorage.removeItem(STORAGE_KEY);
        const encodedMessage = generateWhatsAppMessage();
        window.open(`https://wa.me/${agentWhatsApp}?text=${encodedMessage}`, '_blank');
    };

    const inputClass = "w-full bg-gruvbox-bg2 border border-gruvbox-bg3 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all";
    const labelClass = "block text-sm font-semibold text-gruvbox-fg/70 mb-2";

    const stepLabels = [t.stepUserInfo, t.stepPropertyInfo, t.stepReview];

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-20 sm:pt-24 pb-8 sm:pb-20" dir={isUrdu ? "rtl" : "ltr"}>
            <SEO
                title={`${isUrdu ? "رابطہ" : "Contact"} - ${agentName}`}
                description={t.contactFormSub}
                lang={lang}
                isUrdu={isUrdu}
                canonical={`/${contactType}`}
            />

            <div className="max-w-3xl mx-auto px-4">
                <button
                    onClick={() => step === 1 ? navigate(`/${lang}/contact`) : setStep(step - 1)}
                    className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors mb-8 font-medium group"
                >
                    <ArrowLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1 ${isUrdu ? "rotate-180 group-hover:translate-x-1" : ""}`} />
                    {step === 1 ? t.backToContact : t.previousStep}
                </button>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {stepLabels.map((label, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > i + 1
                                    ? 'bg-gruvbox-green text-gruvbox-bg0'
                                    : step === i + 1
                                        ? 'bg-gruvbox-blue text-gruvbox-bg0 ring-4 ring-gruvbox-blue/20'
                                        : 'bg-gruvbox-bg2 text-gruvbox-fg/40'
                                    }`}>
                                    {step > i + 1 ? '✓' : i + 1}
                                </div>
                                <span className={`hidden sm:inline text-sm font-medium ${step === i + 1 ? 'text-gruvbox-fg' : 'text-gruvbox-fg/40'}`}>
                                    {label}
                                </span>
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div className={`w-8 sm:w-16 h-0.5 ${step > i + 1 ? 'bg-gruvbox-green' : 'bg-gruvbox-bg2'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 p-8 opacity-[0.03] pointer-events-none">
                        <Building2 className="h-64 w-64 text-gruvbox-fg" />
                    </div>

                    <header className="mb-10 text-center relative z-10">
                        <div className="bg-gruvbox-blue/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            {step === 3 ? <CheckCircle2 className="h-8 w-8 text-gruvbox-green" /> : <User className="h-8 w-8 text-gruvbox-blue" />}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gruvbox-fg mb-2">
                            {step === 3 ? t.reviewTitle : t.contactFormTitle}
                        </h1>
                        <p className="text-gruvbox-blue font-bold text-lg mb-4">
                            {agentName}
                        </p>
                        <p className="text-gruvbox-fg/60 max-w-lg mx-auto text-center">
                            {step === 3 ? t.reviewSub : t.contactFormSub}
                        </p>
                    </header>

                    {/* Step 1: User Info */}
                    {step === 1 && (
                        <form onSubmit={handleStep1Submit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {contactType === 'ceo' && (
                                <div>
                                    <label className={labelClass}>{t.transactionType}</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, intent: 'buy' }))}
                                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.intent === 'buy'
                                                ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg"
                                                : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"}`}>
                                            {t.buy}
                                        </button>
                                        <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, intent: 'sell' }))}
                                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.intent === 'sell'
                                                ? "bg-gruvbox-orange border-gruvbox-orange text-gruvbox-bg0 shadow-lg"
                                                : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"}`}>
                                            {t.sell}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className={labelClass}>{t.fullName}</label>
                                    <input type="text" id="name" name="name" required value={formData.name}
                                        onChange={handleInputChange} className={inputClass} placeholder={t.namePlaceholder} />
                                </div>
                                <div>
                                    <label className={labelClass}>{t.gender}</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, gender: 'male' }))}
                                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'male'
                                                ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                            {t.male}
                                        </button>
                                        <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, gender: 'female' }))}
                                            className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'female'
                                                ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                            {t.female}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className={labelClass}>{t.whatsappNumber}</label>
                                <input type="tel" id="phone" name="phone" required value={formData.phone}
                                    onChange={handleInputChange} className={inputClass} placeholder={t.phonePlaceholder} />
                            </div>

                            <div className="pt-4">
                                <button type="submit"
                                    className="w-full bg-gruvbox-blue text-gruvbox-bg0 font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-aqua transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                                    {t.nextStep}
                                    <ChevronRight className={`h-6 w-6 ${isUrdu ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 2: Property Info */}
                    {step === 2 && (
                        <form onSubmit={handleStep2Submit} className="space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="propertyType" className={labelClass}>{t.propertyType}</label>
                                    <select id="propertyType" name="propertyType" required value={formData.propertyType}
                                        onChange={handleInputChange} className={inputClass}>
                                        <option value="" disabled>{t.selectType}</option>
                                        <option value={t.house}>{t.house}</option>
                                        {formData.intent !== 'rent' && <option value={t.plot}>{t.plot}</option>}
                                        <option value={t.commercial}>{t.commercial}</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="location" className={labelClass}>{t.location}</label>
                                    <select
                                        id="location"
                                        name="location"
                                        required
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={inputClass}
                                    >
                                        <option value="" disabled>{t.locationPlaceholder}</option>
                                        {t.landmarks.map((landmark) => (
                                            <option key={landmark} value={landmark}>
                                                {landmark}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="marlas" className={labelClass}>{t.marlas}</label>
                                    <input type="text" id="marlas" name="marlas" required value={formData.marlas}
                                        onChange={handleInputChange} className={inputClass} placeholder={t.marlasPlaceholder} />
                                </div>
                                {formData.intent === 'rent' && (
                                    <div>
                                        <label htmlFor="occupancyDate" className={labelClass}>{t.occupancyDate}</label>
                                        <input type="date" id="occupancyDate" name="occupancyDate" required value={formData.occupancyDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={handleInputChange} className={inputClass} />
                                    </div>
                                )}
                                {contactType === 'ceo' && formData.intent !== 'rent' && formData.intent !== 'list' && (
                                    formData.propertyType !== t.commercial && (
                                        <div>
                                            <label className={labelClass}>{t.utilities}</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, utilities: 'electricity' }))}
                                                    className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.utilities === 'electricity'
                                                        ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                        : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                                    {t.electricity}
                                                </button>
                                                <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, utilities: 'elecGas' }))}
                                                    className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.utilities === 'elecGas'
                                                        ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                        : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                                    {t.elecGas}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            {formData.intent === 'rent' && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div>
                                        <label htmlFor="bedrooms" className={labelClass}>{t.bedrooms}</label>
                                        <input type="number" id="bedrooms" name="bedrooms" min="0" required value={formData.bedrooms}
                                            onChange={handleInputChange} className={inputClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="bathrooms" className={labelClass}>{t.bathrooms}</label>
                                        <input type="number" id="bathrooms" name="bathrooms" min="0" required value={formData.bathrooms}
                                            onChange={handleInputChange} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.furnishingLabel}</label>
                                        <div className="flex flex-col gap-2">
                                            <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, furnishing: 'unfurnished' }))}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${formData.furnishing === 'unfurnished'
                                                    ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-[1.02]"
                                                    : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}
                                                title={t.unfurnished}>
                                                {t.unfurnished}
                                            </button>
                                            <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, furnishing: 'furnished' }))}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${formData.furnishing === 'furnished'
                                                    ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-[1.02]"
                                                    : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}
                                                title={t.furnished}>
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
                                            onChange={handleInputChange} className={inputClass}>
                                            <option value="registry">Registry</option>
                                            <option value="inteqal">Inteqal</option>
                                            <option value="allotment">Allotment / File</option>
                                            <option value="powerOfAttorney">Power of Attorney</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="streetWidth" className={labelClass}>{t.streetWidth}</label>
                                        <input type="text" id="streetWidth" name="streetWidth" required value={formData.streetWidth}
                                            onChange={handleInputChange} className={inputClass} placeholder="e.g. 30" />
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.categoryLabel}</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, plotCategory: 'residential' }))}
                                                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.plotCategory === 'residential'
                                                    ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                    : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                                {t.house}
                                            </button>
                                            <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, plotCategory: 'commercial' }))}
                                                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.plotCategory === 'commercial'
                                                    ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                    : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                                {t.commercial}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>{t.paymentLabel}</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, paymentMethod: 'cash' }))}
                                                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.paymentMethod === 'cash'
                                                    ? "bg-gruvbox-green border-gruvbox-green text-gruvbox-bg0 shadow-lg scale-105"
                                                    : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
                                                {t.cash}
                                            </button>
                                            <button type="button" onClick={() => setFormData((p: FormDataType) => ({ ...p, paymentMethod: 'installment' }))}
                                                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.paymentMethod === 'installment'
                                                    ? "bg-gruvbox-green border-gruvbox-green text-gruvbox-bg0 shadow-lg scale-105"
                                                    : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg hover:bg-gruvbox-bg3"}`}>
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
                                        onChange={handleInputChange} className={inputClass} placeholder={formData.intent === 'rent' ? t.rentBudgetPlaceholder : t.budgetPlaceholder} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="demands" className={labelClass}>{t.demands}</label>
                                <textarea id="demands" name="demands" rows={3} required value={formData.demands}
                                    onChange={handleInputChange} className={inputClass} placeholder={t.demandsPlaceholder} />
                            </div>

                            <div className="bg-gruvbox-bg2/50 p-4 rounded-xl border border-gruvbox-bg3 mt-4">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input type="checkbox" className="mt-1 h-5 w-5 rounded border-gruvbox-bg3 bg-gruvbox-bg0 text-gruvbox-blue focus:ring-gruvbox-blue transition-all"
                                        checked={hasAcceptedFormPolicy} onChange={(e) => setHasAcceptedFormPolicy(e.target.checked)} required />
                                    <span className="text-sm text-gruvbox-fg/80 group-hover:text-gruvbox-fg transition-colors">
                                        {t.policyAgree}
                                    </span>
                                </label>
                            </div>

                            <div className="pt-4">
                                <button type="submit" disabled={!hasAcceptedFormPolicy}
                                    className={`w-full font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${hasAcceptedFormPolicy
                                        ? "bg-gruvbox-blue text-gruvbox-bg0 hover:bg-gruvbox-aqua"
                                        : "bg-gruvbox-bg2 text-gruvbox-fg/30 cursor-not-allowed"
                                        }`}>
                                    <Send className="h-6 w-6" />
                                    {t.submitForm}
                                </button>
                                <p className="text-center text-xs text-gruvbox-fg/50 mt-4 flex items-center justify-center gap-1">
                                    <ShieldCheck className="h-3 w-3" />
                                    {t.privacyNote}
                                </p>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 bg-gruvbox-bg2/30 p-8 rounded-3xl border border-gruvbox-bg2">
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.fullName}</div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.name}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.whatsappNumber}</div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.phone}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.gender}</div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.gender === 'male' ? t.male : t.female}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.propertyType}</div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.propertyType}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">
                                        {formData.intent === 'rent' ? t.rentBudgetLabel : (formData.intent === 'buy' ? t.budgetLabel : t.askingPrice)}
                                    </div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.budget}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.location}</div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.location}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.marlas}</div>
                                    <div className="text-lg font-medium text-gruvbox-fg">{formData.marlas}</div>
                                </div>
                                {formData.intent === 'rent' && (
                                    <>
                                        <div className="space-y-1">
                                            <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.bedrooms}</div>
                                            <div className="text-lg font-medium text-gruvbox-fg">{formData.bedrooms}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.furnishingLabel}</div>
                                            <div className="text-lg font-medium text-gruvbox-fg">{formData.furnishing === 'furnished' ? t.furnished : t.unfurnished}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.occupancyLabel}</div>
                                            <div className="text-lg font-medium text-gruvbox-fg">{formData.occupancyDate}</div>
                                        </div>
                                    </>
                                )}
                                {formData.intent === 'list' && (
                                    <>
                                        <div className="space-y-1">
                                            <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.ownershipType}</div>
                                            <div className="text-lg font-medium text-gruvbox-fg capitalize">{formData.ownershipType}</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.paymentLabel}</div>
                                            <div className="text-lg font-medium text-gruvbox-fg">{formData.paymentMethod === 'cash' ? t.cash : t.installment}</div>
                                        </div>
                                    </>
                                )}
                                {contactType === 'ceo' && formData.intent !== 'rent' && formData.intent !== 'list' && (
                                    <div className="space-y-1">
                                        <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.utilities}</div>
                                        <div className="text-lg font-medium text-gruvbox-fg">
                                            {formData.utilities === 'electricity' ? t.electricity : t.elecGas}
                                        </div>
                                    </div>
                                )}
                                <div className="sm:col-span-2 space-y-1 bg-gruvbox-bg0/20 p-4 rounded-xl">
                                    <div className="text-xs uppercase tracking-wider text-gruvbox-blue font-bold">{t.demands}</div>
                                    <div className="text-base text-gruvbox-fg/90">{formData.demands}</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button onClick={() => setStep(1)}
                                    className="flex-1 bg-gruvbox-bg2 text-gruvbox-fg font-bold py-4 px-8 rounded-2xl border border-gruvbox-bg3 hover:bg-gruvbox-bg3 transition-all flex items-center justify-center gap-2">
                                    <Edit3 className="h-5 w-5" />
                                    {t.editDetails}
                                </button>
                                <button onClick={handleConfirm}
                                    className="flex-[2] bg-gruvbox-green text-gruvbox-bg0 font-extrabold text-lg py-4 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-green/80 transition-all flex items-center justify-center gap-3">
                                    <Send className="h-6 w-6" />
                                    {t.confirmAndSend}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
