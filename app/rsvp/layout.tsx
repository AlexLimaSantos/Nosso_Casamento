import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Álex e Isabelle - Presença",
  description: "Tela de confirmação de presença da celebração de Álex e Isabelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
