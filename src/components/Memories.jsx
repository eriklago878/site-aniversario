// import React from "react";
// import Reveal from "./Reveal";
// import NavButtons from "./NavButtons";

// const memories = [
//   { emoji: "🐄", text: " ." },
//   { emoji: "🙈", text: "A vez que quase fomos expulsas por rir demais." },
//   { emoji: "🍕", text: "Nossa frase clássica: 'só mais uma coisa antes de irmos'." },
//   { emoji: "🚗", text: "A viagem que devia durar 1h e durou o dia inteiro." },
// ];

// export default function Memories() {
//   return (
//     <section className="bday-section">
//       <Reveal className="bday-section-inner">
//         <p className="bday-eyebrow">as clássicas</p>
//         <h2 className="bday-title">Momentos que não podiam faltar</h2>
//       </Reveal>

//       <Reveal className="memories-grid">
//         {memories.map((m, i) => (
//           <div className="memory-card" key={i}>
//             <span className="memory-emoji">{m.emoji}</span>
//             <p className="memory-text">{m.text}</p>
//           </div>
//         ))}
//       </Reveal>
//       <NavButtons />
//     </section>
//   );
// }
