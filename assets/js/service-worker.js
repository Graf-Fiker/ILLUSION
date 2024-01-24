if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // Service Worker registered successfully
        if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
          console.log('Service Worker registered with scope:', registration.scope);
        }
      })
      .catch(function(error) {
        // Service Worker registration failed
        if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
          console.log('Service Worker registration failed:', error);
        }
      });
  });
}

// service-worker.js

const CACHE_NAME = 'my-cache-v1';
const OFFLINE_PAGE_URL = '/offline.html';

let isCachingEnabled = true;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cache the entire website by using a wildcard route
      return cache.addAll(['/', OFFLINE_PAGE_URL]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (!isCachingEnabled) {
        // If caching is disabled, always fetch from the network
        return fetch(event.request);
      }

      return response || fetch(event.request).catch(function() {
        // If the fetch fails, serve the custom offline page
        return caches.match(OFFLINE_PAGE_URL);
      });
    })
  );
});

// service-worker.js

const CACHE_NAME = 'my-cache-v1';
const OFFLINE_PAGE_URL = '/offline.html';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cache all resources, including pages, styles, scripts, and other assets
      return cache.addAll([
        '/',
        OFFLINE_PAGE_URL,
        // Add other paths to be cached here
        '/styles/main.css',
        '/scripts/main.js',
        // Add more resources as needed
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Serve cached resources or fetch from the network and cache
      return response || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    }).catch(function() {
      // Serve the offline page for failed requests
      return caches.match(OFFLINE_PAGE_URL);
    })
  );
});

// Other event listeners and logic...
