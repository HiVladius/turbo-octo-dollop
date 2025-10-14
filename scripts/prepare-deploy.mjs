#!/usr/bin/env node

/**
 * Script multiplataforma para preparar el deploy
 * Detecta el sistema operativo y ejecuta el script correspondiente
 */

import { execSync } from 'child_process';
import { platform } from 'os';
import { existsSync, mkdirSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_DIST = join(__dirname, '..', 'microfrontends', 'angular-blog', 'dist', 'angular-blog', 'browser');
const BLOG_TARGET = join(__dirname, '..', 'dist', 'blog');

console.log('🚀 Preparando archivos para deploy...');

// Verificar que existe el build del blog
if (!existsSync(BLOG_DIST)) {
  console.error(`❌ Error: No se encontró el build del blog en ${BLOG_DIST}`);
  console.error('   Asegúrate de ejecutar \'npm run build:blog\' primero');
  process.exit(1);
}

// Crear directorio destino si no existe
console.log(`📁 Creando directorio ${BLOG_TARGET}...`);
mkdirSync(BLOG_TARGET, { recursive: true });

// Copiar archivos del blog
console.log('📋 Copiando archivos del blog...');
try {
  cpSync(BLOG_DIST, BLOG_TARGET, { recursive: true });
} catch (error) {
  console.error('❌ Error al copiar archivos:', error.message);
  process.exit(1);
}

// Verificar que se copiaron correctamente
const indexPath = join(BLOG_TARGET, 'index.html');
if (existsSync(indexPath)) {
  console.log(`✅ Blog copiado correctamente a ${BLOG_TARGET}`);
  console.log('✨ Preparación completada!');
} else {
  console.error('❌ Error: No se pudo copiar el blog correctamente');
  process.exit(1);
}
