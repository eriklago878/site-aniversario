import React, { useRef, useState } from "react";
import Reveal from "./Reveal";
import NavButtons from "./NavButtons";
import { playWithFadeIn, fadeOutAndPause } from "../utils/audioFade";

const song = {
  title: "partilha",
  artist: "Artista",
  note: "toda vez que ela toca eu lembro de você",
  // link direto de um .mp3, se quiser que toque de verdade. Vazio = só a animação.
  url: "https://romantic-peach-e6ybxyxk.edgeone.dev/",
};

export default function Music() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    const next = !playing;
    setPlaying(next);
    if (song.url && audioRef.current) {
      // Fade-in ao tocar e fade-out ao pausar (veja src/utils/audioFade.js)
      if (next) playWithFadeIn(audioRef.current).catch(() => {});
      else fadeOutAndPause(audioRef.current);
    }
  };

  return (
    <section className="bday-section">
      <Reveal className="bday-section-inner">
        <p className="bday-eyebrow">a nossa trilha sonora</p>
        <h2 className="bday-title">Essa música é a nossa</h2>
      </Reveal>

      <Reveal className="music-card">
        {/* Coração que pulsa: devagar parado, mais rápido quando a música toca */}
        <div className={`music-heart ${playing ? "playing" : ""}`} aria-hidden="true">♥</div>

        <div className="music-row">
          <button
            className="play-btn"
            onClick={toggle}
            aria-label={playing ? "Pausar música" : "Tocar música"}
          >
            {playing ? "❚❚" : "▶"}
          </button>

          <div className="song-meta">
            <div className="song-title">{song.title}</div>
            <div className="song-artist">{song.artist}</div>
          </div>

          <div className={`eq ${playing ? "playing" : ""}`}>
            <span /><span /><span /><span /><span />
          </div>
        </div>

        <p className="music-note">{song.note}</p>
      </Reveal>

      {song.url && <audio ref={audioRef} src={song.url} preload="none" />}
      <NavButtons />
    </section>
  );
}