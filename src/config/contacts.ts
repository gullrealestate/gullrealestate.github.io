export interface Agent {
    id: string;
    name: {
        en: string;
    };
    role: string;
    whatsapp: string;
    email?: string;
}

export const AGENTS: Record<string, Agent> = {
    ceo: {
        id: 'ceo',
        name: {
            en: 'Asif Gull'
        },
        role: 'Consultation & Strategy',
        whatsapp: '923149393930',
    },
    agent1: {
        id: 'agent1',
        name: {
            en: 'Syed Ateeq ur Rahman'
        },
        role: 'Rental & Listings',
        whatsapp: '923149624277',
    },
    agent2: {
        id: 'agent2',
        name: {
            en: 'Mian Abdul Haq'
        },
        role: 'Plot Sales',
        whatsapp: '923142121370',
    }
};

export type IntentType = 'buy' | 'rent' | 'list';

export interface IntentConfig {
    id: IntentType;
    label: string;
    defaultAgentId: string;
}

export const INTENTS: IntentConfig[] = [
    {
        id: 'buy',
        label: 'Buy Property',
        defaultAgentId: 'ceo',
    },
    {
        id: 'rent',
        label: 'Rent Property',
        defaultAgentId: 'agent1',
    },
    {
        id: 'list',
        label: 'List a Property',
        defaultAgentId: 'agent1',
    }
];
