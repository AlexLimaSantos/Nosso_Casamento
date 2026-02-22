import { NextResponse } from 'next/server';
import { getGoogleSheetsClient } from '@/lib/googleSheets';

export async function POST(request: Request) {
  const body = await request.json();
  const { codigo, comparecer, nomesAcompanhantes, mensagem } = body;

  try {
    const sheets = await getGoogleSheetsClient();
    const range = 'Lista de Convidados!B3:G72';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    const linhas = response.data.values;
    if (!linhas) return NextResponse.json({ error: 'Erro ao ler códigos' }, { status: 404 });

    // Encontra a linha pelo código (Coluna A)
    const rowIndex = linhas.findIndex(linha => linha[0] === codigo);
    
    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Convidado não encontrado' }, { status: 404 });
    }

    const linhaReal = rowIndex + 3;

    // Mapeamento conforme sua imagem:
    // Coluna D: Confirmação (Sim/Não)
    // Coluna E: Convidados (Nomes dos acompanhantes)
    // Coluna F: Observações (Mensagem)
    const valoresParaAtualizar = [
      [
        comparecer === 'sim' ? 'Sim' : 'Não',
        nomesAcompanhantes.join(', '), 
        mensagem
      ]
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `Lista de Convidados!E${linhaReal}:G${linhaReal}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: valoresParaAtualizar },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao gravar na planilha' }, { status: 500 });
  }
}