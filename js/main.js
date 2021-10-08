const DATE = document.querySelector(".date");
const CLOCK = document.querySelector(".clock");
const STOPWATCH = document.querySelector(".stopwatch-text");
const HOURS_STOPWATCH = document.querySelector("#hours-stopwatch");
const MINUTES_STOPWATCH = document.querySelector("#minutes-stopwatch");
const SECONDS_STOPWATCH = document.querySelector("#seconds-stopwatch");
const START_STOPWATCH = document.querySelector(".start-stopwatch");
const STOP_STOPWATCH = document.querySelector(".stop-stopwatch");
const RESET_STOPWATCH = document.querySelector(".reset-stopwatch");
const LOOP_STOPWATCH = document.querySelector(".loop-stopwatch");
const LOOP_FIELD = document.querySelector(".stopwatch-loop-text");
const PLUS = document.querySelector(".plus");
const MINUS = document.querySelector(".minus");
const MINUTES_TIMER = document.querySelector(".timer_minutes");
const SECONDS_TIMER = document.querySelector(".timer_seconds");
const START_TIMER = document.querySelector(".start-timer");
const STOP_TIMER = document.querySelector(".stop-timer");
const RESET_TIMER = document.querySelector(".reset-timer");

let starStopWacth;
let startTimer;
let isDisabled = true;

//----------------Date and Time----------------
setInterval(() => {
  let myDate = new Date();
  let day = myDate.getDate() <= 9 ? "0" + myDate.getDate() : myDate.getDate();
  let months = myDate.getMonth() <= 8 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
  let year = myDate.getFullYear();
  DATE.textContent = `${day}.${months}.${year}`;
  let hours = myDate.getHours() <= 9 ? "0" + myDate.getHours() : myDate.getHours();
  let minutes = myDate.getMinutes() <= 9 ? "0" + myDate.getMinutes() : myDate.getMinutes();
  let seconds = myDate.getSeconds() <= 9 ? "0" + myDate.getSeconds() : myDate.getSeconds();
  CLOCK.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);
//---------------------------------------------

//------------------Stopwatch------------------
START_STOPWATCH.addEventListener("click", (event) => {
  START_STOPWATCH.disabled = true;
  STOP_STOPWATCH.disabled = false;
  starStopWacth = setInterval(() => {
    if (SECONDS_STOPWATCH.textContent < 59) {
      if (SECONDS_STOPWATCH.textContent < 9)
        SECONDS_STOPWATCH.textContent = "0" + (Number(SECONDS_STOPWATCH.textContent) + 1);
      else
        SECONDS_STOPWATCH.textContent = Number(SECONDS_STOPWATCH.textContent) + 1;
    } else {
      SECONDS_STOPWATCH.textContent = "00";
      if (MINUTES_STOPWATCH.textContent < 59) {
        if (MINUTES_STOPWATCH.textContent < 9)
          MINUTES_STOPWATCH.textContent = "0" + (Number(MINUTES_STOPWATCH.textContent) + 1);
        else
          MINUTES_STOPWATCH.textContent = Number(MINUTES_STOPWATCH.textContent) + 1;
      } else {
        MINUTES_STOPWATCH.textContent = "00";
        if (MINUTES_STOPWATCH.textContent < 9)
          HOURS_STOPWATCH.textContent = "0" + (Number(HOURS_STOPWATCH.textContent) + 1);
        else
          HOURS_STOPWATCH.textContent = Number(HOURS_STOPWATCH.textContent) + 1;
      }
    }
  }, 1000);
});

STOP_STOPWATCH.addEventListener("click", (event) => {
  clearInterval(starStopWacth);
  START_STOPWATCH.disabled = false;
  STOP_STOPWATCH.disabled = true;
});

RESET_STOPWATCH.addEventListener("click", (event) => {
  clearInterval(starStopWacth);
  START_STOPWATCH.disabled = false;
  STOP_STOPWATCH.disabled = true;
  HOURS_STOPWATCH.textContent = "00";
  MINUTES_STOPWATCH.textContent = "00";
  SECONDS_STOPWATCH.textContent = "00";
});

LOOP_STOPWATCH.addEventListener("click", (event) => {
  let newP = document.createElement("p");
  newP.textContent = STOPWATCH.innerText;
  LOOP_FIELD.append(newP);
});
//---------------------------------------------

//--------------------Timer--------------------
PLUS.addEventListener("click", (event) => {
  let time = document.querySelector(".timer-number");
  time.textContent =
    time.textContent < 9 ?
    "0" + (Number(time.textContent) + 1) :
    Number(time.textContent) + 1;
});

MINUS.addEventListener("click", (event) => {
  let timerMinutes = document.querySelector(".timer-number");
  if (timerMinutes.textContent > 0)
    timerMinutes.textContent =
    timerMinutes.textContent < 9 ?
    "0" + (Number(timerMinutes.textContent) - 1) :
    Number(timerMinutes.textContent) - 1;
});

START_TIMER.addEventListener("click", (event) => {
  let timerMinutes = document.querySelector(".timer-number");
  if (timerMinutes.textContent == 0)
    return;
  if (isDisabled) MINUTES_TIMER.textContent = timerMinutes.textContent;
  isDisabled = false;
  START_TIMER.disabled = true;
  STOP_TIMER.disabled = false;
  startTimer = setInterval(() => {
    if (MINUTES_TIMER.textContent >= 0) {
      if (SECONDS_TIMER.textContent > 0) {
        SECONDS_TIMER.textContent =
          SECONDS_TIMER.textContent > 9 ?
          Number(SECONDS_TIMER.textContent) - 1 :
          "0" + (Number(SECONDS_TIMER.textContent) - 1);
      } else if (MINUTES_TIMER.textContent != 0) {
        MINUTES_TIMER.textContent =
          MINUTES_TIMER.textContent > 9 ?
          Number(MINUTES_TIMER.textContent) - 1 :
          "0" + (Number(MINUTES_TIMER.textContent) - 1);
        SECONDS_TIMER.textContent = "59";
      }
    }
  }, 1000);
});

STOP_TIMER.addEventListener("click", (event) => {
  clearInterval(startTimer);
  START_TIMER.disabled = false;
  STOP_TIMER.disabled = true;
});

RESET_TIMER.addEventListener("click", (event) => {
  clearInterval(startTimer);
  isDisabled = true;
  START_TIMER.disabled = false;
  MINUTES_TIMER.textContent = "00";
  SECONDS_TIMER.textContent = "00";
});
//---------------------------------------------