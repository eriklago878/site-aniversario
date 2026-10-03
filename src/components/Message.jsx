import React from "react";
import Reveal from "./Reveal";
import NavButtons from "./NavButtons";

const openingMessage = `Escrevendo isso e sem saber muito bem por onde começar, só sei que hoje é um
dia especial e eu queria lidar um presente so que não tenho dinheiro então pensei em fazer essa pequena demostração do meu AMOR.`;

export default function Message() {
  return (
    <section className="bday-section">
      <Reveal className="bday-section-inner">
        <p className="bday-eyebrow">para começar</p>
        <h2 className="bday-title">Uma mensagem antes de tudo</h2>
        <p className="bday-body">{openingMessage}</p>
      </Reveal>
      <NavButtons />
    </section>
  );
}
