import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../lib/i18n/useTranslation';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Send, ArrowLeft, Building2, User } from 'lucide-react';
import SEO from '../../components/SEO';

interface UniversalContactFormProps {
    contactType: 'ceo' | 'agent1' | 'agent2';
    agentNames: {
        en: string;
        ur: string;
    };
    agentWhatsApp: string;
}

export default function UniversalContactForm({ contactType, agentNames, agentWhatsApp }: UniversalContactFormProps) {
    const { t, isUrdu, lang } = useTranslation();
    const agentName = isUrdu ? agentNames.ur : agentNames.en;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        gender: 'male',
        budget: '',
        location: '',
        propertyType: '',
        demands: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateWhatsAppMessage = () => {
        const { name, phone, budget, location, propertyType, demands, gender } = formData;
        const brand = isUrdu ? "*گل رئیل اسٹیٹ اینڈ بلڈرز، مردان*" : "*Gull Real Estate & Builders, Mardan*";
        const greeting = "Assalam-o-Alaikum!";

        let message = `${greeting}\n${brand}\n\n`;
        const actionSuffix = isUrdu ? (gender === 'female' ? "رہی" : "رہا") : "";
        const wantSuffix = isUrdu ? (gender === 'female' ? "چاہتی" : "چاہتا") : "";

        const agentRole = contactType === 'ceo' ? t.ceoTitle : (contactType === 'agent1' ? t.agent1Title : t.agent2Title);

        if (isUrdu) {
            message += `جناب *${agentName}* (${agentRole})، میں *${name}* بات کر ${actionSuffix} ہوں۔ میں آپ کی کمپنی کے ذریعے پراپرٹی ڈیل فائنل کرنا ${wantSuffix} ہوں۔ میری تفصیلات درج ذیل ہیں:\n\n`;
            message += `📍 *مقام:* ${location}\n`;
            message += `🏠 *نوعیت:* ${propertyType || "کوئی بھی"}\n`;
            message += `💰 *بجٹ/قیمت:* ${budget}\n`;
            message += `📝 *مطالبات:* ${demands}\n`;
            message += `📞 *رابطہ نمبر:* ${phone}\n\n`;
            message += `براہ کرم اس ڈیل کو فائنل کرنے میں میری مدد کریں۔ شکریہ!`;
        } else {
            message += `Dear *${agentName}* (${agentRole}), my name is *${name}*. I am looking to finalize a property deal through your company. Here are my details:\n\n`;
            message += `📍 *Location:* ${location}\n`;
            message += `🏠 *Property Type:* ${propertyType || "Any"}\n`;
            message += `💰 *Budget/Price:* ${budget}\n`;
            message += `📝 *Demands:* ${demands}\n`;
            message += `📞 *Contact Number:* ${phone}\n\n`;
            message += `Please assist me in executing this deal professionally. Thank you!`;
        }

        return encodeURIComponent(message);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const encodedMessage = generateWhatsAppMessage();
        window.open(`https://wa.me/${agentWhatsApp}?text=${encodedMessage}`, '_blank');
    };

    const inputClass = "w-full bg-gruvbox-bg2 border border-gruvbox-bg3 rounded-xl px-4 py-3 text-gruvbox-fg placeholder:text-gruvbox-fg/30 focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all";
    const labelClass = "block text-sm font-semibold text-gruvbox-fg/70 mb-2";

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-24 pb-12 sm:pb-20" dir={isUrdu ? "rtl" : "ltr"}>
            <SEO
                title={`${isUrdu ? "رابطہ" : "Contact"} - ${agentName}`}
                description={t.contactFormSub}
                lang={lang}
                isUrdu={isUrdu}
                canonical={`/${contactType}`}
            />

            <div className="max-w-3xl mx-auto px-4">
                <button
                    onClick={() => navigate(`/${lang}/contact`)}
                    className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors mb-8 font-medium group"
                >
                    <ArrowLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1 ${isUrdu ? "rotate-180 group-hover:translate-x-1" : ""}`} />
                    {t.backToContact}
                </button>

                <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Building2 className="h-64 w-64 text-gruvbox-fg" />
                    </div>

                    <header className="mb-10 text-center relative z-10">
                        <div className="bg-gruvbox-blue/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <User className="h-8 w-8 text-gruvbox-blue" />
                        </div>
                        <h1 className="text-3xl font-bold text-gruvbox-fg mb-2">
                            {t.contactFormTitle}
                        </h1>
                        <p className="text-gruvbox-blue font-bold text-lg mb-4">
                            {agentName}
                        </p>
                        <p className="text-gruvbox-fg/60 max-w-lg mx-auto">
                            {t.contactFormSub}
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className={labelClass}>{t.fullName}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    placeholder={t.namePlaceholder}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>{t.gender}</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, gender: 'male' }))}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'male'
                                            ? "bg-gruvbox-fg border-gruvbox-fg text-gruvbox-bg0 shadow-lg"
                                            : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"
                                            }`}
                                    >
                                        {t.male}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, gender: 'female' }))}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'female'
                                            ? "bg-gruvbox-fg border-gruvbox-fg text-gruvbox-bg0 shadow-lg"
                                            : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"
                                            }`}
                                    >
                                        {t.female}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className={labelClass}>{t.whatsappNumber}</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    placeholder={t.phonePlaceholder}
                                />
                            </div>
                            <div>
                                <label htmlFor="propertyType" className={labelClass}>{t.propertyType}</label>
                                <select
                                    id="propertyType"
                                    name="propertyType"
                                    required
                                    value={formData.propertyType}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                >
                                    <option value="">{t.selectType}</option>
                                    <option value={t.house}>{t.house}</option>
                                    <option value={t.plot}>{t.plot}</option>
                                    <option value={t.commercial}>{t.commercial}</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="budget" className={labelClass}>{t.budget}</label>
                                <input
                                    type="text"
                                    id="budget"
                                    name="budget"
                                    required
                                    value={formData.budget}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    placeholder={t.budgetPlaceholder}
                                />
                            </div>
                            <div>
                                <label htmlFor="location" className={labelClass}>{t.location}</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className={inputClass}
                                    placeholder={t.locationPlaceholder}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="demands" className={labelClass}>{t.demands}</label>
                            <textarea
                                id="demands"
                                name="demands"
                                rows={3}
                                required
                                value={formData.demands}
                                onChange={handleInputChange}
                                className={inputClass}
                                placeholder={t.demandsPlaceholder}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gruvbox-blue text-gruvbox-bg0 font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-aqua transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                            >
                                <Send className="h-6 w-6" />
                                {t.submitForm}
                            </button>
                            <p className="text-center text-xs text-gruvbox-fg/50 mt-4 flex items-center justify-center gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                {t.privacyNote}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
