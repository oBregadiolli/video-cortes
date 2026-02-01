% GUIA COMPLETO - FIFA CORTES
% Cortador de Vídeos MP4 Local
% v1.0

# 📋 Visão Geral

**FIFA Cortes** é um aplicativo local para cortar vídeos MP4 sem re-encode pesado. Ideal para cortar clips rápidos de gols gravados no FIFA.

## ✨ O que você precisa fazer:

1. ✓ Instalar Node.js
2. ✓ Instalar FFmpeg  
3. ✓ Executar `npm install`
4. ✓ Executar `npm start`
5. ✓ Abrir `http://localhost:3000`

---

# 📂 Estrutura do Projeto

```
FifaCortes/
│
├── 📄 package.json          ← Dependências do projeto
├── 🚀 index.js              ← Servidor Node.js (principal)
├── 🎨 public/
│   ├── index.html           ← Interface web
│   ├── style.css            ← Estilos CSS
│   └── script.js            ← Lógica JavaScript
│
├── 📝 README.md             ← Documentação completa
├── ⚙️  SETUP.md             ← Instruções de setup
├── 🔧 START.bat             ← Atalho para Windows
├── 🛠️  setup.js             ← Script de verificação
├── .gitignore               ← Arquivos ignorados
│
├── uploads/                 ← Arquivos temporários (criado auto)
└── outputs/                 ← Vídeos cortados (criado auto)
```

---

# 🚀 Início Rápido (Windows)

## Passo 1: Instalar Node.js

1. Vá em: https://nodejs.org/
2. Baixe a versão **LTS** (verde)
3. Execute o instalador e clique "Next" em tudo
4. **Reinicie o computador**

Verificar:
```powershell
node --version
npm --version
```

## Passo 2: Instalar FFmpeg

**Opção A - Recomendado (com Chocolatey):**
```powershell
choco install ffmpeg
```

**Opção B - Manual:**
1. Baixe em: https://ffmpeg.org/download.html
2. Extraia em `C:\ffmpeg`
3. Adicione `C:\ffmpeg\bin` ao PATH do Windows
4. Reinicie o PowerShell

Verificar:
```powershell
ffmpeg -version
```

## Passo 3: Instalar Dependências

```powershell
cd C:\Users\Bregadiolli\Documents\FifaCortes
npm install
```

## Passo 4: Iniciar o Servidor

```powershell
npm start
```

Você verá:
```
╔════════════════════════════════════════╗
║     FIFA Cortes - Cortador de Vídeos   ║
╠════════════════════════════════════════╣
║  Servidor rodando em:                  ║
║  http://localhost:3000                 ║
╚════════════════════════════════════════╝
```

## Passo 5: Usar o App

1. Abra seu navegador
2. Digite: `http://localhost:3000`
3. Pronto! 🎉

---

# 🎬 Como Usar a Interface

## Fluxo Básico:

```
┌─────────────────────────────────────┐
│  1. Selecione um arquivo MP4        │
└─────────────────┬───────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│  2. Informe tempo INICIAL (segundos)│
│     Ex: 5                           │
└─────────────────┬───────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│  3. Informe tempo FINAL (segundos)  │
│     Ex: 25                          │
└─────────────────┬───────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│  4. Digite nome do arquivo final    │
│     Ex: gol_lindinho                │
└─────────────────┬───────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│  5. Clique em "✂️ Cortar Vídeo"      │
└─────────────────┬───────────────────┘
                  │
                  ↓
         ⏳ Aguarde...
                  │
                  ↓
┌─────────────────────────────────────┐
│  ✓ Vídeo cortado com sucesso!       │
│  Arquivo: gol_lindinho.mp4          │
└─────────────────┬───────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│  6. Clique "⬇️ Download" para pegar │
│     o arquivo cortado               │
└─────────────────────────────────────┘
```

---

# 📊 Exemplos Práticos

## Exemplo 1: Cortar 20 segundos de um vídeo

**Situação:**
- Arquivo: `gol.mp4` (30 segundos)
- Quer: segundos 5 a 25 (20 segundos de vídeo)

