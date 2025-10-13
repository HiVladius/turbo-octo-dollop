# CI/CD Configuration

## Overview

Este proyecto utiliza GitHub Actions para automatizar el proceso de testing, building y despliegue a Firebase Hosting. El pipeline incluye múltiples jobs para garantizar calidad y seguridad del código.

## Workflows Configurados

### 1. Pipeline Principal (`ci-cd.yml`)

El workflow principal incluye los siguientes jobs:

#### **Test Job**
- **Trigger**: Push a `main`, `develop`, `feature/**` y Pull Requests
- **Propósito**: Ejecutar tests, linting y build
- **Acciones**:
  - Instala dependencias con `npm ci`
  - Ejecuta linter (`npm run lint`)
  - Ejecuta type checking (`npm run type-check`)
  - Ejecuta tests (`npm run test`)
  - Hace build del proyecto

#### **Security Job**
- **Trigger**: En paralelo con test job
- **Propósito**: Verificar vulnerabilidades de seguridad
- **Acciones**:
  - Ejecuta `npm audit` para detectar vulnerabilidades
  - Falla si encuentra vulnerabilidades críticas

#### **Lighthouse Job**
- **Trigger**: Solo en Pull Requests
- **Propósito**: Análisis de performance
- **Acciones**:
  - Hace build del proyecto
  - Sirve la aplicación localmente
  - Ejecuta Lighthouse para análisis de performance

#### **Deploy Job**
- **Trigger**: Solo en push a la rama `main`
- **Propósito**: Deploy automático a producción
- **Requiere**: Test y Security jobs exitosos
- **Acciones**:
  - Hace build de producción
  - Despliega a Firebase Hosting (canal live)

#### **Deploy Preview Job**
- **Trigger**: Solo en Pull Requests a `main`
- **Propósito**: Deploy de preview para revisión
- **Requiere**: Test job exitoso
- **Acciones**:
  - Hace build del proyecto
  - Crea preview deployment temporal (30 días)
  - Comenta en el PR con la URL del preview

## Secrets Requeridos

Para que los workflows funcionen correctamente, necesitas configurar estos secrets en GitHub:

### Repository Secrets
1. **`FIREBASE_SERVICE_ACCOUNT_PORFOLIO_VLAD`**: Service account de Firebase (ya configurado)
2. **`MY_EMAIL_SERVICE`**: Servicio de email para el formulario de contacto
3. **`MY_EMAIL_TO`**: Email destino para recibir mensajes del formulario
4. **`MY_EMAIL_PASS`**: Password/token del servicio de email

### Cómo configurar los secrets:
1. Ve a tu repositorio en GitHub
2. Navega a **Settings → Secrets and variables → Actions**
3. Clic en **New repository secret**
4. Añade cada secret con su valor correspondiente

## Project ID de Firebase

- **Project ID**: `portfolio-896a3` (configurado automáticamente en el workflow)
```yaml
projectId: tu-project-id-aqui
```

## Service Account de Firebase

Para obtener el service account:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `portfolio-896a3`
3. Project Settings → Service accounts
4. Genera una nueva clave privada
5. Copia el JSON completo y pégalo en el secret `FIREBASE_SERVICE_ACCOUNT_PORFOLIO_VLAD`

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build del proyecto
npm run build

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Preview local
npm run preview

# Deploy manual
npm run deploy

# Deploy a canal preview
npm run deploy:preview
```

## Flujo de Trabajo Recomendado

1. **Desarrollo**: Trabajar en ramas feature/*
2. **Pull Request**: Crear PR hacia main
   - Se ejecuta CI/CD con tests y preview
   - Review del preview deployment
3. **Merge**: Merge a main
   - Deployment automático a producción
   - Notificación de deployment exitoso

## URLs

- **Producción**: https://portfolio-896a3.web.app
- **Preview**: Se genera automáticamente en cada PR
- **Firebase Console**: https://console.firebase.google.com/project/portfolio-896a3

## Troubleshooting

### Error en el build
- Verificar que las variables de entorno estén correctamente configuradas
- Revisar logs del workflow en GitHub Actions

### Error en deployment
- Verificar service account de Firebase
- Confirmar permisos del token GITHUB_TOKEN

### Preview no funciona
- Verificar que el PR viene del mismo repositorio
- Revisar configuración del secret FIREBASE_SERVICE_ACCOUNT_PORFOLIO_VLAD
