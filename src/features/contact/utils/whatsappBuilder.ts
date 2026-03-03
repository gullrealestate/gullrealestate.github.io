import { type LeadData, type ContactType } from '../types';

interface WhatsAppConfig {
    formData: LeadData;
    contactType: ContactType;
    agentName: string;
    isUrdu: boolean;
    leadId: string;
    lang: string;
    translations: {
        ceoTitle: string;
        agent1Title: string;
        agent2Title: string;
        commercial: string;
        budgetLabel: string;
        rentBudgetLabel: string;
        askingPrice: string;
        furnished: string;
        unfurnished: string;
        cash: string;
        installment: string;
        plot: string;
    };
}

/**
 * Pure, deterministic WhatsApp message builder.
 * Returns the raw message string (not URI-encoded).
 */
export function buildWhatsAppMessage(config: WhatsAppConfig): string {
    const { formData, contactType, agentName, isUrdu, leadId, lang, translations: t } = config;
    const { name, phone, budget, location, propertyType, demands, gender, intent, marlas, utilities } = formData;

    const brand = isUrdu
        ? '*گل رئیل اسٹیٹ اینڈ بلڈرز، مردان*'
        : '*Gull Real Estate & Builders, Mardan*';
    const greeting = 'Assalam-o-Alaikum!';

    let message = `${greeting}\n${brand}\n\n`;

    const agentRole = contactType === 'ceo' ? t.ceoTitle : (contactType === 'agent1' ? t.agent1Title : t.agent2Title);

    if (isUrdu) {
        const actionSuffix = gender === 'female' ? 'رہی' : 'رہا';
        const wantSuffix = gender === 'female' ? 'چاہتی' : 'چاہتا';
        const intentText = contactType === 'ceo'
            ? (intent === 'buy' ? 'خریدنے' : 'بیچنے')
            : (intent === 'rent' ? 'کرایہ پر لینے' : 'لسٹنگ کروانے');

        message += `جناب *${agentName}* (${agentRole})، میں *${name}* بات کر ${actionSuffix} ہوں۔ میں آپ کی کمپنی کے ذریعے ${intentText} میں دلچسپی ${wantSuffix} ہوں۔ میری تفصیلات درج ذیل ہیں:\n\n`;
        message += `📍 *مقام:* ${location}\n`;
        message += `🏠 *نوعیت:* ${propertyType || 'کوئی بھی'}\n`;
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
                message += `⚡ *سہولیات:* ${utilities === 'electricity' ? 'بجلی' : 'بجلی اور گیس'}\n`;
            }
        }

        const priceLabel = intent === 'buy' ? t.budgetLabel : (intent === 'rent' ? t.rentBudgetLabel : t.askingPrice);
        message += `💰 *${priceLabel}:* ${budget}\n`;
        message += `📝 *مطالبات:* ${demands}\n`;
        message += `📞 *رابطہ نمبر:* ${phone}\n`;
        message += `🆔 *ریفرنس:* ${leadId}\n`;
        message += `🌐 *زبان:* ${lang === 'ur' ? 'اردو' : 'English'}\n\n`;
        message += `براہ کرم اس معاملے میں میری مدد کریں۔ شکریہ!`;
    } else {
        const intentText = contactType === 'ceo'
            ? (intent === 'buy' ? 'buy' : 'sell')
            : (intent === 'rent' ? 'rent' : 'list');

        message += `Dear *${agentName}* (${agentRole}), my name is *${name}*. I am looking to ${intentText} property through your company. Here are my details:\n\n`;
        message += `📍 *Location:* ${location}\n`;
        message += `🏠 *Property Type:* ${propertyType || 'Any'}\n`;
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
                message += `⚡ *Utilities:* ${utilities === 'electricity' ? 'Electricity' : 'Elec & Gas'}\n`;
            }
        }

        const priceLabel = intent === 'buy' ? t.budgetLabel : (intent === 'rent' ? t.rentBudgetLabel : t.askingPrice);
        message += `💰 *${priceLabel}:* ${budget}\n`;
        message += `📝 *Demands:* ${demands}\n`;
        message += `📞 *Contact Number:* ${phone}\n`;
        message += `🆔 *Reference:* ${leadId}\n`;
        message += `🌐 *Language:* ${lang === 'ur' ? 'Urdu' : 'English'}\n\n`;
        message += `Please assist me in this regard. Thank you!`;
    }

    return message;
}

/** Generate a deterministic lead ID based on timestamp */
export function generateLeadId(): string {
    const now = new Date();
    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    return `GRE-${y}${m}${d}-${h}${min}${s}`;
}

/** Build the full WhatsApp URL */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
