// Define your app's state
const appState = {
  currentPage: 'page1',
  // other state properties...
};

// Update the app's state
function updateAppState(newState) {
  Object.assign(appState, newState);
  // Perform any additional logic based on the updated state
}

// Handle back button press
function handleBackButton() {
  // Perform any necessary state updates or custom actions
  // For example, you can change the current page based on the app's state

  switch (appState.currentPage) {
    case 'page1':
      // Logic for back button press on the home page
      break;
    case 'page2':
      // Logic for back button press on the about page
      break;
    case 'page3':
      // Logic for back button press on the contact page
      break;
    default:
      // Default logic when the current page is unknown
  }
}

// Add event listener for back button press
window.addEventListener('popstate', handleBackButton);
