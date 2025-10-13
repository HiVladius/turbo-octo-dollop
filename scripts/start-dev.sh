#!/bin/bash

# Script para iniciar el proyecto completo con blog micro frontend

echo "🚀 Iniciando Portfolio + Blog Micro Frontend"
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar que estamos en la raíz del proyecto
if [ ! -f "package.json" ]; then
  echo "❌ Error: Ejecuta este script desde la raíz del proyecto"
  exit 1
fi

# Función para verificar si un puerto está en uso
check_port() {
  if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
    return 0
  else
    return 1
  fi
}

echo "${BLUE}📦 Verificando dependencias...${NC}"

# Verificar dependencias del portfolio
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias del portfolio..."
  npm install
fi

# Verificar dependencias del blog
if [ ! -d "microfrontends/angular-blog/node_modules" ]; then
  echo "Instalando dependencias del blog..."
  cd microfrontends/angular-blog
  npm install
  cd ../..
fi

echo "${GREEN}✓ Dependencias verificadas${NC}"
echo ""

# Verificar puertos
echo "${BLUE}🔍 Verificando puertos...${NC}"

if check_port 4200; then
  echo "⚠️  Puerto 4200 ya está en uso (Blog Angular)"
fi

if check_port 5173; then
  echo "⚠️  Puerto 5173 ya está en uso (Portfolio React)"
fi

echo ""
echo "${GREEN}🎬 Iniciando servicios...${NC}"
echo ""

# Crear archivo .env si no existe
if [ ! -f ".env" ]; then
  echo "${BLUE}📝 Creando archivo .env...${NC}"
  cp .env.example .env
  echo "VITE_BLOG_URL=http://localhost:4200" >> .env
fi

# Iniciar blog Angular en background
echo "${BLUE}1️⃣  Iniciando Blog Angular (puerto 4200)...${NC}"
cd microfrontends/angular-blog
npm start &
BLOG_PID=$!
cd ../..

# Esperar un poco para que el blog inicie
sleep 3

# Iniciar portfolio React
echo "${BLUE}2️⃣  Iniciando Portfolio React (puerto 5173)...${NC}"
npm run dev &
PORTFOLIO_PID=$!

echo ""
echo "${GREEN}✨ ¡Listo! Los servicios están iniciando...${NC}"
echo ""
echo "📱 Accede a:"
echo "   Portfolio: http://localhost:5173"
echo "   Blog:      http://localhost:4200"
echo ""
echo "💡 Para detener los servicios, presiona Ctrl+C"
echo ""

# Esperar a que el usuario presione Ctrl+C
trap "echo ''; echo '🛑 Deteniendo servicios...'; kill $BLOG_PID $PORTFOLIO_PID; exit" INT

# Mantener el script corriendo
wait
