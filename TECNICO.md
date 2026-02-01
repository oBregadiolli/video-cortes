# 🔧 INFORMAÇÕES TÉCNICAS - FIFA CORTES

## Tecnologias Utilizadas

### Backend
- **Node.js** (v14+) - Runtime JavaScript
- **Express** (v4.18.2) - Framework web minimalista
- **Multer** (v1.4.5) - Upload de arquivos
- **Fluent-FFmpeg** (v2.1.2) - Wrapper Node.js para FFmpeg

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilo com gradientes e animations
- **JavaScript Vanilla** - Lógica (sem frameworks)

### Sistema
- **FFmpeg** - Processamento de vídeo

---

## Arquitetura

```
┌──────────────────────────────────────┐
│        NAVEGADOR (Browser)           │
│  ┌─────────────────────────────────┐ │
│  │      Interface Web (HTML/CSS)   │ │
│  │      public/index.html          │ │
│  │      public/style.css           │ │
│  └──────────────┬──────────────────┘ │
│                 │                     │
│  ┌──────────────▼──────────────────┐ │
│  │      Lógica JavaScript          │ │
│  │      public/script.js           │ │
│  │      (Fetch API)                │ │
│  └──────────────┬──────────────────┘ │
└─────────────────┼────────────────────┘
                  │
        HTTP REQUEST/RESPONSE
                  │
┌─────────────────▼────────────────────┐
│       SERVIDOR NODE.JS               │
│       index.js                        │
│ ┌──────────────────────────────────┐ │
│ │      Express Routes              │ │
│ │  POST /api/cut-video             │ │
│ │  GET  /api/files                 │ │
│ │  GET  /download/:file            │ │
│ │  DELETE /api/files/:file         │ │
│ └──────────────┬───────────────────┘ │
│                │                     │
│ ┌──────────────▼───────────────────┐ │
│ │    Multer (File Upload)          │ │
│ │    → uploads/                    │ │
│ └──────────────┬───────────────────┘ │
│                │                     │
│ ┌──────────────▼───────────────────┐ │
│ │  Fluent-FFmpeg                   │ │
│ │  ffmpeg -ss [start]              │ │
│ │  -to [duration] -c copy          │ │
│ │  -c:v copy -c:a copy             │ │
│ └──────────────┬───────────────────┘ │
│                │                     │
│ ┌──────────────▼───────────────────┐ │
│ │    Arquivo Cortado               │ │
│ │    outputs/[nome].mp4            │ │
│ └──────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Fluxo de Processamento

### 1. Upload do Arquivo
```
Browser
  │
  └─→ FormData (arquivo MP4)
      │
      └─→ POST /api/cut-video
          │
          └─→ Multer
              └─→ Salva em uploads/
```

### 2. Processamento com FFmpeg
```
FFmpeg
  │
  ├─→ Lê arquivo: uploads/[temp].mp4
  │
  ├─→ Busca frame de início: -ss [startTime]
  │
  ├─→ Define duração: -to [endTime]
  │
  ├─→ Copia streams: -c:v copy -c:a copy
  │   (Sem re-encode = mantém qualidade)
  │
  └─→ Escreve saída: outputs/[name].mp4
```

### 3. Download
```
outputs/[name].mp4
  │
  └─→ GET /download/[name]
      │
      └─→ Envia para download
          │
          └─→ Arquivo salvo no computador
```

---

## Rotas da API

### POST /api/cut-video
**Descrição:** Corta um vídeo MP4

**Campos:**
- `video` (file) - Arquivo MP4
- `startTime` (number) - Tempo inicial em segundos
- `endTime` (number) - Tempo final em segundos
- `outputName` (string) - Nome do arquivo final

**Resposta:**
```json
{
  "success": true,
  "message": "Vídeo cortado com sucesso!",
  "fileName": "gol_cortado.mp4",
  "downloadUrl": "/download/gol_cortado.mp4"
}
```

### GET /api/files
**Descrição:** Lista todos os arquivos cortados

**Resposta:**
```json
{
  "success": true,
  "files": [
    {
      "name": "gol_cortado.mp4",
      "size": "15.30 MB",
      "sizeBytes": 16040960,
      "created": "2026-02-01T10:30:00.000Z"
    }
  ]
}
```

### GET /download/:filename
**Descrição:** Baixa um arquivo cortado

**Parâmetros:**
- `filename` - Nome do arquivo

**Resposta:** Arquivo MP4 (download)

### DELETE /api/files/:filename
**Descrição:** Deleta um arquivo cortado

**Parâmetros:**
- `filename` - Nome do arquivo

**Resposta:**
```json
{
  "success": true,
  "message": "Arquivo deletado com sucesso"
}
```

---

## Opções de FFmpeg Usadas

```bash
ffmpeg -i input.mp4 \
  -ss 5              # Seek (ir para 5 segundos)
  -to 25             # To (até 25 segundos)
  -c:v copy          # Video codec: copy (sem re-encode)
  -c:a copy          # Audio codec: copy (sem re-encode)
  output.mp4
