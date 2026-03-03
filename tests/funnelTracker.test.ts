import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

// Mock analytics BEFORE importing the module that uses it
vi.mock('../src/lib/analytics', () => ({
    trackEvent: vi.fn(),
}));

import { trackEvent } from '../src/lib/analytics';
import { setFunnelStage, getFunnelState } from '../src/lib/funnelTracker';

describe('funnelTracker', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
    });

    it('initializes with null state', () => {
        expect(getFunnelState()).toBeNull();
    });

    it('sets the landing stage correctly', () => {
        setFunnelStage('landing', { lang: 'en', route: '/en' });
        const state = getFunnelState();
        expect(state?.stage).toBe('landing');
        expect(state?.lang).toBe('en');
        expect(state?.route).toBe('/en');
        expect(trackEvent).toHaveBeenCalledWith('FunnelProgress', expect.objectContaining({
            action: 'landing',
            category: 'Conversion'
        }));
    });

    it('advances to next stage', () => {
        setFunnelStage('landing', { lang: 'en', route: '/en' });
        setFunnelStage('cta_clicked', { lang: 'en', route: '/en' });
        expect(getFunnelState()?.stage).toBe('cta_clicked');
        expect(trackEvent).toHaveBeenCalledTimes(2);
    });

    it('prevents regression to previous stage', () => {
        setFunnelStage('form_started', { lang: 'en', route: '/en/contact' });
        setFunnelStage('landing', { lang: 'en', route: '/en' }); // regression
        expect(getFunnelState()?.stage).toBe('form_started');
        expect(trackEvent).toHaveBeenCalledTimes(1);
    });

    it('allows skipping stages forward', () => {
        setFunnelStage('whatsapp_clicked', { lang: 'ur', route: '/ur/contact' });
        expect(getFunnelState()?.stage).toBe('whatsapp_clicked');
    });

    it('handles localStorage errors gracefully', () => {
        localStorageMock.setItem.mockImplementationOnce(() => { throw new Error('QuotaExceeded'); });
        // Should not throw
        setFunnelStage('landing', { lang: 'en', route: '/en' });
    });

    it('returns null on corrupted JSON in localStorage', () => {
        localStorageMock.getItem.mockReturnValueOnce('invalid-json');
        expect(getFunnelState()).toBeNull();
    });
});
