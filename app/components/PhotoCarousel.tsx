"use client";

import Image from "next/image"; // <-- IMPORTANTE: O superpoder do Next.js!

const FOTOS_DO_CASAL = [
  "/images/foto1.jpg",
  "/images/foto2.jpg",
  "/images/foto3.jpg",
  "/images/foto4.jpg",
  "/images/foto5.jpg",
  "/images/foto6.jpg",
  "/images/foto7.jpg",
  "/images/foto8.jpg",
  "/images/foto9.jpg",
  "/images/foto10.jpg",
  "/images/foto11.jpg",
  "/images/foto12.jpg",
];

interface PhotoCarouselProps {
  variant: "fundo" | "fixo";
  indexAtual: number;
  onManualChange?: (index: number) => void;
}

export default function PhotoCarousel({ variant, indexAtual, onManualChange }: PhotoCarouselProps) {
  
  const handleVoltar = () => {
    if (onManualChange) {
      const novoIndex = (indexAtual - 1 + FOTOS_DO_CASAL.length) % FOTOS_DO_CASAL.length;
      onManualChange(novoIndex);
    }
  };

  const handleAvancar = () => {
    if (onManualChange) {
      const novoIndex = (indexAtual + 1) % FOTOS_DO_CASAL.length;
      onManualChange(novoIndex);
    }
  };

  // --- MODO: PLANO DE FUNDO ---
  if (variant === "fundo") {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-casamento/5">
        {FOTOS_DO_CASAL.map((foto, index) => (
          <Image
            key={index}
            src={foto}
            alt={`Foto do casal ${index + 1}`}
            fill
            priority={index === 0} // A primeira foto carrega imediatamente, as outras em segundo plano!
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === indexAtual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 transition-all"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-fundo to-transparent z-20"></div>
      </div>
    );
  }

  // --- MODO: CARROSSEL FIXO (Padrão) ---
  return (
    <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[9/16] overflow-hidden rounded-[2rem] shadow-lg border border-casamento/10 mb-20 group z-10 bg-white/50">
      {FOTOS_DO_CASAL.map((foto, index) => (
        <Image
          key={index}
          src={foto}
          alt={`Foto do casal ${index + 1}`}
          fill
          priority={index === 0} // A primeira foto carrega imediatamente, as outras em segundo plano!
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === indexAtual ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* SETA ESQUERDA */}
      <button
        onClick={handleVoltar}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
        aria-label="Foto anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* SETA DIREITA */}
      <button
        onClick={handleAvancar}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
        aria-label="Próxima foto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicadores (Bolinhas) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center w-full px-4 gap-2 z-10">
        {FOTOS_DO_CASAL.map((_, index) => (
          <button
            key={index}
            onClick={() => onManualChange && onManualChange(index)}
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