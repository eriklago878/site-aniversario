import React, { useState } from "react";
import "../styles/photo.css";

// 📷 Coloque as fotos em public/img/ e escreva os nomes aqui.
const PHOTOS = [
  { src: "/img/unnamed.jpg", caption: " você seria um jigglypuff" },
  { src: "/img/unnamed (1).jpg", caption: "Eu quando estou perto de você" },
];

function Polaroid({ photo, index }) {
  const [failed, setFailed] = useState(false);
  const empty = !photo.src || failed;
  const tilt = index % 2 === 0 ? -2 : 2;

  return (
    <figure className="photo-polaroid" style={{ "--tilt": `${tilt}deg` }}>
      <span className="photo-tape" aria-hidden="true" />
      <div className="photo-window">
        {empty ? (
          <div className="photo-empty">
            <span>📷</span>
            <small></small>
          </div>
        ) : (
          <img src={photo.src} alt={photo.caption} onError={() => setFailed(true)} />
        )}
      </div>
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </figure>
  );
}

export default function PhotoFrame() {
  return (
    <div className="photo-wrap">
      <p className="photo-title">♡ Se você fosse um pokemon ♡</p>
      <div className="photo-row">
        {PHOTOS.map((p, i) => (
          <Polaroid key={i} photo={p} index={i} />
        ))}
      </div>
    </div>
  );
}