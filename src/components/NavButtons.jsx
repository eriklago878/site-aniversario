import React from "react";
import { Link, useLocation } from "react-router-dom";

// Lista de telas, na ordem em que elas devem ser navegadas.
const ROUTES = [
  { path: "/", label: "Início" },
  { path: "/mensagem", label: "Mensagem" },
  { path: "/musica", label: "Música" },
  { path: "/carta", label: "Carta" },
  { path: "/final", label: "Surpresa final" },
];

/**
 * Mostra os links "← Voltar" e "Continuar →" com base na tela atual.
 * Some sozinho na primeira e na última tela quando não faz sentido.
 */
export default function NavButtons({ nextLabel = "Continuar" }) {
  const { pathname } = useLocation();
  const index = ROUTES.findIndex((r) => r.path === pathname);
  const prev = ROUTES[index - 1];
  const next = ROUTES[index + 1];

  if (!prev && !next) return null;

  return (
    <div className="nav-buttons">
      {prev ? (
        <Link className="nav-link nav-link-back" to={prev.path}>
          ← Voltar
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link className="nav-link nav-link-next" to={next.path}>
          {nextLabel} →
        </Link>
      )}
    </div>
  );
}
