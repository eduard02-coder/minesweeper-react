interface Time {
  min: number;
  sec: number;
  cs: number;
}

class TimerEngine {
  #time: Time;
  #count!: ReturnType<typeof setInterval>;
  #isRunning: boolean;
  #domUpdate: () => void;

  constructor(
    domHandler = (arg: string) => {},
    timeStrFormatter = (t: Time) => `${t.min}:${t.sec}:${t.cs}`,
  ) {
    this.#isRunning = false;

    this.#time = {
      min: 0,
      sec: 0,
      cs: 0,
    };

    this.#domUpdate = () => {
      domHandler(timeStrFormatter(this.#time));
    };
  }

  get time() {
    return this.#time;
  }

  start(startingTime?: Time) {
    if (this.#isRunning) {
      return;
    }

    this.#isRunning = true;

    if (startingTime) {
      this.#time = { ...startingTime };
    }

    let accumulatedMs =
      (this.#time.min * 60 + this.#time.sec) * 1000 + this.#time.cs * 10;

    const now = performance.now() - accumulatedMs;

    this.#count = setInterval(() => {
      accumulatedMs = performance.now() - now;

      this.#time.min = Math.floor(accumulatedMs / 60000);
      this.#time.sec = Math.floor((accumulatedMs % 60000) / 1000);
      this.#time.cs = Math.floor((accumulatedMs % 1000) / 10);

      this.#domUpdate();
    }, 10);
  }

  stop() {
    if (this.#isRunning) {
      this.#isRunning = false;
      clearInterval(this.#count);
    }
  }

  reset() {
    this.stop();
    this.#time = {
      min: 0,
      sec: 0,
      cs: 0,
    };
    this.#domUpdate();
  }
}

export { TimerEngine, type Time };
