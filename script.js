class App {
  constructor() {
    this.customForm = document.querySelector("#custom");
    this.targetInput = document.querySelector("[name=minutes]");
    this.timerButtons = document.querySelectorAll(".timer__button");
    this.timeLeftEl = document.querySelector(".display__time-left");
    this.endTimeEl = document.querySelector(".display__end-time");

    this.Time = new Time();
    this.Display = new Display(); // static 하게 사용할수도 있을듯..

    this.timeId;
  }

  start() {
    this.timeSubmitEvents();
  }

  timeSubmitEvents() {
    this.customForm.addEventListener(
      "submit",
      this.displayInputTime.bind(this)
    );

    this.timerButtons.forEach((btn) =>
      btn.addEventListener("click", this.displayBtnsTime.bind(this))
    );
  }

  displayInputTime(e) {
    e.preventDefault();

    const min = parseInt(this.targetInput.value, 10);
    this.targetInput.value = "";

    if (!(min <= 60 && isFinite(min))) return;

    const end = this.Time.getTimeLater(min * 60);

    this.timeLeftEl.textContent = this.Display.displayLeftTime(min * 60);

    this.endTimeEl.textContent = this.Display.displayEndTime(end);

    this.startCountTimer(end);
  }

  displayBtnsTime(e) {
    const { time } = e.target.dataset;

    const sec = parseInt(time, 10);

    const end = this.Time.getTimeLater(sec);

    this.timeLeftEl.textContent = this.Display.displayLeftTime(sec);
    this.endTimeEl.textContent = this.Display.displayEndTime(end);
    this.startCountTimer(end);
  }

  startCountTimer(end) {
    clearInterval(this.timeId);

    this.timeId = setInterval(() => {
      const current = Date.now();
      let diff = end - current;

      if (Math.round(diff / 1000) <= 0) {
        clearInterval(this.timeId);
        diff = 0;
      }

      this.timeLeftEl.textContent = this.Display.displayLeftTime(diff / 1000);
    }, 1000);
  }
}

class Time {
  constructor() {}

  getTimeLater(sec) {
    const currentTime = new Date();

    currentTime.setSeconds(currentTime.getSeconds() + sec);

    return currentTime;
  }
}

class Display {
  constructor() {}

  displayLeftTime(sec) {
    console.log(sec / 60);
    const minutes =
      sec / 60 > 0.99 && sec / 60 < 1
        ? Math.round(sec / 60)
        : Math.floor(sec / 60);
    const seconds = Math.round(sec % 60) === 60 ? 0 : Math.round(sec % 60);

    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }

  displayEndTime(time) {
    const hours = time.getHours();
    const minutes = time.getMinutes();

    return `Be back at ${hours >= 12 ? "PM" : "AM"} ${
      hours < 10 ? `0${hours}` : hours
    }:${minutes < 10 ? `0${minutes}` : minutes}`;
  }
}

const app = new App();
app.start();
