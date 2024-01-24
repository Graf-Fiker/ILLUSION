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

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cache the offline page
      return cache.addAll([OFFLINE_PAGE_URL]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Serve cached resources or fetch from the network and cache
      return response || fetch(event.request).then(function(fetchResponse) {
        if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
          // Cache the HTML page if it is a navigation request
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        } else {
          // For non-HTML requests, just return the fetch response
          return fetchResponse;
        }
      });
    }).catch(function() {
      // Serve the offline page for failed requests
      return caches.match(OFFLINE_PAGE_URL);
    })
  );
});
