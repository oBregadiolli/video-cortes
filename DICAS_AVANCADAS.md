# 💻 DICAS AVANÇADAS - FIFA CORTES

## 🎯 Otimizações de Uso

### Dica 1: Precisa de Muita Precisão?

Use números decimais:
```
Inicial: 5.5     (5 segundos e 500 ms)
Final: 15.750    (15 segundos e 750 ms)
```

Útil para sincronizar com musica ou efeitos sonoros.

---

### Dica 2: Batch Processing (Múltiplos Cortes)

Se você tem um vídeo longo e quer cortar vários clips:

1. Primeira corte: 0 a 15 segundos
2. Recarregue a página
3. Segunda corte: 15 a 30 segundos
4. E assim por diante...

Cada arquivo fica salvo em `outputs/`

---

### Dica 3: Nomes Automáticos com Data/Hora

Se quiser nomear vídeos com data/hora, use:
```
gol_2026-02-01_103000
gol_2026-02-01_104530
```

Assim fica fácil encontrar a ordem cronológica.

---

### Dica 4: Organizar em Pastas

Depois de cortar, mova os arquivos para pastas:
```
outputs/
├── gols/
│   ├── cr7_hat_trick.mp4
│   └── vini_escancarada.mp4
├── defesas/
│   └── goleiro_milagre.mp4
└── penalties/
    └── penalti_defendido.mp4
```

---

### Dica 5: Converter para Diferentes Formatos

Se quiser usar FFmpeg diretamente para converter:

```bash
# MP4 → AVI
ffmpeg -i input.mp4 output.avi

# MP4 → MKV
ffmpeg -i input.mp4 output.mkv

# MP4 → WebM
ffmpeg -i input.mp4 output.webm
```

---

## 🔧 Personalizações

### Mudar Porta do Servidor

**Arquivo:** `index.js`

**Procure por:**
```javascript
const PORT = 3000;
```

**Mude para:**
```javascript
const PORT = 8080; // Ou qualquer outro número
```

**Então acesse:**
```
http://localhost:8080
```

---

### Mudar Limite de Tamanho de Upload

**Arquivo:** `index.js`

**Adicione antes do `upload.single()`:**
```javascript
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.mp4') {
      cb(null, true);
    } else {
      cb(new Error('Apenas MP4'), false);
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB máximo
  }
});
```

---

### Aumentar Tempo de Timeout

Se seus vídeos são muito grandes, pode ser necessário aumentar timeout.

**Em `index.js`, após `app = express();`:**
```javascript
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
```

---

## 🎬 Casos Avançados de Uso

### Caso 1: Cortar Múltiplos Gols do Mesmo Vídeo

**Vídeo original:** FIFA_Session_30min.mp4 (1800 segundos)

```
Gol 1 (0:15-0:25):
  Inicial: 15
  Final: 25
  Nome: gol_cr7_1

Gol 2 (5:30-5:40):
  Inicial: 330
  Final: 340
  Nome: gol_vini

Gol 3 (10:00-10:10):
  Inicial: 600
  Final: 610
  Nome: gol_salah

... e assim por diante
```

---

### Caso 2: Cortar Apenas Começo

```
Vídeo: replay_gol.mp4
Quer: Saltar a introdução (primeiros 3 segundos)

Inicial: 3
Final: [duração total]
Nome: replay_gol_sem_intro
```

---

### Caso 3: Cortar Apenas Fim

```
Vídeo: replay_gol.mp4 (30 segundos)
Quer: Remover final (últimos 5 segundos)

Inicial: 0
Final: 25
Nome: replay_gol_cortado
```

---

## 🎨 Melhorias Visuais Possíveis

Se quiser melhorar a interface, edite `public/style.css`:

### Mudar Cores Principais

```css
/* Procure por: */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* E mude para suas cores favoritas, ex: */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cores sugeridas:
   Roxo: #667eea → #764ba2
   Verde: #11998e → #38ef7d
   Azul: #4facfe → #00f2fe
   Laranja: #fa7e1e → #d62246
   Rosa: #f093fb → #f5576c
*/
```

### Mudar Font

```css
/* Procure por: */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...

/* E mude para: */
font-family: 'Arial', sans-serif;
/* Ou qualquer outra fonte do seu gosto */
```

---

## 🐛 Debug Avançado

### Ver Erros do Servidor

