// timer implementation
let interval;
let timer;
let remainingTime;
var currentDuration = 3000;

// Timer Functions
function startTimer(duration, display) {
  // duration in seconds
  if (interval) {
    console.log("timer is already running");
    console.log(interval);
    return;
  }
  // convert minutes to seconds
  timer = duration
  interval = setInterval(function() {
    // calculate minutes and seconds
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60

    // adding leading zeroes
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    // update display
    display.textContent = minutes + ":" + seconds;

    // decrement timer by 1 second and stop
    if (timer-- < 0) {
      playTimerSound();
      clearInterval(interval);
    }
  }, 1000);

}

// Stops timer, stores duration left and resets interval
function pauseTimer() {
  clearInterval(interval);
  interval = null;
  remainingTime = timer;
}

// Stops current timer and starts timer again
function resetTimer(duration, display) {
  clearInterval(interval);
  interval = null;
  startTimer(duration, display)
}

function playTimerSound() {
  const audio = new Audio('audio/Alarm04.wav');
  audio.play();
}

// Implementation of timer and buttons
let timerStringDiv = document.getElementById("timer-string");

document.getElementById("start-button").addEventListener("click", function() {
  const timerString = timerStringDiv.textContent;
  const minutesSeconds = timerString.split(":");
  const duration = parseInt(minutesSeconds[0]) * 60 + parseInt(minutesSeconds[1]);
  startTimer(duration, timerStringDiv);
})
document.getElementById("pause-button").addEventListener("click", pauseTimer);
document.getElementById("reset-button").addEventListener("click", function() {
  resetTimer(currentDuration, timerStringDiv);
})
document.getElementById("setting-form").addEventListener("submit", function(e) {
  // prevent page reload
  e.preventDefault();
  // Check if input is valid int
  var timerInput = document.getElementById("timer-input").value;
  if (isNaN(parseInt(timerInput))) {
    alert("Please enter a duration in minutes");
    return;
  }
  // timerInput in minutes, convert to seconds
  currentDuration = parseInt(timerInput, 10) * 60;
  var updatedDuration = parseInt(timerInput, 10) * 60;
  // calculate minutes and seconds
  let minutes = Math.floor(updatedDuration / 60);
  let seconds = updatedDuration % 60;

  // adding leading zeroes
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // update display
  document.getElementById("timer-string").textContent = minutes + ":" + seconds;
})

// Setting buttons implementation
var modal = document.getElementById("settings-modal");
var settingsBtn = document.getElementById("setting-button");
var saveBtn = document.getElementById('save-button');

settingsBtn.onclick = function() {
  modal.style.display = "block";
}

saveBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}