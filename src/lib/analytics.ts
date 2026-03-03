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

const SCROLL_SESSION_KEY = 'gull_scroll_fired';
const scrollThresholds = [50, 90] as const;

let scrollTimeout: number | null = null;

function getFiredThresholds(): Set<number> {
    try {
        const stored = sessionStorage.getItem(SCROLL_SESSION_KEY);
        return new Set(stored ? JSON.parse(stored) : []);
    } catch {
        return new Set();
    }
}

function saveFiredThresholds(thresholds: Set<number>): void {
    try {
        sessionStorage.setItem(SCROLL_SESSION_KEY, JSON.stringify(Array.from(thresholds)));
    } catch {
        // no-op
    }
}

function handleScroll(): void {
    // Throttle: don't run more than once per 100ms
    if (scrollTimeout) return;

    scrollTimeout = window.setTimeout(() => {
        scrollTimeout = null;

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;

        const pct = Math.round((window.scrollY / scrollHeight) * 100);
        const fired = getFiredThresholds();
        let changed = false;

        for (const threshold of scrollThresholds) {
            if (pct >= threshold && !fired.has(threshold)) {
                fired.add(threshold);
                changed = true;

                trackEvent('ScrollDepth', {
                    category: 'Engagement',
                    action: 'ScrollDepth',
                    label: `${threshold}%`,
                    value: threshold
                });
            }
        }

        if (changed) {
            saveFiredThresholds(fired);
        }
    }, 150);
}

/** 
 * Call once on app init to start scroll depth tracking.
 * Includes listener cleanup logic.
 */
export function initScrollTracking(): () => void {
    if (typeof window === 'undefined') return () => { };

    // Disable in dev unless VITE_ENABLE_ANALYTICS is set
    if (import.meta.env.DEV && !import.meta.env.VITE_ENABLE_ANALYTICS) {
        return () => { };
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeout) {
            window.clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
    };
}

