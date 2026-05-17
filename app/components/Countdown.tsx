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
  
  // O status pode ser: "contagem" | "hoje" | "passou"
  const [statusEvento, setStatusEvento] = useState<"contagem" | "hoje" | "passou">("contagem");

  useEffect(() => {
    const dataCasamentoString = CONFIG.casal.data ? `${CONFIG.casal.data}T00:00:00` : null;

    if (!dataCasamentoString) return;

    const inicioDoDiaCasamento = new Date(dataCasamentoString).getTime();
    // O dia do evento dura exatamente 24 horas a partir da meia-noite
    const fimDoDiaCasamento = inicioDoDiaCasamento + (24 * 60 * 60 * 1000);

    const atualizarCronometro = () => {
      const agora = new Date().getTime();

      if (agora < inicioDoDiaCasamento) {
        // Ainda não chegou o grande dia
        const diferenca = inicioDoDiaCasamento - agora;
        setStatusEvento("contagem");
        setTempoFaltando({
          dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
          horas: Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutos: Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((diferenca % (1000 * 60)) / 1000),
        });
      } else if (agora >= inicioDoDiaCasamento && agora < fimDoDiaCasamento) {
        // É o dia do casamento!
        setStatusEvento("hoje");
      } else {
        // O evento já passou
        setStatusEvento("passou");
      }
      setJaCarregou(true);
    };

    atualizarCronometro();
    const intervalo = setInterval(atualizarCronometro, 1000);

    // Se já passou do dia do evento, não há necessidade de manter o intervalo rodando
    if (statusEvento === "passou") {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [statusEvento]);

  if (!jaCarregou) return null;

  // --- RENDERIZAÇÃO: O DIA DO EVENTO CHANCEU ---
  if (statusEvento === "hoje") {
    return (
      <div className="flex justify-center items-center mb-12 animate-in zoom-in duration-700">
        <div className="bg-white/80 backdrop-blur-sm px-10 py-6 rounded-3xl border border-casamento/20 shadow-lg">
          <p className="font-casamento text-5xl md:text-6xl text-casamento font-bold drop-shadow-sm animate-pulse">
            É Hoje! 🎉
          </p>
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO: O EVENTO JÁ PASSOU (Agradecimento) ---
  if (statusEvento === "passou") {
    return (
      <div className="flex justify-center items-center mb-12 animate-in zoom-in duration-700">
        <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-3xl border border-casamento/20 shadow-lg max-w-lg mx-auto">
          <p className="font-casamento text-4xl text-casamento font-bold mb-2">
            Muito Obrigado! ❤️
          </p>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">
            A nossa celebração foi inesquecível. Agradecemos imensamente o carinho, as mensagens de felicitações e a presença de cada um de vocês em nossa nova jornada.
          </p>
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO: CONTAGEM REGRESSIVA ATIVA ---
  return (
    <div className="flex justify-center items-center gap-3 md:gap-6 mb-12 animate-in fade-in duration-700 relative z-20">
      <BlocoTempo valor={tempoFaltando.dias} label="Dias" />
      <span className="text-2xl md:text-4xl font-bold text-casamento/80 mb-6 drop-shadow-md">:</span>
      <BlocoTempo valor={tempoFaltando.horas} label="Horas" />
      <span className="text-2xl md:text-4xl font-bold text-casamento/80 mb-6 drop-shadow-md">:</span>
      <BlocoTempo valor={tempoFaltando.minutos} label="Minutos" />
      <span className="text-2xl md:text-4xl font-bold text-casamento/80 mb-6 hidden sm:block drop-shadow-md">:</span>
      <div className="hidden sm:block">
         <BlocoTempo valor={tempoFaltando.segundos} label="Segundos" />
      </div>
    </div>
  );
}

function BlocoTempo({ valor, label }: { valor: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-casamento/20 flex items-center justify-center mb-2">
        <span className="text-2xl md:text-3xl font-bold text-casamento">
          {valor.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-800 bg-white/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}