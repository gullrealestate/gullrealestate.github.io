import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackEvent, initScrollTracking } from '../src/lib/analytics';

describe('analytics', () => {
    let scrollCallback: (() => void) | undefined;

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        // Mock window APIs
        const addEventListenerMock = vi.fn((event, cb) => {
            if (event === 'scroll') scrollCallback = cb;
        });
        const removeEventListenerMock = vi.fn();

        vi.stubGlobal('gtag', vi.fn());
        vi.stubGlobal('plausible', vi.fn());
        vi.stubEnv('VITE_ENABLE_ANALYTICS', 'true');

        vi.stubGlobal('addEventListener', addEventListenerMock);
        vi.stubGlobal('removeEventListener', removeEventListenerMock);

        // Mock scroll dimensions
        Object.defineProperty(document.documentElement, 'scrollHeight', {
            value: 4000,
            configurable: true,
            writable: true
        });

        vi.stubGlobal('innerHeight', 1000);
        vi.stubGlobal('window', {
            ...window,
            scrollY: 0,
            innerHeight: 1000,
            addEventListener: addEventListenerMock,
            removeEventListener: removeEventListenerMock,
            gtag: (globalThis as unknown as Record<string, unknown>).gtag,
            plausible: (globalThis as unknown as Record<string, unknown>).plausible,
            setTimeout: vi.fn(fn => fn()),
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.unstubAllEnvs();
        vi.useRealTimers();
    });

    it('dispatches to gtag', () => {
        trackEvent('test', { foo: 'bar' });
        expect((globalThis as unknown as Record<string, unknown>).gtag).toHaveBeenCalled();
    });

    it('manages scroll thresholds', () => {
        initScrollTracking();
        expect(scrollCallback).toBeDefined();

        if (scrollCallback) {
            // totalHeight = 4000 - 1000 = 3000
            // 50% threshold: scrollY = 1500
            (window as unknown as Record<string, unknown>).scrollY = 1500;
            scrollCallback();
            vi.advanceTimersByTime(200);
            expect((globalThis as unknown as Record<string, unknown>).gtag).toHaveBeenCalledWith('event', 'ScrollDepth', expect.objectContaining({ label: '50%' }));

            // 90% threshold: scrollY = 2700
            (window as unknown as Record<string, unknown>).scrollY = 2700;
            scrollCallback();
            vi.advanceTimersByTime(200);
            expect((globalThis as unknown as Record<string, unknown>).gtag).toHaveBeenCalledWith('event', 'ScrollDepth', expect.objectContaining({ label: '90%' }));
        }
    });

    it('handles cleanup', () => {
        const cleanup = initScrollTracking();
        if (typeof cleanup === 'function') {
            cleanup();
            expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
        }
    });
});
