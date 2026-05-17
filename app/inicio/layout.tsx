import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Álex e Isabelle - Convite",
  description: "Tela de inicio do convite para a celebração de Álex e Isabelle",
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
