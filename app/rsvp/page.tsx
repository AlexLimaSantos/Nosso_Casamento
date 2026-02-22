"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RSVPPage() {
  const [carregandoDados, setCarregandoDados] = useState(true);
  
  const [nomeConvidado, setNomeConvidado] = useState("");
  const [limiteAcompanhantes, setLimiteAcompanhantes] = useState(0);
  
  const [vaiComparecer, setVaiComparecer] = useState("sim");
  const [acompanhantesConfirmados, setAcompanhantesConfirmados] = useState(0);
  const [nomesAcompanhantes, setNomesAcompanhantes] = useState<string[]>([]);
  
  const [mensagemRSVP, setMensagemRSVP] = useState("");
  const [enviandoRSVP, setEnviandoRSVP] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // --- ESTADO DO TOAST ---
  const [toast, setToast] = useState({ visivel: false, mensagem: "", tipo: "erro" });

  const mostrarToast = (msg: string, tipo: "erro" | "sucesso" = "erro") => {
    setToast({ visivel: true, mensagem: msg, tipo });
    setTimeout(() => setToast({ visivel: false, mensagem: "", tipo: "erro" }), 3000);
  };

  useEffect(() => {
    const codigoSalvo = localStorage.getItem("codigoConvite");
    
    const buscarDadosDoConvidado = async () => {
      if (!codigoSalvo) {
        setCarregandoDados(false);
        return;
      }

      try {
        const res = await fetch(`/api/convidado?codigo=${codigoSalvo}`);
        const data = await res.json();

        if (res.ok) {
          setNomeConvidado(data.nome);
          setLimiteAcompanhantes(data.limiteAcompanhantes);
          
          if (data.confirmacao === "Sim" || data.confirmacao === "Não") {
            setSucesso(true);
            setVaiComparecer(data.confirmacao.toLowerCase() === "sim" ? "sim" : "nao");
            
            const nomesArray = data.acompanhantesRegistrados ? data.acompanhantesRegistrados.split(", ") : [];
            setNomesAcompanhantes(nomesArray);
            setAcompanhantesConfirmados(nomesArray.length);
            setMensagemRSVP(data.mensagemAnterior || "");
          } else {
            setAcompanhantesConfirmados(data.limiteAcompanhantes);
            setNomesAcompanhantes(Array(data.limiteAcompanhantes).fill(""));
          }
        }
      } catch (err) {
        console.error("Erro ao buscar dados", err);
        mostrarToast("Erro ao carregar seus dados.");
      } finally {
        setCarregandoDados(false);
      }
    };

    buscarDadosDoConvidado();
  }, []);

  const handleMudancaQuantidade = (qtd: number) => {
    setAcompanhantesConfirmados(qtd);
    setNomesAcompanhantes((nomesAtuais) => {
      if (qtd > nomesAtuais.length) {
        return [...nomesAtuais, ...Array(qtd - nomesAtuais.length).fill("")];
      } else {
        return nomesAtuais.slice(0, qtd);
      }
    });
  };

  const handleNomeAcompanhanteChange = (index: number, valor: string) => {
    const novosNomes = [...nomesAcompanhantes];
    novosNomes[index] = valor;
    setNomesAcompanhantes(novosNomes);
  };

  const handleEnviarRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviandoRSVP(true);
    const codigoSalvo = localStorage.getItem("codigoConvite");

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo: codigoSalvo,
          comparecer: vaiComparecer,
          nomesAcompanhantes: vaiComparecer === "sim" ? nomesAcompanhantes : [],
          mensagem: mensagemRSVP
        }),
      });

      if (res.ok) {
        setSucesso(true);
        mostrarToast("Confirmação enviada com sucesso! 🎉", "sucesso");
      } else {
        mostrarToast("Erro ao salvar sua resposta. Tente novamente.");
      }
    } catch (err) {
      mostrarToast("Erro de conexão com o servidor.");
    } finally {
      setEnviandoRSVP(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans flex flex-col relative overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-2xl w-full mx-auto px-4 pt-32 pb-20">
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#8b3443]/10 overflow-hidden text-center">
          
          <div className="bg-[#8b3443] py-6 px-4">
            <h2 className="font-casamento text-4xl text-white">Confirme sua Presença</h2>
          </div>
          
          {carregandoDados ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8b3443] mb-4"></div>
              <p className="text-[#8b3443] font-bold">Buscando seu convite...</p>
            </div>
          ) : (
            <div className="p-8 md:p-10">
              {!sucesso ? (
                <form onSubmit={handleEnviarRSVP}>
                  <div className="mb-8 bg-[#faf7f2] p-4 rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-sm uppercase tracking-widest mb-1 text-center">Convite em nome de</p>
                    <h3 className="text-2xl font-bold text-[#8b3443] text-center">{nomeConvidado}</h3>
                  </div>

                  <div className="mb-8">
                    <label className="block text-gray-700 font-bold mb-4 text-lg text-center">Você poderá comparecer?</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${vaiComparecer === "sim" ? "border-[#8b3443] bg-[#8b3443]/5" : "border-gray-200"}`}>
                        <input type="radio" value="sim" checked={vaiComparecer === "sim"} onChange={(e) => setVaiComparecer(e.target.value)} className="hidden" />
                        <span className={`font-bold ${vaiComparecer === "sim" ? "text-[#8b3443]" : "text-gray-400"}`}>✅ Sim, estarei lá!</span>
                      </label>
                      <label className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${vaiComparecer === "nao" ? "border-gray-700 bg-gray-50" : "border-gray-200"}`}>
                        <input type="radio" value="nao" checked={vaiComparecer === "nao"} onChange={(e) => setVaiComparecer(e.target.value)} className="hidden" />
                        <span className={`font-bold ${vaiComparecer === "nao" ? "text-gray-700" : "text-gray-400"}`}>❌ Não poderei ir</span>
                      </label>
                    </div>
                  </div>

                  {vaiComparecer === "sim" && limiteAcompanhantes > 0 && (
                    <div className="mb-8 text-left animate-in fade-in duration-300">
                      <label className="block text-gray-700 font-bold mb-2">Quantos acompanhantes irão com você?</label>
                      <p className="text-xs text-gray-500 mb-3 italic">Seu convite permite até {limiteAcompanhantes} acompanhante(s).</p>
                      
                      <select value={acompanhantesConfirmados} onChange={(e) => handleMudancaQuantidade(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-5 bg-white">
                        {Array.from({ length: limiteAcompanhantes + 1 }, (_, i) => (
                          <option key={i} value={i}>{i === 0 ? "Irei sozinho(a)" : `${i} acompanhante(s)`}</option>
                        ))}
                      </select>

                      {acompanhantesConfirmados > 0 && (
                        <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                           <p className="font-bold text-[#8b3443] mb-3 text-xs uppercase tracking-widest text-center">Nomes:</p>
                           {nomesAcompanhantes.map((nome, index) => (
                             <input key={index} type="text" required value={nome} onChange={(e) => handleNomeAcompanhanteChange(index, e.target.value)} placeholder={`Nome completo do ${index + 1}º acompanhante`} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8b3443] focus:outline-none" />
                           ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mb-8 text-left">
                    <label className="block text-gray-700 font-bold mb-2">Mensagem para os noivos (Opcional)</label>
                    <textarea rows={3} value={mensagemRSVP} onChange={(e) => setMensagemRSVP(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 resize-none" placeholder="Escreva algo para Álex e Isabelle..."></textarea>
                  </div>

                  <button type="submit" disabled={enviandoRSVP} className="w-full bg-[#8b3443] text-white font-bold py-4 rounded-xl hover:bg-[#a0525d] transition shadow-md disabled:opacity-70 active:scale-95">
                    {enviandoRSVP ? "Enviando..." : "Confirmar Resposta"}
                  </button>
                </form>
              ) : (
                <div className="py-8 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">✓</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Resposta Registrada!</h4>
                  <p className="text-gray-600 mb-8 text-lg">Obrigado, {nomeConvidado}! Sua resposta foi salva no nosso planejamento em Salvador.</p>
                  
                  <div className="flex flex-col gap-3">
                    <button onClick={() => window.location.href = '/inicio'} className="w-full bg-[#8b3443] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#a0525d] transition">Voltar ao Início</button>
                    <button onClick={() => setSucesso(false)} className="w-full border-2 border-gray-100 text-gray-400 font-bold py-3 rounded-xl hover:bg-gray-50 transition">Alterar confirmação</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* --- RENDERIZAÇÃO DO TOAST --- */}
      {toast.visivel && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className={`bg-white border-l-4 ${toast.tipo === 'sucesso' ? 'border-green-500' : 'border-[#8b3443]'} shadow-2xl rounded-xl px-6 py-4 flex items-center gap-3 min-w-[300px]`}>
            <span className={`${toast.tipo === 'sucesso' ? 'text-green-500 bg-green-50' : 'text-[#8b3443] bg-[#8b3443]/10'} p-2 rounded-full`}>
              {toast.tipo === 'sucesso' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#8b3443]">
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
    </div>
  );
}