**Ação:**
```
📁 Arquivo: gol.mp4
⏱️ Inicial: 5
⏱️ Final: 25
📝 Nome: gol_cortado
✂️ Clique em "Cortar Vídeo"
```

**Resultado:**
- `gol_cortado.mp4` com 20 segundos ✓

## Exemplo 2: Cortar início de um vídeo

**Situação:**
- Arquivo: `corte1.mp4` (30 segundos)
- Quer: os primeiros 15 segundos

**Ação:**
```
📁 Arquivo: corte1.mp4
⏱️ Inicial: 0
⏱️ Final: 15
📝 Nome: clip_inicio
✂️ Clique em "Cortar Vídeo"
```

**Resultado:**
- `clip_inicio.mp4` com 15 segundos ✓

## Exemplo 3: Cortar final de um vídeo

**Situação:**
- Arquivo: `corte2.mp4` (30 segundos)
- Quer: de 20 até 30 segundos

**Ação:**
```
📁 Arquivo: corte2.mp4
⏱️ Inicial: 20
⏱️ Final: 30
📝 Nome: clip_final
✂️ Clique em "Cortar Vídeo"
```

**Resultado:**
- `clip_final.mp4` com 10 segundos ✓

---

# ⏱️ Tempo de Processamento

| Tamanho | Duração | Tempo |
|---------|---------|-------|
| 10 MB   | 15s     | 2-5s  |
| 20 MB   | 30s     | 5-10s |
| 30 MB   | 45s     | 10-15s|
| 40 MB   | 60s     | 15-20s|

*Tempos são aproximados e dependem do seu computador*

---

# 🎯 Interface - Explicação Completa

## Seção "Cortar Vídeo"

```
┌─────────────────────────────────────────┐
│ ⚽ FIFA Cortes                           │
│ Cortador de vídeos MP4 - ...            │
├─────────────────────────────────────────┤
│                                         │
│ 📁 Selecionar arquivo MP4:              │
│ [Selecionar arquivo]  ✓ gol.mp4 (30MB) │
│                                         │
│ ┌──────────────────┬──────────────────┐ │
│ │ ⏱️ Tempo Inicial  │ ⏱️ Tempo Final    │ │
│ │ [0________]      │ [0________]      │ │
│ │ (em segundos)    │ (em segundos)    │ │
│ └──────────────────┴──────────────────┘ │
│                                         │
│ 📝 Nome do arquivo final:               │
│ [gol_cortado_________] (.mp4 auto)      │
│                                         │
│ [✂️ CORTAR VÍDEO]                       │
│                                         │
│ ⏳ Processando...                       │
│ [████████░░░░░░░░░░]                    │
│                                         │
│ ✓ Vídeo cortado com sucesso!            │
│ Arquivo: gol_cortado.mp4                │
│                                         │
└─────────────────────────────────────────┘
```

## Seção "Vídeos Cortados"

```
┌─────────────────────────────────────────┐
│ 📂 Vídeos Cortados                      │
├─────────────────────────────────────────┤
│                                         │
│ 📹 gol_cortado.mp4                      │
│ 15.3 MB • 01/02/2026 10:30              │
│ [⬇️ Download] [🗑️ Deletar]              │
│                                         │
│ 📹 gol_lindinho.mp4                     │
│ 8.5 MB • 01/02/2026 09:15               │
│ [⬇️ Download] [🗑️ Deletar]              │
│                                         │
│ 📹 clip_inicio.mp4                      │
│ 12.1 MB • 01/02/2026 08:00              │
│ [⬇️ Download] [🗑️ Deletar]              │
│                                         │
│ [🔄 Atualizar]                          │
│                                         │
└─────────────────────────────────────────┘
```

---

# 🔧 Troubleshooting

## Problema: "Node.js não encontrado"

**Causa:** Node.js não foi instalado ou você não reiniciou

**Solução:**
1. Instale Node.js: https://nodejs.org
2. Reinicie o computador
3. Teste: `node --version`

