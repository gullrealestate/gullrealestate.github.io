/**
 * Analytics utility with structured event tracking.
 * Dispatches to GA4, Plausible, or falls back to console in dev.
 * GDPR-safe: no PII is ever sent to analytics.
 */

interface TrackEventParams {
    category: string;
    action: string;
    label?: string;
    value?: number;
}

type EventParams = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        plausible?: (event: string, options?: { props?: EventParams }) => void;
    }
}

/**
 * Track a structured analytics event.
 * Supports both simplified string-based calls and structured calls.
 */
export function trackEvent(eventName: string, params?: TrackEventParams | EventParams): void {
    const flatParams: EventParams = params ? { ...params } : {};

    // GA4
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, flatParams);
        return;
    }

    // Plausible
    if (typeof window.plausible === 'function') {
        window.plausible(eventName, { props: flatParams });
        return;
    }

    // Development fallback
    if (import.meta.env.DEV) {
        console.warn(`[Analytics] ${eventName}`, flatParams);
    }
}

// ---------- Scroll Depth Tracking ----------

const scrollThresholds = [50, 90] as const;
const firedThresholds = new Set<number>();

function handleScroll(): void {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const pct = Math.round((window.scrollY / scrollHeight) * 100);

    for (const threshold of scrollThresholds) {
        if (pct >= threshold && !firedThresholds.has(threshold)) {
            firedThresholds.add(threshold);
            trackEvent('scroll_depth', { category: 'engagement', action: 'scroll', label: `${threshold}%`, value: threshold });
        }
    }
}

/** Call once on app init to start scroll depth tracking */
export function initScrollTracking(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ---------- Funnel Tracking ----------

const FUNNEL_KEY = 'gull_funnel';

type FunnelStage = 'landing' | 'cta' | 'form_start' | 'step2' | 'review' | 'whatsapp';

const FUNNEL_ORDER: FunnelStage[] = ['landing', 'cta', 'form_start', 'step2', 'review', 'whatsapp'];

/**
 * Track anonymous funnel progression.
 * Only advances forward (no regressions). Stores drop-off stage locally.
 * No identity data is stored.
 */
export function trackFunnel(stage: FunnelStage): void {
    try {
        const current = localStorage.getItem(FUNNEL_KEY);
        const currentIndex = current ? FUNNEL_ORDER.indexOf(current as FunnelStage) : -1;
        const newIndex = FUNNEL_ORDER.indexOf(stage);

        if (newIndex > currentIndex) {
            localStorage.setItem(FUNNEL_KEY, stage);
            trackEvent('funnel_progress', { category: 'funnel', action: stage, value: newIndex });
        }
    } catch {
        // localStorage unavailable — no-op
    }
}
