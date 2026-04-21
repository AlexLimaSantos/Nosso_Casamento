"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONFIG } from "../../lib/constants"; // <-- Importando as variáveis

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const pathname = usePathname();

  const navigation = [
    { name: "O Evento", href: "/inicio" },
    { name: "Lista de Presentes", href: "/presentes" },
    { name: "Confirmar Presença", href: "/rsvp" },
  ];

  // Pega a primeira letra do nome de cada um para formar a Logo (ex: A & I)
  const inicialNoivo = CONFIG.casal.noivo ? CONFIG.casal.noivo.charAt(0).toUpperCase() : "A";
  const inicialNoiva = CONFIG.casal.noiva ? CONFIG.casal.noiva.charAt(0).toUpperCase() : "I";

  // Busca o nome do convidado assim que o componente carrega no navegador
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeConvidado");
    if (nomeSalvo) {
      // Pega apenas o primeiro nome para não ocupar muito espaço na barra
      const primeiroNome = nomeSalvo.split(" ")[0];
      setNomeUsuario(primeiroNome);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nomeConvidado");
    localStorage.removeItem("codigoConvite");
    window.location.href = '/login'; 
  };

  return (
    // Cores atualizadas usando as variáveis CSS
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full z-50 top-0 border-b border-casamento/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO DINÂMICA */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/inicio" className="font-casamento text-4xl text-casamento pt-2">
              {inicialNoivo} & {inicialNoiva}
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-6 font-medium text-casamento">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`hover:opacity-80 transition px-3 py-2 rounded-md text-sm uppercase tracking-wider ${
                    pathname === item.href ? "underline decoration-2 underline-offset-8 font-bold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-gray-200 mx-2"></div>

              {/* Saudação e Botão de Sair */}
              <div className="flex items-center gap-4">
                {nomeUsuario && (
                  <span className="text-sm font-semibold text-gray-600 italic">
                    Olá, {nomeUsuario}!
                  </span>
                )}
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest font-bold border border-red-100 transition"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* BOTÃO MOBILE */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-white p-2 rounded-md text-casamento hover:bg-gray-100"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENU DROPDOWN MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-1 text-center">
            {nomeUsuario && (
              <p className="text-casamento font-bold mb-4 text-lg border-b pb-2 border-gray-50">
                Olá, {nomeUsuario}! 👋
              </p>
            )}
            
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-4 rounded-md text-base uppercase tracking-wider ${
                  pathname === item.href ? "bg-fundo text-casamento font-bold" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4">
              <button 
                onClick={handleLogout}
                className="w-full text-red-600 bg-red-50 py-4 rounded-xl text-base uppercase tracking-wider font-bold"
              >
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}