import React, { useEffect, useRef, useState } from "react";

/**
 * Embrulha qualquer bloco de conteúdo e faz ele aparecer suavemente
 * quando entra na tela ao rolar a página.
 */
export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Observa o elemento e marca inView=true assim que ele entra na tela
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`bday-reveal ${inView ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}
