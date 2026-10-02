import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepSuccess from '../src/features/contact/steps/StepSuccess';

describe('StepSuccess component', () => {
    const mockOnReset = vi.fn();
    const props = {
        leadId: 'GRE-261002-120000',
        agentName: 'Asif Gull (CEO)',
        agentWhatsApp: '923149393930',
        whatsAppUrl: 'https://wa.me/923149393930?text=Hello',
        message: 'Hello, this is a test lead inquiry.',
        onReset: mockOnReset,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders confirmation details, lead ID, and agent contact', () => {
        render(<StepSuccess {...props} />);

        expect(screen.getByTestId('step-success')).toBeDefined();
        expect(screen.getByTestId('lead-id-badge').textContent).toBe(props.leadId);
        expect(screen.getByText(props.agentName)).toBeDefined();
        expect(screen.getByText(`+${props.agentWhatsApp}`)).toBeDefined();
    });

    it('provides a direct WhatsApp link that bypasses popup blockers', () => {
        render(<StepSuccess {...props} />);

        const whatsappLink = screen.getByRole('link', { name: /open whatsapp now/i });
        expect(whatsappLink.getAttribute('href')).toBe(props.whatsAppUrl);
        expect(whatsappLink.getAttribute('target')).toBe('_blank');
        expect(whatsappLink.getAttribute('rel')).toContain('noopener');
    });

    it('copies formatted message to clipboard on copy button click', async () => {
        const writeTextMock = vi.fn().mockResolvedValue(undefined);
        Object.assign(navigator, {
            clipboard: {
                writeText: writeTextMock,
            },
        });

        render(<StepSuccess {...props} />);

        const copyButton = screen.getByRole('button', { name: /copy message to clipboard/i });
        fireEvent.click(copyButton);

        expect(writeTextMock).toHaveBeenCalledWith(props.message);
        await waitFor(() => {
            expect(screen.getByText(/message copied to clipboard!/i)).toBeDefined();
        });
    });

    it('calls onReset when user clicks start new inquiry', () => {
        render(<StepSuccess {...props} />);

        const resetButton = screen.getByRole('button', { name: /start another inquiry/i });
        fireEvent.click(resetButton);

        expect(mockOnReset).toHaveBeenCalledTimes(1);
    });
});
