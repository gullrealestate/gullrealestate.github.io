import React, { useState } from 'react';
import { useTranslation } from '../../lib/i18n/useTranslation';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { AGENTS, INTENTS } from '../../config/contacts';
import type { IntentType } from '../../config/contacts';
import { ShieldCheck, Send, ArrowLeft, Building2 } from 'lucide-react';
import SEO from '../../components/SEO';

export default function RequirementsForm() {
    const { isUrdu, lang } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Read intent from state (passed from ContactPage) or fallback to search params (legacy) or default 'buy'
    const stateIntent = location.state?.intent as IntentType;
    const initialIntent = stateIntent || (searchParams.get('intent') as IntentType) || 'buy';
    const initialAgent = searchParams.get('agent') || 'ceo';

    const [intent, setIntent] = useState<IntentType>(initialIntent);
    const [agentId, setAgentId] = useState(initialAgent);
    const [formData, setFormData] = useState<Record<string, string>>({
        name: '',
        phone: '',
        gender: 'male',
        budget: '',
        location: '',
        propertyType: '',
        size: '',
        price: '',
        notes: ''
    });

    const isIntentLocked = !!stateIntent;

    const currentAgent = AGENTS[agentId] || AGENTS.ceo;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const generateWhatsAppMessage = () => {
        const { name, phone, budget, location, propertyType, price, notes, gender } = formData;
        const brand = isUrdu ? "*گل رئیل اسٹیٹ اینڈ بلڈرز، مردان*" : "*Gull Real Estate & Builders, Mardan*";
        const greeting = "Assalam-o-Alaikum!";

        let message = `${greeting}\n${brand}\n\n`;
        const suffix = isUrdu ? (gender === 'female' ? "رہی" : "رہا") : "";

        if (intent === 'buy' || intent === 'rent') {
            const action = intent === 'buy'
                ? (isUrdu ? "خریدنے" : "Buying")
                : (isUrdu ? "کرائے پر لینے" : "Renting");

            if (isUrdu) {
                message += `جناب، میں *${name}* بات کر ${suffix} ہوں۔ میں آپ کی کمپنی کے ذریعے پراپرٹی *${action}* کا ڈیل فائنل کرنا چاہتا/چاہتی ہوں۔ میری ضروریات درج ذیل ہیں:\n\n`;
                message += `📍 *پسندیدہ جگہ:* ${location || "کسی بھی جگہ"}\n`;
                message += `🏠 *پراپرٹی کی نوعیت:* ${propertyType || "کوئی بھی"}\n`;
                message += `💰 *میرا بجٹ:* ${budget || "مناسب"}\n`;
                message += `📞 *رابطہ نمبر:* ${phone}\n`;
            } else {
                message += `Dear Team, my name is *${name}*. I am looking to finalize a *${action}* deal through your company. Here are my specific requirements:\n\n`;
                message += `📍 *Preferred Location:* ${location || "Any"}\n`;
                message += `🏠 *Property Type:* ${propertyType || "Any"}\n`;
                message += `💰 *My Budget:* ${budget || "Market Rate"}\n`;
                message += `📞 *Contact Number:* ${phone}\n`;
            }
        } else if (intent === 'list') {
            if (isUrdu) {
                message += `جناب، میں اپنی پراپرٹی آپ کی کمپنی کے ذریعے سیل/رینٹ آؤٹ کروانا چاہتا/چاہتی ہوں۔ میں چاہتا/چاہتی ہوں کہ آپ اس ڈیل کو پروفیشنل طریقے سے مکمل کریں۔ تفصیلات یہ ہیں:\n\n`;
                message += `📍 *شہر / جگہ:* ${location}\n`;
                message += `🏠 *پراپرٹی کی نوعیت:* ${propertyType}\n`;
                message += `💰 *مانگی گئی قیمت:* ${price}\n`;
                message += `👤 *مالک کا نام:* ${name}\n`;
                message += `📞 *رابطہ نمبر:* ${phone}\n`;
            } else {
                message += `Dear Team, I would like to list and finalize the deal for my property through your company. Here are the details:\n\n`;
                message += `📍 *City / Location:* ${location}\n`;
                message += `🏠 *Property Type:* ${propertyType}\n`;
                message += `💰 *Asking Price:* ${price}\n`;
                message += `👤 *Owner Name:* ${name}\n`;
                message += `📞 *Contact Number:* ${phone}\n`;
            }
        }

        if (notes) {
            message += isUrdu ? `\n📝 *اضافی نوٹس:* ${notes}\n` : `\n📝 *Additional Notes:* ${notes}\n`;
        }

        message += `\n${isUrdu ? "براہ کرم اس ڈیل کو فائنل کرنے میں میری مدد کریں۔ شکریہ!" : "Please assist me in executing this deal professionally. Thank you!"}`;

        return encodeURIComponent(message);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const encodedMessage = generateWhatsAppMessage();
        window.open(`https://wa.me/${currentAgent.whatsapp}?text=${encodedMessage}`, '_blank');
    };

    const inputClass = "w-full bg-gruvbox-bg2 border border-gruvbox-bg3 rounded-xl px-4 py-3 text-gruvbox-fg focus:outline-none focus:ring-2 focus:ring-gruvbox-blue transition-all";
    const labelClass = "block text-sm font-medium text-gruvbox-fg/70 mb-2";

    return (
        <div className="min-h-screen bg-gruvbox-bg0 pt-24 pb-12 sm:pb-20" dir={isUrdu ? "rtl" : "ltr"}>
            <SEO
                title={isUrdu ? "پراپرٹی ڈیل فارم" : "Professional Deal Execution"}
                description={isUrdu ? "اپنی جائیداد کی ضروریات بتائیں تاکہ ہم ڈیل مکمل کر سکیں" : "Submit your property requirements for professional execution"}
                lang={lang}
                isUrdu={isUrdu}
                canonical="/contact/requirements"
            />

            <div className="max-w-3xl mx-auto px-4">
                <button
                    onClick={() => navigate(`/${lang}/contact`)}
                    className="flex items-center gap-2 text-gruvbox-blue hover:text-gruvbox-blue/80 transition-colors mb-8 font-medium"
                >
                    {isUrdu ? <ArrowLeft className="h-4 w-4 rotate-180" /> : <ArrowLeft className="h-4 w-4" />}
                    {isUrdu ? "واپس جائیں" : "Back to Contact"}
                </button>

                <div className="bg-gruvbox-bg1 border border-gruvbox-bg2 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
                    <header className="mb-10 text-center">
                        <div className="bg-gruvbox-blue/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Building2 className="h-8 w-8 text-gruvbox-blue" />
                        </div>
                        <h1 className="text-3xl font-bold text-gruvbox-fg mb-4">
                            {isUrdu ? "اپنی ڈیل شروع کریں" : "Finalize Your Deal"}
                        </h1>
                        <p className="text-gruvbox-fg/70">
                            {isUrdu ? "بھروسہ مند رئیل اسٹیٹ سروسز کے لیے اپنی تفصیلات فراہم کریں۔ ہماری ٹیم آپ کی ڈیل کو پیشہ ورانہ طریقے سے مکمل کرے گی۔" : "Provide details so we can execute your deal professionally."}
                        </p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isIntentLocked && (
                            <div>
                                <label className={labelClass}>{isUrdu ? "آپ کا ارادہ کیا ہے؟" : "Your Intent:"}</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {INTENTS.map((i) => (
                                        <button
                                            key={i.id}
                                            type="button"
                                            onClick={() => {
                                                setIntent(i.id);
                                                setAgentId(i.defaultAgentId);
                                            }}
                                            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${intent === i.id
                                                ? "bg-gruvbox-blue border-gruvbox-blue text-gruvbox-bg0 shadow-lg scale-105"
                                                : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"
                                                }`}
                                        >
                                            {isUrdu ? i.label.ur : i.label.en}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className={labelClass}>{isUrdu ? "آپ کا مکمل نام" : "Full Name"}</label>
                                <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className={inputClass} placeholder={isUrdu ? "مثال: علی خان" : "e.g. Ali Khan"} />
                            </div>
                            <div>
                                <label className={labelClass}>{isUrdu ? "صنف (Gender):" : "Gender:"}</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, gender: 'male' }))}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'male'
                                            ? "bg-gruvbox-fg border-gruvbox-fg text-gruvbox-bg0 shadow-lg"
                                            : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"
                                            }`}
                                    >
                                        {isUrdu ? "مرد" : "Male"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(p => ({ ...p, gender: 'female' }))}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${formData.gender === 'female'
                                            ? "bg-gruvbox-fg border-gruvbox-fg text-gruvbox-bg0 shadow-lg"
                                            : "bg-gruvbox-bg2 border-gruvbox-bg3 text-gruvbox-fg/70 hover:bg-gruvbox-bg3"
                                            }`}
                                    >
                                        {isUrdu ? "خاتون" : "Female"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className={labelClass}>{isUrdu ? "واٹس ایپ نمبر" : "WhatsApp Number"}</label>
                                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder={isUrdu ? "مثال: 03001234567" : "e.g. 03001234567"} />
                            </div>
                            <div>
                                <label htmlFor="propertyType" className={labelClass}>{isUrdu ? "پراپرٹی کی نوعیت" : "Property Type"}</label>
                                <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleInputChange} className={inputClass}>
                                    <option value="">{isUrdu ? "منتخب کریں" : "Select Type"}</option>
                                    <option value="House">{isUrdu ? "گھر / مکان" : "House"}</option>
                                    <option value="Plot">{isUrdu ? "پلاٹ" : "Plot"}</option>
                                    <option value="Commercial">{isUrdu ? "تجارتی (Commercial)" : "Commercial"}</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="budget" className={labelClass}>{isUrdu ? (intent === 'list' ? "مانگی گئی قیمت" : "آپ کا بجٹ") : (intent === 'list' ? "Asking Price" : "Budget")}</label>
                                <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className={inputClass} placeholder={isUrdu ? "مثال: 50 لاکھ یا ضرورت کے مطابق" : "e.g. 5M or as per market"} />
                            </div>
                            <div>
                                <label htmlFor="location" className={labelClass}>{isUrdu ? "مطلوبہ جگہ / شہر" : "City / Location"}</label>
                                <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} className={inputClass} placeholder={isUrdu ? "مثال: مردان سٹی، پشاور، وغیرہ" : "e.g. Mardan City"} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="notes" className={labelClass}>{isUrdu ? "مزید تفصیلات یا خصوصی شرائط (اختیاری)" : "Additional Notes"}</label>
                            <textarea id="notes" name="notes" rows={4} value={formData.notes} onChange={handleInputChange} className={inputClass} placeholder={isUrdu ? "یہاں آپ ڈیل سے متعلق کوئی اور بات لکھ سکتے ہیں..." : ""}></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-gruvbox-blue text-gruvbox-bg0 font-extrabold text-xl py-5 px-8 rounded-2xl shadow-xl hover:bg-gruvbox-aqua transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                            >
                                <Send className="h-6 w-6" />
                                {isUrdu ? "پیشہ ورانہ ڈیل کا آغاز کریں" : "Finalize & Execute Deal"}
                            </button>
                            <p className="text-center text-xs text-gruvbox-fg/50 mt-4 flex items-center justify-center gap-1">
                                <ShieldCheck className="h-3 w-3" />
                                {isUrdu ? "آپ کی فراہم کردہ معلومات مکمل طور پر خفیہ رکھی جائیں گی۔" : "Your data is secure and used for deal execution only."}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
