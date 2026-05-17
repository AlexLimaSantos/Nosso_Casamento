import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Álex e Isabelle - Presentes",
  description: "Tela de Presentes de Álex e Isabelle",
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
