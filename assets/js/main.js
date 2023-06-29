if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered:', registration);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
// Listen for messages from the service worker
navigator.serviceWorker.addEventListener('message', function(event) {
  if (event.data && event.data.timer) {
    var timerElement = document.getElementById('timer');
    timerElement.textContent = "Time remaining: " + event.data.timer;
  }
});