# MEMORY - Carnes De Mi Campo

Bitacora del proyecto. Cada sesion se registra aqui con fecha, acciones realizadas y estado.

---

## Sesion 1 - 2026-03-25
**Objetivo:** Inicializacion del proyecto
**Acciones:**
- Creacion de la estructura de carpetas del proyecto
- Creacion de CLAUDE.md con reglas del proyecto (investigar antes de implementar, cero implementaciones sin certeza, uso de sub-agentes, registro de sesiones)
- Creacion de MEMORY.md como bitacora
- Git init del repositorio

**Estado al cierre:** Proyecto inicializado. Pendiente definir stack tecnologico, diseno y contenido de la landing page.

---

## Sesion 2 - 2026-03-25
**Objetivo:** Configuracion de herramientas MCP y skill UI/UX (test de workflow de video Instagram)
**Acciones:**
- Investigacion de 3 herramientas del video:
  - **Google Stitch MCP** - Verificado: legit, Google Labs beta, gratis. Configurado globalmente.
  - **Nanobanana MCP** - Verificado: legit, MIT, codigo limpio, 216 stars. Configurado globalmente.
  - **UI/UX Pro Max Skill** - Verificado: funcional, MIT, scripts seguros (sin network calls). Instalado en proyecto. NOTA: ~50k stars sospechosas, issue de seguridad #201 abierto.
- Instalacion de `uv` (gestor de paquetes Python) v0.11.1
- Instalacion de `uipro-cli` global via npm
- Ejecucion de `uipro init --ai claude` en CarnesDeMiCampo - creo `.claude/skills/ui-ux-pro-max/` con SKILL.md + CSVs + scripts
- Configuracion de MCPs globales en `~/.claude.json`: stitch + nanobanana (junto al gmail existente)
- Obtencion de API keys: Gemini (Google AI Studio) + Stitch (stitch.withgoogle.com)
- Definicion de stack: React 19 + Vite 8 + Tailwind v4 + Motion + react-hook-form
- Definicion de secciones: Hero, Productos, Sobre Nosotros, Ofertas, Sucursales, Contacto

**Decisiones:**
- Stack basado en hub-landing pero con Tailwind v4 (no v3) y Motion (no framer-motion)
- MCPs configurados a nivel global para disponibilidad en todos los proyectos
- Skill UI/UX Pro Max instalado tal cual (modo test, sin filtrar SKILL.md)
- Contenido placeholder por ahora (datos reales del cliente pendientes)

**Investigacion de versiones (verificado 2026-03-25):**
- Tailwind CSS v4.2.2 (estable, CSS-first, no necesita postcss.config.js ni tailwind.config.js)
- Vite 8.0.0 (con Rolldown, nuevo pero funcional)
- React 19.1.0 (estable)
- Motion v12.5+ (reemplazo de framer-motion, importar desde `motion/react`)
- react-hook-form v7.72.0 (estable)

**Estado al cierre:** Herramientas configuradas. Pendiente scaffold del proyecto React+Vite y desarrollo de las 6 secciones de la landing.
