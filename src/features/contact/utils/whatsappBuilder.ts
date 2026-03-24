import { type LeadData, type ContactType } from '../types';
import { content } from '../../../content';

interface WhatsAppConfig {
    formData: LeadData;
    contactType: ContactType;
    agentName: string;
    leadId: string;
}

/**
 * Pure, deterministic WhatsApp message builder.
 * Returns the raw message string (not URI-encoded).
 */
export function buildWhatsAppMessage(config: WhatsAppConfig): string {
    const { formData, contactType, agentName, leadId } = config;
    const { name, phone, budget, location, propertyType, demands, intent, marlas, utilities, onMainRoad, ownershipType } = formData;

    const brand = '*Gull Real Estate & Builders, Mardan*';
    const greeting = 'Assalam-o-Alaikum!';

    let message = `${greeting}\n${brand}\n\n`;

    const agentRole = contactType === 'ceo' ? content.ceoTitle : (contactType === 'agent1' ? content.agent1Title : content.agent2Title);

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
        const ownText = ownershipType === 'registry' ? content.registry : (ownershipType === 'inteqal' ? content.inteqal : (ownershipType === 'allotment' ? content.allotment : content.powerOfAttorney));
        message += `📜 *Ownership:* ${ownText}\n`;
        if (onMainRoad) {
            message += `🛣️ *Road:* ${content.mainRoadLabel}\n`;
        } else {
            message += `🛣️ *Street Width:* ${formData.streetWidth} ft\n`;
        }
        message += `💳 *Payment:* ${formData.paymentMethod === 'cash' ? content.cash : content.installment}\n`;
    }

    if (contactType === 'ceo' && (intent === 'buy' || intent === 'sell')) {
        message += `🏷️ *Category:* ${formData.plotCategory === 'residential' ? content.residential : content.commercial}\n`;
    }

    if (intent !== 'rent' && propertyType !== content.commercial) {
        if (contactType === 'ceo' || intent === 'buy' || intent === 'sell') {
            message += `⚡ *Utilities:* ${utilities === 'electricity' ? 'Electricity' : 'Electricity & Gas'}\n`;
        }
    }

    const priceLabel = intent === 'buy' ? content.budgetLabel : (intent === 'rent' ? content.rentBudgetLabel : content.askingPrice);
    message += `💰 *${priceLabel}:* ${budget}\n`;
    const demandsLabel = (intent === 'list' || intent === 'sell') ? 'Description' : content.demands;
    message += `📝 *${demandsLabel}:* ${demands}\n`;
    message += `📞 *Contact Number:* ${phone}\n`;
    message += `🆔 *Reference:* ${leadId}\n`;
    message += `🌐 *Language:* English\n\n`;
    message += `Please assist me in this regard. Thank you!`;

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
 */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
    const encoded = encodeWhatsAppText(message);
    if (isMobile()) {
        return `whatsapp://send?phone=${whatsappNumber}&text=${encoded}`;
    }
    return `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encoded}`;
}
