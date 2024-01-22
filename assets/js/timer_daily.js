// Function to update the daily timer
function updateDailyTimer() {
  var now = new Date(); // Current date and time
  var target = new Date(); // Target date and time
  target.setHours(13, 0, 0); // Set the target time to 14:00

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

  // Check if the timer has reached a certain threshold (e.g., 5 minutes)
  if (timeDiff <= 30 * 60 * 1000) {
    // Request permission to show notifications
    Notification.requestPermission().then(function(permission) {
      if (permission === "granted") {
        // Show a notification with a customizable message
        var notification = new Notification("Daily Timer Reminder", {
          body: "Daily Task Reset in 5min",
        });
      } else if (permission === "denied") {
        // Handle the case where the user denied permission
        console.log("Notification permission denied. You won't receive reminders.");
      } else {
        // Handle other cases (e.g., "default" when the user hasn't made a choice yet)
        console.log("Notification permission not determined.");
      }
    });
  }
}

// Update the daily timer immediately
updateDailyTimer();

// Update the daily timer every second
var dailyTimerInterval = setInterval(updateDailyTimer, 1000);

// Function to update the other timer (replace "timer_other" with the actual ID)
function updateOtherTimer() {
  // Your code for the other timer goes here
}

// Update the other timer immediately
updateOtherTimer();

// Update the other timer every second
var otherTimerInterval = setInterval(updateOtherTimer, 1000);
