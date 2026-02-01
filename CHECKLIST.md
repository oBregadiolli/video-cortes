# ✅ CHECKLIST DE SETUP - FIFA CORTES

## Antes de começar, certifique-se de ter:

### 📋 Pré-requisitos

- [ ] Windows 10 ou superior
- [ ] Acesso à internet (apenas para instalar, depois é offline)
- [ ] Vídeos MP4 no computador

---

## 🔧 INSTALAÇÃO

### Etapa 1: Node.js

- [ ] Visite https://nodejs.org
- [ ] Clique em "LTS" (botão verde)
- [ ] Baixe o arquivo .msi
- [ ] Execute o instalador
- [ ] Clique "Next" em todas as telas
- [ ] **Reinicie o computador**
- [ ] Abra PowerShell e verifique:
  ```powershell
  node --version
  npm --version
  ```
  - [ ] Ambas as versões aparecem (sem erro)

### Etapa 2: FFmpeg

**Escolha um método:**

#### Método A: Chocolatey (Recomendado)
- [ ] Abra PowerShell **como Administrador**
- [ ] Execute:
  ```powershell
  choco install ffmpeg
  ```
- [ ] Aguarde conclusão
- [ ] Verifique:
  ```powershell
  ffmpeg -version
  ```
  - [ ] Versão aparece (sem erro)

#### Método B: Download Manual
- [ ] Visite https://ffmpeg.org/download.html
- [ ] Baixe "ffmpeg-master-latest-win64-gpl"
- [ ] Extraia em `C:\ffmpeg`
- [ ] Abra "Variáveis de Ambiente" (Environment Variables)
- [ ] Clique em "Variáveis de Ambiente..."
- [ ] Em "Variáveis do Sistema", clique "Path" → "Editar"
- [ ] Clique "Novo" e adicione: `C:\ffmpeg\bin`
- [ ] Clique OK em todas as janelas
- [ ] Abra um **novo** PowerShell
- [ ] Verifique:
  ```powershell
  ffmpeg -version
  ```
  - [ ] Versão aparece (sem erro)

### Etapa 3: FIFA Cortes

- [ ] Abra PowerShell
- [ ] Navegue até a pasta:
  ```powershell
  cd C:\Users\Bregadiolli\Documents\FifaCortes
  ```
- [ ] Instale dependências:
  ```powershell
  npm install
  ```
  - [ ] Aguarde (pode levar 2-3 minutos)
  - [ ] Sem erros em vermelho
  - [ ] Pasta `node_modules/` foi criada

---

## 🚀 PRIMEIRO USO

### Etapa 4: Rodar o Servidor

- [ ] No PowerShell, execute:
  ```powershell
  npm start
  ```
- [ ] Você verá:
  ```
  ╔════════════════════════════════════════╗
  ║     FIFA Cortes - Cortador de Vídeos   ║
  ╠════════════════════════════════════════╣
  ║  Servidor rodando em:                  ║
  ║  http://localhost:3000                 ║
  ╚════════════════════════════════════════╝
  ```
  - [ ] Mensagem aparece
  - [ ] Sem erros em vermelho

### Etapa 5: Acessar Interface

- [ ] Abra seu navegador (Chrome, Firefox, Edge, etc)
- [ ] Digite na barra de endereços:
  ```
  http://localhost:3000
  ```
- [ ] Pressione Enter
- [ ] Você verá:
  ```
  ⚽ FIFA Cortes
  Cortador de vídeos MP4 - ...
  ```
  - [ ] Interface aparece
  - [ ] Sem erros

---

## 🎬 PRIMEIRA CORTE

### Etapa 6: Testar Funcionamento

- [ ] Clique em "📁 Selecionar arquivo MP4"
- [ ] Escolha um vídeo MP4 do seu computador
- [ ] Informe:
  - [ ] **Tempo Inicial:** 0
  - [ ] **Tempo Final:** 5 (corta primeiros 5 segundos)
  - [ ] **Nome:** teste_fifa_cortes
