var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');
var appState = {
  activeTab: null
};
var tabHistory = []; // Array to store tab history

document.addEventListener('DOMContentLoaded', function() {
  restoreAppState();
  history.replaceState(appState, null); // Set initial state in the browser's history

  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function() {
      var tabId = this.getAttribute('data-tab');
      var previousTab = appState.activeTab;
      activateTab(tabId);
      appState.activeTab = tabId;
      saveAppState();
      if (previousTab !== tabId) {
        tabHistory.push(previousTab); // Add the previous tab to the history
      }
      history.pushState(appState, null); // Update the browser's history
    });
  }
});

window.addEventListener('popstate', function(event) {
  if (event.state) {
    appState = event.state;
    if (appState.activeTab) {
      activateTab(appState.activeTab);
    }
  } else {
    activateTab('page1');
  }

  if (tabHistory.length > 0) {
    var previousTab = tabHistory.pop();
    activateTab(previousTab); // Activate the previous tab from history
    appState.activeTab = previousTab;
    saveAppState();
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
    appState = JSON.parse(savedAppState);
    if (appState.activeTab) {
      activateTab(appState.activeTab);
      tabHistory.push(appState.activeTab); // Add the active tab to the history
    }
  } else {
    activateTab('page1');
    tabHistory.push('page1'); // Add 'page1' to the history
  }
}
