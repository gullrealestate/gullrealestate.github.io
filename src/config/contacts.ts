export interface Agent {
    id: string;
    name: {
        en: string;
        ur: string;
    };
    role: string;
    whatsapp: string;
    email?: string;
}

export const AGENTS: Record<string, Agent> = {
    ceo: {
        id: 'ceo',
        name: {
            en: 'Asif Gull',
            ur: 'آصف گل'
        },
        role: 'Consultation & Strategy',
        whatsapp: '923149393930',
    },
    agent1: {
        id: 'agent1',
        name: {
            en: 'Syed Ateeq ur Rahman',
            ur: 'سید عتیق الرحمن'
        },
        role: 'Rental & Listings',
        whatsapp: '923149624277',
    },
    agent2: {
        id: 'agent2',
        name: {
            en: 'Mian Abdul Haq',
            ur: 'میاں عبدالحق'
        },
        role: 'Plot Sales',
        whatsapp: '923142121370',
    }
};

export type IntentType = 'buy' | 'rent' | 'list';

export interface IntentConfig {
    id: IntentType;
    label: {
        en: string;
        ur: string;
    };
    defaultAgentId: string;
}

export const INTENTS: IntentConfig[] = [
    {
        id: 'buy',
        label: { en: 'Buy Property', ur: 'پراپرٹی خریدیں' },
        defaultAgentId: 'ceo',
    },
    {
        id: 'rent',
        label: { en: 'Rent Property', ur: 'کرایہ پر لیں' },
        defaultAgentId: 'agent1',
    },
    {
        id: 'list',
        label: { en: 'List a Property', ur: 'پراپرٹی لسٹ کریں' },
        defaultAgentId: 'agent1',
    }
];
