"use client";

import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/* export const metadata: Metadata = {
  title: "Casamento de Álex e Isabelle",
  description: "Site para o casamento de Álex e Isabelle",
}; */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const convidadoLogado = localStorage.getItem("codigoConvite");
    const naTelaLogin = pathname === "/login";

    // Se não estiver logado e tentar acessar qualquer página que não seja o login: redireciona
    if (!convidadoLogado && !naTelaLogin) {
      router.push("/login");
    }

    // Se já estiver logado e tentar voltar pro login: manda pro início
    if (convidadoLogado && naTelaLogin) {
      router.push("/inicio");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
