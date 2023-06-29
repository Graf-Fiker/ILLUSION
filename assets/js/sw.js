if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js')
      .then(function(registration) {
        // Service Worker registered successfully
      })
      .catch(function(error) {
        // Service Worker registration failed
      });
  });
}
