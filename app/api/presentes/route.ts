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
      item: linha[0],            // Coluna A
      quantidade: Number(linha[1]) || 1, // Coluna B
      cor: linha[2] || "Qualquer uma",  // Coluna C
      mediaValor: linha[3] || "",       // Coluna D
      imagem: linha[4] || "",           // Coluna E
      link1: linha[5] || "",            // Coluna F
      link2: linha[6] || "",            // Coluna G
      link3: linha[7] || "",            // Coluna H
      qtComprada: Number(linha[8]) || 0, // Coluna I
      presenteador: linha[9] || "" //Coluna J
    }));

    return NextResponse.json(presentes);
  } catch (error) {
    console.error("Erro ao buscar presentes:", error);
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { idPresente, codigoConvite} = await request.json();

  try {
    const sheets = await getGoogleSheetsClient();

    const idPresenteNovo = idPresente + 2;
    
    const rangeBusca = `Lista de presentes!J${idPresenteNovo}:K${idPresenteNovo}`;
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
    return NextResponse.json({ error: 'Erro ao reservar' }, { status: 500 });
  }
}