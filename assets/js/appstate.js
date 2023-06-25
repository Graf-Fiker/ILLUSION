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
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreAppState();
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
