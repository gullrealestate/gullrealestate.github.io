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
        plot: string;
        commercial: string;
        registry: string;
        inteqal: string;
        allotment: string;
        powerOfAttorney: string;
        mainRoadLabel: string;
        budgetLabel: string;
        rentBudgetLabel: string;
        askingPrice: string;
        furnished: string;
        unfurnished: string;
        cash: string;
        installment: string;
    };
}

/**
 * Pure, deterministic WhatsApp message builder.
 * Returns the raw message string (not URI-encoded).
 */
export function buildWhatsAppMessage(config: WhatsAppConfig): string {
    const { formData, contactType, agentName, isUrdu, leadId, lang, translations: t } = config;
    const { name, phone, budget, location, propertyType, demands, gender, intent, marlas, utilities, onMainRoad, ownershipType } = formData;

    const brand = isUrdu
        ? '*گل رئیل اسٹیٹ اینڈ بلڈرز، مردان*'
        : '*Gull Real Estate & Builders, Mardan*';
    const greeting = 'Assalam-o-Alaikum!';

    let message = `${greeting}\n${brand}\n\n`;

    const agentRole = contactType === 'ceo' ? t.ceoTitle : (contactType === 'agent1' ? t.agent1Title : t.agent2Title);

    if (isUrdu) {
        const actionSuffix = gender === 'female' ? 'رہی' : 'رہا';
        const wantSuffix = gender === 'female' ? 'چاہتی' : 'چاہتا';
        const intentText = (contactType === 'ceo' && intent !== 'list')
            ? (intent === 'buy' ? 'خریدنے' : 'بیچنے')
            : (intent === 'rent' ? 'کرایہ پر لینے' : 'لسٹنگ کروانے');

        const rlm = '\u200F';
        message += `${rlm}جناب *${agentName}* (${agentRole})، میں *${name}* بات کر ${actionSuffix} ہوں۔ میں آپ کی کمپنی کے ذریعے ${intentText} میں دلچسپی ${wantSuffix} ہوں۔ میری تفصیلات درج ذیل ہیں:\n\n`;
        message += `${rlm}📍 *مقام:* ${location}\n`;
        message += `${rlm}🏠 *نوعیت:* ${propertyType || 'کوئی بھی'}\n`;
        message += `${rlm}📐 *رقبہ:* ${marlas} مرلے\n`;

        if (intent === 'rent') {
            message += `${rlm}🛏️ *کمرے:* ${formData.bedrooms}\n`;
            message += `${rlm}🚿 *باتھ روم:* ${formData.bathrooms}\n`;
            message += `${rlm}🛋️ *فرنیچر:* ${formData.furnishing === 'furnished' ? t.furnished : t.unfurnished}\n`;
            message += `${rlm}📅 *قبضہ درکار:* ${formData.occupancyDate}\n`;
        } else if (intent === 'list') {
            const ownText = ownershipType === 'registry' ? t.registry : (ownershipType === 'inteqal' ? t.inteqal : (ownershipType === 'allotment' ? t.allotment : t.powerOfAttorney));
            message += `${rlm}🏷️ *کیٹیگری:* ${formData.plotCategory === 'residential' ? t.plot : t.commercial}\n`;
            message += `${rlm}📜 *ملکیت:* ${ownText}\n`;
            if (onMainRoad) {
                message += `${rlm}🛣️ *روڈ:* ${t.mainRoadLabel}\n`;
            } else {
                message += `${rlm}🛣️ *گلی:* ${formData.streetWidth} فٹ\n`;
            }
            message += `${rlm}💳 *ادائیگی:* ${formData.paymentMethod === 'cash' ? t.cash : t.installment}\n`;
        } else if (contactType === 'ceo' || intent === 'buy' || intent === 'sell') {
            if (propertyType !== t.commercial) {
                message += `${rlm}⚡ *سہولیات:* ${utilities === 'electricity' ? 'بجلی' : 'بجلی اور گیس'}\n`;
            }
        }

        const priceLabel = intent === 'buy' ? t.budgetLabel : (intent === 'rent' ? t.rentBudgetLabel : t.askingPrice);
        message += `${rlm}💰 *${priceLabel}:* ${budget}\n`;
        message += `${rlm}📝 *مطالبات:* ${demands}\n`;
        message += `${rlm}📞 *رابطہ نمبر:* ${phone}\n`;
        message += `${rlm}🆔 *ریفرنس:* ${leadId}\n`;
        message += `${rlm}🌐 *زبان:* ${lang === 'ur' ? 'اردو' : 'English'}\n\n`;
        message += `${rlm}براہ کرم اس معاملے میں میری مدد کریں۔ شکریہ!`;
    } else {
        const intentText = (contactType === 'ceo' && intent !== 'list')
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
            const catText = formData.plotCategory === 'residential' ? t.plot : t.commercial;
            const ownText = ownershipType === 'registry' ? t.registry : (ownershipType === 'inteqal' ? t.inteqal : (ownershipType === 'allotment' ? t.allotment : t.powerOfAttorney));
            message += `🏷️ *Category:* ${catText}\n`;
            message += `📜 *Ownership:* ${ownText}\n`;
            if (onMainRoad) {
                message += `🛣️ *Road:* ${t.mainRoadLabel}\n`;
            } else {
                message += `🛣️ *Street Width:* ${formData.streetWidth} ft\n`;
            }
            message += `💳 *Payment:* ${formData.paymentMethod === 'cash' ? t.cash : t.installment}\n`;
        } else if (contactType === 'ceo' || intent === 'buy' || intent === 'sell') {
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

/**
 * Encode a message for use in a wa.me ?text= parameter.
 *
 * Strategy: character-by-character encoding.
 * - ASCII (code point ≤ 127): apply encodeURIComponent() — correctly encodes
 *   spaces, &, =, #, *, and other structurally significant URL characters.
 * - Non-ASCII (code point > 127): leave as raw literal — wa.me handles
 *   literal Unicode (emoji, Urdu, Arabic) correctly and renders them in the
 *   pre-filled message. encodeURIComponent() would convert these to percent
 *   sequences that many WhatsApp clients fail to decode.
 *
 * Do NOT use encodeURI() — it leaves &, =, +, #, ? unencoded, which breaks
 * the URL structure.
 */
function encodeWhatsAppText(message: string): string {
    return [...message]
        .map(char => {
            const code = char.codePointAt(0);
            if (code !== undefined && code <= 127) {
                return encodeURIComponent(char);
            }
            return char;
        })
        .join('');
}

/** Detect mobile devices via userAgent */
function isMobile(): boolean {
    if (typeof navigator === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Build the full WhatsApp URL.
 * - Mobile: whatsapp://send protocol for native app deep-link
 * - Desktop: web.whatsapp.com/send for WhatsApp Web (handles emoji correctly)
 */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
    const encoded = encodeWhatsAppText(message);
    if (isMobile()) {
        return `whatsapp://send?phone=${whatsappNumber}&text=${encoded}`;
    }
    return `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encoded}`;
}
