/**
 * Structured Funnel State Engine for conversion tracking.
 * Lightweight, client-only, forward-only progression.
 */

import { trackEvent } from './analytics';

export type FunnelStage =
    | 'landing'
    | 'cta_clicked'
    | 'form_started'
    | 'step_2'
    | 'review'
    | 'whatsapp_clicked';

const FUNNEL_ORDER: FunnelStage[] = [
    'landing',
    'cta_clicked',
    'form_started',
    'step_2',
    'review',
    'whatsapp_clicked'
];

interface FunnelState {
    stage: FunnelStage;
    timestamp: string;
    lang: string;
    route: string;
}

const STORAGE_KEY = 'gull_funnel_state';

/**
 * Get the current funnel state from localStorage.
 */
export function getFunnelState(): FunnelState | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
}

/**
 * Advance the funnel stage. Logic prevents regression (only forward).
 */
export function setFunnelStage(stage: FunnelStage, metadata: { lang: string; route: string }): void {
    try {
        const current = getFunnelState();
        const currentIndex = current ? FUNNEL_ORDER.indexOf(current.stage) : -1;
        const newIndex = FUNNEL_ORDER.indexOf(stage);

        // Only move forward
        if (newIndex > currentIndex) {
            const newState: FunnelState = {
                stage,
                timestamp: new Date().toISOString(),
                lang: metadata.lang,
                route: metadata.route,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

            // Integrate with analytics
            trackEvent('FunnelProgress', {
                category: 'Conversion',
                action: stage,
                label: `Step ${newIndex + 1}: ${stage}`,
                value: newIndex + 1,
                ...metadata
            });
        }
    } catch (error) {
        console.error('[FunnelTracker] Error updating stage:', error);
    }
}
