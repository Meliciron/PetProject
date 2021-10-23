let timerMs = document.querySelector(".timer__msecs");
let timerSec = document.querySelector(".timer__secs");
let timerMin = document.querySelector(".timer__mins");
let timerHour = document.querySelector(".timer__hours");
let timerValues = document.querySelector(".timer__value");
let timersArray = $ (".timer__item");
let timerStartBtn = document.querySelector(".timer__button-start");
let timerStopBtn = document.querySelector(".timer__button-stop");
let timerCounter = 0;
let timerStopClicks = 0;
let offsetY;
let timerInterval;

function setTimer() {
  /*doubleclick set*/
  /*scroll set*/ 
  timersArray.mousedown(function () {
    let startY = this.scrollTop + event.pageY;
    timersArray.mousemove(function () {
      timerCounter = Number(event.target.innerHTML);
      offsetY = /*this.scrollTop = */startY - event.pageY;
      if (offsetY > 0){
        timerCounter++;
        if ((event.target.classList.contains("timer__msecs")) && (timerCounter >= 100)){
          timerCounter = 0;
          timersArray[3].innerHTML = additionalZero(timersArray[3].innerHTML, timerCounter);
          timersArray[2].innerHTML = additionalZero(timersArray[2].innerHTML, Number(timersArray[2].innerHTML) + 1);
          if (timersArray[2].innerHTML >= 60){
            timerCounter = 0;
            timersArray[2].innerHTML = "00";
            timersArray[1].innerHTML = additionalZero(timersArray[1].innerHTML, Number(timersArray[1].innerHTML) + 1);
          };
          if ( timersArray[1].innerHTML >= 60){
            timerCounter = 0;
            timersArray[1].innerHTML = "00";
            timersArray[0].innerHTML = additionalZero(timersArray[0].innerHTML, Number(timersArray[0].innerHTML) + 1);
          };
        };
        if ((event.target.classList.contains("timer__secs")) && (timerCounter >= 60)){
          timerCounter = 0;
          timersArray[2].innerHTML = additionalZero(timersArray[2].innerHTML, timerCounter);
          timersArray[1].innerHTML = additionalZero(timersArray[1].innerHTML, Number(timersArray[1].innerHTML) + 1);
          if ( timersArray[1].innerHTML >= 60){
            timerCounter = 0;
            timersArray[1].innerHTML = "00";
            timersArray[0].innerHTML = additionalZero(timersArray[0].innerHTML, Number(timersArray[0].innerHTML) + 1);
          };
        };
        if ((event.target.classList.contains("timer__mins")) && (timerCounter >= 60)){
          timerCounter = 0;
          timersArray[1].innerHTML = additionalZero(timersArray[1].innerHTML, timerCounter);
          timersArray[0].innerHTML = additionalZero(timersArray[0].innerHTML, Number(timersArray[0].innerHTML) + 1);
        };
        event.target.innerHTML = additionalZero(event.target.innerHTML, timerCounter);
      };
      if (offsetY < 0){
        timerCounter--;
        timerCounter < 0 ? timerCounter = 0 : timerCounter;
        event.target.innerHTML = additionalZero(event.target.innerHTML, timerCounter);
      };
    });
  });
  $(window).mouseup(function () {
    timersArray.off("mousemove");
  });
};


function additionalZero(str, value){
  if (value == 10){
    return "10";
  }
  if (value == 9){
    return "09";
  }
  Number(str) < 10 ? str = "0" + value : str = value;
  return str;
};
setTimer();
timerStartBtn.addEventListener("click", function(){
  timerStopClicks = 0;
  if (timerMs.innerHTML == "00" && timerSec.innerHTML == "00" && timerMin.innerHTML == "00" && timerHour.innerHTML == "00"){
    let toggleCounter = 0;
    toggleInterval = setInterval(() => {
      timerValues.classList.toggle("error");
      toggleCounter++;
      toggleCounter == 6 ? clearInterval(toggleInterval) : toggleCounter;
      }, 200);
  }
  else{
  timerInterval = setInterval(timeDecrease, 10);
}
});

timerStopBtn.addEventListener("click", function(){
  clearInterval(timerInterval);
  timerStopClicks++;
  if( timerStopClicks == 2){
    timerMs.innerHTML = timerSec.innerHTML = timerMin.innerHTML = timerHour.innerHTML = "00";
    timerStopClicks = 0;
  }
});

function timeDecrease(){
  let ms = Number(timerMs.innerHTML);
  let s = Number(timerSec.innerHTML);
  let min = Number(timerMin.innerHTML);
  let h = Number(timerHour.innerHTML);
  let firstStart = true;

  if (firstStart){
    if (ms == 0){
      if( s != 0) {
        s--;
        ms = 99;
        }
        else if( min != 0){
          min--;
          s = 59;
          ms = 99;
        }
        else if ( h != 0 ){
          h--;
          min = 59;
          s = 59;
          ms = 99;
        }
    }
    firstStart = false;
  };
  ms--;
  if (ms == 0) {
    if( s != 0) {
    s--;
    ms = 99;
    }
    else
      ms = 0;
  }
  if (s == 0) {
    if( min != 0){
    min--;
    s = 59;
    }
    else
    s = 0;
  }
  if (min == 0) {
    if ( h != 0 ){
    h--;
    min = 59;
    }
    else
    min = 0;
  }
  if (ms > 0){
  ms < 10
    ? (timerMs.innerHTML = "0" + ms)
    : (timerMs.innerHTML = ms);
  }
  else {
    timerMs.innerHTML = "00";
    let toggleCounter = 0;
    toggleInterval = setInterval(() => {
      timerValues.classList.toggle("error");
      toggleCounter++;
      toggleCounter == 6 ? clearInterval(toggleInterval) : toggleCounter;
      }, 200);
    clearInterval(timerInterval);
  };
  s < 10
    ? (timerSec.innerHTML = "0" + s)
    : (timerSec.innerHTML = s);
  min < 10
    ? (timerMin.innerHTML = "0" + min)
    : (timerMin.innerHTML = min);

  h < 10
    ? (timerHour.innerHTML = "0" + h)
    : (timerHour.innerHTML = h);
}