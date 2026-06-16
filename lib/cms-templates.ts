// Plantillas prefilled para el editor /admin/posts/new?template=<id>.
// Editores pueden crear desde cero o partir de un esqueleto editorial canónico.

export type CmsTemplate = {
  id: string;
  label_es: string;
  label_en: string;
  description_es: string;
  description_en: string;
  category_slug: string;
  title_es: string;
  title_en: string;
  excerpt_es: string;
  excerpt_en: string;
  html_es: string;
  html_en: string;
};

export const CMS_TEMPLATES: CmsTemplate[] = [
  {
    id: "case-study",
    label_es: "Caso de éxito (cliente)",
    label_en: "Case study (client)",
    description_es: "Estructura canónica de caso de éxito: contexto + objetivo + métricas + cierre",
    description_en: "Canonical case study layout: context + objective + metrics + close",
    category_slug: "casos-de-exito",
    title_es: "[Cliente] confía en Flame Analytics para [solución] en sus [tiendas/centros]",
    title_en: "[Client] relies on Flame Analytics for [solution] across their [stores/malls]",
    excerpt_es: "[Cliente] implementa la solución de [conteo de personas / heatmaps / ...] de Flame Analytics para medir [...] y mejorar [...].",
    excerpt_en: "[Client] deploys Flame Analytics' [people counting / heatmaps / ...] to measure [...] and improve [...].",
    html_es: `<p>[Cliente], [una breve descripción del cliente: sector, presencia, escala], ha confiado en <a href="/es/">Flame Analytics</a> para implementar una <a href="/es/conteo-personas/">solución de [solución]</a> en sus [tiendas / centros / espacios]. El objetivo: [una frase con el objetivo claro y medible].</p>

<p>[Frase de contexto del sector que conecta con el porqué del proyecto].</p>

<h2>El reto de [cliente]</h2>

<p>[Describe la situación inicial. Qué medían antes, qué no podían medir, qué decisiones querían tomar con datos].</p>

<p>Los puntos críticos eran:</p>

<ul>
<li>[Punto 1: por ej. saber el tráfico real por hora y tienda].</li>
<li>[Punto 2: comparar rendimiento entre ubicaciones].</li>
<li>[Punto 3: anticipar picos para dimensionar plantilla].</li>
<li>[Punto 4: otros].</li>
</ul>

<h2>La solución de Flame Analytics</h2>

<p>[Describe qué se ha implementado: sensores, módulo SaaS, integraciones con sus sistemas, despliegue, etc. Sin tecnicismos: el lector es el equipo del cliente].</p>

<p>La plataforma de Flame ofrece a [cliente]:</p>

<ul>
<li>[Beneficio 1].</li>
<li>[Beneficio 2].</li>
<li>[Beneficio 3].</li>
</ul>

<h2>Resultados y métricas clave</h2>

<p>[Si tienes números reales, ponlos aquí. Si no, descríbelo en términos cualitativos: visibilidad, frecuencia de revisión, ahorro de tiempo].</p>

<blockquote>"[Cita corta de alguien de [cliente]. Si todavía no tienes la cita, deja este bloque en borrador]."</blockquote>

<h2>Conclusión</h2>

<p>[Cierre que conecta de nuevo con el sector y deja la puerta abierta. Una o dos frases sobre cómo el people counting / analítica visual cambia la gestión y por qué [cliente] es un buen ejemplo].</p>`,
    html_en: `<p>[Client], [short description: industry, footprint, scale], relies on <a href="/en/">Flame Analytics</a> to deploy a <a href="/en/people-counting/">[solution]</a> across their [stores / malls / venues]. The goal: [one clear, measurable objective].</p>

<p>[Industry context sentence connecting to the rationale of the project].</p>

<h2>The challenge for [client]</h2>

<p>[Describe the starting point. What they measured before, what they couldn't, what decisions they wanted to back with data].</p>

<p>Critical pain points:</p>

<ul>
<li>[Point 1: e.g. real-time traffic per hour and venue].</li>
<li>[Point 2: cross-location performance benchmarking].</li>
<li>[Point 3: anticipating peaks to staff properly].</li>
<li>[Point 4: others].</li>
</ul>

<h2>The Flame Analytics solution</h2>

<p>[What was rolled out: sensors, SaaS modules, integrations, deployment. No jargon: the reader is the client's own team].</p>

<p>Flame's platform delivers:</p>

<ul>
<li>[Benefit 1].</li>
<li>[Benefit 2].</li>
<li>[Benefit 3].</li>
</ul>

<h2>Key results and metrics</h2>

<p>[If you have hard numbers, put them here. If not, describe qualitatively: visibility, review cadence, time saved].</p>

<blockquote>"[Short quote from someone at [client]. If you don't have it yet, leave this as a draft block]."</blockquote>

<h2>Wrap-up</h2>

<p>[Closing that reconnects with the industry and leaves the door open. One or two sentences on how people counting / visual analytics changes operations and why [client] is a good example].</p>`,
  },
  {
    id: "tips",
    label_es: "Consejos retail",
    label_en: "Retail tips",
    description_es: "Lista de consejos prácticos para retailers: introducción + 5-8 puntos + cierre",
    description_en: "Actionable tips for retailers: intro + 5-8 bullets + close",
    category_slug: "tips-retail",
    title_es: "[N] claves para [objetivo] en [tipo de espacio]",
    title_en: "[N] keys to [objective] in [type of space]",
    excerpt_es: "Resumen práctico con [N] claves para [objetivo] en [tipo de espacio]. Basado en datos reales de retailers.",
    excerpt_en: "Practical guide with [N] keys to [objective] in [type of space]. Backed by real retailer data.",
    html_es: `<p>[Lead: 2-3 frases que sitúan al lector y prometen valor. Qué va a aprender y por qué le interesa.]</p>

<p>En este artículo te contamos [N] claves probadas para [objetivo].</p>

<h2>1. [Clave 1: título corto y accionable]</h2>

<p>[Desarrollo de la clave. Por qué importa, cómo se aplica, qué herramienta de Flame te ayuda].</p>

<h2>2. [Clave 2]</h2>

<p>[Desarrollo].</p>

<h2>3. [Clave 3]</h2>

<p>[Desarrollo].</p>

<h2>4. [Clave 4]</h2>

<p>[Desarrollo].</p>

<h2>5. [Clave 5]</h2>

<p>[Desarrollo].</p>

<h2>Conclusión</h2>

<p>[Cierre. Resume las claves más importantes y conecta con la conversión natural del post].</p>`,
    html_en: `<p>[Lead: 2-3 sentences that frame the reader and promise value. What they'll learn and why it matters.]</p>

<p>Here are [N] proven keys to [objective].</p>

<h2>1. [Key 1: short, actionable title]</h2>

<p>[Develop the point. Why it matters, how to apply it, which Flame tool helps].</p>

<h2>2. [Key 2]</h2>

<p>[Develop].</p>

<h2>3. [Key 3]</h2>

<p>[Develop].</p>

<h2>4. [Key 4]</h2>

<p>[Develop].</p>

<h2>5. [Key 5]</h2>

<p>[Develop].</p>

<h2>Wrap-up</h2>

<p>[Close. Summarise the top keys and bridge naturally to the post CTA].</p>`,
  },
  {
    id: "interview",
    label_es: "Entrevista",
    label_en: "Interview",
    description_es: "Entrevista a un cliente o experto: intro + Q&A + cierre",
    description_en: "Client or expert interview: intro + Q&A + close",
    category_slug: "entrevistas",
    title_es: "[Nombre]: «[Cita corta y potente que resume la entrevista]»",
    title_en: "[Name]: «[Short, powerful quote summarising the interview]»",
    excerpt_es: "Conversamos con [Nombre], [cargo en empresa], sobre [tema central de la entrevista].",
    excerpt_en: "We talked with [Name], [role at company], about [central topic].",
    html_es: `<p>[Párrafo de presentación: quién es la persona entrevistada, por qué es relevante, contexto del encuentro].</p>

<h2>[Pregunta 1: temática contextual / introductoria]</h2>

<p>[Respuesta del entrevistado].</p>

<h2>[Pregunta 2: profundización en su rol o proyecto]</h2>

<p>[Respuesta].</p>

<blockquote>"[Cita destacada extraída de las respuestas]."</blockquote>

<h2>[Pregunta 3: visión de futuro / tendencias]</h2>

<p>[Respuesta].</p>

<h2>[Pregunta 4: aprendizajes / consejos]</h2>

<p>[Respuesta].</p>

<p>[Cierre: agradecimiento y conexión con el contenido relacionado de Flame].</p>`,
    html_en: `<p>[Intro paragraph: who is the interviewee, why are they relevant, context of the meeting].</p>

<h2>[Question 1: context / opener]</h2>

<p>[Answer].</p>

<h2>[Question 2: deep-dive into their role or project]</h2>

<p>[Answer].</p>

<blockquote>"[Highlighted quote from one of the answers]."</blockquote>

<h2>[Question 3: outlook / trends]</h2>

<p>[Answer].</p>

<h2>[Question 4: lessons / advice]</h2>

<p>[Answer].</p>

<p>[Close: thanks and bridge to related Flame content].</p>`,
  },
];

export function getTemplate(id: string): CmsTemplate | null {
  return CMS_TEMPLATES.find(t => t.id === id) || null;
}
