const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    const maxSeconds = Math.floor(Number.MAX_SAFE_INTEGER / 1000); // максимальное значение в секундах
    if (seconds > maxSeconds) {
      seconds = maxSeconds;
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    let remainingSeconds = seconds;
    const displayTime = () => {
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      timerEl.innerText = formattedTime;
    };
    displayTime();
    intervalId = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds <= 0) {
        clearInterval(intervalId);
        timerEl.innerText = '00:00:00';
        intervalId = null;
        return;
      }
      displayTime();
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
