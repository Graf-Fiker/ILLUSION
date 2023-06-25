var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');
var activeTab;

// Add event listeners to navigation buttons
for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
    activateTab(tabId);
  });
}

// Add event listener to handle initial tab activation
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the previously active tab from localStorage
  activeTab = localStorage.getItem('activeTab');
  if (activeTab) {
    activateTab(activeTab);
  } else {
    activateTab('page1'); // Default tab if no previous state found
  }

  // Add event listener to handle back button
  window.addEventListener('popstate', function(event) {
    var tabId = event.state ? event.state.activeTab : 'page1';
    activateTab(tabId);
  });
});

function activateTab(tabId) {
  // Remove 'active' class from all navigation buttons and tabs
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove('active');
  }
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }

  // Add 'active' class to the selected tab and navigation button
  var tabButton = document.querySelector('[data-tab="' + tabId + '"]');
  var tab = document.querySelector('#' + tabId);
  tabButton.classList.add('active');
  tab.classList.add('active');

  // Update the activeTab variable and store it in localStorage
  activeTab = Array.from(tabs).indexOf(tab);
  localStorage.setItem('activeTab', tabId);

  // Update the browser history state
  history.pushState({ activeTab: tabId }, '', '');
}
