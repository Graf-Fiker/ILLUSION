if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
self.addEventListener('install', event => {
  console.log('Service Worker installed');
  // Perform any initial setup or caching here
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  // Clean up any old caches or perform other tasks
});

self.addEventListener('fetch', event => {
  // Handle fetch events, e.g., caching responses
});

setInterval(() => {
  // Trigger an update or fetch the latest data here
  console.log('Performing update');
  self.skipWaiting();
}, 10 * 60 * 1000); // 10 minutes in milliseconds

let version = 'v1'; // Set the initial version of your PWA

self.addEventListener('install', event => {
  console.log('Service Worker installed');
  // Perform any initial setup or caching here
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  // Clean up any old caches or perform other tasks
});

self.addEventListener('fetch', event => {
  // Handle fetch events, e.g., caching responses
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'versionCheck') {
    event.source.postMessage({ type: 'version', version });
  }
});

self.addEventListener('install', event => {
  // Perform any initial setup or caching here
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

setInterval(() => {
  // Check for updates or new version availability here
  console.log('Checking for updates');
  fetch('/version.json')
    .then(response => response.json())
    .then(data => {
      if (data.version !== version) {
        console.log('New version available:', data.version);
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'updateAvailable' });
          });
        });
      }
    });
}, 10 * 60 * 1000); // 10 minutes in milliseconds

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'updateAvailable') {
      // Display the "Update Available" notification box
      showUpdateNotification();
    }
  });

  // Request version check from service worker
  navigator.serviceWorker.controller.postMessage({ type: 'versionCheck' });
}

function showUpdateNotification() {
  // Display the "Update Available" notification box to the user
  const notificationBox = document.getElementById('update-notification');
  notificationBox.style.display = 'block';
}
function updateApp() {
  // Perform the necessary steps to update the PWA, e.g., reloading the page or updating the service worker
  location.reload(true);
}
