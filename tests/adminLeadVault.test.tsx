import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminLeadVaultModal from '../src/components/AdminLeadVaultModal';
import * as leadPersistence from '../src/lib/leadPersistence';
import { type PersistedLead } from '../src/features/contact/types';

describe('AdminLeadVaultModal component', () => {
    const mockOnClose = vi.fn();
    const sampleLeads: PersistedLead[] = [
        {
            id: 'GRE-261002-100000',
            name: 'Ali Khan',
            phone: '+923001234567',
            gender: 'male',
            budget: '50 Lakh',
            location: 'Sheikh Maltoon Mardan',
            propertyType: 'House',
            demands: 'Corner, 5 marla',
            intent: 'buy',
            marlas: '5',
            utilities: 'elecGas',
            bedrooms: '3',
            bathrooms: '2',
            furnishing: 'unfurnished',
            plotCategory: 'residential',
            paymentMethod: 'cash',
            streetWidth: '30',
            occupancyDate: '',
            ownershipType: 'Registry',
            onMainRoad: false,
            agent: 'Asif Gull (CEO)',
            timestamp: '2026-10-02T10:00:00.000Z',
            lang: 'en',
            source: '/contactCEO',
            status: 'pending',
            attempts: 1,
            messageSnapshot: 'Sample snapshot',
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns null when isOpen is false', () => {
        const { container } = render(<AdminLeadVaultModal isOpen={false} onClose={mockOnClose} />);
        expect(container.firstChild).toBeNull();
    });

    it('renders empty state when no leads exist in local cache', () => {
        vi.spyOn(leadPersistence, 'getStoredLeads').mockReturnValue([]);

        render(<AdminLeadVaultModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText(/no leads currently stored in local cache/i)).toBeDefined();
        expect(screen.getByText('0')).toBeDefined();
    });

    it('renders table with lead records when leads exist', () => {
        vi.spyOn(leadPersistence, 'getStoredLeads').mockReturnValue(sampleLeads);

        render(<AdminLeadVaultModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByText('GRE-261002-100000')).toBeDefined();
        expect(screen.getByText('Ali Khan')).toBeDefined();
        expect(screen.getByText('+923001234567')).toBeDefined();
        expect(screen.getByText('Sheikh Maltoon Mardan')).toBeDefined();
        expect(screen.getByText('buy')).toBeDefined();
    });

    it('calls onClose when close button is clicked', () => {
        vi.spyOn(leadPersistence, 'getStoredLeads').mockReturnValue([]);

        render(<AdminLeadVaultModal isOpen={true} onClose={mockOnClose} />);

        const closeBtn = screen.getByRole('button', { name: /close vault/i });
        fireEvent.click(closeBtn);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('exports CSV on button click', () => {
        vi.spyOn(leadPersistence, 'getStoredLeads').mockReturnValue(sampleLeads);

        const createObjectURLMock = vi.fn().mockReturnValue('blob:mock-url');
        const revokeObjectURLMock = vi.fn();
        globalThis.URL.createObjectURL = createObjectURLMock;
        globalThis.URL.revokeObjectURL = revokeObjectURLMock;

        render(<AdminLeadVaultModal isOpen={true} onClose={mockOnClose} />);

        const exportBtn = screen.getByRole('button', { name: /export leads as csv/i });
        fireEvent.click(exportBtn);

        expect(createObjectURLMock).toHaveBeenCalled();
    });
});
