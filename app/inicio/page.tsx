"use client";

import Link from "next/link"; // Novo import para navegação rápida
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Icon = ({ path }: { path: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#8b3443]">
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export default function InicioCasamentoPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="text-center mb-16 relative">
          <h1 className="font-casamento text-6xl md:text-7xl text-[#8b3443] mb-6">
            Álex e Isabelle
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Seja bem-vindo(a) ao nosso site! Preparamos este espaço com muito carinho para compartilhar com você os detalhes do dia mais importante das nossas vidas.
          </p>

          {/* --- NOVOS BOTÕES DE AÇÃO (Call to Action) --- */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Link 
              href="/rsvp" 
              className="w-full sm:w-auto bg-[#8b3443] text-white font-bold py-3.5 px-8 rounded-full hover:bg-[#a0525d] transition-colors shadow-md text-lg hover:-translate-y-1 transform duration-200"
            >
              Confirmar Presença
            </Link>
            <Link 
              href="/presentes" 
              className="w-full sm:w-auto bg-white border-2 border-[#8b3443] text-[#8b3443] font-bold py-3.5 px-8 rounded-full hover:bg-[#faf7f2] transition-colors shadow-sm text-lg hover:-translate-y-1 transform duration-200"
            >
              Lista de Presentes
            </Link>
          </div>

          <div className="w-24 h-1 bg-[#8b3443] mx-auto mt-14 rounded-full opacity-50"></div>
        </div>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            {/* Card 1: Data e Local */}
            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#8b3443]/10 overflow-hidden group hover:shadow-[0_20px_50px_-10px_rgba(139,52,67,0.2)] transition-all duration-300 flex flex-col">
              <div className="bg-[#8b3443] h-3 w-full"></div>
              <div className="p-8 md:p-10 flex flex-col h-full items-center text-center">
                
                <div className="mb-6 p-4 bg-[#faf7f2] rounded-full">
                   <Icon path="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </div>
                
                <h3 className="text-3xl font-bold text-[#8b3443] mb-8 font-casamento tracking-wide">O Grande Dia</h3>
                
                <div className="space-y-6 text-gray-700 text-lg flex-grow w-full">
                  <div className="flex flex-col gap-1">
                    <span className="uppercase text-xs font-bold text-gray-400 tracking-widest">Data</span>
                    <span className="font-semibold text-xl">Sábado, [Dia] de [Mês] de [Ano]</span>
                    <span>Às 16h00</span>
                  </div>

                  <div className="w-full h-px bg-gray-100"></div>

                  <div className="flex flex-col gap-1">
                    <span className="uppercase text-xs font-bold text-gray-400 tracking-widest">Local</span>
                    <span className="font-semibold text-xl">Espaço [Nome do Local]</span>
                    <span>Salvador, BA</span>
                  </div>
                </div>
                
                <a href="https://maps.google.com/?q=Salvador+BA" target="_blank" rel="noopener noreferrer" className="mt-10 w-full block bg-white border-2 border-[#8b3443] text-[#8b3443] px-6 py-3 rounded-full font-bold hover:bg-[#8b3443] hover:text-white transition-colors duration-300 uppercase text-sm tracking-wider">
                  Abrir no Google Maps
                </a>
              </div>
            </div>

            {/* Card 2: Dress Code */}
            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#8b3443]/10 overflow-hidden group hover:shadow-[0_20px_50px_-10px_rgba(139,52,67,0.2)] transition-all duration-300 flex flex-col">
              <div className="bg-[#8b3443] h-3 w-full"></div>
              <div className="p-8 md:p-10 flex flex-col h-full items-center text-center">
                 <div className="mb-6 p-4 bg-[#faf7f2] rounded-full">
                  <Icon path="M9.53 16.122a3 3 0 00-5.965 1.178c.09.543.56.94 1.11.94h2.813c.55 0 1.02-.397 1.11-.94a3 3 0 00-.965-1.178M15.53 16.122a3 3 0 00-5.965 1.178c.09.543.56.94 1.11.94h2.813c.55 0 1.02-.397 1.11-.94a3 3 0 00-.965-1.178M12.5 11.5v-6m0 0l-3 3m3-3l3 3" />
                </div>
                
                <h3 className="text-3xl font-bold text-[#8b3443] mb-8 font-casamento tracking-wide">Dress Code</h3>
                
                <div className="text-gray-700 text-lg mb-8 leading-relaxed flex-grow">
                  <p>Para a nossa celebração, sugerimos o traje:</p>
                  <p className="text-2xl font-bold text-[#8b3443] my-4">Esporte Fino</p>
                  <p className="text-sm text-gray-500 italic px-4">Pedimos gentilmente que os convidados evitem a cor branca, reservada à noiva.</p>
                </div>

                <div className="w-full border-t pt-6 border-gray-100">
                  <p className="font-bold text-[#8b3443] mb-4 uppercase text-xs tracking-widest">Paleta das Madrinhas</p>
                  <div className="flex justify-center gap-4 mb-2">
                    <div className="w-14 h-14 rounded-full bg-[#8b3443] shadow-inner ring-2 ring-offset-2 ring-[#8b3443]/30 transform hover:scale-110 transition"></div>
                    <div className="w-14 h-14 rounded-full bg-[#b85b6b] shadow-inner ring-2 ring-offset-2 ring-[#b85b6b]/30 transform hover:scale-110 transition"></div>
                    <div className="w-14 h-14 rounded-full bg-[#d68a96] shadow-inner ring-2 ring-offset-2 ring-[#d68a96]/30 transform hover:scale-110 transition"></div>
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