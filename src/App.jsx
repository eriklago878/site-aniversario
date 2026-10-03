import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import WelcomePage from "./pages/WelcomePage";
import MessagePage from "./pages/MessagePage";
import MusicPage from "./pages/MusicPage";
import LetterPage from "./pages/LetterPage";
import FinalPage from "./pages/FinalPage";

// Cada tela é uma rota própria — dá pra navegar direto pelo link,
// ex: seusite.com/carta, sem precisar passar pelas telas anteriores.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/mensagem" element={<MessagePage />} />
        <Route path="/musica" element={<MusicPage />} />
        <Route path="/carta" element={<LetterPage />} />
        <Route path="/final" element={<FinalPage />} />
      </Route>
    </Routes>
  );
}
