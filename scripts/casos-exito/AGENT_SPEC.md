# Spec para autoría de "content JSON" de casos de éxito de Flame Analytics

Tu tarea: convertir el texto de un caso de éxito (extraído de un .docx de JR) en dos
ficheros JSON de contenido (ES y EN) que alimentan un renderizador determinista.
NO generas HTML. Solo el JSON de contenido narrativo. Un compañero inyecta después
slug, imágenes y tarjetas relacionadas.

## Fuente de verdad y reglas duras (CRÍTICO)

1. **Fidelidad absoluta a la fuente.** Usa SOLO texto presente en el .docx. NUNCA
   inventes cifras, nombres, cargos, citas, fechas ni resultados. Si el docx no da un
   dato, no lo pongas. Flame es analítica retail (NO agencia de marketing): nunca
   hables de "marketing digital" como servicio de Flame.
2. **No "aforo".** Flame no mide aforo legal. Si el docx dijera "aforo", usa
   "ocupación". (Los docx nuevos ya usan "ocupación".)
3. **Sin guiones largos (—) que YO introduzca** como conector de frase. Si el docx
   los trae en una frase de cliente, puedes conservarlos; pero no añadas nuevos: usa
   comas, paréntesis o dos puntos. Los "·" (punto medio) sí se usan (fechas, roles).
4. **UTF-8 correcto**: tildes y ñ bien escritas.
5. **Escapa `&` como `&amp;`** en cualquier texto (ej. "B&amp;B Hotels",
   "Retail &amp; Property Management").
6. **EN = traducción fiel del contenido ES**, tono profesional B2B, sin inventar.
7. Salida: SOLO JSON válido (sin comentarios, sin markdown, sin texto extra).

## Estructura del docx → JSON

El docx trae secciones: HERO (Etiqueta, Título, Subtítulo, Marca, Dato destacado),
CITA DESTACADA, EL CASO (2-3 párrafos), 01 · EL RETO, 02 · LA SOLUCIÓN,
(IMAGEN INTERMEDIA — **IGNORAR**, JR pidió solo hero sin panel),
03 · EN MARCHA / TIENDAS OPERATIVAS / etc., EL PROYECTO EN CIFRAS (4 datos),
SOLUCIONES UTILIZADAS / LAS CAPACIDADES DE FLAME (3-5 items).

Mapea así (mira `content/cbre.es.json` y `content/cbre.en.json` como ejemplo EXACTO):

```
{
  "eyebrow": "<Etiqueta del docx, p.ej. 'Caso de éxito · Centros comerciales'>",   // EN: "Case study · <sector en inglés>"
  "h1": "<Título del docx>",
  "sub": "<Subtítulo del docx>",
  "badge": { "client": "<nombre cliente>", "date": "<mes año de la línea Marca, p.ej. 'Julio 2026'; EN traducido 'July 2026'; si el docx no da mes, usa 'Julio 2026'/'July 2026'>", "readTime": "4 min de lectura" },  // EN: "4 min read"
  "quote": { "text": "<cita SIN comillas exteriores>", "author": "<nombre o equipo antes del ·>", "role": "<lo que va tras el ·, p.ej. cargo · empresa>" },
  "elCaso": [ "<párrafo 1 (será el destacado)>", "<párrafo 2>", "<párrafo 3>" ],   // los párrafos de EL CASO
  "blocks": [
    { "id": "reto", "num": "01", "eyebrow": "El reto",     "h2": "<h2 del reto>",     "body": [ ... ] },   // EN eyebrow "The challenge"
    { "id": "solucion", "num": "02", "eyebrow": "La solución", "h2": "<h2 solución>", "body": [ ... ] },   // EN "The solution"
    { "id": "resultados", "num": "03", "eyebrow": "En marcha", "h2": "<h2 del bloque 03>", "body": [ ... ] } // EN "In progress" (o traducción del epígrafe real)
  ],
  "cifrasTitle": "<subtítulo de EL PROYECTO EN CIFRAS>",
  "cifras": [ { "value": "<dato corto: número/porcentaje/palabra clave>", "label": "<etiqueta corta 2-3 palabras>", "desc": "<frase del docx>" }, ...(normalmente 4) ],
  "solTitle": "<subtítulo de SOLUCIONES UTILIZADAS>",
  "soluciones": [ { "icon": "<clave icono>", "h3": "<nombre capacidad>", "p": "<descripción>" }, ...(3-5) ]
}
```