- [ ] Clique "✂️ Cortar Vídeo"
- [ ] Aguarde a barra de progresso
- [ ] Você verá:
  ```
  ✓ Vídeo cortado com sucesso!
  Arquivo: teste_fifa_cortes.mp4
  ```
  - [ ] Mensagem verde aparece
  - [ ] Arquivo aparece em "Vídeos Cortados"

### Etapa 7: Download

- [ ] Na seção "Vídeos Cortados", clique "⬇️ Download"
- [ ] Arquivo é baixado para sua pasta de Downloads
- [ ] Verifique se o arquivo:
  - [ ] Tem ~5 segundos (você cortou 0-5s)
  - [ ] Toca áudio e vídeo normalmente
  - [ ] Tem qualidade original (sem pixelização)

---

## ✨ SUCESSO!

Se você chegou aqui com todas as checkboxes marcadas:

- ✅ Node.js instalado
- ✅ FFmpeg instalado
- ✅ Dependências do projeto instaladas
- ✅ Servidor rodando
- ✅ Interface acessível
- ✅ Primeiro vídeo cortado com sucesso

**Você está pronto para usar FIFA Cortes! 🎉**

---

## 📝 PRÓXIMAS UTILIZAÇÕES

Toda vez que quiser usar:

```powershell
# 1. Abra PowerShell
# 2. Navegue até a pasta
cd C:\Users\Bregadiolli\Documents\FifaCortes

# 3. Execute
npm start

# 4. Abra no navegador
http://localhost:3000

# 5. Corte seus vídeos! ⚽
```

---

## ❌ PROBLEMAS NO SETUP?

### "node: command not found"
- [ ] Node.js não foi instalado ou computador não foi reiniciado
- [ ] **Solução:** Reinstale Node.js e reinicie

### "ffmpeg: command not found"
- [ ] FFmpeg não foi instalado ou PATH não configurado
- [ ] **Solução:** Instale FFmpeg seguindo o Método A ou B

### Erro ao instalar dependências (`npm install`)
- [ ] Verifique internet (precisa para baixar)
- [ ] **Solução:** Tente novamente: `npm install`

### "Porta 3000 em uso"
- [ ] Outra aplicação está usando a porta
- [ ] **Solução:** Feche outras abas do localhost:3000

### Vídeo corrompido
- [ ] MP4 inválido ou com problema
- [ ] **Solução:** Teste com outro vídeo MP4

---

## 📞 DOCUMENTAÇÃO

Se tiver dúvidas, consulte:

- **[LEIA-ME-PRIMEIRO.txt](LEIA-ME-PRIMEIRO.txt)** - Visão geral
- **[SETUP.md](SETUP.md)** - Setup detalhado
- **[GUIA_COMPLETO.md](GUIA_COMPLETO.md)** - Como usar
- **[README.md](README.md)** - Documentação completa

---

## ✅ CHECKLIST FINAL

### Antes de usar produtivamente:

- [ ] Li o LEIA-ME-PRIMEIRO.txt
- [ ] Completei todas as etapas de setup
- [ ] Testei com sucesso um vídeo
- [ ] Entendi como usar (Tempo Inicial, Tempo Final, Nome)
- [ ] Testei download do vídeo cortado
- [ ] Verifiquei que a qualidade está boa

**Se todos os itens estão marcados, você está 100% pronto! 🚀**

---

## 🎯 DICAS FINAIS

✓ Mantenha os originais em backup  
✓ Use nomes descritivos para vídeos  
✓ Você pode cortar múltiplos vídeos em sequência  
✓ Vídeos cortados ficam em `outputs/`  
✓ Para parar o servidor: `Ctrl + C`  

---

**FIFA Cortes v1.0 - Pronto para ação! ⚽🎬**

Quando terminar o setup, vá para: [GUIA_COMPLETO.md](GUIA_COMPLETO.md)
