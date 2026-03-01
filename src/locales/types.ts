export type TranslationSchema = {
    title: string;
    description: string;
    items: (string | { label: string; content: string })[];
    footer: string;
    button: string;
    metaTitle: string;
    metaDesc: string;
    heroTitle: string;
    heroSub: string;
    heroBtn: string;
    servicesTitle: string;
    servicesSub: string;
    buySellTitle: string;
    buySellDesc: string;
    tenantTitle: string;
    tenantDesc: string;
    landlordTitle: string;
    landlordDesc: string;
    howItWorksTitle: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    citySections: {
        id: string;
        title: string;
        content: string;
    }[];
    contactCta: string;
    contactSub: string;
    contactBtn: string;

    // New Contact Page Translations
    contactFormTitle: string;
    contactFormSub: string;
    fullName: string;
    namePlaceholder: string;
    gender: string;
    male: string;
    female: string;
    whatsappNumber: string;
    phonePlaceholder: string;
    propertyType: string;
    selectType: string;
    house: string;
    plot: string;
    commercial: string;
    budget: string;
    budgetPlaceholder: string;
    location: string;
    locationPlaceholder: string;
    demands: string;
    demandsPlaceholder: string;
    submitForm: string;
    privacyNote: string;
    backToContact: string;

    // Agent Specific Roles/Titles
    ceoTitle: string;
    agent1Title: string;
    agent2Title: string;

    // Call Error Modal
    callErrorTitle: string;
    callErrorMsg: string;
    callErrorAction: string;
    close: string;
};
