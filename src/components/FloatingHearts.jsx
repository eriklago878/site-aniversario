import React, { useMemo } from "react";

const EMOJIS = ["💕", "💗", "🩷", "✨", "💫"];

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        drift: Math.random() * 80 - 40,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 14,
        size: 0.9 + Math.random() * 1.1,
      })),
    []
  );

  return (
    <div className="bday-hearts">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="bday-heart"
          style={{
            left: `${h.left}vw`,
            "--drift": `${h.drift}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
