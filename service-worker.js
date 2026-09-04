const CACHE_NAME = 'nike-pdp-v27';
const APP_SHELL = [
  './',
  './index.html',
  './list.html',
  './list.css',
  './list-overrides.css',
  './list.js',
  './products.js',
  './install.css',
  './styles.css',
  './pdp-overrides.css',
  './script.js',
  './manifest.webmanifest',
  './assets/app-icon-192.png',
  './assets/app-icon-512.png',
  './assets/apple-touch-icon.png',
  './assets/nav-top-but.png',
  './assets/scroll-nav-top-but.png',
  './assets/search-icon.svg',
  './assets/detail-intro.png',
  './assets/list-01.png',
  './assets/list-02.png',
  './assets/list-03.png',
  './assets/list-04.png',
  './assets/list-nav.png',
  './assets/list-nav-full.png',
  './assets/list-nav-compact.png',
  './assets/list-meta-left.png',
  './assets/list-meta-right.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});
