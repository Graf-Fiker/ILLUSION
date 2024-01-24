// Assuming you have a function to toggle between light and dark mode
function toggleLightMode() {
  document.body.classList.toggle('light-mode');

  // Call a function to update the image filter based on the mode
  updateImageFilter();
}

// Function to update the image filter based on the theme mode
function updateImageFilter() {
  const image = document.getElementById('illusion-eye'); // Replace 'yourImageId' with the actual ID of your image component

  if (document.body.classList.contains('light-mode')) {
    // Light mode, remove invert filter
    image.style.filter = 'invert(0%)';
  } else {
    // Dark mode, apply invert filter
    image.style.filter = 'invert(100%)';
  }
}
