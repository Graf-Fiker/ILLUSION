function activateTab(tabId) {
  for (var i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove('active');
  }

  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].id === tabId) {
      tabs[i].classList.add('active');
    } else {
      tabs[i].classList.remove('active');
    }
  }

  var tabButton = document.querySelector('[data-tab="' + tabId + '"]');
  tabButton.classList.add('active');
  activeTab = Array.from(tabs).indexOf(document.querySelector('.tab-content.active'));
}
