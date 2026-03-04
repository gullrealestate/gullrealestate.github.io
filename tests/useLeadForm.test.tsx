import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLeadForm } from '../src/features/contact/hooks/useLeadForm';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { type TranslationSchema } from '../src/locales/types';

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { Object.keys(store).forEach(k => delete store[k]); }),
};
vi.stubGlobal('localStorage', localStorageMock);

// Mock dependencies
vi.mock('../../../lib/analytics', () => ({
    trackEvent: vi.fn(),
}));
vi.mock('../../../lib/leadPersistence', () => ({
    saveLead: vi.fn(),
}));
vi.mock('../../../lib/funnelTracker', () => ({
    setFunnelStage: vi.fn(),
}));

const mockT = {
    house: 'House',
    ceoTitle: 'CEO',
    agent1Title: 'Agent A',
    agent2Title: 'Agent B',
    commercial: 'Commercial',
    budgetLabel: 'Budget',
    rentBudgetLabel: 'Rent',
    askingPrice: 'Price',
    furnished: 'Furnished',
    unfurnished: 'Unfurnished',
    cash: 'Cash',
    installment: 'Installment',
    plot: 'Plot',
} as unknown as TranslationSchema;

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
);

describe('useLeadForm', () => {
    const options = {
        contactType: 'ceo' as const,
        agentName: 'CEO Name',
        agentWhatsApp: '123456',
        isUrdu: false,
        lang: 'en',
        t: mockT,
        initialIntent: 'buy',
    };

    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
    });

    it('initializes with default values', () => {
        const { result } = renderHook(() => useLeadForm(options), { wrapper });
        expect(result.current.step).toBe(1);
        expect(result.current.formData.name).toBe('');
    });

    it('updates fields correctly', () => {
        const { result } = renderHook(() => useLeadForm(options), { wrapper });
        act(() => {
            result.current.updateField('name', 'John Doe');
        });
        expect(result.current.formData.name).toBe('John Doe');
    });

    it('validates step 1 and advances', () => {
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.updateField('name', 'John');
            result.current.updateField('phone', '03001234567');
        });

        act(() => {
            result.current.submitStep1({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(2);
    });

    it('shows errors on invalid step 1', () => {
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.submitStep1({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(1);
        expect(result.current.errors.name).toBeDefined();
    });

    it('validates step 2 and advances to review', () => {
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        // Pass step 1
        act(() => {
            result.current.updateField('name', 'John');
            result.current.updateField('phone', '03001234567');
        });
        act(() => {
            result.current.submitStep1({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(2);

        // Fail step 2
        act(() => {
            result.current.submitStep2({ preventDefault: () => { } } as React.FormEvent);
        });
        expect(result.current.step).toBe(2);

        // Pass step 2
        act(() => {
            result.current.updateField('location', 'Mardan');
            result.current.updateField('marlas', '5');
            result.current.updateField('budget', '1Cr');
            result.current.updateField('demands', 'Test');
        });
        act(() => {
            result.current.submitStep2({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(3);
    });

    it('restores draft from localStorage', () => {
        localStorage.setItem('gull_form_draft', JSON.stringify({ name: 'Draft User' }));
        const { result } = renderHook(() => useLeadForm(options), { wrapper });
        expect(result.current.formData.name).toBe('Draft User');
    });

    it('clears draft after sending (window.open succeeds)', () => {
        vi.stubGlobal('open', vi.fn(() => ({}))); // returns truthy = success
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.confirmAndSend();
        });

        expect(localStorage.removeItem).toHaveBeenCalledWith('gull_form_draft');
        // Modal always shows for confirmation
        expect(result.current.fallback).not.toBeNull();
        expect(result.current.fallback?.popupBlocked).toBe(false);
    });

    it('shows fallback with popupBlocked when window.open returns null', () => {
        vi.stubGlobal('open', vi.fn(() => null)); // returns null = blocked
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.confirmAndSend();
        });

        expect(result.current.fallback).not.toBeNull();
        expect(result.current.fallback?.popupBlocked).toBe(true);
        expect(result.current.fallback?.message).toBeDefined();
        expect(result.current.fallback?.waUrl).toContain('whatsapp.com');
    });

    it('dismisses fallback on dismissFallback', () => {
        vi.stubGlobal('open', vi.fn(() => ({})));
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.confirmAndSend();
        });
        expect(result.current.fallback).not.toBeNull();

        act(() => {
            result.current.dismissFallback();
        });
        expect(result.current.fallback).toBeNull();
    });

    it('clears fallback on confirmFallbackSent', () => {
        vi.stubGlobal('open', vi.fn(() => ({})));
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.confirmAndSend();
        });
        expect(result.current.fallback).not.toBeNull();

        act(() => {
            result.current.confirmFallbackSent();
        });
        expect(result.current.fallback).toBeNull();
    });
});
