# Micro Frontends

Esta carpeta contiene todos los micro frontends del portfolio, permitiendo una arquitectura modular y escalable.

## 📦 Micro Frontends Disponibles

### 1. Angular Blog (`angular-blog/`)
Blog de desarrollo construido con Angular 20.

**Características:**
- Lista de posts con búsqueda y filtros
- Vista detallada de posts
- Diseño responsive
- Gestión de estado con Angular Signals

**Puerto:** 4200  
**Framework:** Angular 20  
**Documentación:** [README](./angular-blog/README.md)

---

## 🏗️ Arquitectura

Cada micro frontend:
- ✅ Es independiente y autónomo
- ✅ Tiene su propio `package.json` y dependencias
- ✅ Se puede desarrollar y desplegar por separado
- ✅ Se integra con el host (portfolio React) vía iframe o Module Federation

---

## 🚀 Comandos Rápidos

### Desarrollo
```bash
# Desde la raíz del proyecto
npm run dev:blog        # Iniciar solo el blog
npm run dev:all         # Iniciar portfolio + blog
```

### Build
```bash
# Desde la raíz del proyecto
npm run build:blog      # Build solo el blog
npm run build:all       # Build portfolio + blog
```

---

## 📁 Estructura

```
microfrontends/
│
├── angular-blog/              # Blog con Angular
│   ├── src/
│   ├── package.json
│   └── README.md
│
└── [futuros micro frontends]
```

---

## 🔮 Futuros Micro Frontends

Ideas para expandir:

### E-commerce Module (Vue.js)
- Catálogo de productos
- Carrito de compras
- Checkout

### Dashboard Analytics (Svelte)
- Estadísticas del portfolio
- Métricas de visitantes
- Gráficos interactivos

### Chat Widget (Vanilla JS)
- Chat en tiempo real
- Soporte al cliente
- Integración con APIs

### Portfolio Generator (Next.js)
- Crear portfolios personalizados
- Templates predefinidos
- Export/Import

---

## 🛠️ Agregar un Nuevo Micro Frontend

### Paso 1: Crear el Proyecto
```bash
cd microfrontends
# Ejemplo con Vue
npm create vue@latest my-microfrontend
```

### Paso 2: Configurar
1. Ajustar puerto para evitar conflictos
2. Configurar build output
3. Documentar en README.md

### Paso 3: Integrar con el Host
1. Crear componente wrapper en React
2. Configurar iframe o Module Federation
3. Agregar ruta/botón de acceso

### Paso 4: Actualizar Scripts
Agregar comandos en `package.json` de la raíz:
```json
"scripts": {
  "dev:my-microfrontend": "cd microfrontends/my-microfrontend && npm run dev"
}
```

---

## 📚 Recursos

- [Documentación de Integración](../MICROFRONTENDS.md)
- [Guía Rápida](../QUICKSTART.md)
- [Micro Frontends Pattern](https://micro-frontends.org/)

---

## 🤝 Convenciones

### Nomenclatura
- Usa kebab-case: `angular-blog`, `vue-ecommerce`
- Prefijo con tecnología: `angular-`, `vue-`, `react-`

### Estructura
- Cada micro frontend debe tener su `README.md`
- Documentar puerto, comandos y dependencias
- Incluir ejemplos de uso

### Puertos
- Blog: 4200
- Dashboard: 4300
- Chat: 4400
- etc.

---

**Última actualización**: 13 de octubre de 2025
