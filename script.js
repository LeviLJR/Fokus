const html = document.querySelector("html");
const focusBt = document.querySelector(".app__card-button--foco");
const shortBt = document.querySelector(".app__card-button--curto");
const longBt = document.querySelector(".app__card-button--longo");
const startBt = document.querySelector("#start-pause");
const displayTimer = document.querySelector("#timer");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const musicFocusInput = document.querySelector("#alternar-musica");
const startOrPauseBt = document.querySelector("#start-pause span");
const startOrPauseBtimg = document.querySelector(
  ".app__card-primary-butto-icon"
);
const timerOnScreen = document.querySelector("#timer");

const music = new Audio("/sons/luna-rise-part-one.mp3");
const soundPause = new Audio("/sons/pause.mp3");
const soundPlay = new Audio("/sons/play.wav");
const soundBeep = new Audio("/sons/beep.mp3");

let pastTimeInSeconds = 1500;
let intervalId = null;
music.loop = true;

musicFocusInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

focusBt.addEventListener("click", () => {
  pastTimeInSeconds = 1500;
  changeContext("foco");
  focusBt.classList.add("active");
});

shortBt.addEventListener("click", () => {
  pastTimeInSeconds = 300;
  changeContext("descanso-curto");
  shortBt.classList.add("active");
});

longBt.addEventListener("click", () => {
  pastTimeInSeconds = 900;
  changeContext("descanso-longo");
  longBt.classList.add("active");
});

function changeContext(context) {
  html.setAttribute("data-contexto", context);
  banner.setAttribute("src", `/imagens/${context}.png`);
  clearTimer();
  showTimer();
  switch (context) {
    case "foco":
      title.innerHTML = ` Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      buttons.forEach((context) => {
        context.classList.remove("active");
      });
      break;
    case "descanso-curto":
      title.innerHTML = `
      Que tal dar uma respirada? <br />
      <strong class="app__title-strong">Faça uma pausa curta!
      </strong>
      `;
      buttons.forEach((context) => {
        context.classList.remove("active");
      });
      break;
    case "descanso-longo":
      title.innerHTML = `
      Hora de voltar à superfície. <br /> <strong class="app__title-strong">
      Faça uma pausa longa. </strong>
      `;
      buttons.forEach((context) => {
        context.classList.remove("active");
      });
      break;
    default:
      break;
  }
}

startBt.addEventListener("click", startOrPause);

function startOrPause() {
  if (intervalId) {
    soundPause.play();
    clearTimer();
    return;
  }
  soundPlay.play();
  intervalId = setInterval(countdown, 1000);
  startOrPauseBt.textContent = "Pausar";
  startOrPauseBtimg.setAttribute("src", `/imagens/pause.png`);
}

function clearTimer() {
  clearInterval(intervalId);
  startOrPauseBt.textContent = "Começar";
  startOrPauseBtimg.setAttribute("src", `/imagens/play_arrow.png`);
  intervalId = null;
}

const countdown = () => {
  if (pastTimeInSeconds <= 0) {
    soundBeep.play();
    alert("Tempo finalizado!");

    const focusActive = html.getAttribute('data-contexto') == 'foco'
    if(focusActive){
      const event = new CustomEvent('FocoFinalizado')
      document.dispatchEvent(event)
    }
    clearTimer();
    return;
  }
  pastTimeInSeconds -= 1;
  showTimer();
};

function showTimer() {
  const time = new Date(pastTimeInSeconds * 1000);
  const timeFixed = time.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timerOnScreen.innerHTML = `${timeFixed}`;
}

showTimer();
