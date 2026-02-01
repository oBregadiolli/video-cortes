#!/usr/bin/env node

/**
 * Script de Setup do FIFA Cortes
 * Este script verifica e instala as dependências necessárias
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n╔════════════════════════════════════════╗');
console.log('║     FIFA Cortes - Setup Script         ║');
console.log('╚════════════════════════════════════════╝\n');

// ===== Verificar Node.js =====
console.log('✓ Node.js detectado');
console.log(`  Versão: ${process.version}\n`);

// ===== Verificar FFmpeg =====
console.log('Verificando FFmpeg...');
try {
  const ffmpegVersion = execSync('ffmpeg -version', { encoding: 'utf-8' });
  console.log('✓ FFmpeg detectado\n');
} catch (error) {
  console.log('✗ FFmpeg não encontrado!');
  console.log('  Por favor, instale em: https://ffmpeg.org/download.html\n');
  process.exit(1);
}

// ===== Verificar node_modules =====
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Instalando dependências...');
  try {
    execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
    console.log('✓ Dependências instaladas com sucesso\n');
  } catch (error) {
    console.log('✗ Erro ao instalar dependências\n');
    process.exit(1);
  }
} else {
  console.log('✓ Dependências já instaladas\n');
}

// ===== Criar pastas necessárias =====
const uploadsDir = path.join(__dirname, 'uploads');
const outputsDir = path.join(__dirname, 'outputs');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(outputsDir)) {
  fs.mkdirSync(outputsDir, { recursive: true });
}

console.log('✓ Pastas criadas/verificadas\n');

console.log('╔════════════════════════════════════════╗');
console.log('║         Setup Completo! 🎉             ║');
console.log('║                                        ║');
console.log('║  Para iniciar o servidor, execute:    ║');
console.log('║  npm start                             ║');
console.log('║                                        ║');
console.log('║  Seu app estará disponível em:        ║');
console.log('║  http://localhost:3000                 ║');
console.log('╚════════════════════════════════════════╝\n');
