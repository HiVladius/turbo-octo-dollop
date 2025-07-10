# CI/CD Configuration

## Overview

Este proyecto utiliza GitHub Actions para automatizar el proceso de despliegue a Firebase Hosting.

## Workflows Configurados

### 1. `firebase-hosting-merge.yml`
- **Trigger**: Push a la rama `main`
- **Propósito**: Deployment automático al entorno de producción
- **Acciones**:
  - Instala dependencias
  - Ejecuta build del proyecto
  - Despliega a Firebase Hosting (canal live)

### 2. `firebase-hosting-pull-request.yml`
- **Trigger**: Pull Request
- **Propósito**: Preview deployment para revisión
- **Acciones**:
  - Instala dependencias
  - Ejecuta build del proyecto
  - Crea un preview deployment
  - Comenta en el PR con la URL del preview

### 3. `ci-cd.yml`
- **Trigger**: Push y Pull Request
- **Propósito**: Quality assurance y testing
- **Acciones**:
  - Ejecuta linting
  - Ejecuta type checking
  - Ejecuta security audit
  - Ejecuta performance check con Lighthouse

## Secrets Requeridos

Para que los workflows funcionen correctamente, necesitas configurar estos secrets en GitHub:

### Repository Secrets
1. `FIREBASE_SERVICE_ACCOUNT_PORFOLIO_VLAD`: Service account de Firebase
2. `MY_EMAIL_SERVICE`: Servicio de email (ej: 'gmail')
3. `MY_EMAIL_TO`: Email destino para contacto
4. `MY_EMAIL_PASS`: Password/token del servicio de email

### Cómo configurar los secrets:
1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Añade cada secret con su valor correspondiente

## Service Account de Firebase

Para obtener el service account:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `porfolio-vlad`
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

- **Producción**: https://porfolio-vlad.web.app
- **Preview**: Se genera automáticamente en cada PR
- **Firebase Console**: https://console.firebase.google.com/project/porfolio-vlad

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
