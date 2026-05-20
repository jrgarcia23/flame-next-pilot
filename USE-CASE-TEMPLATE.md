# Flame · Plantilla de página "Caso de uso / Solución"

**Página de referencia**: [`app/es/cuenta-personas-draft/page.tsx`](app/es/cuenta-personas-draft/page.tsx)
**URL viva**: http://localhost:3060/es/cuenta-personas-draft/
**Aprobada por JR**: 2026-05-19

Esta es la plantilla canónica para TODAS las páginas de soluciones / casos de uso de Flame en Next.js. Copiar este archivo como base, cambiar SOLO el contenido (textos, iconos, métricas), mantener intactos los tokens, paddings, hovers y estructura.

---

## Páginas que deben seguir este patrón

### Casos de uso (8)
- `/es/cuenta-personas/` — People Counting ✅ (referencia)
- `/es/conversion-analytics/`
- `/es/customer-behavior/`
- `/es/gestion-ocupacion/` — Occupancy Management
- `/es/analitica-de-colas/` — Queue Analytics
- `/es/gestion-de-aseos/` — Restroom Management
- `/es/marketing-wifi-para-invitados/` — Guest Wifi Marketing
- `/es/acceso-wifi-corporativo/` — Corporate Wifi Access

### Sectores (4) — misma plantilla, cambia el copy enfocado al sector
- `/es/solucion-para-el-sector-retail/`
- `/es/solucion-para-centros-comerciales/`
- `/es/hoteles/`
- `/es/espacios-publicos/`

### Productos (3)
- `/es/analitica-trafico/` — Traffic Insights
- `/es/customer-journey/`
- `/es/connect/`

Todas con su espejo EN.

---

## Estructura de la página (10 bloques en este orden)

1. **NAV** — sticky, navy translucido con blur, dropdowns Producto / Soluciones / Sectores / Comunidad
2. **HERO + LOGOS** — una sola sección sobre `Traffic2-1.png`, sin overlay distinto
3. **BENEFICIOS** — 4 cards en fila, fondo blanco
4. **MÁS ALLÁ DEL CONTEO** — imagen real de Flame al 60% del ancho + texto + 4 bullets
5. **MÉTRICAS** — 6 cards en grid 3×2, fondo blanco con cards paper-soft
6. **CTA STRIP** — banda horizontal sutil entre métricas e industrias, fondo paper
7. **SECTORES** — 4 cards navy, "Soluciones para cualquier Industria"
8. **TESTIMONIOS** — marquee right→left auto, 60s, fondo paper
9. **FAQ** — 8 preguntas reales, 2 columnas, fondo navy, cards blancas
10. **FORMULARIO DEMO** + **FOOTER** 5 columnas

---

## Tokens de diseño (no tocar)

```css
--color-navy:        #15163a
--color-accent:      #31b1f8      /* cyan sobre fondos navy */
--color-accent-deep: #1d8bca      /* cyan sobre fondos claros */
--color-paper:       #f3f3f3
--color-paper-soft:  #f7f8fa
--color-ink:         #0f172a
--color-ink-2:       #475569
--color-ink-3:       #64748b
--color-rule:        rgb(15 23 42 / 0.08)
--color-rule-strong: rgb(15 23 42 / 0.16)

--font-display:      "Clash Grotesk Variable"   /* H1-H4 */
--font-body:         "Instrument Sans Flame"    /* todo lo demás */
```

---

## Reglas de copy

- **H2 con palabra clave en cyan accent-deep** (fondos claros) o cyan accent (fondos navy):
  - "**Beneficios** del conteo de personas" (Beneficios en cyan)
  - Más allá del conteo: inteligencia sobre tu **afluencia** (afluencia en cyan)
  - Las métricas que cambian **decisiones** (decisiones en cyan)
  - Soluciones para cualquier **Industria** (Industria en cyan accent)
  - Las mejores marcas hablan **de nosotros**
  - Preguntas **frecuentes**