No PowerShell, procure por mensagens como:
```
Error: [descrição do erro]
```

### Ver Erros do Navegador

Pressione `F12` no navegador e clique em "Console"

Erros aparecerão em vermelho.

### Logs Detalhados

**Edite `index.js` e adicione logs:**

```javascript
ffmpeg(inputPath)
  .setStartTime(start)
  .setDuration(end - start)
  .output(outputPath)
  .audioCodec('copy')
  .videoCodec('copy')
  .on('start', (cmd) => {
    console.log('⏳ Iniciando FFmpeg:', cmd);
  })
  .on('progress', (progress) => {
    console.log('📊 Progresso:', progress);
  })
  .on('end', () => {
    console.log('✓ Concluído!');
  })
  .on('error', (err) => {
    console.error('✗ Erro:', err);
  })
  .run();
```

---

## 📊 Monitoramento

### Ver quanto espaço em disco os vídeos usam

```powershell
# Windows PowerShell
dir C:\Users\Bregadiolli\Documents\FifaCortes\outputs -Recurse | Measure-Object -Sum -Property Length
```

### Limpar todos os vídeos processados

```powershell
# Remove tudo da pasta outputs
Remove-Item C:\Users\Bregadiolli\Documents\FifaCortes\outputs\*
```

### Mover vídeos para outra pasta

```powershell
# Move para Desktop
Move-Item C:\Users\Bregadiolli\Documents\FifaCortes\outputs\*.mp4 C:\Users\Bregadiolli\Desktop\
```

---

## 🔗 Integração com Outras Ferramentas

### Abrir pasta de saída automaticamente

**No `index.js`, após sucesso:**

```javascript
const { exec } = require('child_process');

// Após vídeo ser criado com sucesso:
exec(`start "" "${outputDir}"`); // Windows
// ou no Mac/Linux:
// exec(`open "${outputDir}"`);
```

---

### Enviar notificação ao terminar

**Instale `node-notifier`:**
```powershell
npm install node-notifier
```

**Use no `index.js`:**
```javascript
const notifier = require('node-notifier');

// Ao terminar:
notifier.notify({
  title: 'FIFA Cortes',
  message: `${outputName} pronto para download!`,
  icon: path.join(__dirname, 'public/favicon.ico')
});
```

---

## 🚀 Performance

### Para Vídeos Maiores

Se você tem vídeos acima de 50 MB, considere:

1. **Aumentar timeout no Node.js**
   - Veja seção de "Mudar Limite de Tamanho"

2. **Usar SSD**
   - SSDs são mais rápidas que HDDs
   - O processamento será mais rápido

3. **Fechar outras aplicações**
   - Libere recursos do computador

4. **Usar processamento direto com FFmpeg**
   - Se o app ficar lento, use FFmpeg no terminal:
   ```bash
   ffmpeg -i input.mp4 -ss 5 -to 25 -c copy output.mp4
   ```

---

## 📚 Recursos Externos

### FFmpeg Documentation
https://ffmpeg.org/ffmpeg.html

### Node.js Express
https://expressjs.com/

### Multer Upload
https://github.com/expressjs/multer

### Fluent FFmpeg
https://github.com/fluent-ffmpeg/node-fluent-ffmpeg

---

## 💡 Troubleshooting Avançado

### Vídeo começa/termina errado

**Causa:** Keyframes do vídeo

**Solução:** Use `-i flag` em FFmpeg:
```bash
ffmpeg -i input.mp4 -ss 5 -to 25 -i flag:lowest_bitrate -c copy output.mp4
```

### Áudio desincronizado

**Causa:** Streams de áudio/vídeo diferentes

**Solução:** Re-encode (mais lento):
```bash
ffmpeg -i input.mp4 -ss 5 -to 25 -c:v libx264 -c:a aac output.mp4
```

### Arquivo muito grande

**Solução:** Comprimir depois (lossy):
```bash
ffmpeg -i input.mp4 -crf 28 -c:a aac -b:a 128k output_small.mp4
```

---

## 🎓 Aprendendo FFmpeg

Para entender melhor os comandos usados:

```bash
# Ver informações do vídeo
ffmpeg -i seu_video.mp4

# Ver todos os codecs disponíveis
ffmpeg -codecs

# Ver formatos suportados
ffmpeg -formats
```

---

**Dicas avançadas para potencializar seu FIFA Cortes! 🎬⚽**
