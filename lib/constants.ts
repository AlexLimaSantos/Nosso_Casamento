export const CONFIG = {
  casal: {
    noivo: process.env.NEXT_PUBLIC_CASAL_NOME_1 || "Noivo",
    noiva: process.env.NEXT_PUBLIC_CASAL_NOME_2 || "Noiva",
    data: process.env.NEXT_PUBLIC_DATA_CASAMENTO || "",
    horario: process.env.NEXT_PUBLIC_HORARIO_CERIMONIA || "16h00",
  },
  visual: {
    primaria: process.env.NEXT_PUBLIC_COR_PRIMARIA || "#8b3443",
    fundo: process.env.NEXT_PUBLIC_COR_SECUNDARIA || "#faf7f2",
    madrinha1: process.env.NEXT_PUBLIC_COR_MADRINHA_1 || "#8b3443",
    madrinha2: process.env.NEXT_PUBLIC_COR_MADRINHA_2 || "#b85b6b",
    madrinha3: process.env.NEXT_PUBLIC_COR_MADRINHA_3 || "#d68a96",
  },
  logistica: {
    endereco: process.env.NEXT_PUBLIC_ENDERECO_ENVIO || "",
    pix: process.env.NEXT_PUBLIC_PIX_CHAVE || "",
    localNome: process.env.NEXT_PUBLIC_LOCAL_NOME || "Espaço do Evento",
    localEndereco: process.env.NEXT_PUBLIC_LOCAL_ENDERECO || "Cidade, UF",
    localMapsUrl: process.env.NEXT_PUBLIC_LOCAL_MAPS_URL || "#",
  }
};