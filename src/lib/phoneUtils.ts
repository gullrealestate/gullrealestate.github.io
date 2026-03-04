import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';

export type PhoneResult =
    | { valid: true; e164: string; waNumber: string }
    | { valid: false };

/**
 * Validate and normalize a phone number to E.164 format.
 * Default country: PK (Pakistan).
 *
 * Returns normalized E.164 string and wa.me-compatible number (no '+' prefix),
 * or { valid: false } for invalid input.
 */
export function normalizePhone(input: string, defaultCountry: 'PK' | 'AF' | 'IN' = 'PK'): PhoneResult {
    try {
        const parsed = parsePhoneNumberFromString(input, defaultCountry);
        if (!parsed || !parsed.isValid()) {
            return { valid: false };
        }
        const e164 = parsed.format('E.164');
        return {
            valid: true,
            e164,
            waNumber: e164.replace(/^\+/, ''),
        };
    } catch {
        return { valid: false };
    }
}
