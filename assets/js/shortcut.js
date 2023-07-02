let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default installation prompt
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show a custom "Add to Home Screen" button or UI
  // For example:
  const addToHomeScreenButton = document.getElementById('add-to-home-screen');
  addToHomeScreenButton.style.display = 'block';

  addToHomeScreenButton.addEventListener('click', () => {
    // Prompt the user to install the app
    deferredPrompt.prompt();

    // Wait for the user's choice
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation prompt');
      } else {
        console.log('User dismissed the installation prompt');
      }

      // Reset the deferred prompt
      deferredPrompt = null;
    });
  });
});
