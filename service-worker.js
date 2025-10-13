// ====== Hotspot PWA Service Worker ======

const CACHE_NAME = 'hotspot-pwa-v1';
const ASSETS_TO_CACHE = [
  '.',
  'index.html',
  'manifest.json',
  // Leaflet & plugins are loaded from CDN — you can add them here if you mirror them locally
];

// ====== Install event ======
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// ====== Activate event ======
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// ====== Fetch event (cache-first strategy) ======
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request).then(fetchResp => {
        return fetchResp;
      });
    })
  );
});
