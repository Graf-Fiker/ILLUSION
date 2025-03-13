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

eself.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Return cached response if available
      }

      // Check if it's an image request
      if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
        return fetch(event.request).then((networkResponse) => {
          const responseToCache = networkResponse.clone();

          caches.open('image-cache').then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch(() => {
          return caches.match('/offline.html'); //serve offline page.
        });
      }

      // Handle other requests (HTML, CSS, JS)
      return fetch(event.request).then((networkResponse) => {
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
          return caches.match('/offline.html'); //serve offline page.
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-site-cache-v1', 'image-cache'];
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