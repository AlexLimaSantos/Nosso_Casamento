"use client";

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

// Agora o componente RECEBE de fora qual foto mostrar e avisa se clicarem na seta
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

      {/* SETA ESQUERDA (Aparece no hover do grupo) */}
      <button
        onClick={handleVoltar}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
        aria-label="Foto anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* SETA DIREITA (Aparece no hover do grupo) */}
      <button
        onClick={handleAvancar}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
        aria-label="Próxima foto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicadores (Bolinhas) - Com wrap caso as 11 fotos apertem a tela do celular */}
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