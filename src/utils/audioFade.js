// ============================================================
// FADE DE ÁUDIO (fade-in / fade-out suave)
// ============================================================
// Muda `audio.volume` aos poucos (a cada frame) até `target` (0 a 1).
// Se um novo fade começar no mesmo áudio, o anterior é cancelado — assim
// nada "briga" e a música nunca reinicia: só o volume muda.
// Retorna uma Promise: true = terminou, false = foi cancelado por outro fade.
// Obs.: no iPhone/iOS o navegador ignora `volume` (sempre 1); lá o fade
// não é audível, mas play/pause continuam funcionando normalmente.
// ============================================================
const running = new WeakMap();

export function fadeAudio(audio, target, duration = 1200) {
  return new Promise((resolve) => {
    running.get(audio)?.(); // cancela fade anterior
    const from = audio.volume;
    const t0 = performance.now();
    let cancelled = false;
    running.set(audio, () => {
      cancelled = true;
      resolve(false);
    });

    const step = (now) => {
      if (cancelled) return;
      const p = Math.min((now - t0) / duration, 1);
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * p));
      if (p < 1) requestAnimationFrame(step);
      else {
        running.delete(audio);
        resolve(true);
      }
    };
    requestAnimationFrame(step);
  });
}

// Começa a tocar em volume 0 e sobe até 1 (fade-in).
export async function playWithFadeIn(audio, duration = 1500) {
  if (audio.paused) audio.volume = 0;
  await audio.play();
  return fadeAudio(audio, 1, duration);
}

// Desce até 0 e só então pausa (fade-out). Se outro fade interromper, não pausa.
export async function fadeOutAndPause(audio, duration = 1200) {
  const done = await fadeAudio(audio, 0, duration);
  if (done) audio.pause();
}
