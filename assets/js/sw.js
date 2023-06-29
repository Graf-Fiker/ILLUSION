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

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/image.jpg'
  // Add more URLs of static assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(error => {
        console.error('Error in fetch event:', error);
      })
  );
});

// Service worker code
self.addEventListener('install', function(event) {
  // Perform any initial setup when the service worker is installed
  // For example, caching static assets
});

self.addEventListener('activate', function(event) {
  // Perform any cleanup or update tasks when the service worker is activated
});

self.addEventListener('fetch', function(event) {
  // Handle network requests as needed
});

// Function to update the timer
function updateTimer() {
  var now = new Date(); // Current date and time
  var target = new Date(); // Target date and time

  // Set the target day and time to Wednesday at 4:00 AM
  target.setHours(4, 0, 0);
  target.setDate(target.getDate() + ((3 - target.getDay() + 7) % 7));

  var timeDiff = target - now; // Calculate the time difference in milliseconds

  // ... Rest of the timer logic ...

  // Check if the timer is about to expire in 30 minutes
  if (timeDiff <= 30 * 60 * 1000 && timeDiff > 0) {
    // Check if notifications are supported by the browser
    if ('Notification' in self && Notification.permission === 'granted') {
      // Create a notification
      self.registration.showNotification('Timer Expiring Soon', {
        body: 'Your timer will expire in 30 minutes.',
        icon: '/path/to/notification-icon.png',
        // Additional options like sound, badge, etc. can be added here
      });
    }
  }

  // ... Rest of the timer logic ...
}

// Function to update the timer at regular intervals
function startTimer() {
  setInterval(updateTimer, 1000);
}

// Start the timer when the service worker is installed
self.addEventListener('install', function(event) {
  event.waitUntil(startTimer());
});

// Listen for notification click events
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  // Add custom logic here, e.g., open a specific URL or focus on the PWA window
});
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-pwa-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        // Add other assets you want to cache here
      ]);
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
