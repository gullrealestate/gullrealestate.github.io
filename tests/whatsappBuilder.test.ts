import { describe, it, expect } from 'vitest';
import { buildWhatsAppMessage, generateLeadId, buildWhatsAppUrl } from '../src/features/contact/utils/whatsappBuilder';
import { type LeadData } from '../src/features/contact/types';

const baseFormData: LeadData = {
    name: 'Ahmad Khan',
    phone: '03001234567',
    gender: 'male',
    budget: '50 Lac',
    location: 'Shamsi Road',
    propertyType: 'House',
    demands: 'Corner house with garden',
    intent: 'buy',
    marlas: '10',
    utilities: 'electricity',
    bedrooms: '3',
    bathrooms: '2',
    furnishing: 'unfurnished',
    plotCategory: 'residential',
    paymentMethod: 'cash',
    streetWidth: '',
    occupancyDate: '',
    ownershipType: 'registry',
    onMainRoad: false,
};

describe('buildWhatsAppMessage', () => {
    it('produces deterministic output for buy intent (English)', () => {
        const msg = buildWhatsAppMessage({
            formData: baseFormData,
            contactType: 'ceo',
            agentName: 'Asif Gull',
            leadId: 'GRE-260301-120000',
        });

        expect(msg).toContain('Assalam-o-Alaikum!');
        expect(msg).toContain('*Gull Real Estate & Builders, Mardan*');
        expect(msg).toContain('*Asif Gull*');
        expect(msg).toContain('*Ahmad Khan*');
        expect(msg).toContain('buy');
        expect(msg).toContain('*Location:* Shamsi Road');
        expect(msg).toContain('*Area:* 10 Marlas');
        expect(msg).toContain('*Budget:* 50 Lac');
        expect(msg).toContain('*Reference:* GRE-260301-120000');
        expect(msg).toContain('*Language:* English');
        expect(msg).toContain('*Utilities:* Electricity');
    });

    it('includes rent-specific fields for rent intent', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, intent: 'rent', occupancyDate: '2026-04-01' },
            contactType: 'agent1',
            agentName: 'Agent A',
            leadId: 'GRE-260301-120000',
        });

        expect(msg).toContain('*Bedrooms:* 3');
        expect(msg).toContain('*Bathrooms:* 2');
        expect(msg).toContain('*Furnishing:* unfurnished');
        expect(msg).toContain('*Occupancy Date:* 2026-04-01');
        expect(msg).toContain('rent');
    });

    it('includes list-specific fields for list intent', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, intent: 'list', streetWidth: '30', plotCategory: 'commercial' },
            contactType: 'agent1',
            agentName: 'Agent A',
            leadId: 'GRE-260301-120000',
        });

        expect(msg).toContain('*Street Width:* 30 ft');
        expect(msg).toContain('*Ownership:* Registry');
        expect(msg).toContain('*Payment:* Full Cash');
        expect(msg).not.toContain('*Category:*'); // Removed for listings
    });

    it('handles main road listing', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, intent: 'list', onMainRoad: true, ownershipType: 'inteqal' },
            contactType: 'ceo',
            agentName: 'CEO',
            leadId: 'GRE-123',
        });

        expect(msg).toContain('*Road:* Is it on the Main Road?');
        expect(msg).toContain('*Ownership:* Inteqal');
        expect(msg).not.toContain('*Street Width:*');
    });

    it('handles CEO listing intent', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, intent: 'list' },
            contactType: 'ceo',
            agentName: 'Asif Gull',
            leadId: 'GRE-123',
        });
        expect(msg).toContain('list property');
    });

    it('does not include utilities for commercial property ("Shop / Plaza")', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, propertyType: 'Shop / Plaza' },
            contactType: 'ceo',
            agentName: 'Test',
            leadId: 'GRE-260301-120000',
        });

        expect(msg).not.toContain('*Utilities:*');
    });

    it('produces identical output for same inputs (deterministic)', () => {
        const config = {
            formData: baseFormData,
            contactType: 'ceo' as const,
            agentName: 'Asif Gull',
            leadId: 'GRE-260301-120000',
        };

        const msg1 = buildWhatsAppMessage(config);
        const msg2 = buildWhatsAppMessage(config);
        expect(msg1).toBe(msg2);
    });

    it('matches stable baseline snapshots (Regression Check)', () => {
        // EN Snapshot
        const msgEn = buildWhatsAppMessage({
            formData: baseFormData,
            contactType: 'ceo',
            agentName: 'Asif Gull',
            leadId: 'GRE-260301-120000',
        });
        expect(msgEn).toMatchSnapshot('en-whatsapp');
    });
});

describe('generateLeadId', () => {
    it('returns a string starting with GRE-', () => {
        const id = generateLeadId();
        expect(id).toMatch(/^GRE-\d{6}-\d{6}$/);
    });

    it('generates different IDs at different times', async () => {
        const id1 = generateLeadId();
        await new Promise(r => setTimeout(r, 1100));
        const id2 = generateLeadId();
        expect(id1).not.toBe(id2);
    });
});

describe('buildWhatsAppUrl', () => {
    it('returns web.whatsapp.com URL on desktop', () => {
        const url = buildWhatsAppUrl('923001234567', 'Hello World');
        expect(url).toBe('https://web.whatsapp.com/send?phone=923001234567&text=Hello%20World');
    });

    it('returns whatsapp:// protocol on mobile', () => {
        const originalUA = navigator.userAgent;
        Object.defineProperty(navigator, 'userAgent', {
            value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
            configurable: true,
        });

        const url = buildWhatsAppUrl('923001234567', 'Hello World');
        expect(url).toBe('whatsapp://send?phone=923001234567&text=Hello%20World');

        Object.defineProperty(navigator, 'userAgent', {
            value: originalUA,
            configurable: true,
        });
    });

    it('preserves emoji as literal Unicode and encodes ASCII specials', () => {
        const msg = '📍 *Location:* Mardan\n🏠 House & 💰 50 Lac';
        const url = buildWhatsAppUrl('923001234567', msg);

        // Emoji must appear as literal Unicode, NOT percent-encoded
        expect(url).toContain('📍');
        expect(url).toContain('🏠');
        expect(url).toContain('💰');

        expect(url).toContain('Mardan');

        // ASCII specials must be percent-encoded
        expect(url).toContain('%20');   // space
        expect(url).toContain('%26');   // ampersand &
        expect(url).toContain('%0A');   // newline \n
        // Asterisk * is RFC 3986 unreserved — stays literal (correct for WhatsApp bold)
        expect(url).toContain('*');

        // Must NOT contain percent-encoded emoji sequences
        expect(url).not.toContain('%F0%9F%93%8D'); // 📍
        expect(url).not.toContain('%F0%9F%8F%A0'); // 🏠
        expect(url).not.toContain('%F0%9F%92%B0'); // 💰
    });
});
