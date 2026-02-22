import { NextResponse } from 'next/server';
import { getGoogleSheetsClient } from '@/lib/googleSheets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const codigo = searchParams.get('codigo');

  if (!codigo) return NextResponse.json({ error: 'Código é obrigatório' }, { status: 400 });

  try {
    const sheets = await getGoogleSheetsClient();
    const range = 'Lista de Convidados!B3:G72'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const linhas = response.data.values;
    if (!linhas) return NextResponse.json({ error: 'Lista vazia' }, { status: 404 });

    // Procura o convidado pelo código (Coluna B = índice 1)
    const convidado = linhas.find(linha => linha[0] === codigo);

    if (convidado) {
      return NextResponse.json({
        nome: convidado[1],
        codigo: convidado[0],
        limiteAcompanhantes: parseInt(convidado[2]) || 0,
        confirmacao: convidado[3] || "", 
        acompanhantesRegistrados: convidado[4] || "",
        mensagemAnterior: convidado[5] || ""
      });
    }

    return NextResponse.json({ error: 'Código inválido' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro na conexão' }, { status: 500 });
  }
}