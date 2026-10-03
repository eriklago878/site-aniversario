import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import NavButtons from "./NavButtons";
import PhotoFrame from "./PhotoFrame";

const finalTitle = "Feliz aniversário!";

const finalMessage = `Que  a nossa amizade continue, e espero que você seja feliz que pare com sua frescuras em relação a comida e que sempre seja essa pessoa maravilhosa que vc é e nunca mude esse seu jeitinho que você tem. Te Amo 💕❤️😘.`;

const COLORS = ["#e88ba3", "#b79bdb", "#d7a94c", "#f0b77e", "#8bc9c0", "#ffffff"];

export default function FinalSurprise() {
  const [opened, setOpened] = useState(false);
  const canvasRef = useRef(null);

  // Mantém o canvas do tamanho da tela
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Dispara uma chuva de confetes por cima da tela inteira
  const launch = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speedY: 2 + Math.random() * 3,
      speedX: -1.5 + Math.random() * 3,
      rot: Math.random() * 360,
      rotSpeed: -6 + Math.random() * 12,
    }));

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rot += p.rotSpeed;
        if (p.y < canvas.height + 20) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive) requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(frame);
  }, []);

  const open = () => {
    setOpened(true);
    launch();
    setTimeout(launch, 900);
  };

  return (
    <section className="bday-section">
      <canvas ref={canvasRef} className="confetti-canvas" />

      {!opened && (
        <Reveal className="bday-section-inner">
          <p className="bday-eyebrow">quase lá</p>
          <h2 className="bday-title">Ainda não acabou...</h2>
          <p className="bday-body">Tem mais uma coisinha para você.</p>
          <Reveal className="photo-reveal">
            <PhotoFrame />
          </Reveal>
          <button className="bday-btn" style={{ marginTop: "1.5rem" }} onClick={open}>
            Abrir última surpresa
          </button>
        </Reveal>
      )}

      {opened && (
        <div className="final-card">
          <div className="balloons">🎈🎉🎂🎉🎈</div>
          <h2 className="bday-title" style={{ fontSize: "1.9rem" }}>
            {finalTitle}
          </h2>
          <p className="bday-body">{finalMessage}</p>
          <Link className="nav-link nav-link-next" to="/" style={{ marginTop: "1.5rem", display: "inline-block" }}>
            ← Voltar ao início
          </Link>
        </div>
      )}
      <NavButtons />
    </section>
  );
}
