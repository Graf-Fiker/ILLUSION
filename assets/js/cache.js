const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/', // Cache the root URL (index.html or similar)
  '/index.html', // Explicitly cache your main HTML file
  '/style.css', // Cache your CSS
  '/cache.js',
  '/timer_weekly.js',
  '/timer_daily.js',
  '/Navbar Pages.js',
  '/version-check.js',
  '/service-worker.js',// Cache your JavaScript (if you have one)
  // Add other critical assets like fonts, etc.
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request); // No cache match, fetch from network
    })
  );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});