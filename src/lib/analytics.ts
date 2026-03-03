/**
 * Client-side analytics utility.
 * Dispatches events to GA4, Plausible, or falls back to console.debug.
 *
 * To enable GA4: Add the gtag.js snippet to index.html
 * To enable Plausible: Add the Plausible script to index.html
 */

type EventParams = Record<string, string | number | boolean>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        plausible?: (event: string, options?: { props?: EventParams }) => void;
    }
}

export function trackEvent(eventName: string, params?: EventParams): void {
    // GA4
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
        return;
    }

    // Plausible
    if (typeof window.plausible === 'function') {
        window.plausible(eventName, { props: params });
        return;
    }

    // Development fallback
    if (import.meta.env.DEV) {
        console.debug(`[Analytics] ${eventName}`, params || '');
    }
}
