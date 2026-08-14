let paperSlide: HTMLAudioElement | null = null;
let intro: HTMLAudioElement | null = null;
let main: HTMLAudioElement | null = null;

function getIntro() {
  if (typeof window === "undefined") return null;
  if (!intro) {
    intro = new Audio("/sound/intro.mp3");
    intro.loop = false;
    intro.volume = 0.45;
    intro.preload = "auto";
    intro.load();
  }
  return intro;
}

export function preloadIntro() {
  getIntro();
}

function getMain() {
  if (typeof window === "undefined") return null;
  if (!main) {
    main = new Audio("/sound/main.mp3");
    main.loop = true;
    main.volume = 0.45;
  }
  return main;
}

export function playPaperSlide() {
  if (typeof window === "undefined") return;

  if (!paperSlide) {
    paperSlide = new Audio("/sound/paper-slide.mp3");
  }

  paperSlide.currentTime = 0;
  void paperSlide.play().catch(() => {});
}

export function startIntro() {
  const audio = getIntro();
  if (!audio) return Promise.resolve(false);
  if (!audio.paused && !audio.ended) return Promise.resolve(true);
  audio.currentTime = 0;
  return audio
    .play()
    .then(() => true)
    .catch(() => false);
}

export function stopIntro() {
  if (!intro) return;
  intro.pause();
  intro.currentTime = 0;
}

export function startMainLoop() {
  const audio = getMain();
  if (!audio || !audio.paused) return;
  void audio.play().catch(() => {});
}

export function stopMainLoop() {
  if (!main) return;
  main.pause();
  main.currentTime = 0;
}
