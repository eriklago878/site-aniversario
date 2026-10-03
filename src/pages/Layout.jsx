import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import FloatingHearts from "../components/FloatingHearts";
import "../styles/birthday.css";

const footer = "feito com carinho, para você 💕";

// Fundo e corações flutuando ficam aqui, fora das rotas,
// então continuam visíveis independente de qual tela está ativa.
export default function Layout() {
  const { pathname } = useLocation();
  return (
    <div className="bday-root">
      <FloatingHearts />
      <Outlet />
      {pathname !== "/" && <footer className="bday-footer">{footer}</footer>}
    </div>
  );
}
