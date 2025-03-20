self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).catch(() => {
                return caches.match('/offline.html'); //serve offline page.
            });
        })
    );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      cache.addAll(urlsToCache);
      return cache.addAll(['/offline.html']); //cache offline page.
    })
  );
});