## Problema: "FFmpeg não encontrado"

**Causa:** FFmpeg não foi instalado

**Solução:**
1. Instale FFmpeg: https://ffmpeg.org/download.html
2. Se instalou manualmente, adicione ao PATH
3. Reinicie o PowerShell
4. Teste: `ffmpeg -version`

## Problema: "Porta 3000 já está em uso"

**Causa:** Outra aplicação está usando a porta

**Solução 1 - Rápida:**
- Feche outras abas de `http://localhost:3000`
- Feche outras aplicações

**Solução 2 - Mudar porta:**
1. Abra `index.js`
2. Procure por `const PORT = 3000;`
3. Mude para `const PORT = 3001;` (ou outro número)
4. Salve e execute `npm start` novamente
5. Acesse `http://localhost:3001`

## Problema: Vídeo corrompido ou preto

**Causa:** Arquivo MP4 inválido

**Solução:**
- Tente com outro vídeo MP4
- Verifique se o vídeo original funciona em um player
- Teste converter o vídeo com FFmpeg manualmente

## Problema: Processo muito lento

**Causa:** Arquivo grande ou computador lento

**Solução:**
- Para vídeos 20-40 MB é normal levar alguns segundos
- Não feche o navegador durante processamento
- Espere a mensagem "✓ Vídeo cortado com sucesso!"

## Problema: "npm: command not found"

**Causa:** Node.js não foi instalado corretamente

**Solução:**
1. Desinstale Node.js completamente
2. Reinicie o computador
3. Reinstale Node.js: https://nodejs.org
4. **Reinicie novamente**
5. Teste: `npm --version`

---

# 💡 Dicas e Truques

## Dica 1: Usar Números Decimais

Você pode usar decimais para maior precisão:
```
Inicial: 5.5    (5 segundos e meio)
Final: 15.7     (15 segundos e 700 ms)
```

## Dica 2: Backup dos Originais

Sempre mantenha os vídeos originais!
```
Antes:
  ✓ gol_original.mp4 (original)

Depois:
  ✓ gol_original.mp4 (original)
  ✓ gol_cortado.mp4 (cortado)
```

## Dica 3: Nomes Descritivos

Use nomes que deixem claro o conteúdo:
```
❌ Ruim:  clip1, teste, video
✓ Bom:   gol_cr7_1tempo, lance_defesa, penalty
```

## Dica 4: Parar o Servidor

Para parar o servidor, no PowerShell:
```powershell
Ctrl + C
```

## Dica 5: Não Re-encode = Qualidade Original

O app usa "copy" ao invés de re-encode:
- ✓ Rápido (2-20s para 20-40 MB)
- ✓ Sem perda de qualidade
- ✓ Mesmo codec do original

---

# 📚 Documentação Adicional

Veja os arquivos inclusos no projeto:

- **README.md** - Documentação técnica completa
- **SETUP.md** - Guia de instalação detalhado
- **index.js** - Código do servidor (comentado)
- **public/script.js** - Lógica do frontend (comentada)

---

# 🔐 Privacidade e Segurança

✓ Totalmente offline (rodas no seu computador)  
✓ Nenhum dado é enviado para a internet  
✓ Nenhum serviço de terceiros  
✓ Seus vídeos ficam no seu computador  

---

# 🎮 Casos de Uso

- ⚽ Cortar gols do FIFA
- 🏀 Clips de outros esportes
- 🎥 Edição de vídeos caseiros
- 📱 Preparar vídeos para redes sociais
- 🎬 Qualquer vídeo MP4

---

# 📞 Suporte

Se tiver problemas:

1. **Console do PowerShell** - Veja erros ao iniciar
2. **Console do Navegador** - Pressione F12 → Console
3. **README.md** - Documentação completa
4. **SETUP.md** - Guia de instalação

---

# 📄 Licença

MIT

---

**FIFA Cortes v1.0** - Criado para cortar clips rápido e fácil! ⚽🎬

Desenvolvido com Node.js + Express + FFmpeg
