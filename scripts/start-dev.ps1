# Script de PowerShell para iniciar el proyecto completo con blog micro frontend

Write-Host "🚀 Iniciando Portfolio + Blog Micro Frontend" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en la raíz del proyecto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Ejecuta este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

# Función para verificar si un puerto está en uso
function Test-Port {
    param($Port)
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    return $null -ne $connection
}

Write-Host "📦 Verificando dependencias..." -ForegroundColor Blue

# Verificar dependencias del portfolio
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias del portfolio..."
    npm install
}

# Verificar dependencias del blog
if (-not (Test-Path "microfrontends\angular-blog\node_modules")) {
    Write-Host "Instalando dependencias del blog..."
    Set-Location microfrontends\angular-blog
    npm install
    Set-Location ..\..
}

Write-Host "✓ Dependencias verificadas" -ForegroundColor Green
Write-Host ""

# Verificar puertos
Write-Host "🔍 Verificando puertos..." -ForegroundColor Blue

if (Test-Port 4200) {
    Write-Host "⚠️  Puerto 4200 ya está en uso (Blog Angular)" -ForegroundColor Yellow
}

if (Test-Port 5173) {
    Write-Host "⚠️  Puerto 5173 ya está en uso (Portfolio React)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎬 Iniciando servicios..." -ForegroundColor Green
Write-Host ""

# Crear archivo .env si no existe
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creando archivo .env..." -ForegroundColor Blue
    Copy-Item ".env.example" ".env"
    Add-Content ".env" "`nVITE_BLOG_URL=http://localhost:4200"
}

# Iniciar blog Angular en una nueva ventana de PowerShell
Write-Host "1️⃣  Iniciando Blog Angular (puerto 4200)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\microfrontends\angular-blog'; npm start"

# Esperar un poco para que el blog inicie
Start-Sleep -Seconds 3

# Iniciar portfolio React en la ventana actual
Write-Host "2️⃣  Iniciando Portfolio React (puerto 5173)..." -ForegroundColor Blue
Write-Host ""
Write-Host "✨ ¡Listo! Los servicios están iniciando..." -ForegroundColor Green
Write-Host ""
Write-Host "📱 Accede a:" -ForegroundColor Cyan
Write-Host "   Portfolio: http://localhost:5173"
Write-Host "   Blog:      http://localhost:4200"
Write-Host ""
Write-Host "💡 Para detener el portfolio, presiona Ctrl+C en esta ventana" -ForegroundColor Yellow
Write-Host "💡 Para detener el blog, cierra su ventana de PowerShell" -ForegroundColor Yellow
Write-Host ""

# Iniciar el servidor de desarrollo del portfolio
npm run dev
