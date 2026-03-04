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
    trustYears: string;
    trustDeals: string;
    trustHQ: string;
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
    buy: string;
    sell: string;
    askingPrice: string;
    budgetLabel: string;
    marlas: string;
    marlasPlaceholder: string;
    utilities: string;
    electricity: string;
    elecGas: string;
    transactionType: string;
    rent: string;
    list: string;
    bedrooms: string;
    bathrooms: string;
    furnished: string;
    unfurnished: string;
    occupancyDate: string;
    plotCategory: string;
    corner: string;
    parkFacing: string;
    mainRoad: string;
    installment: string;
    cash: string;
    occupancyLabel: string;
    furnishingLabel: string;
    categoryLabel: string;
    paymentLabel: string;
    ownershipType: string;
    streetWidthLabel: string;
    mainRoadLabel: string;
    registry: string;
    inteqal: string;
    allotment: string;
    powerOfAttorney: string;

    // Agent Specific Roles/Titles
    ceoTitle: string;
    agent1Title: string;
    agent2Title: string;

    // Call Error Modal
    callErrorTitle: string;
    callErrorMsg: string;
    callErrorAction: string;
    close: string;

    // Production-Grade Additions
    serviceAreaTitle: string;
    serviceAreaMain: string;
    serviceAreaKPK: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
    ceoMessageTitle: string;
    ceoMessageText: string;
    ceoSignature: string;

    // Form Review & Compliance
    policyAgree: string;
    reviewTitle: string;
    reviewSub: string;
    confirmAndSend: string;
    editDetails: string;

    // 3-Step Form Navigation
    stepUserInfo: string;
    stepPropertyInfo: string;
    stepReview: string;
    nextStep: string;
    previousStep: string;

    // ContactPage Strings
    contactPageTitle: string;
    contactBackHome: string;
    contactBuySellTitle: string;
    contactBuySellDesc: string;
    contactRentTitle: string;
    contactRentDesc: string;
    contactListTitle: string;
    contactListDesc: string;
    contactSpeakCeo: string;
    contactChatAgent1: string;
    contactChatAgent2: string;
    contactCallOffice: string;

    landmarks: string[];
    rentBudgetLabel: string;
    rentBudgetPlaceholder: string;

    // Listing flow enhancements
    residential: string;
    propertyDescription: string;
    propertyDescriptionPlaceholder: string;
    listingNextStepsTitle: string;
    listingNextStepsBody: string;
    selectOwnership: string;
    askingPricePlaceholder: string;
    streetWidthPlaceholder: string;
    mainRoadToggleHint: string;
};
