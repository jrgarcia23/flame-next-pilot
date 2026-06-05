# STASH · Hero chat animado en /es/analitica-conversion/

**Estado**: Desactivado el 2026-06-05 a petición de JR.
**Motivo**: JR quiere que la página de conversión muestre la imagen de fondo
estándar del hero (como el resto de páginas interiores), no el chat animado.
**Reactivable**: Sí — todo el código sigue intacto en el repo.

---

## Cómo restaurar (cuando JR lo pida)

1. Abrir `app/es/analitica-conversion/page.tsx`
2. Cambiar `heroChat: false,` (línea ~39) por `heroChat: true,`
3. Commit + push

Eso es todo. El componente `<FlameDataChat />` y los estilos `.uc-hero-grid` /
`.uc-hero-chat` en `UseCaseTemplate.tsx` siguen vivos. El sistema reconoce el
flag y vuelve a renderizar el chat a la derecha del hero en dos columnas.

## Activación opcional en otra página

Si en algún momento se quiere activar en otra página de `UseCaseTemplate`
(p. ej. cuenta-personas, customer-journey), basta con añadir `heroChat: true`
en la config de esa página. El componente está pensado para reutilizarse.

## Archivos involucrados (NO BORRAR)

- `components/FlameDataChat.tsx` — el componente del chat autoanimado
- `components/templates/UseCaseTemplate.tsx` — renderiza el chat si `heroChat`
  es true. Define `.uc-hero-grid` (grid 1fr 420px) y `.uc-hero-chat` (flex
  end). Colapsa a 1 col en <980px.
- `lib/page-content.ts:206` — declara `heroChat?: boolean` en el tipo
  `UseCaseConfig`.

## Comportamiento que dejó de verse

El chat reproducía un script de mensajes auto-animados (usuario → bot)
mostrando KPIs reales de Flame (tasa de conversión, funnel por zonas,
dwell time). Estilo similar a auravision.ai. Reproducción en loop al
entrar en viewport.
