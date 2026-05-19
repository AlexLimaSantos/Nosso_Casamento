"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Otimização de imagem do Next.js

// Array com as 12 fotos ajustadas para paisagem (1920x1080)
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


// Props para controle pela página principal
interface PhotoCarouselProps {
  variant: "fundo" | "fixo";
  indexAtual: number;
  onManualChange?: (index: number) => void;
}

export default function PhotoCarousel({ variant, indexAtual, onManualChange }: PhotoCarouselProps) {
  // Estado para controlar se a galeria expandida (modal) está aberta
  const [modalAberto, setModalAberto] = useState(false);
  // Estado para controlar o índice da foto na galeria expandida
  const [indexModal, setIndexModal] = useState(0);

  // Bug 2: Função para abrir a galeria expandida em uma foto específica
  const abrirModal = (index: number) => {
    setIndexModal(index);
    setModalAberto(true);
  };

  // Bug 2: Função para fechar o modal e reativar a rolagem
  const fecharModal = () => {
    setModalAberto(false);
  };

  // Bug 2: Função para avançar a foto na galeria expandida
  const avancarFotoModal = () => {
    setIndexModal((prev) => (prev + 1) % FOTOS_DO_CASAL.length);
  };

  // Bug 2: Função para voltar a foto na galeria expandida
  const voltarFotoModal = () => {
    setIndexModal((prev) => (prev - 1 + FOTOS_DO_CASAL.length) % FOTOS_DO_CASAL.length);
  };

  // Bug 2: Efeito para travar a rolagem do corpo quando o modal estiver aberto
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = "hidden"; // Desativa rolagem
    } else {
      document.body.style.overflow = "auto"; // Reativa rolagem
    }
    // Função de limpeza para reativar a rolagem se o componente for desmontado com o modal aberto
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalAberto]);

  // Solução 2: Efeito para fechar o modal com a tecla 'Esc'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalAberto(false);
      }
    };
    if (modalAberto) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalAberto]);

  // Função para avançar/voltar a foto no carrossel fixo (altera o estado global)
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

  // --- MODO: PLANO DE FUNDO (Sincronizado e Responsivo) ---
  if (variant === "fundo") {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-casamento/5">
        {FOTOS_DO_CASAL.map((foto, index) => (
          <Image
            key={index}
            src={foto}
            alt={`Foto do casal ${index + 1}`}
            fill
            priority={index === 0}
            // Bug 1: CSS Responsivo para adequar o fundo no celular
            // Mudamos para object-cover em todos os tamanhos para preencher a tela vertical no mobile, cortando as laterais da imagem original.
            className={`transition-opacity duration-1000 ease-in-out object-cover ${
              index === indexAtual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Película de desfoque/clareamento */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 transition-all"></div>
        {/* Degradê na base */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-fundo to-transparent z-20"></div>
      </div>
    );
  }

  // --- MODO: CARROSSEL FIXO (Modo Paisagem Sincronizado com Galeria Expandida) ---
  return (
    <>
      {/* Solução 1: Contêiner em modo paisagem (16:9) */}
      <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lg border border-casamento/10 mb-20 group z-10 bg-white/50 cursor-pointer">
        {FOTOS_DO_CASAL.map((foto, index) => (
          <Image
            key={index}
            src={foto}
            alt={`Foto do casal ${index + 1}`}
            fill
            priority={index === 0}
            // Bug 2: Clique na imagem abre a galeria expandida
            onClick={() => abrirModal(index)}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === indexAtual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* SETA ESQUERDA (Navegação Sincronizada) */}
        <button
          onClick={handleVoltar}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
          aria-label="Foto anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* SETA DIREITA (Navegação Sincronizada) */}
        <button
          onClick={handleAvancar}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
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

      {/* --- MODAL (GALERIA EXPANDIDA) --- */}
      {modalAberto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden">
          
          {/* Botão Fechar */}
          <button 
            onClick={fecharModal} 
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full z-50 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Seta Esquerda (Navegação na Galeria Expandida) */}
          <button
            onClick={voltarFotoModal}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Foto anterior expandida"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Imagem Expandida */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] px-4 md:px-24 flex items-center justify-center">
            {FOTOS_DO_CASAL.map((foto, index) => (
              <Image
                key={`modal-${index}`}
                src={foto}
                alt={`Foto expandida ${index + 1}`}
                fill
                className={`object-contain transition-opacity duration-500 ease-in-out ${
                  index === indexModal ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Seta Direita (Navegação na Galeria Expandida) */}
          <button
            onClick={avancarFotoModal}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            aria-label="Próxima foto expandida"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}