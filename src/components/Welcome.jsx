import React from "react";
import { Link } from "react-router-dom";

const friendName = "Ana";

export default function Welcome() {
  return (
    <section className="bday-cover">
      <span className="bday-gift-emoji">🎁</span>
      <h1 className="bday-cover-title"> {friendName}... tenho uma surpresa para você</h1>
      <p className="bday-cover-sub">Antes de mais nada: feliz aniversário. Agora vem comigo.</p>
      <Link className="bday-btn" to="/mensagem">
        Abrir presente
      </Link>
    </section>
  );
}
