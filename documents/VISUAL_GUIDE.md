# 🎯 Pasos Visuales para Usar el Blog

## 📍 Ubicación Actual del Proyecto

```
✅ Blog Angular: CORRIENDO en http://localhost:4200
❌ Portfolio React: NO INICIADO (necesitas iniciarlo)
```

---

## 🚀 PASO 1: Iniciar el Portfolio

### Opción A: Automático (Recomendado)
```powershell
npm run dev:all
```

### Opción B: Manual
En una **NUEVA TERMINAL**:
```powershell
npm run dev
```

---

## 🌐 PASO 2: Abrir el Portfolio

1. Abre tu navegador
2. Ve a: **http://localhost:5173**
3. Espera a que cargue el portfolio

---

## 📖 PASO 3: Acceder al Blog

### 3.1 Navegar a "About Me"
```
┌─────────────────────────────────────┐
│  [Home] [Projects] [About] [Contact]│  ← Menú de navegación
└─────────────────────────────────────┘
                       ↑
                   Haz clic aquí
```

O simplemente **scroll down** hasta ver la sección "About Me"

### 3.2 Encontrar el Botón
```
┌────────────────────────────────────────┐
│           SOBRE MÍ                     │
│                                        │
│      ┌──────────────────────┐         │
│      │  📖 Ver Blog         │  ← Este botón
│      └──────────────────────┘         │
│                                        │
│    [Cards de perfil...]               │
└────────────────────────────────────────┘
```

### 3.3 Clic en "Ver Blog"
El blog se abrirá en un **modal con iframe**:

```
┌─────────────────────────────────────────────┐
│ Blog de Desarrollo              [↗] [✕]    │ ← Header del modal
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  Blog de Desarrollo                   │ │
│  │  Artículos, tutoriales y recursos...  │ │
│  │                                       │ │
│  │  [Buscar artículos...]    🔍          │ │
│  │                                       │ │
│  │  [Todos] [micro frontends] [angular]  │ │
│  │                                       │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │ [Imagen del post]               │ │ │
│  │  │ Título del Post                 │ │ │
│  │  │ Descripción...                  │ │ │
│  │  │ #tags                           │ │ │
│  │  │ [Leer más →]                    │ │ │
│  │  └─────────────────────────────────┘ │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## ✨ PASO 4: Explorar el Blog

### 4.1 Buscar Posts
```
┌──────────────────────────────────────┐
│ [Buscar artículos...]    🔍          │ ← Escribe aquí
└──────────────────────────────────────┘
```
- Escribe cualquier palabra
- Los resultados se filtran en tiempo real

### 4.2 Filtrar por Tags
```
[Todos] [micro frontends] [angular] [react]
   ↑           ↑              ↑        ↑
 Todos    Filtro activo   Clickeable
