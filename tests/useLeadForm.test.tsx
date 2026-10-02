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

    it('clears draft after sending and advances to step 4', () => {
        vi.stubGlobal('open', vi.fn(() => ({}))); // returns truthy = success
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.confirmAndSend();
        });

        expect(localStorage.removeItem).toHaveBeenCalledWith('gull_form_draft');
        expect(result.current.step).toBe(4);
        expect(result.current.submittedLead).not.toBeNull();
        expect(result.current.submittedLead?.id).toMatch(/^GRE-\d{6}-\d{6}$/);

        // Test resetForm
        act(() => {
            result.current.resetForm();
        });
        expect(result.current.step).toBe(1);
        expect(result.current.submittedLead).toBeNull();
    });

    it('validates invalid phone number format in step 1', () => {
        const { result } = renderHook(() => useLeadForm(options), { wrapper });

        act(() => {
            result.current.updateField('name', 'John');
            result.current.updateField('phone', '123'); // Invalid phone
        });

        act(() => {
            result.current.submitStep1({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(1);
        expect(result.current.errors.phone).toBe('Enter a valid phone number');

        // Test clearing error on update
        act(() => {
            result.current.updateField('phone', '03001234567');
        });
        expect(result.current.errors.phone).toBeUndefined();
    });

    it('validates rent and listing specific fields in step 2', () => {
        const rentOptions = { ...options, initialIntent: 'rent' };
        const { result } = renderHook(() => useLeadForm(rentOptions), { wrapper });

        act(() => {
            result.current.updateField('name', 'John');
            result.current.updateField('phone', '03001234567');
        });
        act(() => {
            result.current.submitStep1({ preventDefault: () => { } } as React.FormEvent);
        });

        act(() => {
            result.current.updateField('location', 'Mardan');
            result.current.updateField('marlas', '5');
            result.current.updateField('budget', '30k');
            result.current.updateField('occupancyDate', '');
        });
        act(() => {
            result.current.submitStep2({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(2);
        expect(result.current.errors.occupancyDate).toBe('Occupancy date is required');
    });

    it('validates streetWidth requirement for off-main listing in step 2', () => {
        const listOptions = { ...options, initialIntent: 'list' };
        const { result } = renderHook(() => useLeadForm(listOptions), { wrapper });

        act(() => {
            result.current.updateField('name', 'John');
            result.current.updateField('phone', '03001234567');
        });
        act(() => {
            result.current.submitStep1({ preventDefault: () => { } } as React.FormEvent);
        });

        act(() => {
            result.current.updateField('location', 'Mardan');
            result.current.updateField('marlas', '5');
            result.current.updateField('budget', '30k');
            result.current.updateField('onMainRoad', false);
            result.current.updateField('streetWidth', '');
        });
        act(() => {
            result.current.submitStep2({ preventDefault: () => { } } as React.FormEvent);
        });

        expect(result.current.step).toBe(2);
        expect(result.current.errors.streetWidth).toBe('Street width is required');
    });

    it('handles agent1 and agent2 routing and window.open exceptions cleanly', () => {
        vi.stubGlobal('open', vi.fn(() => { throw new Error('Blocked popup'); }));
        const agentOptions = {
            ...options,
            contactType: 'agent1' as const,
            agentName: 'Agent Ateeq',
            agentWhatsApp: '923001112233',
        };
        const { result } = renderHook(() => useLeadForm(agentOptions), { wrapper });

        act(() => {
            result.current.confirmAndSend();
        });

        expect(result.current.step).toBe(4);
        expect(result.current.submittedLead?.url).toContain('923001112233');
    });
});

