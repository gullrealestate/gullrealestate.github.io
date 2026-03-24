import { useState, useEffect, useCallback } from 'react';
import { type LeadData, type ContactType, type ValidationErrors } from '../types';
import { buildWhatsAppMessage, generateLeadId, buildWhatsAppUrl } from '../utils/whatsappBuilder';
import { saveLead } from '../../../lib/leadPersistence';
import { trackEvent } from '../../../lib/analytics';
import { normalizePhone } from '../../../lib/phoneUtils';
import { setFunnelStage } from '../../../lib/funnelTracker';
import { useLocation } from 'react-router-dom';
import { content } from '../../../content';

const DRAFT_KEY = 'gull_form_draft';

function loadDraft(): Partial<LeadData> | null {
    try {
        const stored = localStorage.getItem(DRAFT_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

function persistDraft(data: LeadData): void {
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch { /* quota errors */ }
}

function clearDraft(): void {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch { /* ignore */ }
}

export function getDefaultFormData(initialIntent: string | null): LeadData {
    return {
        name: '',
        phone: '',
        gender: 'male',
        budget: '',
        location: '',
        propertyType: content.house,
        demands: '',
        intent: (initialIntent as LeadData['intent']) || 'buy',
        marlas: '',
        utilities: 'electricity',
        bedrooms: '3',
        bathrooms: '2',
        furnishing: 'unfurnished',
        plotCategory: 'residential',
        paymentMethod: 'cash',
        streetWidth: '',
        occupancyDate: '',
        ownershipType: '',
        onMainRoad: false,
    };
}

interface UseLeadFormOptions {
    contactType: ContactType;
    agentName: string;
    agentWhatsApp: string;
    initialIntent: string | null;
}

export function useLeadForm(options: UseLeadFormOptions) {
    const { contactType, agentName, agentWhatsApp, initialIntent } = options;
    const location = useLocation();

    const [step, setStep] = useState(1);
    const [hasAcceptedFormPolicy, setHasAcceptedFormPolicy] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const [formData, setFormData] = useState<LeadData>(() => {
        const draft = loadDraft();
        const defaults = getDefaultFormData(initialIntent);
        if (draft) {
            return {
                ...defaults,
                ...draft,
                intent: (initialIntent as LeadData['intent']) || (draft.intent as LeadData['intent']) || 'buy',
            };
        }
        return defaults;
    });

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    // Track form opened
    useEffect(() => {
        trackEvent('form_started', { category: 'form', action: 'opened', label: contactType });
        setFunnelStage('form_started', { lang: 'en', route: location.pathname });
    }, [contactType, location.pathname]);

    // Persist draft on every change
    useEffect(() => {
        persistDraft(formData);
    }, [formData]);

    const updateField = useCallback((name: keyof LeadData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user edits
        setErrors(prev => {
            if (prev[name]) {
                const next = { ...prev };
                delete next[name];
                return next;
            }
            return prev;
        });
    }, []);

    const handleInputChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        updateField(name as keyof LeadData, value);
    }, [updateField]);

    /** Validate step 1 fields */
    const validateStep1 = useCallback((): boolean => {
        const newErrors: ValidationErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else {
            const phoneResult = normalizePhone(formData.phone.trim());
            if (!phoneResult.valid) {
                newErrors.phone = 'Enter a valid phone number';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData.name, formData.phone]);

    /** Validate step 2 fields */
    const validateStep2 = useCallback((): boolean => {
        const newErrors: ValidationErrors = {};
        if (!formData.location) {
            newErrors.location = 'Please select a location';
        }
        if (!formData.marlas.trim()) {
            newErrors.marlas = 'Area is required';
        }
        if (!formData.budget.trim()) {
            newErrors.budget = 'Budget is required';
        }
        if (formData.intent === 'rent' && !formData.occupancyDate) {
            newErrors.occupancyDate = 'Occupancy date is required';
        }
        if (formData.intent === 'list' && !formData.onMainRoad && !formData.streetWidth.trim()) {
            newErrors.streetWidth = 'Street width is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const goToStep = useCallback((targetStep: number) => {
        setStep(targetStep);
    }, []);

    const submitStep1 = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep1()) {
            trackEvent('step_completed', { category: 'form', action: 'step_1_completed', label: contactType });
            setFunnelStage('step_2', { lang: 'en', route: location.pathname });
            setStep(2);
        }
    }, [validateStep1, contactType, location.pathname]);

    const submitStep2 = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep2()) {
            trackEvent('step_completed', { category: 'form', action: 'step_2_completed', label: contactType });
            setFunnelStage('review', { lang: 'en', route: location.pathname });
            setStep(3);
        }
    }, [validateStep2, contactType, location.pathname]);

    const confirmAndSend = useCallback(() => {
        const leadId = generateLeadId();

        trackEvent('whatsapp_clicked', {
            category: 'conversion',
            action: 'whatsapp_send',
            label: `${contactType}_${agentName}`,
        });

        setFunnelStage('whatsapp_clicked', { lang: 'en', route: location.pathname });

        // Normalize user phone for the WhatsApp message (agent number is already clean)
        const phoneResult = normalizePhone(formData.phone.trim());
        const normalizedFormData = phoneResult.valid
            ? { ...formData, phone: phoneResult.e164 }
            : formData;

        // Build WhatsApp message with normalized phone
        const message = buildWhatsAppMessage({
            formData: normalizedFormData,
            contactType,
            agentName,
            leadId,
        });

        const url = buildWhatsAppUrl(agentWhatsApp, message);

        // Attempt to open WhatsApp
        window.open(url, '_blank');

        // Persist lead with pending status
        saveLead({
            ...normalizedFormData,
            id: leadId,
            agent: agentName,
            timestamp: new Date().toISOString(),
            lang: 'en',
            source: `/contact${contactType === 'ceo' ? 'CEO' : contactType === 'agent1' ? 'AgentA' : 'AgentB'}`,
            status: 'pending',
            attempts: 1,
            messageSnapshot: message,
        });

        // Clean up draft
        clearDraft();
    }, [formData, contactType, agentName, agentWhatsApp, location.pathname]);

    return {
        step,
        formData,
        errors,
        hasAcceptedFormPolicy,
        setHasAcceptedFormPolicy,
        updateField,
        handleInputChange,
        submitStep1,
        submitStep2,
        confirmAndSend,
        goToStep,
    };
}