```
- Clic en un tag para filtrar
- Clic en "Todos" para ver todos

### 4.3 Leer un Post
```
┌─────────────────────────────────────┐
│ [Imagen del post]                   │
│ Título del Post Completo            │
│ Descripción breve del contenido...  │
│ #tag1 #tag2 #tag3                   │
│                                     │
│ Por Vladimir | 5 min lectura        │
│ [Leer más →]  ← Clic aquí          │
└─────────────────────────────────────┘
```

### 4.4 Vista Detallada
```
┌────────────────────────────────────────┐
│ [← Volver al blog]                     │
│                                        │
│ 15 de enero, 2025 | 5 min lectura     │
│                                        │
│ TÍTULO DEL POST                        │
│                                        │
│ Por Vladimir                           │
│ #tag1 #tag2 #tag3                      │
│                                        │
│ [Imagen grande]                        │
│                                        │
│ ## Sección 1                           │
│ Contenido del post...                  │
│                                        │
│ ## Sección 2                           │
│ Más contenido...                       │
│                                        │
│ [← Volver al blog]                     │
└────────────────────────────────────────┘
```

---

## 🎮 Acciones Disponibles

### En el Modal del Blog

| Acción | Resultado |
|--------|-----------|
| Clic en **[✕]** | Cierra el modal y vuelve al portfolio |
| Clic en **[↗]** | Abre el blog en una nueva pestaña |
| Clic fuera del modal | Cierra el modal |
| ESC (teclado) | Cierra el modal |

### En el Blog

| Acción | Resultado |
|--------|-----------|
| Escribir en búsqueda | Filtra posts en tiempo real |
| Clic en tag | Filtra por esa categoría |
| Clic en "Todos" | Muestra todos los posts |
| Clic en "Leer más" | Abre el post completo |
| Clic en "← Volver" | Regresa a la lista |

---

## 📱 Responsive Design

El blog se adapta a diferentes tamaños:

### Desktop (> 1024px)
```
┌──────────────────────────────────────────┐
│  [Post 1]    [Post 2]    [Post 3]       │
│                                          │
│  [Post 4]    [Post 5]    [Post 6]       │
└──────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌────────────────────────┐
│  [Post 1]    [Post 2]  │
│                        │
│  [Post 3]    [Post 4]  │
└────────────────────────┘
```

### Mobile (< 768px)
```
┌──────────┐
│ [Post 1] │
│          │
│ [Post 2] │
│          │
│ [Post 3] │
└──────────┘
```

---

## 🎨 Elementos Visuales

### Colores del Blog
- **Header Gradient**: Morado (#667eea) → Violeta (#764ba2)
- **Botones activos**: Gradient morado-violeta
- **Texto principal**: Negro (#1a1a1a)
- **Texto secundario**: Gris (#666)
- **Fondo**: Blanco (#ffffff) y gris claro (#f8f9fa)

### Animaciones
- ✨ Hover en cards: Levanta 4px + sombra
- 🔄 Transiciones: 0.3s suaves
- 📸 Zoom en imágenes al hover
- 🎭 Fade in del modal

---

## 🔧 Debugging Visual

Si algo no se ve bien:

### 1. Verifica las Consolas
```
Navegador (F12) → Console
Busca errores en rojo ❌
```

### 2. Verifica los Puertos
```
Blog:      http://localhost:4200  ✓ o ✗
Portfolio: http://localhost:5173  ✓ o ✗
```

### 3. Verifica el Iframe
```
F12 → Elements → Buscar <iframe>
Debe tener src="http://localhost:4200"
```

---

## 📸 Screenshots Esperados

### Lista de Posts
```
┌─────────────────────────────────────────────┐
│            Blog de Desarrollo               │
│   Artículos, tutoriales y recursos sobre... │
│                                             │
│  [Buscar artículos...]              🔍      │
│                                             │
│  [Todos] [micro frontends] [angular] ...   │
│                                             │
│  3 artículo(s) encontrado(s)               │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │ Post 1  │  │ Post 2  │  │ Post 3  │   │
│  │ [Img]   │  │ [Img]   │  │ [Img]   │   │
│  │ Título  │  │ Título  │  │ Título  │   │
│  │ Desc... │  │ Desc... │  │ Desc... │   │
│  │ #tags   │  │ #tags   │  │ #tags   │   │
│  │ [Leer→] │  │ [Leer→] │  │ [Leer→] │   │
│  └─────────┘  └─────────┘  └─────────┘   │
└─────────────────────────────────────────────┘
```

### Post Detallado
```
┌─────────────────────────────────────────────┐
│  [← Volver al blog]                         │
│                                             │
│  15 de enero, 2025 | 5 min lectura         │
│                                             │
│  INTRODUCCIÓN AL DESARROLLO DE              │
│  MICRO FRONTENDS                            │
│                                             │
│  Por Vladimir                               │
│  #micro frontends #arquitectura ...         │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │                                       │ │
│  │        [Imagen del Post]              │ │
│  │                                       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ## ¿Qué son los Micro Frontends?          │
│                                             │
│  Los micro frontends son una arquitectura  │
│  que divide una aplicación frontend...     │
│                                             │
│  ### Ventajas                               │
│  • Escalabilidad mejorada                   │
│  • Equipos independientes                   │
│  • Tecnologías flexibles                    │
│                                             │
│  [← Volver al blog]                         │
└─────────────────────────────────────────────┘
```

---

## ✅ Checklist Visual

Cuando el blog esté funcionando, deberías ver:

- [ ] Modal se abre con animación suave
- [ ] Header morado con gradiente
- [ ] Botones [↗] y [✕] en el header
- [ ] Título "Blog de Desarrollo" grande y con gradiente
- [ ] Campo de búsqueda con ícono 🔍
- [ ] Botones de tags con borde
- [ ] 3 cards de posts en grid
- [ ] Imágenes de posts cargadas
- [ ] Zoom en imágenes al hover
- [ ] Cards suben al hacer hover
- [ ] Búsqueda funciona en tiempo real
- [ ] Filtros por tags funcionan
- [ ] Clic en "Leer más" abre el post
- [ ] Vista detallada se ve completa
- [ ] Botón "Volver" funciona
- [ ] Todo es responsive en mobile

---

## 🎬 ¡A Probarlo!

**Tu misión ahora:**

1. ✅ Blog Angular YA está corriendo
2. ⏳ Iniciar Portfolio React: `npm run dev`
3. 🌐 Abrir: http://localhost:5173
4. 📖 Ir a "About Me"
5. 🔘 Clic en "Ver Blog"
6. ✨ ¡Disfrutar!

---

**¡Que lo disfrutes! 🚀🎉**
