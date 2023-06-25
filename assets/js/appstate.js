var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');
var appState = {
  activeTab: null,
  tabHistory: []
};

document.addEventListener('DOMContentLoaded', function() {
  restoreAppState();
  history.replaceState(appState, null); // Set initial state in the browser's history

  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function() {
      var tabId = this.getAttribute('data-tab');
      activateTab(tabId);
      appState.activeTab = tabId;

      if (tabId !== 'page1') {
        var page1Index = appState.tabHistory.indexOf('page1');
        if (page1Index !== -1) {
          appState.tabHistory.splice(page1Index, 1); // Remove 'page1' from the tab history
        }
        appState.tabHistory.push(tabId); // Add the current tab to the history
      }

      saveAppState();
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
    appState.activeTab = 'page1'; // Set 'page1' as the active tab in appState
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
    appState = JSON.parse(savedAppState);
    if (appState.activeTab) {
      activateTab(appState.activeTab);
    }
  } else {
    activateTab('page1');
    appState.activeTab = 'page1'; // Set 'page1' as the active tab in appState
    appState.tabHistory.push('page1'); // Add 'page1' to the tab history
    saveAppState();
    history.replaceState(appState, null); // Update the browser's history with 'page1' as the initial state
  }
}
