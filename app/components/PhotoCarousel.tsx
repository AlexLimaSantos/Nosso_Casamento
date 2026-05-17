"use client";

import { useState, useEffect } from "react";

const FOTOS_DO_CASAL = [
  "/images/foto1.jpeg",
  "/images/foto2.jpg",
  "/images/foto3.jpeg",
];

// Definimos que quem chamar o componente tem que dizer o formato
interface PhotoCarouselProps {
  variant: "fundo" | "fixo";
}

export default function PhotoCarousel({ variant }: PhotoCarouselProps) {
  const [indexAtual, setIndexAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexAtual((prev) => (prev + 1) % FOTOS_DO_CASAL.length);
    }, 4000); // Troca a foto a cada 4 segundos

    return () => clearInterval(intervalo);
  }, []);

  // --- MODO: PLANO DE FUNDO ---
  if (variant === "fundo") {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {FOTOS_DO_CASAL.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Foto do casal ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === indexAtual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Película de desfoque/clareamento para garantir a leitura do texto */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 transition-all"></div>
        {/* Degradê na base para mesclar perfeitamente com a cor de fundo da página */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-fundo to-transparent z-20"></div>
      </div>
    );
  }

  // --- MODO: CARROSSEL FIXO (Padrão) ---
  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lg border border-casamento/10 mb-20 group z-10">
      {FOTOS_DO_CASAL.map((foto, index) => (
        <img
          key={index}
          src={foto}
          alt={`Foto do casal ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === indexAtual ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Indicadores (Bolinhas) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {FOTOS_DO_CASAL.map((_, index) => (
          <button
            key={index}
            onClick={() => setIndexAtual(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === indexAtual 
                ? "bg-casamento w-6" 
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Ir para a foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}