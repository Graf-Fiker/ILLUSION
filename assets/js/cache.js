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

elf.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return cached response
      }

      // Check if it's an image request (adjust as needed)
      if (event.request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
        return fetch(event.request).then((networkResponse) => {
          // Clone the response to cache it
          const responseToCache = networkResponse.clone();

          caches.open('image-cache').then((cache) => {
            cache.put(event.request, responseToCache); // Cache the image
          });

          return networkResponse; // Return the network response
        });
      }

      // Handle other requests (HTML, CSS, JS) as before
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['my-site-cache-v1', 'image-cache']; // Add image-cache to whitelist
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