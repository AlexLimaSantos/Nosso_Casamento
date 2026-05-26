# 💍 Wedding Website Engine

Uma aplicação full-stack moderna e responsiva construída para gerenciar o site de casamento, lista de presentes e confirmação de presença (RSVP), utilizando o Google Sheets como banco de dados em tempo real.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Sheets API](https://img.shields.io/badge/Google_Sheets_API-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)

---

## ✨ Funcionalidades

- **Autenticação Simples:** Acesso restrito aos convidados através de um código único.
- **RSVP Dinâmico:** Confirmação de presença integrada com limite de acompanhantes por código.
- **Lista de Presentes:** Sistema de reserva de itens em tempo real para evitar presentes duplicados.
- **Integração PIX:** Modal interativo com chave PIX (Copia e Cola) e QR Code.
- **Cópia Inteligente:** Botões de cópia de endereço e código PIX com fallback para garantir funcionamento em qualquer navegador, com feedback visual (Toast).
- **Carrossel Sincronizado:** Sistema de galeria de fotos com plano de fundo inteligente e slider fixo, sincronizados através de estado global.
- **Galeria Expandida (Lightbox):** Modal de visualização de fotos em tela cheia, renderizado via React Portals (`createPortal`) para evitar conflitos de camadas (`z-index`) e garantir usabilidade mobile.
- **Alta Performance Visual:** Otimização agressiva de dezenas de imagens em alta resolução (`1920x1080`) utilizando `next/image` para lazy loading e conversão automática para WebP.
- **CMS Serverless:** Toda a base de dados (convidados e presentes) é gerenciada via Google Sheets, facilitando a edição por pessoas não-técnicas.

---

# 🛠️ Configuração do Ambiente

Para rodar este projeto localmente ou fazer o deploy, você precisará configurar as variáveis de ambiente.

Crie um arquivo `.env.local` na raiz do projeto seguindo este template:

---

## 1️⃣ Configurações de Banco de Dados (Google Cloud)

> ⚠️ **Atenção:** Estas chaves são secretas e **NÃO DEVEM** ser comitadas no repositório.

```env
GOOGLE_SHEET_ID="codigo_extraido_da_url_da_planilha"

GOOGLE_CLIENT_EMAIL="email-do-service-account@seu-projeto.iam.gserviceaccount.com"

GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nSUA_CHAVE_AQUI\n-----END PRIVATE KEY-----\n"
```

### Importante

Lembre-se de compartilhar a planilha no Google Drive concedendo acesso de **Editor** ao email definido em:

```env
GOOGLE_CLIENT_EMAIL
```

---

## 2️⃣ Configurações da Interface e do Casal (Frontend)

Estas variáveis expõem informações públicas para a interface e facilitam a reutilização do código para outros eventos.

```env
# =========================================
# Nomes e Data
# =========================================

NEXT_PUBLIC_CASAL_NOME_1="Álex"
NEXT_PUBLIC_CASAL_NOME_2="Isabelle"

NEXT_PUBLIC_DATA_CASAMENTO="2026-05-20"

# =========================================
# Identidade Visual (Cores HEX)
# =========================================

NEXT_PUBLIC_COR_PRIMARIA="#8b3443"
NEXT_PUBLIC_COR_SECUNDARIA="#faf7f2"

# =========================================
# Paleta das Madrinhas
# =========================================

NEXT_PUBLIC_COR_MADRINHA_1="#8b3443"
NEXT_PUBLIC_COR_MADRINHA_2="#b85b6b"
NEXT_PUBLIC_COR_MADRINHA_3="#d68a96"

# =========================================
# Logística do Evento
# =========================================

NEXT_PUBLIC_HORARIO_CERIMONIA="16h00"

NEXT_PUBLIC_LOCAL_NOME="Espaço Villa"

NEXT_PUBLIC_LOCAL_ENDERECO="Salvador, BA"

NEXT_PUBLIC_LOCAL_MAPS_URL="https://googleusercontent.com/maps..."

# =========================================
# Doações e Entrega
# =========================================

NEXT_PUBLIC_ENDERECO_ENVIO="Rua Exemplo do Endereço, 123 - Bairro, Salvador, BA - CEP: 40000-000"

NEXT_PUBLIC_PIX_CHAVE="00020126820014br..."

# =========================================
# Configuração da Galeria
# =========================================

NEXT_PUBLIC_TIPO_CARROSSEL="ambos"
# Opções:
# - fundo
# - fixo
# - ambos
```

---

# 📂 Assets e Imagens

Certifique-se de que todas as imagens estáticas utilizadas na aplicação estejam dentro da pasta:

```bash
public/images/
```

### Arquivos necessários

```txt
public/images/
├── pix.jpeg
├── alianças.png
├── bordas_floridas.png
├── foto1.jpg
├── foto2.jpg
├── ...
└── foto12.jpg
```

### Descrição dos arquivos

| Arquivo | Descrição |
|---|---|
| `pix.jpeg` | QR Code do PIX |
| `alianças.png` | Ícone centralizado no login e cabeçalhos |
| `bordas_floridas.png` | Moldura da tela de login |
| `foto1.jpg` → `foto12.jpg` | Galeria de fotos do casal |

> 📸 Recomendado: imagens em formato paisagem (`1920x1080`) para melhor performance visual.

---

# 🚀 Como Rodar Localmente

## 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

---

## 2️⃣ Instale as dependências

```bash
npm install
```

---

## 3️⃣ Inicie o servidor de desenvolvimento

```bash
npm run dev
```

---

## 4️⃣ Acesse no navegador

```txt
http://localhost:3000
```

---

# 🌐 Deploy na Vercel

A maneira mais fácil de hospedar esta aplicação é utilizando a Vercel.

## Passos

1. Conecte sua conta do GitHub à Vercel.
2. Importe este repositório.
3. Na etapa de **Environment Variables**, adicione **TODAS** as variáveis listadas neste README.
4. Clique em **Deploy**.

---

## (Opcional) Domínio Personalizado

Após o deploy, você pode:

- Adicionar um domínio customizado.
- Configurar os Nameservers no registro do domínio.
- Ativar HTTPS automaticamente pela Vercel.

---

# 📌 Stack Utilizada

- Next.js
- React
- TailwindCSS
- Google Sheets API
- React Portals
- Next/Image
- Vercel

---

# 📄 Licença

Este projeto é privado e destinado ao uso em eventos personalizados.
