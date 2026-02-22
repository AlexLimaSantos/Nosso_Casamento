"use client";

import { useState } from "react";

export default function Login() {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [loading, setLoading] = useState(false);
  
  // --- ESTADO DO TOAST ---
  const [toast, setToast] = useState({ visivel: false, mensagem: "", tipo: "erro" });

  const mostrarToast = (msg: string, tipo: "erro" | "sucesso" = "erro") => {
    setToast({ visivel: true, mensagem: msg, tipo });
    setTimeout(() => setToast({ visivel: false, mensagem: "", tipo: "erro" }), 3000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/convidado?codigo=${codigo}`);
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("nomeConvidado", data.nome);
        localStorage.setItem("codigoConvite", data.codigo);
        localStorage.setItem("limiteAcompanhantes", data.limiteAcompanhantes);
        
        // Opcional: mostrar toast de sucesso antes de redirecionar
        mostrarToast("Acesso liberado! Bem-vindo(a).", "sucesso");
        
        setTimeout(() => {
          window.location.href = '/inicio';
        }, 1000);
      } else {
        // SUBSTITUÍDO: alert por mostrarToast
        mostrarToast("Código não encontrado. Verifique seu convite!");
      }
    } catch (err) {
      // SUBSTITUÍDO: alert por mostrarToast
      mostrarToast("Erro ao validar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex text-center items-center justify-center bg-[url('/images/bordas_floridas.png')] bg-no-repeat bg-cover relative">
      <form onSubmit={handleLogin} className="w-full max-w-md p-6">
        <div>
          <h1 className="font-casamento text-5xl font-bold pb-1 pt-15 text-[#8b3443]">Álex e Isabelle</h1>
          <p className="pb-2">Nosso Grande Dia!</p>
          
          <img src="/images/alianças.png" alt="Alianças" className="w-auto h-15 mx-auto mb-5" />
          
          <div className="flex flex-col ml-10 mr-10 bg-white/80 p-6 rounded-xl backdrop-blur-sm shadow-sm">
            <label htmlFor="nome" className="font-bold text-left text-gray-800">Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Digite Seu Nome"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-[#8b3443] mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8b3443] focus:border-transparent bg-white"
            /> 

            <label htmlFor="codigo" className="font-bold text-left text-gray-800">Código do Convite</label>
            <input
              id="codigo"
              type="password"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              placeholder="Ex: Y4504E"
              className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-[#8b3443] mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-[#8b3443] focus:border-transparent bg-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-[#8b3443] text-white font-bold py-2 px-4 rounded hover:bg-[#a0525d] hover:scale-105 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Validando..." : "Entrar na Celebração"}
            </button>
            <p className="mt-5 font-bold text-gray-700">Acesso exclusivo para convidados</p>
          </div>
        </div>
      </form>

      {/* --- RENDERIZAÇÃO DO TOAST --- */}
      {toast.visivel && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className={`bg-white border-l-4 ${toast.tipo === 'sucesso' ? 'border-green-500' : 'border-[#8b3443]'} shadow-2xl rounded-xl px-6 py-4 flex items-center gap-3`}>
            <span className={`${toast.tipo === 'sucesso' ? 'text-green-500 bg-green-50' : 'text-[#8b3443] bg-[#8b3443]/10'} p-2 rounded-full`}>
              {toast.tipo === 'sucesso' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
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