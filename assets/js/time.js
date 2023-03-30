// Set the start and end times for the time range (in local time)
var startTime = {hour: 2, minute: 0};
var endTime = {hour: 9, minute: 0};

// Check if the current date is a Wednesday
var now = new Date();
if (now.getUTCDay() === 3) { // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc.
  // Get the current hour and minute in the user's local time zone
  var currentTZOffset = now.getTimezoneOffset(); // difference between UTC and local time in minutes
  var currentLocal = new Date(now.getTime() - currentTZOffset * 60 * 1000);
  var currentHour = currentLocal.getHours();
  var currentMinute = currentLocal.getMinutes();

  // Adjust the start and end times for the user's local time zone
  var startHourLocal = startTime.hour - Math.floor(currentTZOffset / 60);
  var endHourLocal = endTime.hour - Math.floor(currentTZOffset / 60);
  if (startHourLocal < 0) {
    startHourLocal += 24;
  }
  if (endHourLocal < 0) {
    endHourLocal += 24;
  }
  var startLocal = {hour: startHourLocal, minute: startTime.minute};
  var endLocal = {hour: endHourLocal, minute: endTime.minute};

  // Check if the current time is within the specified time range
  if ((currentHour > startLocal.hour || (currentHour === startLocal.hour && currentMinute >= startLocal.minute)) && 
      (currentHour < endLocal.hour || (currentHour === endLocal.hour && currentMinute < endLocal.minute))) {
    document.getElementById('myBox').style.display = 'block';
  }
}
