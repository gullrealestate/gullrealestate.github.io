import { describe, it, expect, beforeEach, vi } from 'vitest';

// Create a manual localStorage mock
const store: Record<string, string> = {};
const localStorageMock = {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((_i: number) => null),
};

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// Import after mock is set up
import { saveLead, getStoredLeads } from '../src/lib/leadPersistence';
import { type PersistedLead } from '../src/features/contact/types';

const mockLead: PersistedLead = {
    id: 'GRE-260301-120000',
    name: 'Test User',
    phone: '03001234567',
    gender: 'male',
    budget: '50 Lac',
    location: 'Shamsi Road',
    propertyType: 'House',
    demands: 'Test demands',
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
    agent: 'Asif Gull',
    timestamp: '2026-03-01T12:00:00.000Z',
    lang: 'en',
    source: '/en/contactCEO',
    status: 'sent',
    attempts: 1,
    messageSnapshot: 'Test message snapshot',
    onMainRoad: false,
};

describe('leadPersistence', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
        vi.unstubAllGlobals();
        vi.unstubAllEnvs();
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true })));
    });

    describe('saveLead', () => {
        it('saves lead to localStorage', async () => {
            await saveLead(mockLead);
            const leads = getStoredLeads();
            expect(leads).toHaveLength(1);
            expect(leads[0].id).toBe('GRE-260301-120000');
        });

        it('attempts to POST to backend when endpoint is set', async () => {
            // Use stubEnv for VITE variables
            vi.stubEnv('VITE_LEAD_ENDPOINT', 'https://api.test/leads');

            await saveLead(mockLead);

            expect(globalThis.fetch).toHaveBeenCalledWith('https://api.test/leads', expect.any(Object));
        });

        it('does not throw when localStorage setItem throws', async () => {
            localStorageMock.setItem.mockImplementationOnce(() => { throw new Error('QuotaExceeded'); });
            await expect(saveLead(mockLead)).resolves.toBeUndefined();
        });
    });

    describe('getStoredLeads', () => {
        it('returns empty array when no leads stored', () => {
            expect(getStoredLeads()).toEqual([]);
        });

        it('returns empty array on corrupted data', () => {
            localStorageMock.getItem.mockReturnValueOnce('not-json');
            expect(getStoredLeads()).toEqual([]);
        });
    });
});
