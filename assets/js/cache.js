self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.endsWith('.jpg') || requestUrl.pathname.endsWith('.png') || requestUrl.pathname.endsWith('.gif')) {
    // If it's an image, fetch from the network directly
    event.respondWith(fetch(event.request));
  } else {
    // For other resources, use the cache-first strategy
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});