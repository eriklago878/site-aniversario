import React, { useState } from "react";
import Reveal from "./Reveal";
import NavButtons from "./NavButtons";
import CONFIG from "../config";
import "../styles/gallery.css";

const PALETTE = ["#e88ba3", "#b79bdb", "#f0b77e", "#8bc9c0", "#e0879e", "#a6a1e0"];

export default function Gallery() {
  const [flipped, setFlipped] = useState({});

  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }));

  return (
    <section className="bday-section">
      <Reveal className="bday-section-inner">
        <p className="bday-eyebrow">nossa história</p>
        <h2 className="bday-title">Alguns momentos nossos</h2>
        <p className="bday-body">Clique em cada foto para ver a lembrança por trás dela.</p>
      </Reveal>

      <Reveal className="gallery-grid">
        {CONFIG.photos.map((photo, i) => (
          <button
            key={i}
            className={`photo-card ${flipped[i] ? "flipped" : ""}`}
            style={{ background: photo.img ? undefined : PALETTE[i % PALETTE.length] }}
            onClick={() =>  toggle(i)}
            aria-label="Ver lembrança"
          >
            {photo.img && <img className="photo-img" src={photo.img} alt="" />}
            <span className="photo-face">{!photo.img && photo.emoji}</span>
            <span className="photo-back">{photo.caption}</span>
          </button>
        ))}
      </Reveal>

      <p className="gallery-hint">toque nas fotos ✨</p>
      <NavButtons />
    </section>
  );
}
