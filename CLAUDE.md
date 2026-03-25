# Carnes De Mi Campo - Landing Page

## Contexto del Proyecto
Landing page para **Carnes De Mi Campo**, un negocio de venta de carnes. Este proyecto forma parte del emprendimiento de venta de paginas web a clientes gestionado desde `liniersWebs/`.

**Cliente/Negocio:** Carnes De Mi Campo
**Tipo:** Landing page comercial
**Objetivo:** Captar clientes, mostrar productos y generar conversiones.
**Propietario del emprendimiento:** Franco Sardi

---

## Reglas Obligatorias

### 1. Investigacion antes de cualquier cambio
- **ANTES de implementar cualquier cambio, funcionalidad o tecnologia**, buscar en internet (usando WebSearch/WebFetch) informacion actualizada sobre esa implementacion.
- Verificar que la version de cualquier libreria, framework o API que se use sea la mas reciente y estable.
- No asumir que una solucion funciona solo porque funciono antes. Siempre verificar el estado actual.

### 2. Cero implementaciones externas sin certeza
- **NO implementar ninguna dependencia externa, API, libreria o servicio de terceros sin estar 100% seguro de que va a funcionar.**
- Si hay dudas sobre la compatibilidad o el estado de un recurso externo, investigar primero y confirmar con el usuario antes de proceder.
- Documentar en MEMORY.md cualquier decision sobre tecnologias externas y su justificacion.

### 3. Uso obligatorio de Sub-Agentes
- **Principio fundamental: usar Sub-Agentes (Agent tool) siempre que sea posible.**
- Para investigaciones de codigo o tecnologias: usar agentes tipo `Explore` o `general-purpose`.
- Para busquedas web de actualizaciones: lanzar agentes en paralelo cuando sea eficiente.
- Para tareas independientes (estilos, contenido, estructura): paralelizar con sub-agentes.
- Preferir delegacion a sub-agentes sobre hacer todo en el hilo principal.

### 4. Registro de sesion en MEMORY.md
- **Al iniciar cada sesion:** registrar fecha, hora aproximada y objetivo de la sesion.
- **Al cerrar cada sesion o completar trabajo significativo:** registrar un resumen de lo realizado, decisiones tomadas y estado actual del proyecto.
- Mantener MEMORY.md como bitacora viva del proyecto.

---

## Stack Tecnologico
- **Framework:** React 19 + Vite 8
- **Estilos:** Tailwind CSS v4 (con @tailwindcss/vite, sin postcss.config.js)
- **Animaciones:** Motion (ex framer-motion) v12+ - importar desde `motion/react`
- **Formularios:** react-hook-form v7
- **Contenido:** Placeholder ficticio (se reemplaza con datos reales del cliente)

## Herramientas MCP Disponibles (globales)
- **Google Stitch** (`stitch`): Genera disenos UI desde texto con Gemini. Tools: `build_site`, `get_screen_code`, `get_screen_image`. Estado: beta/experimental.
- **Nanobanana** (`nanobanana`): Genera imagenes via Gemini API. Tools: `generate_image`, `upload_file`. Estado: alpha pero funcional.

## Skill Instalado
- **UI/UX Pro Max** (`.claude/skills/ui-ux-pro-max/`): Base de datos de conocimiento de diseno UI/UX. Incluye CSVs de estilos, colores, tipografia, y reglas de diseno. Se activa automaticamente en tareas de UI.

## Secciones de la Landing
1. **Hero** - Imagen impactante de cortes de carne, CTA principal
2. **Productos** - Grid de cortes disponibles con precios placeholder
3. **Sobre Nosotros** - Historia, calidad, origen del campo
4. **Ofertas** - Productos en oferta o promociones especiales
5. **Sucursales** - Ubicaciones de las sucursales con direcciones
6. **Contacto** - Formulario con react-hook-form + link WhatsApp

## Paleta de Colores
Tonos tierra/marron oscuro, rojo carne, crema/beige, dorado

## Tipografia
Serif premium para headings, Sans-serif para body

## Estado Actual
Proyecto inicializado con git, CLAUDE.md, MEMORY.md, y skill UI/UX Pro Max instalado. Pendiente scaffold React+Vite y desarrollo de secciones.
