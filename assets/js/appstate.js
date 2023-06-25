var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');

var activeTab = 0;
var storedTab = localStorage.getItem('activeTab');
if (storedTab) {
  activeTab = parseInt(storedTab);
} else {
  activateTab('page1'); // Default to page 1 if no stored tab
}

for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
    activateTab(tabId);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  activateTab('page1');
});

window.addEventListener('popstate', function(event) {
  var tabId = event.state ? event.state.tabId : 'page1';
  activateTab(tabId);
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
  activeTab = Array.from(tabs).indexOf(tab);
  localStorage.setItem('activeTab', activeTab);
  history.pushState({ tabId: tabId }, null, null);
}
