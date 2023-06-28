// Check if page state is stored in local storage
const storedPage = localStorage.getItem('activePage');
const initialPage = storedPage || 'page1';

// Set initial active tab
activateTab(initialPage);

// Add event listeners to navbar buttons
for (let i = 0; i < navButtons.length; i++) {
  navButtons[i].addEventListener('click', function() {
    const tabId = this.getAttribute('data-tab');
    activateTab(tabId);
    // Store active page in local storage
    localStorage.setItem('activePage', tabId);
  });
}

// Store active page in local storage before the page is unloaded
window.addEventListener('beforeunload', function() {
  const activeTab = document.querySelector('.nav-btn.active');
  const tabId = activeTab.getAttribute('data-tab');
  localStorage.setItem('activePage', tabId);
});
