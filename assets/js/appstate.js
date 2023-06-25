var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');
var appState = {
  activeTab: null
};
var tabHistory = []; // Array to store tab history

for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
    activateTab(tabId);
    appState.activeTab = tabId;
    saveAppState();
    tabHistory.push(tabId); // Add the current tab to the history
    history.pushState(appState, null); // Update the browser's history
  });
}

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
    tabHistory.pop(); // Remove the current tab from history
    if (tabHistory.length > 0) {
      var previousTab = tabHistory[tabHistory.length - 1];
      activateTab(previousTab); // Activate the previous tab from history
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  restoreAppState();
  history.replaceState(appState, null); // Set initial state in the browser's history
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
  appState.activeTab = Array.from(tabs).indexOf(tab);
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
    }
  } else {
    activateTab('page1');
  }
}
