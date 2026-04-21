"use client";

import { useState, useEffect } from "react";
import { CONFIG } from "../../lib/constants";

export default function Countdown() {
  const [tempoFaltando, setTempoFaltando] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  
  const [jaCarregou, setJaCarregou] = useState(false);

  useEffect(() => {
    // Pegamos a data das variáveis (ex: "2026-05-20") e forçamos meia-noite para evitar bugs de fuso horário
    const dataCasamentoString = CONFIG.casal.data ? `${CONFIG.casal.data}T00:00:00` : null;

    if (!dataCasamentoString) return;

    const dataAlvo = new Date(dataCasamentoString).getTime();

    const atualizarCronometro = () => {
      const agora = new Date().getTime();
      const diferenca = dataAlvo - agora;

      if (diferenca > 0) {
        setTempoFaltando({
          dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((diferenca % (1000 * 60)) / 1000),
        });
      }
      setJaCarregou(true);
    };

    atualizarCronometro(); // Roda a primeira vez sem esperar o intervalo
    const intervalo = setInterval(atualizarCronometro, 1000);

    return () => clearInterval(intervalo);
  }, []);

  // Evita aquele "piscar" de 0 antes do JavaScript calcular no Client Side
  if (!jaCarregou) return null;

  return (
    <div className="flex justify-center items-center gap-3 md:gap-6 mb-12 animate-in fade-in duration-700">
      <BlocoTempo valor={tempoFaltando.dias} label="Dias" />
      <span className="text-2xl md:text-4xl font-bold text-casamento/50 mb-6">:</span>
      <BlocoTempo valor={tempoFaltando.horas} label="Horas" />
      <span className="text-2xl md:text-4xl font-bold text-casamento/50 mb-6">:</span>
      <BlocoTempo valor={tempoFaltando.minutos} label="Minutos" />
      <span className="text-2xl md:text-4xl font-bold text-casamento/50 mb-6 hidden sm:block">:</span>
      <div className="hidden sm:block">
         <BlocoTempo valor={tempoFaltando.segundos} label="Segundos" />
      </div>
    </div>
  );
}

// Subcomponente para deixar o código limpo
function BlocoTempo({ valor, label }: { valor: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl shadow-sm border border-casamento/20 flex items-center justify-center mb-2">
        <span className="text-2xl md:text-3xl font-bold text-casamento">
          {valor.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-500">
        {label}
      </span>
    </div>
  );
}