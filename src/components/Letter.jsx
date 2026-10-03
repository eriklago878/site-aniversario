import React, { useState } from "react";
import Reveal from "./Reveal";
import NavButtons from "./NavButtons";
import EnvelopeOpening from "./EnvelopeOpening";
import FriendshipCounter from "./FriendshipCounter";
import "../styles/letter.css";

const yourName = "erik";

const letter = `Eu poderia simplesmente te desejar feliz aniversário, mas queria fazer algo diferente.

Queria te dizer que sou muito grato por ter você por perto. Sou grato pelas risadas bobas, pelos momentos difíceis que se tornam mais fáceis quando você está comigo e por cada pequeno momento que compartilhamos.

Você faz parte da minha vida de um jeito que eu nunca soube explicar direito. Só sei que, quando penso em você, sinto um carinho enorme e uma felicidade difícil de colocar em palavras. Você se tornou alguém muito especial para mim, alguém que eu quero sempre por perto e que merece todo o amor, carinho e felicidade do mundo.

Espero que esse novo ano da sua vida seja cheio de momentos incríveis, sonhos realizados e pessoas que te façam sorrir. E espero também poder continuar ao seu lado, compartilhando momentos, risadas e criando novas lembranças com você.

Feliz aniversário. Que você nunca se esqueça do quanto é especial e do quanto é importante para mim. ❤️
`;

const letterSign = "com todo o meu amor";

// Guarda (só enquanto a página não é recarregada) se a carta já foi aberta,
// para a animação não repetir toda vez que a pessoa voltar para esta tela.
let envelopeAlreadyOpened = false;

export default function Letter() {
  // `opened` vira true quando a carta terminou de abrir -> libera o contador.
  const [opened, setOpened] = useState(false);

  return (
    <section className="bday-section letter-page">
      <EnvelopeOpening
        startOpen={envelopeAlreadyOpened}
        onOpened={() => {
          envelopeAlreadyOpened = true;
          setOpened(true);
        }}
        onClosed={() => {
          envelopeAlreadyOpened = false;
          setOpened(false);
        }}
      >
        <div className="letter-head">
          <p className="bday-eyebrow">uma cartinha</p>
          <h2 className="bday-title">Antes da última surpresa</h2>
        </div>

        <div className="letter">
          <p className="letter-body">{letter}</p>
          <p className="letter-sign">
            {letterSign} — {yourName}
          </p>
        </div>
      </EnvelopeOpening>

      {/* Depois da carta aberta, o resto da página aparece suavemente */}
      {opened && (
        <>
         
          <Reveal className="counter-wrap">
            <FriendshipCounter />
          </Reveal>
          <NavButtons nextLabel="Última surpresa" />
        </>
      )}
    </section>
  );
}
