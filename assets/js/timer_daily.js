// Function to update the timer
function updateTimer() {
  var now = new Date(); // Current date and time
  var target = new Date(); // Target date and time
  target.setHours(14, 0, 0); // Set the target time to 14:00

  // Check if the current time is already past the target time for today
  if (now > target) {
    // Increment the target date by 1 day
    target.setDate(target.getDate() + 1);
  }

  var timeDiff = target - now; // Calculate the time difference in milliseconds

  // Calculate hours, minutes, and seconds
  var hours = Math.floor(timeDiff / (1000 * 60 * 60));
  var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Display the timer
  var timerElement = document.getElementById("timer_daily");
  timerElement.textContent = "TIME REMAINING: " + hours + "h " + minutes + "m " + seconds + "s";
}

// Update the timer immediately
updateTimer();

// Update the timer every second
var timerInterval = setInterval(updateTimer, 1000);
