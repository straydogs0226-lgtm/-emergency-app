const CACHE_NAME = 'emergency-app-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest'
  // 必要ならCSSやアイコンもここに追加
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});