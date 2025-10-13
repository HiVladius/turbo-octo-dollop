# Implementación de Markdown para el Blog Angular

## ✅ Cambios Realizados

### 1. **Modelo BlogPost Actualizado**
- Agregado `markdownPath?: string` para la ruta al archivo .md
- Cambiado `content` a opcional: `content?: string`

### 2. **Estructura de Archivos**
```
src/
  assets/
    blog/
      posts/
        1.md ✅ (Arquitectura para la Velocidad)
        2.md ✅ (Angular + React)
        3.md ✅ (Optimización de Performance)
```

### 3. **BlogService Mejorado**
- ✅ Agregado método `getPostContent(post: BlogPost): Promise<string>`
- ✅ Agregado método privado `loadMarkdown(path: string): Promise<string>`
- ✅ Usa `marked.parse()` para convertir Markdown a HTML
- ✅ Posts actualizados para usar `markdownPath` en lugar de `content`

### 4. **Componente BlogPost Mejorado**
- ✅ Agregado signal `postContent` para almacenar el contenido cargado
- ✅ Carga asíncrona del contenido Markdown en el constructor
- ✅ Indicador de "Cargando contenido..." mientras se carga
- ✅ Estilos mejorados para renderizar Markdown:
  - Código inline y bloques de código
  - Citas (blockquote)
  - Enlaces con hover
  - Negrita y cursiva
  - Imágenes responsive
  - Tablas
  - Líneas horizontales

### 5. **Configuración Angular**
- ✅ `app.config.ts`: Agregado `provideHttpClient(withFetch())`
- ✅ `angular.json`: Configurado para copiar assets de `src/assets` al build

## 📝 Cómo Agregar Nuevos Posts

1. **Crear archivo Markdown**
   ```bash
   # Crear archivo en src/assets/blog/posts/
   New-Item -Path "src/assets/blog/posts/4.md" -ItemType File
   ```

2. **Escribir contenido en Markdown**
   ```markdown
   # Título del Post
   
   Contenido aquí...
   
   ## Subtítulo
   
   ```typescript
   const code = "ejemplo";
   ```
   ```

3. **Agregar metadata en BlogService**
   ```typescript
   {
     id: '4',
     title: 'Tu Título',
     excerpt: 'Breve descripción...',
     markdownPath: 'assets/blog/posts/4.md',
     author: 'Vladimir',
     date: new Date('2025-04-01'),
     tags: ['tag1', 'tag2'],
     imageUrl: 'https://...',
     readTime: 7
   }
   ```

## 🎨 Características de Markdown Soportadas

- ✅ Encabezados (H1-H6)
- ✅ Párrafos y saltos de línea
- ✅ Listas ordenadas y desordenadas
- ✅ Enlaces
- ✅ Imágenes
- ✅ Código inline y bloques de código
- ✅ Negrita y cursiva
- ✅ Citas (blockquotes)
- ✅ Tablas
- ✅ Líneas horizontales
- ✅ GitHub Flavored Markdown (GFM)

## 🚀 Para Probar

```bash
cd microfrontends/angular-blog
npm run dev
```

Navega a un post y verás el contenido cargado desde el archivo Markdown.

## 🔧 Dependencias Usadas

- `marked`: Para convertir Markdown a HTML
- `@types/marked`: Tipos TypeScript para marked

## 📦 Ventajas de esta Implementación

1. **Separación de Contenido**: Los posts están separados del código
2. **Fácil de Editar**: Cualquiera puede editar archivos .md
3. **Formato Rico**: Soporte completo de Markdown
4. **Performance**: Carga bajo demanda
5. **Escalable**: Fácil agregar más posts
6. **Mantenible**: Contenido versionado con Git
7. **SEO Friendly**: HTML semántico generado