- **Hero H1**: nombre directo de la solución (ej. "Conteo de personas"). SIN eyebrow encima.
- **Sub hero**: 2-3 frases descriptivas, párrafo único.
- **4 bullets** al hero con check cyan: precisión / tiendas medidas / países / "Sin biometría".
- **CTA hero**: "Solicita una demo" con flecha.
- **Beneficios** (4): título corto + 2-3 líneas. Enfoque en VALOR para el cliente.
- **Métricas** (6): qué se mide, cómo se usa.
- **Sectores** (4): Centros / Retail / Espacios públicos / Hostelería (4 fijos para casos de uso). Para páginas de SECTOR, cambiar a 4 sectores diferentes.
- **Testimonios**: 3 mínimo, 6 ideal para marquee con loop. Logos reales de cliente.
- **FAQ**: 8 preguntas. Extraer las reales del WP (`var flameFaqPages` en el HTML del clon). Las del People Counting están en `public/es/cuenta-personas/index.html`.
- **CTA strip intermedio**: copy específico de la página (ej. "Empieza a contar visitantes con precisión real. Conteo de personas operativo en 7 días.")

---

## Paddings y proporciones (valores exactos)

### Hero
```css
padding-top:    clamp(72px, 8.4vw, 116px)
padding-bottom: clamp(20px, 2.4vw, 32px)    /* ajustado, logos pegados a borde inferior */
background:     navy + url(Traffic2-1.png) center top / cover
```

### Logo strip (DENTRO del hero, sobre la foto)
```css
margin-top:        7rem  (112px)              /* separación del CTA arriba */
padding-top:       1rem  (16px)               /* dentro de la caja, tras la línea separadora */
border-top:        1px solid rgb(255 255 255 / 0.1)
label-mb:          0.75rem (12px)
logo-img-height:   80px                       /* desktop */
logo-img-height:   65px @max-width 700px
filter:            brightness(0) invert(1)   /* logos blancos */
opacity:           0.78 → 1 (hover)
marquee:           38s linear infinite, pausa en hover
mask-image:        fade en bordes izquierdo y derecho
```

### Beneficios y Métricas (cards)
```css
padding-card:      28px (p-7)
border-radius:     16px (rounded-2xl)
border:            1px solid var(--color-rule)
icon-size:         48 / 44px (benefit / metric)
icon-bg:           rgb(49 177 248 / 0.12)
title-size:        19 / 17.5px
desc-size:         15.5px
```

### CTA strip horizontal (entre métricas y sectores)
```css
padding-y:         1.75rem (py-7 ≈ 28px)
background:        var(--color-paper)
border-top/bottom: 1px solid var(--color-rule)
text-size:         clamp(19px, 1.55vw, 24px) font-weight 500
btn-style:         cta-btn--lg navy bg + white text
```

### Sectores (navy)
```css
padding-y:         96px (py-24)
card-bg:           rgb(255 255 255 / 0.04)
card-border:       1px solid rgb(255 255 255 / 0.08)
glow-radial:       cyan en esquinas superiores e inferiores opuestas
```

### Testimonios marquee
```css
card-width:        460px desktop / 320px mobile
gap:               28px / 18px mobile
animation:         marquee-x 60s linear infinite
pause-hover:       sí
mask-image:        fade en bordes
```

### FAQ
```css
background:        navy
card-bg:           white
columns:           2 (1 en mobile <900px)
gap:               16px
icon-toggle:       plus → rotate 45deg (becomes ×) en hover/open
question-size:     17px medium
answer-size:       15.5px
```

---

## Componentes reusables

### Botones (`cta-btn`)
```css
.cta-btn      → base. radius 4px (Carto), font-weight 500, Inter
.cta-btn--sm  → 14px / 10px 18px padding (header)
.cta-btn--md  → 15px / 12px 22px padding (form, strip)
.cta-btn--lg  → 16px / 14px 26px padding (hero, banner)
:hover        → filter brightness(0.94) + translateY(-1px) + box-shadow sutil
```

