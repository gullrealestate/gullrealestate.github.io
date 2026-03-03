/// <reference lib="webworker" />

const CACHE_NAME = 'gull-re-v1';
const OFFLINE_URL = '/offline.html';

const PRECACHE_URLS = [
    '/',
    '/en',
    '/ur',
    '/images/logo.webp',
    OFFLINE_URL,
];

// Install: precache essential resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        )
    );
    self.clients.claim();
});

// Fetch: network-first with offline fallback
self.addEventListener('fetch', (event) => {
    if (event.request.mode !== 'navigate') return;

    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
});
