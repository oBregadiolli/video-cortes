# Instruções de Setup Rápido para FIFA Cortes

## ⚡ TL;DR - Setup em 5 Minutos

### 1. Instalar Node.js
- Baixe em: https://nodejs.org (versão LTS)
- Execute o instalador
- Reinicie o computador

### 2. Instalar FFmpeg
**Windows (mais fácil):**
```powershell
# Se tiver Chocolatey:
choco install ffmpeg

# OU baixe manualmente em: https://ffmpeg.org/download.html
# E adicione C:\ffmpeg\bin ao PATH
```

### 3. Instalar Dependências
```powershell
cd C:\Users\Bregadiolli\Documents\FifaCortes
npm install
```

### 4. Rodar
```powershell
npm start
```

### 5. Acessar
Abra: `http://localhost:3000`

---

## 📋 Instruções Detalhadas (Se houver problemas)

### Instalação do Node.js - Windows

1. Acesse: https://nodejs.org/
2. Clique no botão verde "LTS" (Long Term Support)
3. Execute o arquivo .msi baixado
4. Clique "Next" em todas as telas (padrões estão ok)
5. Quando terminar, **reinicie o computador**
6. Abra PowerShell e teste:
   ```powershell
   node --version
   npm --version
   ```
   Deve mostrar números de versão

### Instalação do FFmpeg - Windows

#### Opção 1: Com Chocolatey (Recomendado)

Se você tem Chocolatey instalado:
```powershell
choco install ffmpeg
```

Pronto! Teste com:
```powershell
ffmpeg -version
```

#### Opção 2: Download Manual

1. Acesse: https://ffmpeg.org/download.html
2. Clique em "Windows builds by BtbN"
3. Na tabela, baixe "ffmpeg-master-latest-win64-gpl" (o maior)
4. Extraia para: `C:\ffmpeg`
5. Abra "Variáveis de Ambiente":
   - Pressione `Win + X`
   - Clique em "Sistema"
   - Clique em "Informações avançadas do sistema"
   - Clique em "Variáveis de Ambiente..."
6. Na seção "Variáveis do sistema", clique em "Path" → "Editar"
7. Clique "Novo" e adicione: `C:\ffmpeg\bin`
8. Clique OK em todas as janelas
9. Abra um **novo** PowerShell e teste:
   ```powershell
   ffmpeg -version
   ```

### Setup do Projeto

```powershell
# Navegue até a pasta
cd C:\Users\Bregadiolli\Documents\FifaCortes

# Instale as dependências
npm install
```

Isso pode levar alguns minutos. Quando terminar, você terá uma pasta `node_modules`.

### Rodar o Servidor

```powershell
npm start
```

Se tudo está certo, você verá:
```
╔════════════════════════════════════════╗
║     FIFA Cortes - Cortador de Vídeos   ║
╠════════════════════════════════════════╣
║  Servidor rodando em:                  ║
║  http://localhost:3000                 ║
╚════════════════════════════════════════╝
```

### Usar o App

1. Abra seu navegador
2. Digite na barra de endereços: `http://localhost:3000`
3. Aparecerá a interface do FIFA Cortes
4. Selecione um vídeo MP4
5. Informe tempo inicial e final (em segundos)
6. Informe um nome para o arquivo cortado
7. Clique "✂️ Cortar Vídeo"
8. Quando terminar, clique "⬇️ Download"

---

## ❓ Problemas Comuns

### "node: command not found" ou "npm: command not found"
- Node.js não foi instalado ou o computador não foi reiniciado
- Solução: Instale Node.js novamente e reinicie

### "ffmpeg: command not found"
- FFmpeg não foi instalado ou PATH não foi configurado
- Solução: Instale FFmpeg seguindo os passos acima

### "Erro ao conectar" na interface
- O servidor Node.js não está rodando
- Solução: Execute `npm start` na pasta do projeto

### Vídeo fica preto ou corrompido
- Pode ser um problema com o arquivo original
- Tente com outro vídeo MP4
- O app usa "copy" (sem re-encode), então deve funcionar com qualquer MP4

### Processo muito lento
- Para vídeos de 20-40 MB é normal levar alguns segundos
- Não feche o navegador durante o processamento

---

## 🎬 Exemplo de Uso

**Situação**: Você tem um vídeo `gol.mp4` com 30 segundos e quer pegar os segundos 5-15

1. Servidor rodando: `npm start`
2. Navegador: `http://localhost:3000`
3. Clique "📁 Selecionar arquivo MP4" → escolha `gol.mp4`
4. **Tempo Inicial**: 5
5. **Tempo Final**: 15
6. **Nome**: gol_lindinho
7. Clique "✂️ Cortar Vídeo"
8. Aguarde...
9. Verá: "✓ Vídeo cortado com sucesso! Arquivo: gol_lindinho.mp4"
10. Clique "⬇️ Download"
11. Arquivo `gol_lindinho.mp4` (com 10 segundos) será baixado

---

## 📞 Suporte

Se tiver dúvidas:
1. Verifique o console do PowerShell (erros de servidor)
2. Verifique o console do navegador (F12 → Console)
3. Releia as instruções acima

---

**FIFA Cortes v1.0** ⚽
