"use client";

import { useState, useEffect } from "react"; // <-- Importamos os hooks necessários
import Link from "next/link";
import Navbar from "../components/Navbar";
import Countdown from "../components/Countdown";
import PhotoCarousel from "../components/PhotoCarousel";
import { CONFIG } from "../../lib/constants"; 

// Definimos o total de fotos para o temporizador saber quando reiniciar
const TOTAL_FOTOS = 11;

const Icon = ({ path }: { path: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-casamento">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function InicioCasamentoPage() {
  const dataFormatada = CONFIG.casal.data 
    ? new Date(CONFIG.casal.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) 
    : "[Data a definir]";

  // --- ESTADO GLOBAL DO CARROSSEL ---
  const [globalPhotoIndex, setGlobalPhotoIndex] = useState(0);

  // --- TEMPORIZADOR GLOBAL ---
  useEffect(() => {
    // O temporizador roda a cada 4 segundos mudando a foto para todos os componentes
    const intervalo = setInterval(() => {
      setGlobalPhotoIndex((prev) => (prev + 1) % TOTAL_FOTOS);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  // Identifica o que deve ser mostrado baseado no .env
  const tipoCarrossel = CONFIG.visual.tipoCarrossel;
  const mostrarFundo = tipoCarrossel === "fundo" || tipoCarrossel === "ambos";
  const mostrarFixo = tipoCarrossel === "fixo" || tipoCarrossel === "ambos";

  return (
    <div className="min-h-screen bg-fundo font-sans flex flex-col relative">
      <Navbar />

      <main className="flex-grow w-full flex flex-col">
        
        {/* SESSÃO HERO (Topo) */}
        <div className={`relative w-full ${mostrarFundo ? 'min-h-screen flex flex-col justify-center pt-36 pb-20' : 'pt-36 pb-12'}`}>
          
          {/* CARROSSEL FUNDO: Agora recebe o indexAtual global */}
          {mostrarFundo && <PhotoCarousel variant="fundo" indexAtual={globalPhotoIndex} />}

          <div className="text-center relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            
            <h1 className="font-casamento text-6xl md:text-7xl text-casamento mb-6 drop-shadow-sm">
              {CONFIG.casal.noivo} e {CONFIG.casal.noiva}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-sm">
              Seja bem-vindo(a) ao nosso site! Preparamos este espaço com muito carinho para compartilhar com você os detalhes do dia mais importante das nossas vidas.
            </p>

            <Countdown />

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8">
              <Link 
                href="/rsvp" 
                className="w-full sm:w-auto bg-casamento text-white font-bold py-3.5 px-8 rounded-full hover:opacity-90 transition-colors shadow-md text-lg hover:-translate-y-1 transform duration-200"
              >
                Confirmar Presença
              </Link>
              <Link 
                href="/presentes" 
                className={`w-full sm:w-auto border-2 border-casamento text-casamento font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm text-lg hover:-translate-y-1 transform duration-200 ${mostrarFundo ? 'bg-white/80 backdrop-blur-sm hover:bg-white' : 'bg-white hover:bg-fundo'}`}
              >
                Lista de Presentes
              </Link>
            </div>
            
            {/* Divisória e CARROSSEL FIXO */}
            {mostrarFixo && <div className="w-24 h-1 bg-casamento mx-auto mt-16 rounded-full opacity-50 mb-16"></div>}
            
            {/* CARROSSEL FIXO: Recebe o indexAtual e a função para alterá-lo ao clicar na seta */}
            {mostrarFixo && (
              <PhotoCarousel 
                variant="fixo" 
                indexAtual={globalPhotoIndex} 
                onManualChange={setGlobalPhotoIndex} 
              />
            )}
          </div>
        </div>

        {/* SESSÃO DE INFORMAÇÕES (Cards) */}
        <section className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${mostrarFundo ? 'mt-16 mb-24 relative z-20' : 'mb-24'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            {/* Card 1: Data e Local */}
            <div className="bg-white rounded-[2rem] shadow-lg border border-casamento/10 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col hover:border-casamento/30">
              <div className="bg-casamento h-3 w-full"></div>
              <div className="p-8 md:p-10 flex flex-col h-full items-center text-center">
                <div className="mb-6 p-4 bg-fundo rounded-full">
                   <Icon path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </div>
                <h3 className="text-3xl font-bold text-casamento mb-8 font-casamento tracking-wide">O Grande Dia</h3>
                <div className="space-y-6 text-gray-700 text-lg flex-grow w-full">
                  <div className="flex flex-col gap-1">
                    <span className="uppercase text-xs font-bold text-gray-400 tracking-widest">Data</span>
                    <span className="font-semibold text-xl">{dataFormatada}</span>
                    <span>Às {CONFIG.casal.horario}</span>
                  </div>
                  <div className="w-full h-px bg-gray-100"></div>
                  <div className="flex flex-col gap-1">
                    <span className="uppercase text-xs font-bold text-gray-400 tracking-widest">Local</span>
                    <span className="font-semibold text-xl">{CONFIG.logistica.localNome}</span>
                    <span>{CONFIG.logistica.localEndereco}</span>
                  </div>
                </div>
                <a href={CONFIG.logistica.localMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-10 w-full block bg-white border-2 border-casamento text-casamento px-6 py-3 rounded-full font-bold hover:bg-casamento hover:text-white transition-colors duration-300 uppercase text-sm tracking-wider">
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            {/* Card 2: Dress Code */}
            <div className="bg-white rounded-[2rem] shadow-lg border border-casamento/10 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col hover:border-casamento/30">
              <div className="bg-casamento h-3 w-full"></div>
              <div className="p-8 md:p-10 flex flex-col h-full items-center text-center">
                 <div className="mb-6 p-4 bg-fundo rounded-full">
                  <Icon path="M9.53 16.122a3 3 0 00-5.965 1.178c.09.543.56.94 1.11.94h2.813c.55 0 1.02-.397 1.11-.94a3 3 0 00-.965-1.178M15.53 16.122a3 3 0 00-5.965 1.178c.09.543.56.94 1.11.94h2.813c.55 0 1.02-.397 1.11-.94a3 3 0 00-.965-1.178M12.5 11.5v-6m0 0l-3 3m3-3l3 3" />
                </div>
                <h3 className="text-3xl font-bold text-casamento mb-8 font-casamento tracking-wide">Dress Code</h3>
                <div className="text-gray-700 text-lg mb-8 leading-relaxed flex-grow">
                  <p>Para a nossa celebração, sugerimos o traje:</p>
                  <p className="text-2xl font-bold text-casamento my-4">Esporte Fino</p>
                  <p className="text-sm text-gray-500 italic px-4">Pedimos gentilmente que os convidados evitem a cor branca, reservada à noiva.</p>
                </div>
                <div className="w-full border-t pt-6 border-gray-100">
                  <p className="font-bold text-casamento mb-4 uppercase text-xs tracking-widest">Paleta das Madrinhas</p>
                  <div className="flex justify-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-full shadow-inner ring-2 ring-offset-2 ring-casamento/30 transform hover:scale-110 transition" style={{ backgroundColor: CONFIG.visual.madrinha1 }}></div>
                    <div className="w-14 h-14 rounded-full shadow-inner ring-2 ring-offset-2 ring-casamento/30 transform hover:scale-110 transition" style={{ backgroundColor: CONFIG.visual.madrinha2 }}></div>
                    <div className="w-14 h-14 rounded-full shadow-inner ring-2 ring-offset-2 ring-casamento/30 transform hover:scale-110 transition" style={{ backgroundColor: CONFIG.visual.madrinha3 }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Tons exclusivos do cortejo</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}