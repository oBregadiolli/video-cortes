# ⚽ FIFA Cortes - Cortador de Vídeos MP4

Aplicativo local (offline) para cortar vídeos MP4 com FFmpeg, mantendo a qualidade original. Perfeito para cortar clips rápidos de gols gravados do FIFA.

## 🎯 Funcionalidades

✅ Interface web simples e intuitiva  
✅ Seleção de arquivo MP4 do computador  
✅ Definir tempo inicial e final em segundos  
✅ Corte sem re-encode pesado (cópia direta)  
✅ Mantém qualidade original do vídeo  
✅ Download dos vídeos cortados  
✅ Gerenciamento de arquivos cortados  
✅ Rodas localmente (offline)  

## 📋 Requisitos

- **Node.js** (v14 ou superior)
- **FFmpeg** instalado no sistema

## 🚀 Instalação Passo a Passo

### 1️⃣ Instalar Node.js

Se você ainda não tem Node.js instalado:

1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador e siga as instruções padrão
4. Reinicie o computador após a instalação

Para verificar se foi instalado corretamente, abra o PowerShell e execute:
```powershell
node --version
npm --version
```

Você deve ver os números das versões.

### 2️⃣ Instalar FFmpeg

#### No Windows (recomendado):

**Opção A - Usando Chocolatey (se tiver instalado):**
```powershell
choco install ffmpeg
```

**Opção B - Download manual:**
1. Acesse [ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Clique em "Windows builds"
3. Baixe a versão "git full" (maior arquivo)
4. Extraia a pasta em um local permanente (ex: `C:\ffmpeg`)
5. Adicione o caminho ao PATH do Windows:
   - Abra "Variáveis de Ambiente" (Environment Variables)
   - Clique em "Variáveis de Ambiente..."
   - Clique em "Editar as variáveis de Ambiente do Sistema"
   - Clique em "Variáveis de Ambiente..."
   - Em "Variáveis do Sistema", localize "Path" e clique "Editar"
   - Clique "Novo" e adicione: `C:\ffmpeg\bin` (ou o caminho onde você extraiu)
   - Clique "OK" em todas as janelas

6. Abra uma nova janela do PowerShell e verificaque:
```powershell
ffmpeg -version
```

Você deve ver informações sobre o FFmpeg.

### 3️⃣ Configurar o Projeto

1. Abra o PowerShell e navegue até a pasta do projeto:
```powershell
cd C:\Users\Bregadiolli\Documents\FifaCortes
```

2. Instale as dependências do Node.js:
```powershell
npm install
```

Isso vai criar uma pasta `node_modules` e baixar as dependências necessárias.

## ▶️ Como Usar

### Iniciar o Servidor

No PowerShell, dentro da pasta do projeto, execute:
```powershell
npm start
```

Você deve ver no console:
```
╔════════════════════════════════════════╗
║     FIFA Cortes - Cortador de Vídeos   ║
╠════════════════════════════════════════╣
║  Servidor rodando em:                  ║
║  http://localhost:3000                 ║
╚════════════════════════════════════════╝
```

### Acessar a Interface

1. Abra seu navegador (Chrome, Firefox, Edge, etc)
2. Acesse: `http://localhost:3000`
3. Você verá a interface do FIFA Cortes

### Cortar um Vídeo

1. **Selecione um arquivo MP4**: Clique em "📁 Selecionar arquivo MP4"
2. **Informe o tempo inicial**: Em segundos (ex: 5)
3. **Informe o tempo final**: Em segundos (ex: 25)
4. **Nome do arquivo**: Digite um nome para o vídeo cortado (ex: "gol_lindinho")
5. **Clique em "✂️ Cortar Vídeo"**: Aguarde o processamento
6. **Download**: Quando pronto, clique em "⬇️ Download" para baixar o arquivo

### Exemplos Práticos

**Exemplo 1: Cortar 20 segundos de um vídeo**
- Arquivo: gol.mp4 (30 segundos)
- Tempo Inicial: 5
- Tempo Final: 25
- Nome: gol_cortado
- Resultado: gol_cortado.mp4 (com 20 segundos)

**Exemplo 2: Cortar primeiro segundo de um gol**
- Arquivo: corte1.mp4
- Tempo Inicial: 0
- Tempo Final: 15
- Nome: gol1_clip
- Resultado: gol1_clip.mp4 (com 15 segundos)

## 📁 Estrutura do Projeto

```
FifaCortes/
├── index.js              # Servidor Node.js
├── package.json          # Dependências do projeto
├── README.md             # Este arquivo
├── public/               # Arquivos da interface web
│   ├── index.html        # Interface HTML
│   ├── style.css         # Estilos CSS
│   └── script.js         # Lógica JavaScript
├── uploads/              # Pasta temporária (criada automaticamente)
└── outputs/              # Vídeos cortados final (criada automaticamente)
```

## 🔧 Troubleshooting

### "FFmpeg não encontrado"
- Verifique se FFmpeg foi instalado corretamente
- Abra um novo PowerShell e teste: `ffmpeg -version`
- Se não funcionar, reinstale o FFmpeg seguindo os passos acima

### "Porta 3000 já está em uso"
- Feche outras aplicações que usam a porta 3000
- Ou modifique a porta no arquivo `index.js` (procure por `PORT = 3000`)

### "Node.js não encontrado"
- Reinicie o computador após instalar Node.js
- Verifique: `node --version`

### Vídeo cortado com áudio fora de sincronia
- Isso é raro e indica problema no vídeo original
- Tente processar com outro vídeo para confirmar

### Processo muito lento
- Arquivos maiores levam mais tempo
- Vídeos de 20-40 MB costumam levar 5-30 segundos
- Não feche o navegador durante o processamento

## 🎨 Personalizações (Opcional)

### Alterar porta do servidor

Abra `index.js` e procure por:
```javascript
const PORT = 3000;
```

Mude para qualquer número (ex: 3001, 8000, etc)

### Alterar tempo máximo de processamento

No `index.js`, você pode adicionar um timeout (timeout padrão é geralmente 30 segundos).

## 📝 Notas Técnicas

- **Codec usado**: H.264 (padrão MP4)
- **Método de corte**: Copy (sem re-encode) - mantém qualidade original
- **Limite de arquivo**: Nenhum limite hard-coded (depende do espaço em disco)
- **Compatibilidade**: Funciona com qualquer vídeo MP4 válido

## ⚙️ Parar o Servidor

No PowerShell onde o servidor está rodando, pressione: `Ctrl + C`

## 💡 Dicas

- Use os tempos em formato decimal para precisão: ex: 5.5 segundos
- Sempre faça backup dos vídeos originais antes de cortar
- A qualidade original é mantida (não há re-encode)
- Os vídeos cortados ficam na pasta `outputs`

## 🐛 Reportar Problemas

Se encontrar algum bug ou tiver sugestões, você pode:
1. Verificar os erros no console do PowerShell
2. Verificar os erros no console do navegador (F12 → Console)
3. Tentar com outro vídeo MP4

## 📄 Licença

MIT

---

**FIFA Cortes v1.0** - Criado para cortar clips rápidos de FIFA 🎮⚽
