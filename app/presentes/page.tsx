"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PresentesPage() {
  // --- ESTADOS ---
  const [presentes, setPresentes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [presenteSelecionado, setPresenteSelecionado] = useState<any | null>(null);
  const [nomeConvidado, setNomeConvidado] = useState("");
  const [codigoConvidado, setCodigoConvidado] = useState("");
  const [processando, setProcessando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // --- ESTADO DO TOAST ---
  const [toast, setToast] = useState({ visivel: false, mensagem: "", tipo: "erro" });

  const mostrarToast = (msg: string, tipo: "erro" | "sucesso" = "erro") => {
    setToast({ visivel: true, mensagem: msg, tipo });
    setTimeout(() => setToast({ visivel: false, mensagem: "", tipo: "erro" }), 3000);
  };

  // --- CARREGAMENTO DE DADOS ---
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeConvidado") || "";
    const codigoSalvo = localStorage.getItem("codigoConvite") || "";

    setNomeConvidado(nomeSalvo);
    setCodigoConvidado(codigoSalvo);

    const carregarDadosReais = async () => {
      try {
        const res = await fetch('/api/presentes');
        const dados = await res.json();
        if (res.ok) {
          setPresentes(dados);
        }
      } catch (err) {
        console.error("Erro ao carregar presentes:", err);
        mostrarToast("Erro ao carregar a lista de presentes.");
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosReais();
  }, []);

  // --- FUNÇÕES DE INTERAÇÃO ---
  const abrirModal = (presente: any) => {
    setPresenteSelecionado(presente);
    setSucesso(false);
  };

  const fecharModal = () => {
    setPresenteSelecionado(null);
    setSucesso(false);
  };

  const confirmarPresente = async () => {
    setProcessando(true);
    try {
      const res = await fetch('/api/presentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idPresente: presenteSelecionado.id,
          codigoConvite: codigoConvidado
        }),
      });

      if (res.ok) {
        const reload = await fetch('/api/presentes');
        const novosDados = await reload.json();
        setPresentes(novosDados);
        setSucesso(true);
        mostrarToast("Reserva confirmada! Muito obrigado! ❤️", "sucesso");
      } else {
        mostrarToast("Este item já foi reservado por outro convidado.");
      }
    } catch (err) {
      mostrarToast("Erro ao conectar com o servidor.");
    } finally {
      setProcessando(false);
    }
  };

  const copiarEndereco = async () => {
    const endereco = "Rua Exemplo do Endereço, 123 - Bairro, Salvador, BA - CEP: 40000-000";

    // Clipboard API Moderna
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(endereco);
        sucessoCopia();
        return;
      } catch (err) {
        console.error("Erro Clipboard API:", err);
      }
    }

    // Fallback para contextos não-seguros
    try {
      const textArea = document.createElement("textarea");
      textArea.value = endereco;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (result) sucessoCopia();
    } catch (err) {
      mostrarToast("Erro ao copiar. Tente copiar manualmente.");
    }
  };

  const sucessoCopia = () => {
    setCopiado(true);
    mostrarToast("Endereço copiado! 📋", "sucesso");
    setTimeout(() => setCopiado(false), 2000);
  };

  // --- LÓGICA DE FILTRAGEM ---
  const meusPresentesReservados = presentes.filter(p => {
    const listaPresenteadores = p.presenteador ? p.presenteador.split(", ") : [];
    return listaPresenteadores.includes(codigoConvidado);
  });

  const presentesGerais = presentes.filter(p => {
    return Number(p.qtComprada) < Number(p.quantidade);
  });

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-4 pt-32 pb-20 w-full">
        <div className="text-center mb-10">
          <h2 className="font-casamento text-5xl text-[#8b3443] mb-4">Lista de Presentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Sua presença é o nosso maior presente! Mas, se desejar nos abençoar, preparamos algumas opções para o nosso novo lar.
          </p>
        </div>

        {/* Card de Envio para Salvador */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#8b3443]/20 p-6 mb-12 flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto text-left transition-all hover:shadow-md">
          <div className="bg-[#faf7f2] p-4 rounded-full text-[#8b3443] flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>

          <div className="flex-grow">
            <h3 className="text-xl font-bold text-[#8b3443] mb-1">Envio Direto para os Noivos</h3>
            <p className="text-gray-600 text-sm mb-4 text-pretty">Você pode solicitar a entrega diretamente em nossa residência em Salvador:</p>

            <div className="relative group">
              <div className="bg-gray-50 px-5 py-3 rounded-xl border-2 border-dashed border-gray-200 font-medium text-gray-700 text-sm transition-colors group-hover:border-[#8b3443]/30">
                Rua Exemplo do Endereço, 123 - Bairro<br />
                Salvador, BA - CEP: 40000-000
              </div>

              <div className="mt-4">
                <button
                  onClick={copiarEndereco}
                  className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                    copiado ? "bg-green-600 text-white" : "bg-[#8b3443] text-white hover:bg-[#a0525d] active:scale-95"
                  }`}
                >
                  {copiado ? "Endereço Copiado! ✓" : "Copiar Endereço Completo"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {carregando ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8b3443]"></div></div>
        ) : (
          <>
            {/* Banner RSVP após reserva */}
            {meusPresentesReservados.length > 0 && (
              <div className="bg-[#8b3443]/10 border-l-4 border-[#8b3443] p-5 mb-12 rounded-r-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <p className="text-[#8b3443] font-bold">🎉 Você escolheu um presente! Não esqueça de confirmar sua presença no evento.</p>
                <Link href="/rsvp" className="bg-[#8b3443] text-white px-8 py-2 rounded-full font-bold text-sm hover:bg-[#a0525d] transition shadow-md whitespace-nowrap">Confirmar Agora</Link>
              </div>
            )}

            {/* SEÇÃO: MINHAS RESERVAS */}
            {meusPresentesReservados.length > 0 && (
              <div className="mb-20">
                <h3 className="text-3xl font-bold text-[#8b3443] mb-8 text-center">Minhas Reservas 🎁</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {meusPresentesReservados.map((p) => (
                    <div key={`reserva-${p.id}`} className="bg-white rounded-3xl shadow-lg border border-[#8b3443]/10 p-6 flex flex-col items-center text-center relative hover:scale-[1.02] transition-transform">
                      <div className="absolute top-0 right-0 bg-[#8b3443] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Sua Escolha</div>
                      <div className="w-24 h-24 mb-4 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-100 p-2 shadow-sm">
                        {p.imagem ? <img src={p.imagem} alt={p.item} className="w-full h-full object-contain" /> : <span className="text-3xl">🎁</span>}
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg mb-1">{p.item}</h4>
                      <div className="text-[12px] text-gray-500 mb-6">
                        <p>Cor: <span className="font-semibold">{p.cor}</span></p>
                        <p>Valor: <span className="font-semibold text-[#8b3443]">{p.mediaValor}</span></p>
                      </div>
                      
                      <div className="w-full space-y-2 mt-auto border-t border-gray-50 pt-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Links para compra:</p>
                        {p.link1 && <a href={p.link1} target="_blank" className="block w-full bg-[#8b3443] text-white text-xs font-bold py-2.5 rounded-xl">🛒 Loja 1</a>}
                        {p.link2 && <a href={p.link2} target="_blank" className="block w-full border border-[#8b3443] text-[#8b3443] text-xs font-bold py-2.5 rounded-xl">🛒 Loja 2</a>}
                        {p.link3 && <a href={p.link3} target="_blank" className="block w-full border border-[#8b3443] text-[#8b3443] text-xs font-bold py-2.5 rounded-xl">🛒 Loja 3</a>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SEÇÃO: DISPONÍVEIS */}
            <h3 className="text-2xl font-bold text-gray-700 mb-8 text-center">Itens Disponíveis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {presentesGerais.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">
                  <div className="w-28 h-28 mb-4 bg-gray-50 rounded-full flex items-center justify-center overflow-hidden p-3 shadow-inner">
                    {p.imagem ? <img src={p.imagem} alt={p.item} className="w-full h-full object-contain" /> : <span className="text-4xl">🎁</span>}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{p.item}</h3>
                  <div className="text-sm text-gray-500 mb-6">
                    <p>Cor: <span className="font-semibold">{p.cor}</span></p>
                    <p>Valor:</p>
                    <p className="font-bold text-[#8b3443] mt-1">{p.mediaValor}</p>
                  </div>
                  
                  <div className="w-full space-y-2 mb-6 mt-auto">
                    {p.link1 && <a href={p.link1} target="_blank" className="block w-full text-xs border border-gray-300 text-gray-500 py-2 rounded-lg hover:bg-gray-50 transition">🔗 Ver na Loja 1</a>}
                    {p.link2 && <a href={p.link2} target="_blank" className="block w-full text-xs border border-gray-300 text-gray-500 py-2 rounded-lg hover:bg-gray-50 transition">🔗 Ver na Loja 2</a>}
                  </div>

                  <div className="w-full border-t border-gray-100 pt-4">
                    <button 
                      onClick={() => abrirModal(p)}
                      className="w-full bg-[#8b3443] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#a0525d] transition shadow-md active:scale-95"
                    >
                      Reservar Presente
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* --- TOAST NOTIFICATION --- */}
      {toast.visivel && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`bg-white border-l-4 ${toast.tipo === 'sucesso' ? 'border-green-500' : 'border-[#8b3443]'} shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4 min-w-[300px]`}>
            <span className={`${toast.tipo === 'sucesso' ? 'text-green-600 bg-green-50' : 'text-[#8b3443] bg-[#8b3443]/10'} p-2 rounded-full`}>
              {toast.tipo === 'sucesso' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
            </span>
            <p className="text-gray-800 font-bold text-sm whitespace-nowrap">
              {toast.mensagem}
            </p>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO */}
      {presenteSelecionado && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
            <div className="bg-[#8b3443] px-6 py-5 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Confirmar Reserva</h3>
              <button onClick={fecharModal} className="text-2xl leading-none hover:rotate-90 transition-transform">×</button>
            </div>
            <div className="p-8">
              {!sucesso ? (
                <>
                  <h4 className="text-2xl font-bold text-[#8b3443] mb-3">{presenteSelecionado.item}</h4>
                  <p className="text-gray-600 mb-8 leading-relaxed">Deseja reservar este presente para o convidado <br /><strong className="text-gray-900">{nomeConvidado}</strong>?</p>
                  <div className="flex gap-4">
                    <button onClick={fecharModal} className="w-full py-3.5 border border-gray-200 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition">Cancelar</button>
                    <button onClick={confirmarPresente} disabled={processando} className="w-full bg-[#8b3443] text-white font-bold py-3.5 rounded-xl hover:bg-[#a0525d] shadow-lg disabled:opacity-50">
                      {processando ? "Reservando..." : "Sim, Reservar"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">✓</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-3">Reserva Confirmada!</h4>
                  <p className="text-gray-600 mb-8">Muito obrigado pelo presente, {nomeConvidado}! Isso ajudará muito na nossa nova fase em Salvador.</p>
                  <div className="flex flex-col gap-3">
                    <Link href="/rsvp" className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-md hover:bg-green-700 transition">Confirmar Presença Também</Link>
                    <button onClick={fecharModal} className="w-full border-2 border-[#8b3443] text-[#8b3443] font-bold py-3.5 rounded-2xl hover:bg-gray-50 transition">Voltar para a Lista</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}