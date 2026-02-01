// ===== Elementos do DOM =====
const videoFileInput = document.getElementById('videoFile');
const playerContainer = document.getElementById('playerContainer');
const videoPreview = document.getElementById('videoPreview');
const videoDuration = document.getElementById('videoDuration');
const videoTime = document.getElementById('videoTime');
const cutControls = document.getElementById('cutControls');

const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const startSlider = document.getElementById('startSlider');
const endSlider = document.getElementById('endSlider');
const startDisplay = document.getElementById('startDisplay');
const endDisplay = document.getElementById('endDisplay');

const outputNameInput = document.getElementById('outputName');
const cutButton = document.getElementById('cutButton');
const messageDiv = document.getElementById('message');
const progressDiv = document.getElementById('progress');
const filesList = document.getElementById('filesList');
const refreshButton = document.getElementById('refreshButton');
const fileInfo = document.getElementById('fileInfo');

// ===== Funções Utilitárias =====
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
}

function hideMessage() {
  messageDiv.className = 'message hidden';
}

function showProgress(show) {
  progressDiv.className = show ? 'progress' : 'progress hidden';
}

// ===== Event Listeners =====

// Quando um arquivo é selecionado
videoFileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    fileInfo.textContent = `Arquivo selecionado: ${file.name} (${sizeMB} MB)`;
    
    // Criar URL de preview
    const url = URL.createObjectURL(file);
    videoPreview.src = url;
    playerContainer.classList.remove('hidden');
    cutControls.classList.remove('hidden');
    
    // Quando o vídeo carregar, obter duração
    videoPreview.addEventListener('loadedmetadata', () => {
      const duration = videoPreview.duration;
      videoDuration.textContent = formatTime(duration);
      
      // Configurar sliders e inputs
      startTimeInput.max = duration;
      endTimeInput.max = duration;
      startSlider.max = duration;
      endSlider.max = duration;
      
      endTimeInput.value = duration;
      endSlider.value = duration;
      endDisplay.textContent = formatTime(duration);
    });
  } else {
    fileInfo.textContent = '';
    playerContainer.classList.add('hidden');
    cutControls.classList.add('hidden');
  }
});

// Atualizar tempo ao reproduzir
videoPreview.addEventListener('timeupdate', () => {
  videoTime.textContent = formatTime(videoPreview.currentTime);
});

// Sincronizar inputs com sliders (start)
startTimeInput.addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);
  startSlider.value = value;
  startDisplay.textContent = formatTime(value);
});

startSlider.addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);
  startTimeInput.value = value;
  startDisplay.textContent = formatTime(value);
  
  // Pular vídeo para posição
  videoPreview.currentTime = value;
});

// Sincronizar inputs com sliders (end)
endTimeInput.addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);
  endSlider.value = value;
  endDisplay.textContent = formatTime(value);
});

endSlider.addEventListener('input', (e) => {
  const value = parseFloat(e.target.value);
  endTimeInput.value = value;
  endDisplay.textContent = formatTime(value);
});

// Botão para cortar vídeo
cutButton.addEventListener('click', cutVideo);

// Botão para atualizar lista de arquivos
refreshButton.addEventListener('click', loadFiles);

// Carregar arquivos ao iniciar
window.addEventListener('load', loadFiles);

// ===== Função: Cortar Vídeo =====
async function cutVideo() {
  // Validações
  if (!videoFileInput.files[0]) {
    showMessage('Por favor, selecione um arquivo MP4', 'error');
    return;
  }

  if (!startTimeInput.value || !endTimeInput.value) {
    showMessage('Por favor, preencha tempo inicial e final', 'error');
    return;
  }

  if (!outputNameInput.value) {
    showMessage('Por favor, informe o nome do arquivo final', 'error');
    return;
  }

  const startTime = parseFloat(startTimeInput.value);
  const endTime = parseFloat(endTimeInput.value);

  if (startTime >= endTime) {
    showMessage('Tempo final deve ser maior que tempo inicial', 'error');
    return;
  }

  if (startTime < 0) {
    showMessage('Tempo inicial não pode ser negativo', 'error');
    return;
  }

  // Preparar FormData
  const formData = new FormData();
  formData.append('video', videoFileInput.files[0]);
  formData.append('startTime', startTime);
  formData.append('endTime', endTime);
  formData.append('outputName', outputNameInput.value);

  // Desabilitar botão e mostrar progresso
  cutButton.disabled = true;
  showProgress(true);
  hideMessage();

  try {
    const response = await fetch('/api/cut-video', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      // Sucesso!
      showMessage(`Vídeo cortado com sucesso: ${data.fileName}`, 'success');

      // Limpar formulário
      videoFileInput.value = '';
      startTimeInput.value = '';
      endTimeInput.value = '';
      outputNameInput.value = '';
      fileInfo.textContent = '';
      playerContainer.classList.add('hidden');
      cutControls.classList.add('hidden');

      // Atualizar lista de arquivos
      setTimeout(loadFiles, 1000);
    } else {
      // Erro na resposta
      showMessage(`Erro: ${data.error}`, 'error');
    }
  } catch (error) {
    showMessage(`Erro ao conectar: ${error.message}`, 'error');
  } finally {
    // Re-habilitar botão e esconder progresso
    cutButton.disabled = false;
    showProgress(false);
  }
}

// ===== Função: Carregar Lista de Arquivos =====
async function loadFiles() {
  try {
    const response = await fetch('/api/files');
    const data = await response.json();

    if (data.success && data.files.length > 0) {
      // Renderizar lista de arquivos
      filesList.innerHTML = data.files
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .map((file) => createFileElement(file))
        .join('');
    } else {
      // Nenhum arquivo cortado ainda
      filesList.innerHTML = '<div class="empty">Nenhum vídeo processado ainda</div>';
    }
  } catch (error) {
    filesList.innerHTML = `<div class="empty">Erro ao carregar arquivos: ${error.message}</div>`;
  }
}

// ===== Função: Criar Elemento de Arquivo =====
function createFileElement(file) {
  const date = new Date(file.created).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <div class="file-item">
      <div class="file-info-content">
        <div class="file-name">${file.name}</div>
        <div class="file-meta">${file.size} • ${date}</div>
      </div>
      <div class="file-actions">
        <button class="btn-action btn-download" onclick="downloadFile('${file.name}')">Download</button>
        <button class="btn-action btn-delete" onclick="deleteFile('${file.name}')">Deletar</button>
      </div>
    </div>
  `;
}

// ===== Função: Download de Arquivo =====
function downloadFile(filename) {
  const link = document.createElement('a');
  link.href = `/download/${filename}`;
  link.download = filename;
  link.click();
}

// ===== Função: Deletar Arquivo =====
async function deleteFile(filename) {
  if (!confirm(`Tem certeza que deseja deletar "${filename}"?`)) {
    return;
  }

  try {
    const response = await fetch(`/api/delete/${filename}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.success) {
      showMessage(`Arquivo "${filename}" deletado`, 'success');
      loadFiles();
    } else {
      showMessage(`Erro ao deletar: ${data.error}`, 'error');
    }
  } catch (error) {
    showMessage(`Erro ao conectar: ${error.message}`, 'error');
  }
}
