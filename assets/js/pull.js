var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');

for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
    activateTab(tabId);
    localStorage.setItem('activePage', tabId);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var storedPage = localStorage.getItem('activePage');
  var initialPage = storedPage || 'page1';
  activateTab(initialPage);
  // Show the content of Page 1 after the page has finished loading
  document.getElementById('page1').classList.remove('hide');
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
}

window.addEventListener('beforeunload', function() {
  var activeTab = document.querySelector('.nav-btn.active');
  var tabId = activeTab.getAttribute('data-tab');
  localStorage.setItem('activePage', tabId);
});
