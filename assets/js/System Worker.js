self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
  // Do nothing for incoming fetch requests
});

function refreshPage() {
  console.log('Refreshing page...');
  self.skipWaiting(); // Activate the updated service worker immediately
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
    .then(clients => {
      clients.forEach(client => {
        client.navigate(client.url); // Refresh each open client page
      });
    });
}

// Schedule the page refresh every 15 minutes
setInterval(refreshPage, 15 * 60 * 1000);
