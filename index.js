// ===== Servidor Node.js para cortar vídeos MP4 =====
// Dependências
const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFile } = require('child_process');

// Detectar FFmpeg automaticamente (funciona local e na nuvem)
const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg';
const ffprobePath = process.env.FFPROBE_PATH || 'ffprobe';

console.log('🔍 Detectando FFmpeg...');
console.log('FFmpeg:', ffmpegPath);
console.log('FFprobe:', ffprobePath);

// Tentar usar o FFmpeg
try {
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  console.log('✓ FFmpeg configurado com sucesso');
} catch (err) {
  console.log('⚠️  Aviso ao configurar FFmpeg:', err.message);
}

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Usar /tmp para arquivos temporários (funciona em qualquer servidor)
const uploadsDir = process.env.NODE_ENV === 'production' 
  ? path.join(os.tmpdir(), 'fifa-uploads')
  : path.join(__dirname, 'uploads');

const outputDir = process.env.NODE_ENV === 'production'
  ? path.join(os.tmpdir(), 'fifa-outputs')
  : path.join(__dirname, 'outputs');

const metadataDir = process.env.NODE_ENV === 'production'
  ? path.join(os.tmpdir(), 'fifa-metadata')
  : path.join(__dirname, 'metadata');

const thumbnailDir = process.env.NODE_ENV === 'production'
  ? path.join(os.tmpdir(), 'fifa-thumbnails')
  : path.join(__dirname, 'public', 'thumbnails');

// Criar pastas se não existirem
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(metadataDir)) {
  fs.mkdirSync(metadataDir, { recursive: true });
}
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

console.log('📁 Pasta uploads:', uploadsDir);
console.log('📁 Pasta outputs:', outputDir);

// Configurar multer para receber uploads
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Permitir apenas MP4
    if (path.extname(file.originalname).toLowerCase() === '.mp4') {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos MP4 são permitidos'), false);
    }
  }
});

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Rota para cortar vídeo =====
app.post('/api/cut-video', upload.single('video'), (req, res) => {
  try {
    const { startTime, endTime, outputName } = req.body;
    const inputPath = req.file.path;

    // Validações
    if (!startTime || !endTime || !outputName) {
      fs.unlinkSync(inputPath); // Deletar arquivo enviado
      return res.status(400).json({
        success: false,
        error: 'Tempo inicial, tempo final e nome do arquivo são obrigatórios'
      });
    }

    const start = parseFloat(startTime);
    const end = parseFloat(endTime);

    if (isNaN(start) || isNaN(end) || start < 0 || end <= start) {
      fs.unlinkSync(inputPath);
      return res.status(400).json({
        success: false,
        error: 'Tempos inválidos. Certifique-se de que End Time > Start Time'
      });
    }

    // Sanitizar nome do arquivo
    let safeName = outputName.replace(/[^a-zA-Z0-9_-]/g, '_');
    if (!safeName.endsWith('.mp4')) {
      safeName += '.mp4';
    }

    const outputPath = path.join(outputDir, safeName);

    // Usar FFmpeg com execFile (mais confiável que fluent-ffmpeg)
    // Comando: ffmpeg -ss [start] -i [input] -to [duration] -c copy -y [output]
    const args = [
      '-ss', start.toString(),        // Tempo inicial (seek)
      '-i', inputPath,                // Arquivo de ENTRADA
      '-to', (end - start).toString(),// Duração (até - inicial)
      '-c', 'copy',                   // Copiar streams sem re-encode
      '-y',                           // Sobrescrever arquivo se existir
      outputPath                      // Arquivo de SAÍDA
    ];

    console.log('⏳ Iniciando corte de vídeo...');
    console.log('Comando:', ffmpegPath, args.join(' '));

    execFile(ffmpegPath, args, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
      try {
        // Sempre deletar arquivo temporário
        if (fs.existsSync(inputPath)) {
          fs.unlinkSync(inputPath);
        }

        if (error) {
          console.error('✗ Erro ao executar FFmpeg:', error.message);
          console.error('Stderr:', stderr);
          
          // Deletar arquivo de saída se foi criado com erro
          if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
          }

          return res.status(500).json({
            success: false,
            error: `Erro ao processar vídeo: ${error.message}`
          });
        }

        // Sucesso!
        console.log('✓ Vídeo cortado com sucesso:', safeName);
        
        // Gerar thumbnail (frame no meio do corte)
        const thumbnailFile = path.join(thumbnailDir, safeName.replace('.mp4', '.jpg'));
        const thumbnailTimestamp = (end - start) / 2; // Meio do corte
        
        const thumbArgs = [
          '-ss', thumbnailTimestamp.toString(),
          '-i', outputPath,
          '-vf', 'scale=320:180',
          '-vframes', '1',
          '-y',
          thumbnailFile
        ];
        
        execFile(ffmpegPath, thumbArgs, { maxBuffer: 10 * 1024 * 1024 }, (thumbErr) => {
          // Salvar metadados (thumbnail pode falhar, mas não é crítico)
          const metadata = {
            fileName: safeName,
            thumbnailFile: safeName.replace('.mp4', '.jpg'),
            createdAt: new Date().toISOString(),
            originalName: req.file.originalname,
            duration: (end - start).toFixed(2),
            startTime: start,
            endTime: end
          };
          
          const metadataFile = path.join(metadataDir, safeName.replace('.mp4', '.json'));
          fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
          
          res.json({
            success: true,
            message: 'Vídeo cortado com sucesso!',
            fileName: safeName,
            downloadUrl: `/download/${safeName}`
          });
        });
      } catch (err) {
        console.error('Erro ao processar resultado:', err);
        res.status(500).json({
          success: false,
          error: `Erro ao processar resultado: ${err.message}`
        });
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Erro no servidor: ${error.message}`
    });
  }
});

// ===== Rota para download do vídeo cortado =====
app.get('/download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename); // Segurança: evitar path traversal
  const filePath = path.join(outputDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Arquivo não encontrado' });
  }

  res.download(filePath, (err) => {
    if (err) {
      console.error('Erro ao fazer download:', err);
    }
  });
});

// ===== Rota para listar arquivos cortados =====
app.get('/api/files', (req, res) => {
  try {
    const files = fs.readdirSync(outputDir);
    const fileStats = files.map(file => {
      const filePath = path.join(outputDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: (stats.size / 1024 / 1024).toFixed(2) + ' MB',
        sizeBytes: stats.size,
        created: stats.birthtime
      };
    });

    res.json({ success: true, files: fileStats });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== Rota para deletar arquivo =====
app.delete('/api/files/:filename', (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(outputDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: 'Arquivo não encontrado'
      });
    }

    fs.unlinkSync(filePath);
    res.json({
      success: true,
      message: 'Arquivo deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== Iniciar servidor =====
app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║     FIFA Cortes - Cortador de Vídeos   ║`);
  console.log(`╠════════════════════════════════════════╣`);
  console.log(`║  Servidor rodando em:                  ║`);
  console.log(`║  http://localhost:${PORT}                  ║`);
  console.log(`║                                        ║`);
  console.log(`║  Pastas:                               ║`);
  console.log(`║  • Uploads (temp): ${uploadsDir.substring(uploadsDir.length - 15)}  ║`);
  console.log(`║  • Outputs: ${outputDir.substring(outputDir.length - 28)}  ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
});
