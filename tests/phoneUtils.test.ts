import { describe, it, expect } from 'vitest';
import { normalizePhone } from '../src/lib/phoneUtils';

describe('normalizePhone', () => {
    describe('valid PK numbers', () => {
        it('normalizes local mobile format (03001234567)', () => {
            const result = normalizePhone('03001234567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923001234567');
                expect(result.waNumber).toBe('923001234567');
            }
        });

        it('normalizes with country code (+923001234567)', () => {
            const result = normalizePhone('+923001234567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923001234567');
                expect(result.waNumber).toBe('923001234567');
            }
        });

        it('normalizes with spaces (0300 123 4567)', () => {
            const result = normalizePhone('0300 123 4567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923001234567');
            }
        });

        it('normalizes with dashes (0300-123-4567)', () => {
            const result = normalizePhone('0300-123-4567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923001234567');
            }
        });

        it('normalizes Jazz number (0301)', () => {
            const result = normalizePhone('03011234567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923011234567');
            }
        });

        it('normalizes Telenor number (0345)', () => {
            const result = normalizePhone('03451234567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923451234567');
            }
        });

        it('normalizes Ufone number (0333)', () => {
            const result = normalizePhone('03331234567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.e164).toBe('+923331234567');
            }
        });

        it('strips + for waNumber', () => {
            const result = normalizePhone('+923001234567');
            expect(result.valid).toBe(true);
            if (result.valid) {
                expect(result.waNumber).not.toContain('+');
            }
        });
    });

    describe('invalid numbers', () => {
        it('rejects too-short number', () => {
            expect(normalizePhone('0300').valid).toBe(false);
        });

        it('rejects letters', () => {
            expect(normalizePhone('abcdefghijk').valid).toBe(false);
        });

        it('rejects all-brackets pattern', () => {
            expect(normalizePhone('(((((((').valid).toBe(false);
        });

        it('rejects all-dashes pattern', () => {
            expect(normalizePhone('-------').valid).toBe(false);
        });

        it('rejects empty string', () => {
            expect(normalizePhone('').valid).toBe(false);
        });

        it('rejects whitespace-only', () => {
            expect(normalizePhone('   ').valid).toBe(false);
        });

        it('rejects random digits too short for PK', () => {
            expect(normalizePhone('12345').valid).toBe(false);
        });
    });
});