```

**Resultado:**
- ✓ Vídeo: 5s a 25s = 20 segundos
- ✓ Qualidade: idêntica ao original
- ✓ Tempo: muito rápido (cópia direta)

---

## Pastas Criadas em Runtime

### uploads/
- **Tipo:** Temporária
- **Conteúdo:** Arquivos enviados (MP4)
- **Limpeza:** Automática após processamento
- **Localização:** `FifaCortes/uploads/`

### outputs/
- **Tipo:** Permanente
- **Conteúdo:** Vídeos cortados finais
- **Limpeza:** Manual (via interface ou diretório)
- **Localização:** `FifaCortes/outputs/`
- **Limite:** Nenhum (depende do disco)

---

## Dependências - Detalhes

### express@4.18.2
```json
"express": "^4.18.2"
```
- Framework web minimalista
- Roteamento HTTP
- Middleware para JSON e dados

### multer@1.4.5-lts.1
```json
"multer": "^1.4.5-lts.1"
```
- Processamento de uploads multipart/form-data
- Gerenciamento de arquivos temporários
- Validação de tipos de arquivo

### fluent-ffmpeg@2.1.2
```json
"fluent-ffmpeg": "^2.1.2"
```
- Wrapper Node.js para FFmpeg
- Interface fluente para comandos FFmpeg
- Event handlers (progresso, erro, conclusão)

---

## Segurança

### Implementações
- ✓ Path normalization (previne path traversal)
- ✓ Sanitização de nomes de arquivo
- ✓ Validação de tipo de arquivo
- ✓ Validação de tempos de corte
- ✓ Tratamento de erros

### Cuidados
- Vídeos são processados localmente
- Sem acesso à internet
- Sem análise de segurança adicional (considere adicionar se necessário)

---

## Performance

### Otimizações
- FFmpeg `-c copy` (sem re-encode)
- Upload limitado apenas pelo espaço em disco
- Limpeza automática de arquivos temporários
- Streaming direto (sem buffer em memória)

### Tempos Típicos
| Tamanho | Tempo |
|---------|-------|
| 5 MB    | 1-3s  |
| 10 MB   | 2-5s  |
| 20 MB   | 5-10s |
| 30 MB   | 10-15s|
| 40 MB   | 15-20s|

---

## Tratamento de Erros

### Validações
1. Arquivo MP4?
2. StartTime < EndTime?
3. Tempos válidos?
4. Nome do arquivo válido?

### Limpeza
- Deleta arquivo temporário se houver erro
- Deleta saída incompleta se falhar

### Respostas
- Sucesso: 200 OK com mensagem
- Erro: 400 Bad Request ou 500 Server Error
- Arquivo não encontrado: 404 Not Found

---

## Extensões Possíveis

Você poderia adicionar:
- ✏️ Suporte a outros formatos (AVI, MOV, MKV)
- 🎨 Preview da duração do vídeo
- 📊 Barra de progresso em tempo real (WebSocket)
- 🎵 Extração de áudio
- 🎬 Conversão de codec
- ⏰ Agendamento de cortes
- 📤 Upload para cloud

---

## Resolução de Problemas Técnicos

### FFmpeg -version falha
```
Causa: FFmpeg não está no PATH
Solução: Adicione FFmpeg ao PATH ou reinstale
```

### Porta 3000 em uso
```
Solução: Mude PORT em index.js ou feche aplicação conflitante
```

### Arquivo corrompido
```
Causa: MP4 inválido ou corrompido
Solução: Tente com outro MP4 válido
```

### Áudio fora de sync
```
Causa: Problema no arquivo original
Solução: Use `-c:a copy` (padrão) ao invés de re-encode
```

---

## Comandos FFmpeg Equivalentes

Se preferir usar FFmpeg diretamente no terminal:

```bash
# Cortar vídeo (mesmo resultado do app)
ffmpeg -i input.mp4 -ss 5 -to 25 -c copy output.mp4

# Com re-encode (não recomendado - mais lento)
ffmpeg -i input.mp4 -ss 5 -to 25 output.mp4

# Apenas áudio
ffmpeg -i input.mp4 -ss 5 -to 25 -vn -c:a copy output.mp3

# Aumentar qualidade (re-encode)
ffmpeg -i input.mp4 -ss 5 -to 25 -crf 18 output.mp4
```

---

**Desenvolvido com ❤️ para cortar vídeos rapidamente**

Versão: 1.0  
Última atualização: 2026-02-01
