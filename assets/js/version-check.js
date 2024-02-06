// JavaScript
$(document).ready(function () {
  // Define the latest published version (you need to replace this with your actual version number)
  var latestPublishedVersion = "1.0.6"; 

  // Get the stored version from localStorage (assuming you store the last known version)
  var lastKnownVersion = localStorage.getItem('lastKnownVersion');

  // Check if the current version is different from the last known version
  if (!lastKnownVersion || lastKnownVersion !== latestPublishedVersion) {
    // Show the changelog modal
    $('#changelogModal').modal('show');

    // Update the last known version in localStorage
    localStorage.setItem('lastKnownVersion', latestPublishedVersion);
  }
});
