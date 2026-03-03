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
};

const translations = {
    ceoTitle: 'CEO',
    agent1Title: 'Rental Agent',
    agent2Title: 'Plot Agent',
    commercial: 'Commercial',
    budgetLabel: 'Budget',
    rentBudgetLabel: 'Monthly Rent',
    askingPrice: 'Asking Price',
    furnished: 'Furnished',
    unfurnished: 'Unfurnished',
    cash: 'Cash',
    installment: 'Installment',
    plot: 'Plot',
};

describe('buildWhatsAppMessage', () => {
    it('produces deterministic output for buy intent (English)', () => {
        const msg = buildWhatsAppMessage({
            formData: baseFormData,
            contactType: 'ceo',
            agentName: 'Asif Gull',
            isUrdu: false,
            leadId: 'GRE-260301-120000',
            lang: 'en',
            translations,
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

    it('produces deterministic output for buy intent (Urdu)', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, gender: 'female' },
            contactType: 'ceo',
            agentName: 'آصف گل',
            isUrdu: true,
            leadId: 'GRE-260301-120000',
            lang: 'ur',
            translations,
        });

        expect(msg).toContain('*گل رئیل اسٹیٹ اینڈ بلڈرز، مردان*');
        expect(msg).toContain('*آصف گل*');
        expect(msg).toContain('رہی'); // female suffix
        expect(msg).toContain('چاہتی'); // female want suffix
        expect(msg).toContain('خریدنے');
        expect(msg).toContain('*ریفرنس:* GRE-260301-120000');
    });

    it('includes rent-specific fields for rent intent', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, intent: 'rent', occupancyDate: '2026-04-01' },
            contactType: 'agent1',
            agentName: 'Agent A',
            isUrdu: false,
            leadId: 'GRE-260301-120000',
            lang: 'en',
            translations,
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
            isUrdu: false,
            leadId: 'GRE-260301-120000',
            lang: 'en',
            translations,
        });

        expect(msg).toContain('*Category:* commercial');
        expect(msg).toContain('*Street Width:* 30 ft');
        expect(msg).toContain('*Ownership:* registry');
        expect(msg).toContain('*Payment:* cash');
    });

    it('does not include utilities for commercial property', () => {
        const msg = buildWhatsAppMessage({
            formData: { ...baseFormData, propertyType: 'Commercial' },
            contactType: 'ceo',
            agentName: 'Test',
            isUrdu: false,
            leadId: 'GRE-260301-120000',
            lang: 'en',
            translations,
        });

        expect(msg).not.toContain('*Utilities:*');
    });

    it('produces identical output for same inputs (deterministic)', () => {
        const config = {
            formData: baseFormData,
            contactType: 'ceo' as const,
            agentName: 'Asif Gull',
            isUrdu: false,
            leadId: 'GRE-260301-120000',
            lang: 'en',
            translations,
        };

        const msg1 = buildWhatsAppMessage(config);
        const msg2 = buildWhatsAppMessage(config);
        expect(msg1).toBe(msg2);
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
    it('returns a valid wa.me URL with encoded message', () => {
        const url = buildWhatsAppUrl('923001234567', 'Hello World');
        expect(url).toBe('https://wa.me/923001234567?text=Hello%20World');
    });
});
