/** Strict interface for lead/form data across all contact flows */
export interface LeadData {
    name: string;
    phone: string;
    gender: 'male' | 'female';
    budget: string;
    location: string;
    propertyType: string;
    demands: string;
    intent: 'buy' | 'sell' | 'rent' | 'list';
    marlas: string;
    utilities: 'electricity' | 'elecGas';
    bedrooms: string;
    bathrooms: string;
    furnishing: 'furnished' | 'unfurnished';
    plotCategory: 'residential' | 'commercial';
    paymentMethod: 'cash' | 'installment';
    streetWidth: string;
    occupancyDate: string;
    ownershipType: string;
}

export type ContactType = 'ceo' | 'agent1' | 'agent2';

export interface ContactFormProps {
    contactType: ContactType;
    agentNames: { en: string; ur: string };
    agentWhatsApp: string;
}

export interface StepProps {
    formData: LeadData;
    onFieldChange: (name: keyof LeadData, value: string) => void;
    contactType: ContactType;
    isUrdu: boolean;
    translations: Record<string, unknown>;
}

/** Validation error map keyed by field name */
export type ValidationErrors = Partial<Record<keyof LeadData, string>>;

/** Lead record persisted to storage */
export interface PersistedLead extends LeadData {
    id: string;
    agent: string;
    timestamp: string;
    lang: string;
    source: string;
}
