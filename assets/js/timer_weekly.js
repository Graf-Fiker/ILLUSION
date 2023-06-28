// Function to update the timer
function updateTimer() {
  var now = new Date(); // Current date and time
  var target = new Date(); // Target date and time

  // Set the target day and time to Wednesday at 4:00 AM GMT+1
  target.setUTCHours(3, 0, 0); // Set the target time to 3:00 AM GMT
  target.setDate(target.getDate() + ((3 - target.getUTCDay() + 7) % 7)); // Calculate the next Wednesday

  var timeDiff = target - now; // Calculate the time difference in milliseconds

  // Adjust time difference if negative
  if (timeDiff < 0) {
    timeDiff += 7 * 24 * 60 * 60 * 1000; // Add 7 days in milliseconds
  }

  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Display the timer
  var timerElement = document.getElementById("timer_weekly");
  timerElement.textContent = "TIME REMAINING: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
}

// Update the timer immediately
updateTimer();

// Update the timer every second
setInterval(updateTimer, 1000);
