var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');
var appState = {
  activeTab: null
};

for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
    activateTab(tabId);
    appState.activeTab = tabId;
    saveAppState();
    history.pushState(appState, null); // Update the browser's history
  });
}

window.addEventListener('popstate', function(event) {
  if (event.state && event.state.activeTab && document.querySelector('#' + event.state.activeTab)) {
    appState.activeTab = event.state.activeTab;
    activateTab(appState.activeTab);
  } else {
    activateTab('page1');
    appState.activeTab = 'page1';
    saveAppState();
    history.replaceState(appState, null); // Update the browser's history with 'page1' as the initial state
  }
});

window.addEventListener('beforeunload', function() {
  clearAppState();
});

document.addEventListener('DOMContentLoaded', function() {
  restoreAppState();
  if (!appState.activeTab || !document.querySelector('#' + appState.activeTab)) {
    activateTab('page1');
    appState.activeTab = 'page1';
    saveAppState();
    history.replaceState(appState, null); // Update the browser's history with 'page1' as the initial state
  }
});

function activateTab(tabId) {
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove('active');
  }
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  var tabButton = document.querySelector('[data-tab="' + tabId + '"]');
  var tab = document.querySelector('#' + tabId);
  tabButton.classList.add('active');
  tab.classList.add('active');
}

function saveAppState() {
  localStorage.setItem('appState', JSON.stringify(appState));
}

function restoreAppState() {
  var savedAppState = localStorage.getItem('appState');
  if (savedAppState) {
    try {
      appState = JSON.parse(savedAppState);
      if (appState.activeTab && document.querySelector('#' + appState.activeTab)) {
        activateTab(appState.activeTab);
        return;
      }
    } catch (error) {
      console.error('Failed to parse stored app state:', error);
    }
  }

  // Default state when no valid saved app state is available
  activateTab('page1');
  appState.activeTab = 'page1';
  saveAppState();
  history.replaceState(appState, null); // Update the browser's history with 'page1' as the initial state
}

function clearAppState() {
  localStorage.removeItem('appState');
}
