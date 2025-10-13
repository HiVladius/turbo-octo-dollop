# Micro Frontend: Integración React + Angular

Este documento detalla la arquitectura y configuración del blog como micro frontend usando Angular integrado en el portfolio React principal.

## 📋 Tabla de Contenidos

1. [Arquitectura General](#arquitectura-general)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración y Desarrollo](#configuración-y-desarrollo)
5. [Integración](#integración)
6. [Despliegue](#despliegue)
7. [Próximos Pasos](#próximos-pasos)

---

## 🏗️ Arquitectura General

### Patrón Utilizado: **Iframe-based Micro Frontend**

```
┌─────────────────────────────────────────────┐
│     Portfolio React (Host Application)      │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │         About Section (React)         │ │
│  │                                       │ │
│  │  [Ver Blog Button]                   │ │
│  │         ↓                             │ │
│  │  BlogMicrofrontend Component         │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │   Iframe Container (Modal)      │ │ │
│  │  │                                 │ │ │
│  │  │  ┌───────────────────────────┐ │ │ │
│  │  │  │  Angular Blog App         │ │ │ │
│  │  │  │  - Blog List              │ │ │ │
│  │  │  │  - Blog Post Detail       │ │ │ │
│  │  │  │  - Search & Filters       │ │ │ │
│  │  │  └───────────────────────────┘ │ │ │
│  │  └─────────────────────────────────┘ │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Ventajas de esta Arquitectura

✅ **Aislamiento Total**: Cada aplicación tiene su propio contexto
✅ **Independencia Tecnológica**: React y Angular coexisten sin conflictos
✅ **Desarrollo Independiente**: Equipos pueden trabajar por separado
✅ **Despliegue Separado**: Cada app se puede desplegar independientemente
✅ **Fallback Sencillo**: Si el micro frontend falla, no afecta el host

---

## 🛠️ Tecnologías Utilizadas

### Host Application (Portfolio)
- **React 19.1.0**
- **Vite 6.x**
- **TypeScript**
- **Tailwind CSS 4.x**
- **Framer Motion** (animaciones)
- **Zustand** (estado global)

### Micro Frontend (Blog)
- **Angular 20.3.0**
- **TypeScript**
- **Angular Signals** (gestión de estado)
- **Angular Router**
- **CSS Modules**
- **Standalone Components**

---

## 📁 Estructura del Proyecto

```
portfolio-vlad/
│
├── src/                              # Portfolio React (Host)
│   ├── components/
│   │   ├── about/
│   │   │   └── AboutSection.tsx     # Sección con botón del blog
│   │   └── blog/
│   │       └── BlogMicrofrontend.tsx # Componente de integración
│   └── ...
│
├── microfrontends/                   # Micro Frontends
│   └── angular-blog/                 # Blog Angular
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   │   ├── blog-list/   # Lista de posts
│       │   │   │   └── blog-post/   # Detalle del post
│       │   │   ├── models/
│       │   │   │   └── blog-post.model.ts
│       │   │   ├── services/
│       │   │   │   └── blog.service.ts
│       │   │   └── app.routes.ts
│       │   └── main.ts
│       ├── angular.json
│       ├── package.json
│       └── README.md
│
└── MICROFRONTENDS.md                 # Este documento
```

---

## ⚙️ Configuración y Desarrollo

### 1. Instalación de Dependencias

#### Portfolio React (Host)
```bash
# En la raíz del proyecto
npm install
```

#### Blog Angular (Micro Frontend)
```bash
cd microfrontends/angular-blog
npm install
```

### 2. Desarrollo Local

#### Paso 1: Iniciar el Blog Angular
```bash
cd microfrontends/angular-blog
npm start
```
El blog estará disponible en `http://localhost:4200`

#### Paso 2: Iniciar el Portfolio React
```bash
# En otra terminal, desde la raíz
npm run dev
```
El portfolio estará disponible en `http://localhost:5173`

### 3. Probar la Integración

1. Abre el portfolio en `http://localhost:5173`
2. Navega a la sección "About Me"
3. Haz clic en el botón "Ver Blog"
4. El blog se abrirá en un modal con iframe

---

## 🔗 Integración

### Componente de Integración: `BlogMicrofrontend.tsx`

```tsx
// src/components/blog/BlogMicrofrontend.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface BlogMicrofrontendProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlogMicrofrontend: React.FC<BlogMicrofrontendProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Iframe apunta a http://localhost:4200 en desarrollo
  // En producción, apuntará a la URL del blog desplegado
  return (
    <motion.div className="fixed inset-0 z-50">
      <iframe
        ref={iframeRef}
        src="http://localhost:4200"
        title="Vlad Blog"
        onLoad={() => setIsLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </motion.div>
  );
};
```

### Integración en AboutSection

```tsx
// src/components/about/AboutSection.tsx
import { useState } from "react";
import { BlogMicrofrontend } from "../blog/BlogMicrofrontend";

export function AboutSection() {
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsBlogOpen(true)}>
        Ver Blog
      </button>
      
      <BlogMicrofrontend 
        isOpen={isBlogOpen} 
        onClose={() => setIsBlogOpen(false)} 
      />
    </div>
  );
}
```

---

## 🚀 Despliegue

### Opción 1: Despliegue Separado (Recomendado)

#### Blog Angular
1. Build del blog:
```bash
cd microfrontends/angular-blog
npm run build
```

2. Desplegar en Firebase Hosting (o cualquier otro servicio):
```bash
firebase deploy --only hosting:blog
```

3. Actualizar URL en `BlogMicrofrontend.tsx`:
```tsx
const BLOG_URL = import.meta.env.PROD 
  ? 'https://blog.tu-dominio.com' 
  : 'http://localhost:4200';

<iframe src={BLOG_URL} />
```

#### Portfolio React
```bash
npm run build
firebase deploy --only hosting:portfolio
```

### Opción 2: Despliegue Conjunto

Configurar Firebase Hosting para servir ambas apps:

```json
// firebase.json
{
  "hosting": [
    {
      "target": "portfolio",
      "public": "dist",
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    },
    {
      "target": "blog",
      "public": "microfrontends/angular-blog/dist/angular-blog/browser",
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ]
    }
  ]
}
```

---

## 🔄 Comunicación entre Host y Micro Frontend

### Usando postMessage API (Opcional)

Si necesitas comunicación bidireccional:

#### En el Host (React):
```tsx
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== 'http://localhost:4200') return;
    
    // Manejar mensajes del blog
    console.log('Mensaje del blog:', event.data);
  };

  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, []);

// Enviar mensaje al blog
iframeRef.current?.contentWindow?.postMessage(
  { type: 'THEME_CHANGE', theme: 'dark' },
  'http://localhost:4200'
);
```

#### En el Micro Frontend (Angular):
```typescript
// En un servicio o componente
@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor() {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'THEME_CHANGE') {
        // Cambiar tema
      }
    });
  }

  sendToHost(data: any) {
    window.parent.postMessage(data, '*');
  }
}
```

---

## 📊 Manejo de Dependencias

### Dependencias del Host (React)
```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "framer-motion": "^12.11.0",
    "lucide-react": "^0.510.0",
    // ... otras dependencias
  }
}
```

### Dependencias del Micro Frontend (Angular)
```json
{
  "dependencies": {
    "@angular/core": "^20.3.0",
    "@angular/router": "^20.3.0",
    "@angular/common": "^20.3.0",
    // ... otras dependencias de Angular
  }
}
```

**Nota**: No hay dependencias compartidas. Cada aplicación gestiona las suyas independientemente.

---

## 🎯 Próximos Pasos

### Mejoras Inmediatas
- [ ] Configurar variables de entorno para URLs
- [ ] Implementar manejo de errores en el iframe
- [ ] Agregar skeleton loader mientras carga el blog
- [ ] Implementar comunicación bidireccional si es necesario

### Funcionalidades del Blog
- [ ] Backend para posts dinámicos (Firebase/Supabase)
- [ ] Sistema de comentarios
- [ ] Editor de Markdown
- [ ] Autenticación para admin
- [ ] SEO y meta tags dinámicos
- [ ] Sistema de categorías y tags
- [ ] Búsqueda full-text

### Optimizaciones
- [ ] Lazy loading del iframe
- [ ] Precarga del blog en background
- [ ] Cache de contenido
- [ ] Service Worker para offline

### Alternativas de Integración
- [ ] Migrar a Module Federation (Webpack)
- [ ] Convertir a Web Components usando @angular/elements
- [ ] Implementar Single-SPA para orquestación

---

## 🐛 Troubleshooting

### El iframe no carga
- Verificar que el blog Angular esté corriendo en `http://localhost:4200`
- Verificar CORS si estás en producción
- Revisar atributo `sandbox` del iframe

### Estilos no se aplican
- Los estilos dentro del iframe son completamente independientes
- No se heredan estilos del host
- Configurar estilos directamente en el blog Angular

### Errores de comunicación
- Verificar origen en `postMessage`
- Usar try-catch al enviar/recibir mensajes
- Implementar timeouts para mensajes

---

## 📚 Referencias

- [Angular Elements](https://angular.io/guide/elements)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends](https://micro-frontends.org/)
- [postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

---

## 👥 Contribución

Para contribuir al blog o al portfolio:

1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

MIT License - Vladimir © 2025
