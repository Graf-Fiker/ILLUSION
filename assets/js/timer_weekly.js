// Function to update the timer
function updateTimer() {
  var now = new Date(); // Current date and time
  var target = new Date(); // Target date and time

  // Set the target day and time to Wednesday at 4:00 AM
  target.setHours(4, 0, 0);
  target.setDate(target.getDate() + ((3 - target.getDay() + 7) % 7));

  var timeDiff = target - now; // Calculate the time difference in milliseconds

  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Display the timer
  var timerElement = document.getElementById("timer_weekly");
  timerElement.textContent = "TIME REMAINING: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";

  // Check if the timer has reached 0
  if (timeDiff <= 0) {
    timerElement.textContent = "Timer expired!";
    clearInterval(timerInterval);
  }
}

// Update the timer immediately
updateTimer();

// Update the timer every second
var timerInterval = setInterval(updateTimer, 1000);
