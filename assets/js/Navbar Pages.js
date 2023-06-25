var navButtons = document.querySelectorAll('.nav-btn');
var tabs = document.querySelectorAll('.tab-content');

for (var i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    var tabId = this.getAttribute('data-tab');
    activateTab(tabId);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  activateTab('page1');
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
