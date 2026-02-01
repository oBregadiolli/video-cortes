@echo off
REM Script para iniciar o FIFA Cortes no Windows

echo.
echo ╔════════════════════════════════════════╗
echo ║     FIFA Cortes - Cortador de Videos   ║
echo ║          Iniciando servidor...         ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ ERRO: Node.js nao foi encontrado!
    echo.
    echo Por favor, instale Node.js em: https://nodejs.org
    echo.
    pause
    exit /b 1
)

REM Verificar se FFmpeg está instalado
where ffmpeg >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ ERRO: FFmpeg nao foi encontrado!
    echo.
    echo Por favor, instale FFmpeg em: https://ffmpeg.org/download.html
    echo.
    pause
    exit /b 1
)

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo ⚙ Instalando dependências... (primeira vez apenas)
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ✗ Erro ao instalar dependências!
        pause
        exit /b 1
    )
)

REM Iniciar o servidor
echo ✓ Iniciando servidor...
echo.
node index.js
