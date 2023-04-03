// Set the date to count down to
var countDownDate = new Date("April 19, 2023 02:00:00").getTime();

// Update the countdown every second
var x = setInterval(function() {

  // Get the current time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Calculate the remaining time
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the remaining time in the countdown sections
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  // If the count down is finished, display a message
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }

  // Fade in the countdown container
  var container = document.getElementById("countdown-container");
  if (!container.classList.contains("show")) {
    container.classList.add("show");
  }
}, 1000);
