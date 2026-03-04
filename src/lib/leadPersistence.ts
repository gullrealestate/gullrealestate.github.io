import { type PersistedLead } from '../features/contact/types';

const LEADS_KEY = 'gull_leads';

/**
 * Save a lead to localStorage for WhatsApp lead durability.
 * Optionally POSTs sanitized data to a backend endpoint if configured.
 * Never throws — WhatsApp send is independent of persistence.
 */
export async function saveLead(lead: PersistedLead): Promise<void> {
    // 1. Always save to localStorage first
    try {
        const existing = getStoredLeads();
        existing.push(lead);
        localStorage.setItem(LEADS_KEY, JSON.stringify(existing));
    } catch {
        // localStorage quota exceeded — no-op, WhatsApp still works
    }

    // 2. If backend endpoint is configured, POST the lead
    const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;
    if (endpoint && typeof endpoint === 'string') {
        try {
            // Strip PII-sensitive fields before sending to analytics backend
            const sanitized = {
                id: lead.id,
                agent: lead.agent,
                timestamp: lead.timestamp,
                lang: lead.lang,
                source: lead.source,
                intent: lead.intent,
                propertyType: lead.propertyType,
                location: lead.location,
            };

            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sanitized),
            });
        } catch {
            // Backend POST failed — lead is already in localStorage, no-op
        }
    }
}

/** Retrieve all locally stored leads */
export function getStoredLeads(): PersistedLead[] {
    try {
        const raw = localStorage.getItem(LEADS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}
