import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casamento de Álex e Isabelle",
  description: "Site para o casamento de Álex e Isabelle",
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
