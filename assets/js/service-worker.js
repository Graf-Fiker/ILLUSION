if ('serviceWorker' in navigator) {
  const CACHE_NAME = 'my-cache';
  const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    // Add other static assets you want to cache
  ];

  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // Service Worker registered successfully
        if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
          console.log('Service Worker registered with scope:', registration.scope);
        }

        // Perform the cache setup
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      })
      .catch(function(error) {
        // Service Worker registration failed
        if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
          console.log('Service Worker registration failed:', error);
        }
      });
  });

  self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
}
