import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/envelope.css";

/**
 * COMO A ANIMAÇÃO FUNCIONA
 * ------------------------------------------------------------
 * Tudo é uma "máquina de fases". Cada fase adiciona uma classe CSS ao
 * envelope e o CSS faz a transição (o JS só troca a fase no tempo certo):
 *
 *   idle      envelope fechado, esperando o clique ("💌 Clique para abrir")
 *   breaking  o selo de cera se parte em 2 metades que caem + brilhos
 *   flap      a aba superior gira 180° para cima (rotateX)
 *   sliding   a carta desliza para fora do envelope
 *   open      o envelope some, a carta se desdobra e o texto aparece (fade-in)
 *
 * Os tempos de cada fase ficam em TIMING (milissegundos, contados do clique).
 */
const ORDER = ["idle", "breaking", "flap", "sliding", "open"];
const TIMING = { flap: 700, sliding: 1700, open: 3000, settled: 4400 };

export default function EnvelopeOpening({ startOpen = false, onOpened, onClosed, children }) {
  const [phase, setPhase] = useState(startOpen ? "open" : "idle");
  const [cycle, setCycle] = useState(0); // trocar o "key" recria o envelope fechado
  const timers = useRef([]);

  const reached = (p) => ORDER.indexOf(phase) >= ORDER.indexOf(p);
  const after = (ms, fn) => timers.current.push(setTimeout(fn, ms));

  // Se a carta já estava aberta (voltou pra esta tela), apenas avisa a página.
  useEffect(() => {
    if (startOpen) onOpened?.();
    return () => timers.current.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Enquanto o envelope não terminou de abrir, a página não rola.
  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  // Brilhinhos discretos (posições sorteadas uma única vez).
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        x: (Math.random() - 0.5) * 0.9, // fração da largura do envelope
        y: -0.15 - Math.random() * 0.55,
        size: 10 + Math.random() * 10,
        delay: Math.random() * 0.9,
        gold: i % 2 === 0,
      })),
    [cycle]
  );

  const open = () => {
    if (phase !== "idle") return; // só abre uma vez
    setPhase("breaking");
    after(TIMING.flap, () => setPhase("flap"));
    after(TIMING.sliding, () => setPhase("sliding"));
    after(TIMING.open, () => setPhase("open"));
    after(TIMING.settled, () => onOpened?.());
  };

  const close = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCycle((c) => c + 1);
    setPhase("idle");
    onClosed?.();
  };

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  const cls = [
    "env-scene",
    reached("breaking") && "is-broken",
    reached("flap") && "is-flap",
    reached("sliding") && "is-sliding",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Fundo escurecido/desfocado que dá destaque ao envelope */}
      <div className={`env-backdrop ${reached("open") ? "is-hidden" : ""}`} aria-hidden="true" />

      {/* ---- Envelope ---- */}
      <div className={`env-scene-wrap ${reached("open") ? "is-gone" : ""}`} aria-hidden={reached("open")}>
        <div className="env-scene-clip">
          <div
            key={cycle}
            className={cls}
            role="button"
            tabIndex={reached("open") ? -1 : 0}
            aria-label="Abrir a carta"
            onClick={open}
            onKeyDown={onKey}
          >
            <div className="env">
              <div className="env-back" />

              {/* A carta dentro do envelope (sobe quando is-sliding) */}
              <div className="env-paper">
                <span className="env-paper-heart">♡</span>
              </div>

              {/* Parte da frente do envelope (3 "dobras" triangulares) */}
              <div className="env-pocket">
                <i className="side l" />
                <i className="side r" />
                <i className="bottom" />
              </div>

              {/* Aba superior: gira em 3D quando is-flap */}
              <div className="env-flap-shadow"><i /></div>
              <div className="env-flap">
                <div className="env-flap-face front" />
                <div className="env-flap-face back" />
              </div>

              {/* Selo de cera: duas metades que se separam quando is-broken */}
              <div className="env-seal">
                <span className="seal-half left">♥</span>
                <span className="seal-half right">♥</span>
              </div>

              {/* Brilhos */}
              {reached("breaking") && (
                <div className="env-sparkles" aria-hidden="true">
                  {sparkles.map((s, i) => (
                    <span
                      key={i}
                      className="env-sparkle"
                      style={{
                        "--fx": s.x,
                        "--fy": s.y,
                        "--s": `${s.size}px`,
                        "--d": `${s.delay}s`,
                        "--c": s.gold ? "#d7a94c" : "#f4b6c6",
                      }}
                    >
                      ✦
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="env-hint">💌 Clique para abrir</div>
          </div>
        </div>
      </div>

      {/* ---- Carta aberta (conteúdo vem de fora via children) ---- */}
      <div className={`env-letter-wrap ${reached("open") ? "is-open" : ""}`}>
        <div className="env-letter-clip">
          <div className="env-letter-unfold">
            <div className="env-letter-content">{children}</div>
            <button type="button" className="env-close" onClick={close}>
              ↺ Fechar carta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
