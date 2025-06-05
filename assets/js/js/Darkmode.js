<script>
    document.addEventListener('DOMContentLoaded', function () {
        const darkModeBtn = document.getElementById('dark-mode-btn');
        const lightModeBtn = document.getElementById('light-mode-btn');

        // Check the initial mode (e.g., stored in localStorage)
        const currentMode = localStorage.getItem('mode');
        if (currentMode === 'dark') {
            enableDarkMode();
        } else {
            enableLightMode();
        }

        // Event listeners for buttons
        darkModeBtn.addEventListener('click', enableDarkMode);
        lightModeBtn.addEventListener('click', enableLightMode);

        function enableDarkMode() {
            document.body.classList.add('dark-mode');
            localStorage.setItem('mode', 'dark');
        }

        function enableLightMode() {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('mode', 'light');
        }
    });
</script>
