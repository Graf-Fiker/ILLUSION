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

self.addEventListener('message', function(event) {
  if (event.data && event.data.command === 'toggleCaching') {
    // Handle the toggle caching command
    isCachingEnabled = !isCachingEnabled;
    console.log('Caching is ' + (isCachingEnabled ? 'enabled' : 'disabled'));

    // Send the current caching state back to the main page
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ command: 'updateButton', cachingEnabled: isCachingEnabled });
      });
    });
  }
});
