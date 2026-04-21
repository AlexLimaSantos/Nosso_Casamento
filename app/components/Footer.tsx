import { CONFIG } from "../../lib/constants";

export default function Footer() {
  const inicialNoivo = CONFIG.casal.noivo ? CONFIG.casal.noivo.charAt(0).toUpperCase() : "A";
  const inicialNoiva = CONFIG.casal.noiva ? CONFIG.casal.noiva.charAt(0).toUpperCase() : "I";

  return (
    <footer className="bg-white border-t border-casamento/10 py-8 text-center mt-auto w-full">
        <h2 className="font-casamento text-3xl text-casamento mb-2">
          {inicialNoivo} & {inicialNoiva}
        </h2>
        <p className="text-sm text-gray-500">Feito com amor para o nosso grande dia.</p>
    </footer>
  );
}