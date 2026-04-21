import { NextResponse } from 'next/server';
import { getGoogleSheetsClient } from '@/lib/googleSheets';

export async function GET() {
  try {
    const sheets = await getGoogleSheetsClient(); 
    const range = 'Lista de presentes!B3:K65'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const linhas = response.data.values;
    if (!linhas) return NextResponse.json([], { status: 200 });

    const presentes = linhas.map((linha, index) => ({
      id: index + 1, 
      item: linha[0] || "",             // Coluna B (0)
      quantidade: Number(linha[1]) || 1, // Coluna C (1)
      cor: linha[2] || "Qualquer uma",  // Coluna D (2)
      mediaValor: linha[3] || "",       // Coluna E (3)
      imagem: linha[4] || "",           // Coluna F (4)
      link1: linha[5] || "",            // Coluna G (5)
      link2: linha[6] || "",            // Coluna H (6)
      link3: linha[7] || "",            // Coluna I (7)
      qtComprada: Number(linha[8]) || 0, // Coluna J (8)
      presenteador: linha[9] || ""       // Coluna K (9)
    }));

    return NextResponse.json(presentes);
  } catch (error) {
    console.error("Erro no GET (buscar presentes):", error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { idPresente, codigoConvite } = await request.json();
    const sheets = await getGoogleSheetsClient();

    // ID 1 = Linha 3 na planilha
    const linhaReal = idPresente + 2; 
    
    const rangeBusca = `Lista de presentes!J${linhaReal}:K${linhaReal}`;
    const busca = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: rangeBusca,
    });

    const valoresAtuais = busca.data.values?.[0] || ["0", ""];
    const qtAtual = Number(valoresAtuais[0]) || 0;
    const presenteadoresAtuais = valoresAtuais[1] || "";

    const novoValorPresenteador = presenteadoresAtuais 
      ? `${presenteadoresAtuais}, ${codigoConvite}` 
      : codigoConvite;

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: rangeBusca,
      valueInputOption: 'USER_ENTERED',
      requestBody: { 
        values: [[qtAtual + 1, novoValorPresenteador]] 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no POST (reservar presente):", error);
    return NextResponse.json({ error: 'Erro ao reservar' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { idPresente, codigoConvite } = await request.json();
    const sheets = await getGoogleSheetsClient();
    
    // CORREÇÃO 1, 2 e 3: Ajuste de Aba, Coluna e Linha.
    const linhaReal = idPresente + 2;
    const rangeBusca = `Lista de presentes!J${linhaReal}:K${linhaReal}`;
    
    const busca = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: rangeBusca,
    });

    const valoresAtuais = busca.data.values?.[0] || ["0", ""];
    let qtAtual = Number(valoresAtuais[0]) || 0;
    const presenteadoresAtuais = valoresAtuais[1] || "";

    const arrayPresenteadores = presenteadoresAtuais.split(", ").filter(Boolean);
    const indexParaRemover = arrayPresenteadores.indexOf(codigoConvite);
    
    if (indexParaRemover > -1) {
      arrayPresenteadores.splice(indexParaRemover, 1);
      qtAtual = Math.max(0, qtAtual - 1); // Evita ficar negativo
    }
    
    const novoValorPresenteador = arrayPresenteadores.join(", ");

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: rangeBusca,
      valueInputOption: 'USER_ENTERED',
      requestBody: { 
        values: [[qtAtual, novoValorPresenteador]] 
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no DELETE (cancelar reserva):", error);
    return NextResponse.json({ error: 'Erro ao cancelar reserva' }, { status: 500 });
  }
}