### `body` de cada bloque: lista de items en orden. Tipos:
- `{ "p": "texto..." }`  párrafo
- `{ "h3": "subtítulo" }`  subtítulo dentro del bloque (para el 2º epígrafe de un bloque)
- `{ "list": ["item", "item", ...] }`  lista con checks (para las preguntas/objetivos)
- `{ "quote": "frase destacada" }`  cita en línea (la frase-resumen que cierra un bloque)

### `cifras` (4 tarjetas): el docx las da como "VALOR · Etiqueta: Descripción".
- `value` = la parte corta y potente (un número "6", "+80", "100%", "0"; o palabra
  "Fase 1", "Tiempo real"/"Real-time", "360°", "BI", "1st-party"). Máx ~10 caracteres.
- `label` = la etiqueta (2-3 palabras).
- `desc` = la frase descriptiva.

### `soluciones`: iconos permitidos (elige el más afín):
`trend` (tráfico/ventas), `users` (audiencia/demografía), `grid` (multi-sitio/BI),
`chart` (analítica/campañas), `target` (fidelización/conversión), `repeat`
(recurrencia/fidelidad), `clock` (permanencia/tiempo), `eye` (visión/monitorización),
`route` (recorrido/customer journey), `map` (ubicación/zonas), `building` (edificio/activo),
`wifi` (wifi/conectividad), `shield` (privacidad/RGPD/seguridad), `layers` (integración/datos),
`calendar` (histórico/planificación), `bag` (compra/retail).

## Enlazado interno SEO (2-3 por caso, en párrafos de elCaso/blocks, SOLO estas URLs)

Teje 2-3 enlaces relevantes al sector/capacidad, con anchor natural. NO enlaces la
misma URL dos veces. NO inventes URLs. Lista permitida:

ES: /es/solucion-para-el-sector-retail/ · /es/solucion-para-centros-comerciales/ ·
/es/hoteles/ · /es/espacios-publicos/ · /es/transporte-y-aeropuertos/ · /es/banca/ ·
/es/supermercados/ · /es/conteo-personas/ · /es/analitica-trafico/ · /es/gestion-ocupacion/ ·
/es/recorrido-del-cliente/ · /es/comportamiento-del-cliente/ · /es/analitica-conversion/ ·
/es/connect/ · /es/marketing-wifi-para-invitados/ · /es/acceso-wifi-corporativo/ · /es/hypersensor/

EN (misma posición): /en/solution-for-retail-sector/ · /en/solution-for-shopping-malls/ ·
/en/hospitality/ · /en/public-venues/ · /en/transport-and-airports/ · /en/banking/ ·
/en/supermarkets/ · /en/people-counting/ · /en/traffic-insights/ · /en/occupancy-management/ ·
/en/customer-journey/ · /en/customer-behavior/ · /en/conversion-analytics/ · /en/connect/ ·
/en/guest-wifi-marketing/ · /en/corporate-wifi-access/ · /en/hypersensor/

Formato del enlace dentro del string JSON:
`"... una de las principales compañías del <a href=\"/es/solucion-para-centros-comerciales/\">centros comerciales</a> ..."`
(usa las comillas escapadas `\"`). El anchor debe caer en ES sobre el término ES y en
EN sobre el término EN equivalente, en la misma posición aproximada.

## Salida

Escribe DOS ficheros con la herramienta Write:
- `scripts/casos-exito/content/<caseid>.es.json`
- `scripts/casos-exito/content/<caseid>.en.json`

(rutas relativas al repo flame-next). `<caseid>` te lo indica el encargo.
Valida mentalmente que el JSON parsea (comas, comillas). No incluyas nada más.
