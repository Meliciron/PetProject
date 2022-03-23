let timerBox = document.querySelector(".stopwatch__value");
let startButton = document.querySelector(".stopwatch__button-start");
let stopButton = document.querySelector(".stopwatch__button-stop");
let loopsList = document.querySelector(".stopwatch__loops-list");
let arrow = document.querySelector(".arrow-down");
let timeIntervals = timerBox.innerHTML.split(":");
let loopsCounter = 1;
let stopClicks = 0;
let interval, ms, s, min, h;
ms = s = min = h = 0;
startButton.addEventListener("click", () => {
  stopClicks = 0;
  if (!startButton.classList.contains("active")) {
    startButton.classList.add("active");
    startButton.innerHTML = "Loop";
    interval = setInterval(timeOutput, 10);
  } else {
    loopsList.innerHTML +=
      "<li>loop" + loopsCounter + " " + timerBox.innerHTML + "</li>";
    loopsCounter++;
  }
});

stopButton.addEventListener("click", () => {
  startButton.classList.remove("active");
  clearInterval(interval);
  startButton.innerHTML = "Start";
  stopClicks++;
  if (stopClicks == 2) {
    timerBox.innerHTML = "00:00:00:00";
    ms = s = min = h = 0;
    loopsList.innerHTML = "";
    loopsCounter = 1;
    stopClicks = 0;
  }
});

function timeOutput() {
  ms++;
  if (ms == 100) {
    s++;
    ms = 0;
  }
  if (s == 60) {
    min++;
    s = 0;
  }
  if (min == 60) {
    h++;
    min = 0;
  }
  ms < 10
    ? (timeIntervals[timeIntervals.length - 1] = "0" + ms)
    : (timeIntervals[timeIntervals.length - 1] = +ms);
  s < 10
    ? (timeIntervals[timeIntervals.length - 2] = "0" + s)
    : (timeIntervals[timeIntervals.length - 2] = s);
  min < 10
    ? (timeIntervals[timeIntervals.length - 3] = "0" + min)
    : (timeIntervals[timeIntervals.length - 3] = min);

  h < 10
    ? (timeIntervals[timeIntervals.length - 4] = "0" + h)
    : (timeIntervals[timeIntervals.length - 4] = h);
  timerBox.innerHTML = timeIntervals.join(":");
}
