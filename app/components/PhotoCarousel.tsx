"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom"; // <-- A mágica do React para Modais!

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
  const [modalAberto, setModalAberto] = useState(false);
  
  // Estado necessário para usar o Portal no Next.js (garante que só roda no navegador)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  // Função para avançar/voltar sincronizada com a página principal
  const handleVoltar = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Evita clicar na foto e fechar/abrir acidentalmente
    if (onManualChange) {
      const novoIndex = (indexAtual - 1 + FOTOS_DO_CASAL.length) % FOTOS_DO_CASAL.length;
      onManualChange(novoIndex);
    }
  };

  const handleAvancar = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onManualChange) {
      const novoIndex = (indexAtual + 1) % FOTOS_DO_CASAL.length;
      onManualChange(novoIndex);
    }
  };

  // Travar a rolagem do corpo quando o modal estiver aberto
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalAberto]);

  // Fechar o modal com a tecla 'Esc'
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
            priority={index === 0}
            className={`transition-opacity duration-1000 ease-in-out object-cover ${
              index === indexAtual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 transition-all"></div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-fundo to-transparent z-20"></div>
      </div>
    );
  }

  // --- MODO: CARROSSEL FIXO E MODAL ---
  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] overflow-hidden rounded-[2rem] shadow-lg border border-casamento/10 mb-20 group z-10 bg-white/50 cursor-pointer">
        {FOTOS_DO_CASAL.map((foto, index) => (
          <Image
            key={index}
            src={foto}
            alt={`Foto do casal ${index + 1}`}
            fill
            priority={index === 0}
            onClick={abrirModal}
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === indexAtual ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <button
          onClick={handleVoltar}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
          aria-label="Foto anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={handleAvancar}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white drop-shadow-md hover:bg-white/30 rounded-full transition-all hidden group-hover:block"
          aria-label="Próxima foto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center w-full px-4 gap-2 z-10">
          {FOTOS_DO_CASAL.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (onManualChange) onManualChange(index);
              }}
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

      {/* --- MODAL (GALERIA EXPANDIDA) - AGORA COM PORTAL --- */}
      {modalAberto && isMounted && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300 overflow-hidden">
          
          {/* Botão Fechar (X) */}
          <button 
            onClick={fecharModal} 
            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white hover:text-casamento bg-white/20 hover:bg-white/40 rounded-full z-[100000] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Seta Esquerda do Modal */}
          <button
            onClick={handleVoltar}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[100000] p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full transition-all"
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
                  index === indexAtual ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Seta Direita do Modal */}
          <button
            onClick={handleAvancar}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[100000] p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/50 rounded-full transition-all"
            aria-label="Próxima foto expandida"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>,
        document.body // <-- Teleporta o modal para o <body>, superando a Navbar!
      )}
    </>
  );
}