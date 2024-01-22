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

const cacheName = 'your-app-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return fetch('/manifest.json')  // Fetch the manifest to get a list of all resources
        .then(response => response.json())
        .then((manifest) => {
          // Cache all resources listed in the manifest
          const resourcesToCache = manifest.concat(['/']);  // Add the base URL
          return cache.addAll(resourcesToCache);
        });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
        // If the requested resource is not in the cache, add it dynamically
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