Combinaciones de color:
- **Navy CTA** sobre fondo paper/claro: `background: var(--color-navy); color: #fff`
- **Cyan CTA** sobre fondo navy/hero: `background: var(--color-accent); color: var(--color-navy)`

### Hovers en cards (todos siguen la MISMA curva)
```css
transition: 420ms cubic-bezier(0.22, 1, 0.36, 1)
transform:  translateY(-1px)                /* movimiento mínimo */
background: surface → paper-soft            /* claros */
            white/.04 → white/.07           /* navy */
border:     rule → rule-strong              /* claros */
            white/.08 → white/.16           /* navy */
box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08)  /* claros */
            0 8px 24px -14px rgb(0 0 0 / 0.4)      /* navy */
icon-bg:    cyan/.12 → cyan/.18             /* sin invertirse, solo más brillante */
```

NUNCA hacer:
- `transform: translateY(-4px)` o más (demasiado agresivo)
- Cambio total de color de fondo del card (rosa/verde/etc)
- `transform: scale(1.05)` del icono
- Anillo cyan grande alrededor (`0 0 0 4px`)

---

## Imágenes

### Hero
- `/wp-content/uploads/2026/01/Traffic2-1.png` (gente caminando con boxes de tracking)
- Background-position: center top
- Background-size: cover

### Logos del marquee (10 brands)
Todos en `/wp-content/uploads/2026/01/`:
- IKEA, Decathlon, Cushman-Wakefield, Telefonica, cbre-white, Santander, alain-afflelou-white-2, Westflied, Havaianas, merlin-300x147

### Logos de testimonios (clientes reales)
En `/wp-content/uploads/2023/10/`:
- logo_afflelou.jpg
- Hotels-VIVA-8.jpg
- Cash-Converters-logo-2.png
- Cushman-Wakefield-logo-2.png
- Merlin-Properties-logo-3.png
- POMPEII-BRAND.jpg
- CC-Plaza-Eboli-logo-2.png
- ilunion.png

### Imagen del "Más allá del conteo"
- People Counting: `/wp-content/uploads/2026/01/People-Counting_recorte.png`
- Cada caso de uso/sector tiene su propia (Customer Journey, Connect, etc.) — buscar en `2026/01/` o `2025/09/`

---

## Cómo crear una nueva página de caso de uso

1. **Duplicar** `app/es/cuenta-personas-draft/page.tsx` → `app/es/[slug]/page.tsx` (slug del nuevo caso)
2. **Cambiar metadata** (title, description)
3. **Cambiar H1 del hero** al nombre del caso de uso
4. **Cambiar subtitle** del hero (2-3 frases del valor)
5. **Cambiar imagen** del "Más allá del conteo" (buscar en uploads `<nombre-caso>_recorte.png`)
6. **Adaptar BENEFITS (4)**, METRICS (6), INDUSTRIES (4 si aplica)
7. **Adaptar TESTIMONIALS (3)** — los 3 más relevantes para el caso
8. **Extraer FAQ del clon WP** (`var flameFaqPages` en `public/es/<slug>/index.html`)
9. **Cambiar CTA strip copy** específico al caso ("Empieza a [verbo principal del caso]...")

NO TOCAR:
- Tokens de color
- Tamaños de fuente
- Paddings
- Hover curves
- Estructura del marquee
- Sistema de botones

---

## Replicar al inglés

Cada página de `/es/` tiene su espejo en `/en/`. Cuando se cree una página ES, crear acto seguido la EN equivalente:
- Mismo template
- Slugs EN: `traffic-insights` `customer-journey` `connect` `people-counting` `conversion-analytics` `customer-behavior` `occupancy-management` `queue-analytic` `restroom-management` `guest-wifi-marketing` `corporate-wifi-access` `solution-for-retail-sector` `solution-for-shopping-malls` `hospitality` `public-venues`
- FAQ extraída de la sub-clave `'en'` en `flameFaqPages`
- Copy en inglés, mismo design system
