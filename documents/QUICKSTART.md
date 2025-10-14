# 🚀 Guía Rápida - Blog Micro Frontend

## Inicio Rápido

### Opción 1: Iniciar Todo Automáticamente (Recomendado)
```bash
npm run dev:all
```
Este comando:
- ✅ Verifica dependencias
- ✅ Inicia el blog Angular (puerto 4200)
- ✅ Inicia el portfolio React (puerto 5173)
- ✅ Abre ambos en ventanas separadas

### Opción 2: Iniciar Manualmente

#### Terminal 1 - Blog Angular
```bash
npm run dev:blog
# o
cd microfrontends/angular-blog
npm start
```

#### Terminal 2 - Portfolio React
```bash
npm run dev
```

---

## 📱 URLs

- **Portfolio**: http://localhost:5173
- **Blog**: http://localhost:4200

---

## 🎯 Cómo Acceder al Blog

1. Abre el portfolio: `http://localhost:5173`
2. Navega a la sección **"About Me"** (scroll o clic en el menú)
3. Haz clic en el botón **"Ver Blog"** (morado con ícono de libro)
4. El blog se abrirá en un modal con iframe

---

## ✨ Funcionalidades del Blog

### Búsqueda
- Escribe en el campo de búsqueda
- Busca por título, contenido o tags
- Resultados en tiempo real

### Filtros
- Clic en "Todos" para ver todos los posts
- Clic en un tag específico para filtrar
- Los filtros se combinan con la búsqueda

### Navegación
- Clic en "Leer más" para ver el post completo
- Clic en "← Volver al blog" para regresar
- Clic en el ícono "↗" para abrir en nueva pestaña

---

## 🏗️ Estructura del Código

### Portfolio React (Host)
```
src/components/
├── about/
│   └── AboutSection.tsx          # Botón "Ver Blog"
└── blog/
    └── BlogMicrofrontend.tsx     # Modal con iframe
```

### Blog Angular (Micro Frontend)
```
microfrontends/angular-blog/src/app/
├── components/
│   ├── blog-list/
│   │   ├── blog-list.component.ts    # Lista principal
│   │   └── blog-card.component.ts    # Tarjeta de post
│   └── blog-post/
│       └── blog-post.component.ts    # Vista detallada
├── services/
│   └── blog.service.ts               # Lógica de datos
└── models/
    └── blog-post.model.ts            # Tipos TypeScript
```

---

## 🛠️ Comandos Útiles

### Desarrollo
```bash
npm run dev              # Solo portfolio
npm run dev:blog         # Solo blog
npm run dev:all          # Ambos (automático)
```

### Build
```bash
npm run build            # Solo portfolio
npm run build:blog       # Solo blog
npm run build:all        # Ambos
```

### Linting
```bash
npm run lint             # Verificar
npm run lint:fix         # Arreglar automáticamente
```

### Type Checking
```bash
npm run type-check       # Verificar tipos TypeScript
```

### Despliegue
```bash
npm run deploy           # Desplegar portfolio
npm run deploy:all       # Desplegar todo
```

---

## 🐛 Solución de Problemas

### El blog no carga en el modal
1. Verifica que el blog esté corriendo: `http://localhost:4200`
2. Revisa la consola del navegador (F12) para errores
3. Verifica que la variable `VITE_BLOG_URL` esté en `.env`

### Puerto ya en uso
```bash
# Windows - Liberar puerto 4200
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Windows - Liberar puerto 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Dependencias faltantes
```bash
# Portfolio
npm install

# Blog
cd microfrontends/angular-blog
npm install
```

### Errores de TypeScript
```bash
# Verificar errores
npm run type-check

# Regenerar archivos de build
rm -rf dist
rm -rf microfrontends/angular-blog/dist
```

---

## 📝 Agregar Nuevos Posts

### Paso 1: Editar el Servicio
Abre: `microfrontends/angular-blog/src/app/services/blog.service.ts`

### Paso 2: Agregar al Array
```typescript
{
  id: '4',
  title: 'Tu Nuevo Post',
  excerpt: 'Descripción corta...',
  content: `
    <h2>Título</h2>
    <p>Contenido en HTML...</p>
  `,
  author: 'Vladimir',
  date: new Date('2025-10-13'),
  tags: ['typescript', 'angular'],
  imageUrl: 'https://tu-imagen.jpg',
  readTime: 7
}
```

### Paso 3: Guardar y Recargar
El hot reload actualizará automáticamente el blog.

---

## 🎨 Personalizar Estilos

### Colores del Blog
Edita: `microfrontends/angular-blog/src/app/components/blog-list/blog-list.component.ts`

Busca el gradiente:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Cambia los colores hex según tu preferencia.

### Estilos del Modal
Edita: `src/components/blog/BlogMicrofrontend.tsx`

Ajusta clases de Tailwind en el componente.

---

## 📚 Recursos

- [Documentación Completa](./MICROFRONTENDS.md)
- [TODO List](./BLOG_TODO.md)
- [README del Blog](./microfrontends/angular-blog/README.md)

---

## 💡 Tips

1. **Usa el script automático** (`npm run dev:all`) para mayor comodidad
2. **Abre el blog en nueva pestaña** para desarrollo más fácil
3. **Usa el hot reload** - los cambios se reflejan automáticamente
4. **Revisa la consola** para ver errores en tiempo real
5. **Usa las DevTools de Angular** para debugging

---

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Haz cambios y commits
3. Push: `git push origin feature/mi-feature`
4. Crea un Pull Request

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa [MICROFRONTENDS.md](./MICROFRONTENDS.md) - Troubleshooting
2. Verifica [BLOG_TODO.md](./BLOG_TODO.md) - Issues conocidos
3. Abre un issue en GitHub

---

**¡Happy Coding! 🚀**
