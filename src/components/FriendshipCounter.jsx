import React, { useEffect, useState } from "react";
import { getElapsed } from "../utils/elapsedTime";
import "../styles/counter.css";

// ============================================================
// ✏️  ONDE ALTERAR A DATA — troque APENAS a linha abaixo!
// Formato: "AAAA-MM-DDTHH:MM:SS"  (hora local do navegador)
// Exemplo: 15 de março de 2023, às 18h30  ->  "2023-03-15T18:30:00"
// ============================================================
const START_DATE = "2024-03-01T00:00:00";
// ============================================================

const start = new Date(START_DATE);
if (isNaN(start)) console.error('START_DATE inválida. Use o formato "AAAA-MM-DDTHH:MM:SS".');

// [chave, singular, plural, preencher com 0 à esquerda?]
const UNITS = [
  ["years", "ano", "anos"],
  ["months", "mês", "meses"],
  ["days", "dia", "dias"],
  ["hours", "hora", "horas", true],
  ["minutes", "min.", "min.", true],
  ["seconds", "seg.", "seg.", true],
];

// O número é recriado (key={value}) quando muda, o que reinicia a animação CSS "pop".
function TimeBox({ value, label, pad }) {
  const text = pad ? String(value).padStart(2, "0") : String(value);
  return (
    <div className="counter-box">
      <span key={text} className="counter-num">{text}</span>
      <span className="counter-label">{label}</span>
    </div>
  );
}

export default function FriendshipCounter() {
  const [elapsed, setElapsed] = useState(() => getElapsed(start));

  // Atualiza sempre na virada do segundo (sem acumular atraso) e sem recarregar a página.
  useEffect(() => {
    let timer;
    const tick = () => {
      const now = new Date();
      setElapsed(getElapsed(start, now));
      timer = setTimeout(tick, 1000 - now.getMilliseconds() + 5);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="counter-card">
      <p className="counter-orn">♡ Nosso tempo juntos ♡</p>
      <p className="counter-quote">“Cada segundo ao seu lado é especial.”</p>
      <p className="counter-since">Juntos há</p>

      <div className="counter-grid" role="timer" aria-label="Tempo juntos">
        {UNITS.map(([key, one, many, pad]) => (
          <TimeBox key={key} value={elapsed[key]} label={(elapsed[key] === 1 ? one : many).toUpperCase()} pad={pad} />
        ))}
      </div>
    </div>
  );
}
