import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo híbrido: páginas marketing siguen estáticas (default Next), /admin y /api son dinámicos.
  // Sin output:"export" para soportar route handlers y Supabase Auth con cookies (sistema leads).
  trailingSlash: true,
  images: { unoptimized: true },

  // Excluir uploads del tracing serverless de /admin/media — los archivos
  // pesan >300 MB y disparan el límite de tamaño de la Vercel Function.
  // Las imágenes ya están servidas desde Supabase Storage CDN (commit ad53f16),
  // por lo que el listado fs.readdir aquí queda vacío en runtime hasta que
  // se refactorice admin/media para leer del bucket de Supabase.
  outputFileTracingExcludes: {
    "/admin/media": [
      "./public/wp-content/**",
      "./public/_legacy-wp/**",
      "./public/wp-includes/**",
    ],
  },

  // Security headers globales — pentest defensivo 2026-06-05.
  // CSP NO se aplica aún (requiere report-only mode + auditoría 2-3 sem antes de enforce).
  // Los demás son seguros de aplicar directos: no afectan layout ni navegación.
  async headers() {
    return [
      // Media legacy WP (imágenes/PDFs bajo /wp-content/) — Google los tiene
      // indexados como "páginas" (29 detectados en la purga 2026-07-13).
      // noindex los saca del índice SIN dejar de servirlos: los posts antiguos
      // siguen usando estos archivos embebidos. NO bloquear, solo noindex.
      {
        source: "/wp-content/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/:path*",
        headers: [
          // Previene MIME-sniffing (browsers no adivinan tipo de fichero, usan el Content-Type)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Permite iframes solo del mismo origen (embeds /embeds/steps-en/ siguen funcionando).
          // Vercel mete por defecto pero forzamos explícito.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Manda referer completo a same-origin y solo origin a cross-origin (defensa fuga URLs).
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Deniega APIs sensibles que la web no usa (defensa frente a XSS-via-iframe).
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // HSTS ya lo mete Vercel pero lo forzamos explícito con preload + subdominios.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Cross-Origin-Opener-Policy: aísla el contexto del browser (defensa Spectre + XS-Leaks).
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          // CSP en modo report-only: NO bloquea nada, solo reporta lo que bloquearía si estuviera en enforce.
          // Permite detectar 2-3 semanas qué scripts/estilos/fonts cargan desde dónde sin afectar la web.
          // Cuando tengamos los logs limpios → convertir a "Content-Security-Policy" (sin -Report-Only) en enforce.
          //
          // Permitidos:
          //   scripts: self + Vercel Analytics + Google Tag Manager + inline (JSON-LD)
          //   styles:  self + Google Fonts + inline (cientos de style="..." en componentes)
          //   fonts:   self + Google Fonts
          //   images:  self + cualquier https (logos clientes vienen de muchos hosts)
          //   media:   self (vídeos hero)
          //   connect: self + Resend + Supabase + Vercel + GA
          //   frame:   self (iframes /embeds/*)
          //   frame-ancestors: none (no se nos puede embeber en sitios de terceros)
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-insights.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob:",
              "connect-src 'self' https://*.supabase.co https://api.resend.com https://va.vercel-scripts.com https://*.vercel-insights.com https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
              "frame-src 'self'",
              // frame-ancestors omitido a propósito: X-Frame-Options: SAMEORIGIN
              // ya bloquea embedding por terceros a nivel browser. Mantenerlo aquí
              // causaba que herramientas como PageSpeed Insights (que cargan la
              // página en su propio iframe) loggearan un error en consola, bajando
              // el score de Best Practices. La protección real sigue vigente.
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ── Rename /es/cuenta-personas/ → /es/conteo-personas/ ─────────────
      // El servicio se llama "Conteo de personas" (no "Cuenta personas"),
      // la URL ahora coincide con el label. 301 preserva el SEO histórico.
      { source: "/es/cuenta-personas",      destination: "/es/conteo-personas/", permanent: true },
      { source: "/es/cuenta-personas/",     destination: "/es/conteo-personas/", permanent: true },

      // ── Slugs ES traducidos del inglés al español (productos siguen en EN como brand) ──
      { source: "/es/customer-behavior",    destination: "/es/comportamiento-del-cliente/", permanent: true },
      { source: "/es/customer-behavior/",   destination: "/es/comportamiento-del-cliente/", permanent: true },
      { source: "/es/customer-journey",     destination: "/es/recorrido-del-cliente/",      permanent: true },
      { source: "/es/customer-journey/",    destination: "/es/recorrido-del-cliente/",      permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // SEO 301s — preservar URLs históricas WP (Google Search Console)
      // ══════════════════════════════════════════════════════════════════

      // ── Fix redirects rotos (purga índice 2026-07-13) ──────────────────
      // Las reglas genéricas /<lang>/blog/:slug → /<lang>/:slug/ mandaban
      // estos slugs de CATEGORÍA (y 3 posts no migrados) a páginas que no
      // existen en Next → cadena 308→404. Reglas específicas ANTES de las
      // genéricas (Next evalúa en orden, gana la primera que matchea).
      // Inventario: _local/_global/clientes/flame/seo/purga-indice-2026-07.csv
      { source: "/es/blog/consejos",                 destination: "/es/comunidad/",                permanent: true },
      { source: "/es/blog/retail-blog",              destination: "/es/comunidad/",                permanent: true },
      { source: "/es/casos-de-exito/retail-casos",   destination: "/es/categoria/casos-de-exito/", permanent: true },
      { source: "/en/blog/corporate",                destination: "/en/community/",                permanent: true },
      { source: "/en/blog/hospitality-blog",         destination: "/en/community/",                permanent: true },
      { source: "/en/blog/retail",                   destination: "/en/community/",                permanent: true },
      { source: "/en/blog/shopping-malls",           destination: "/en/community/",                permanent: true },
      { source: "/en/blog/tips",                     destination: "/en/community/",                permanent: true },
      { source: "/en/interviews/retail-interviews",  destination: "/en/category/interviews/",      permanent: true },
      // 3 posts EN que nunca se migraron a Next (el genérico los mandaba a 404)
      { source: "/en/blog/8-ways-retailers-can-utilize-instagram",                        destination: "/en/community/", permanent: true },
      { source: "/en/blog/flame-analytics-has-won-three-badges-in-the-g2-fall-reports",   destination: "/en/community/", permanent: true },
      { source: "/en/blog/why-digital-transformation-in-retail-is-more-important-now",    destination: "/en/community/", permanent: true },

      // ── URLs legacy con prefijo de categoría (formato WP "category-base") ──
      // El demo redirigía /<categoria>/<slug>/ y /<lang>/<categoria>/<slug>/ a /<lang>/<slug>/.
      // Cuando el demo se apague, replicamos esos 301s para no perder los enlaces externos
      // (LinkedIn, prensa, etc.) que aún apuntan al formato antiguo.
      // EJ: linkedin.com → flameanalytics.com/blog/los-trucos-... → /es/los-trucos-.../
      { source: "/blog/:slug",                       destination: "/es/comunidad/",                       permanent: true },
      { source: "/entrevistas/:slug",                destination: "/es/categoria/entrevistas/",           permanent: true },
      { source: "/casos-de-exito/:slug",             destination: "/es/categoria/casos-de-exito/",        permanent: true },
      { source: "/corporativo/:slug",                destination: "/es/comunidad/",                       permanent: true },
      { source: "/webinars-es-cat/:slug",            destination: "/es/comunidad/",                       permanent: true },
      // Redirect viejo slug categoría → nuevo
      { source: "/es/categoria/webinars-es-cat",     destination: "/es/categoria/webinars/",              permanent: true },
      { source: "/es/categoria/webinars-es-cat/",    destination: "/es/categoria/webinars/",              permanent: true },
      { source: "/eventos/:slug",                    destination: "/es/flame-eventos/",                   permanent: true },
      // Idem con prefijo /es/<cat>/<slug>/ (WPML)
      { source: "/es/blog/:slug",                    destination: "/es/:slug/",                           permanent: true },
      { source: "/es/entrevistas/:slug",             destination: "/es/:slug/",                           permanent: true },
      { source: "/es/casos-de-exito/:slug",          destination: "/es/:slug/",                           permanent: true },
      { source: "/es/corporativo/:slug",             destination: "/es/:slug/",                           permanent: true },
      { source: "/es/webinars-es-cat/:slug",         destination: "/es/:slug/",                           permanent: true },
      { source: "/es/eventos/:slug",                 destination: "/es/:slug/",                           permanent: true },
      // EN
      { source: "/en/blog/:slug",                    destination: "/en/:slug/",                           permanent: true },
      { source: "/en/interviews/:slug",              destination: "/en/:slug/",                           permanent: true },
      { source: "/en/case-studies/:slug",            destination: "/en/category/case-studies/",           permanent: true },
      { source: "/en/corporate/:slug",               destination: "/en/:slug/",                           permanent: true },
      { source: "/en/webinars/:slug",                destination: "/en/:slug/",                           permanent: true },
      { source: "/en/tips-retail/:slug",             destination: "/en/:slug/",                           permanent: true },
      { source: "/en/retail/:slug",                  destination: "/en/:slug/",                           permanent: true },
      { source: "/en/shopping-malls/:slug",          destination: "/en/:slug/",                           permanent: true },
      { source: "/en/hospitality-blog/:slug",        destination: "/en/:slug/",                           permanent: true },

      // ── Formato fecha (YYYY/MM/slug) — algunos WP los usan ──
      { source: "/es/:year(\\d{4})/:month(\\d{2})/:slug",      destination: "/es/comunidad/", permanent: true },
      { source: "/en/:year(\\d{4})/:month(\\d{2})/:slug",      destination: "/en/community/", permanent: true },
      // Fecha sin idioma (formato WP default histórico)
      { source: "/:year(\\d{4})/:month(\\d{2})/:slug",         destination: "/es/comunidad/", permanent: true },
      { source: "/:year(\\d{4})/:slug",                        destination: "/es/comunidad/", permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // Patrones legacy del WP demo (1.800+ redirects Rank Math consolidados
      // en _local/_global/clientes/flame/seo/404-analysis/). Cubren backlinks
      // que apuntan a estructuras de URL históricas (WPML "c", categorías
      // viejas, taxonomías retiradas, secciones renombradas).
      // ══════════════════════════════════════════════════════════════════
      // Formato WPML "c" (category) — el demo lo tenía como base de categorías
      { source: "/c/:path*",                                   destination: "/es/comunidad/",                       permanent: true },
      { source: "/es/c/:path*",                                destination: "/es/comunidad/",                       permanent: true },
      { source: "/en/c/:path*",                                destination: "/en/community/",                       permanent: true },

      // /category/ sin idioma (WP default cuando WPML no traduce el base)
      { source: "/category/:path*",                            destination: "/es/comunidad/",                       permanent: true },

      // /tag/ sin idioma — Next no tiene tags
      { source: "/tag/:path*",                                 destination: "/es/comunidad/",                       permanent: true },

      // Categorías retiradas con slugs largos
      { source: "/blog-de-flame-analytics/:path*",             destination: "/es/comunidad/",                       permanent: true },
      { source: "/analitica-y-marketing-para-espacios-fisicos/:path*", destination: "/es/comunidad/",               permanent: true },
      { source: "/sector-retail/:path*",                       destination: "/es/solucion-para-el-sector-retail/",  permanent: true },
      { source: "/artistas-invitados/:path*",                  destination: "/es/comunidad/",                       permanent: true },
      { source: "/noticias_flame/:path*",                      destination: "/es/comunidad/",                       permanent: true },
      { source: "/noticias/:path*",                            destination: "/es/comunidad/",                       permanent: true },
      { source: "/es/noticias/:path*",                         destination: "/es/comunidad/",                       permanent: true },
      { source: "/en/news/:path*",                             destination: "/en/community/",                       permanent: true },
      { source: "/encuestas-flame/:path*",                     destination: "/es/comunidad/",                       permanent: true },
      { source: "/en/collaborators-blog/:path*",               destination: "/en/community/",                       permanent: true },
      { source: "/en/sectors/:path*",                          destination: "/en/solution-for-retail-sector/",      permanent: true },
      // NOTA: el catch-all "/en/category/:path*" → "/en/community/" se eliminó
      // (2026-06-09) porque rompía las URLs reales del listado de categoría:
      // /en/category/case-studies/, /blog/, /webinars/, /interviews/. Esas
      // rutas existen como páginas Next y deben devolver 200, no redirect.

      // (Regla previa de /wp-content/uploads/:rest* eliminada — rompía vídeos .mp4/.webm
      // y otros assets binarios que ahora dan 200 al servirse directamente desde public/)

      // PDFs de WP que aún rankean en GSC pero ya no existen físicamente:
      // 1) Descubre-los-KPIs.pdf — 267 impr / 15 clicks / 90d → redirect al post equivalente.
      //    (2026-07-13: corregido el filename real, la regla anterior tenía el nombre
      //    truncado y nunca matcheaba; el post ya enlaza la copia de Supabase Storage)
      {
        source: "/wp-content/uploads/2021/09/Descubre-los-KPIS-que-debes-medir-en-Retail.pptx_compressed.pdf",
        destination: "/es/los-10-kpis-que-todo-centro-comercial-debe-medir/",
        permanent: true,
      },

      // ══════════════════════════════════════════════════════════════════
      // Redirects de URLs sin idioma con backlinks (SE Ranking 1.659 backlinks
      // analizados, 720 reales tras filtrar spam turco). Estas URLs viejas
      // siguen recibiendo backlinks externos de portales/blogs/LinkedIn.
      // ══════════════════════════════════════════════════════════════════
      { source: "/tecnologia/:path*",                          destination: "/es/comunidad/",                       permanent: true },
      { source: "/wifi-analytics/:path*",                      destination: "/es/connect/",                         permanent: true },
      { source: "/wifi-social/:path*",                         destination: "/es/connect/",                         permanent: true },
      { source: "/connect/:path*",                             destination: "/es/connect/",                         permanent: true },
      { source: "/caracteristicas/:path*",                     destination: "/es/sobre-nosotros/",                  permanent: true },
      { source: "/aforo/:path*",                               destination: "/es/gestion-ocupacion/",               permanent: true },
      { source: "/demographics/:path*",                        destination: "/es/comportamiento-del-cliente/",               permanent: true },
      { source: "/flame-covid/:path*",                         destination: "/es/",                                 permanent: true },
      { source: "/formulario-de-inscripcion-a-los-webinars-de-flame/",  destination: "/es/inscripcion-webinars/",   permanent: true },
      { source: "/contact",                                    destination: "/es/contacta/",                        permanent: true },
      { source: "/es/contact",                                 destination: "/es/contacta/",                        permanent: true },
      { source: "/en/campaigns/:path*",                        destination: "/en/community/",                       permanent: true },
      { source: "/en/retail-sector/:path*",                    destination: "/en/solution-for-retail-sector/",      permanent: true },
      { source: "/es/product/:path*",                          destination: "/es/sobre-nosotros/",                  permanent: true },

      // Posts borrados de WP antes de la migración (solo eran redirects en el demo).
      // Replicamos los destinos exactos que tenía Rank Math en el demo:
      // posts existentes en Next con tema afín, no genéricos a /categoria/.
      { source: "/es/pedro-reig-la-fidelidad-ha-muerto-y-hay-que-asumirlo/",                                        destination: "/es/10-consejos-para-atraer-mas-clientes-al-punto-de-venta/",            permanent: true },
      { source: "/es/manuel-amat-la-tecnologia-en-retail-genera-una-relacion-de-amor-odio/",                       destination: "/es/4-estrategias-para-retailers-casos-de-exito-y-soluciones-clave/",   permanent: true },
      { source: "/es/raul-g-serapio-el-cliente-no-es-fiel-si-quieres-fidelidad-mejor-comprate-un-perro/",          destination: "/es/10-consejos-para-atraer-mas-clientes-al-punto-de-venta/",           permanent: true },
      { source: "/es/eduardo-suarez-hoy-en-dia-no-podemos-vivir-de-espaldas-a-los-avances-tecnologicos/",          destination: "/es/",                                                                   permanent: true },
      { source: "/es/webinar-video-intelligence-tecnologia-para-el-nuevo-retail/",                                 destination: "/es/categoria/webinars/",                                                permanent: true },
      { source: "/es/webinar-la-ia-al-servicio-del-retail-descubre-el-poder-de-la-videoanalitica/",                destination: "/es/categoria/webinars/",                                                permanent: true },
      { source: "/es/ratio-de-conversion-en-retail-que-es-y-como-mejorarlo/",                                      destination: "/es/los-10-kpis-que-todo-centro-comercial-debe-medir/",                  permanent: true },

      // Posts EN borrados de WP antes de la migración.
      { source: "/en/personalization-in-marketing-creating-tailored-experiences-for-your-customers/",              destination: "/en/winning-customers-hearts-10-tips-to-improve-customer-satisfaction/", permanent: true },
      { source: "/en/innovative-strategies-leveraging-big-data-analytics-to-optimize-customer-acquisition-processes/", destination: "/en/20-kpis-for-shopping-centers-for-improvement/",                  permanent: true },
      { source: "/en/boost-your-retail-business-with-real-time-analytics-top-trends-and-strategies-for-2024/",     destination: "/en/20-kpis-for-shopping-centers-for-improvement/",                      permanent: true },
      { source: "/en/alain-afflelou-relies-on-flame-analytics-for-his-stores-in-spain/",                           destination: "/en/",                                                                   permanent: true },
      { source: "/en/how-to-collect-customer-data-the-right-way-in-retail-sector/",                                destination: "/en/20-kpis-for-shopping-centers-for-improvement/",                      permanent: true },
      { source: "/en/the-future-of-shopping-centers-adapting-to-changing-consumer-behaviors-and-technological-advancements/", destination: "/en/the-future-of-shopping-malls-experience-sustainability-and-data/", permanent: true },
      { source: "/en/we-support-our-customers-and-community/",                                                     destination: "/en/",                                                                   permanent: true },
      { source: "/en/the-role-of-artificial-intelligence-in-retail-analytics-should-workers-worry-about-ai/",      destination: "/en/the-power-of-ai-in-shopping-centers/",                              permanent: true },

      // /es/category/<slug>/ (WP standard) → /es/categoria/<slug>/ (Next)
      // El WP demo servía /category/ en ES; Next usa /categoria/. Sin esto Google ve 404.
      { source: "/es/category/:slug",                destination: "/es/categoria/:slug/",                permanent: true },
      { source: "/es/category/:slug/page/:page",     destination: "/es/categoria/:slug/page/:page/",     permanent: true },

      // /es/tag/<slug>/ → comunidad (Next no tiene tags; mandamos al hub)
      { source: "/es/tag/:slug",                     destination: "/es/comunidad/",                      permanent: true },
      { source: "/en/tag/:slug",                     destination: "/en/community/",                      permanent: true },

      // /es/comunidad/<sub>/  → /es/categoria/<slug>/
      // (subrutas que existieron brevemente y luego eliminé; Google puede haberlas cacheado)
      { source: "/es/comunidad/blog/",               destination: "/es/categoria/blog/",                 permanent: true },
      { source: "/es/comunidad/casos-de-exito/",     destination: "/es/categoria/casos-de-exito/",       permanent: true },
      { source: "/es/comunidad/webinars/",           destination: "/es/categoria/webinars/",             permanent: true },
      { source: "/es/comunidad/entrevistas/",        destination: "/es/categoria/entrevistas/",          permanent: true },
      { source: "/es/comunidad/whitepapers/",        destination: "/es/comunidad/",                      permanent: true },
      // EN equivalentes
      { source: "/en/community/blog/",               destination: "/en/category/blog/",                  permanent: true },
      { source: "/en/community/case-studies/",       destination: "/en/category/case-studies/",          permanent: true },
      { source: "/en/community/webinars/",           destination: "/en/category/webinars/",              permanent: true },
      { source: "/en/community/interviews/",         destination: "/en/category/interviews/",            permanent: true },
      { source: "/en/community/whitepapers/",        destination: "/en/community/",                      permanent: true },

      // ── Páginas "Conoce al equipo" — integradas en /sobre-nosotros y /about-us ──

      // ── Hub de whitepapers (no existe en Next, va al hub comunidad/community) ──
      { source: "/es/whitepaper/", destination: "/es/comunidad/", permanent: true },
      { source: "/en/whitepaper/", destination: "/en/community/", permanent: true },

      // ── 24 whitepapers ES que sólo existen en WPML como traducciones EN: redirigir al hub ──
      { source: "/es/whitepaper/10-trucos-para-hacer-ofertas-y-vender-mas/",                                       destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/6-consejos-para-potenciar-la-reputacion-de-tu-restaurante/",                       destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/8-consejos-para-impulsar-la-afluencia-en-un-centro-comercial/",                    destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/casos-de-uso-de-marketing-digital-basado-en-proximidad-para-tu-cc/",               destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/como-debo-colocar-los-productos-para-vender-mas/",                                 destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/como-medir-la-experiencia-de-compra-7-metricas-para-lograrlo/",                    destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/conoce-a-tus-clientes-y-optimiza-la-gestion-de-tu-centro-comercial/",              destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/cuenta-personas-para-centros-comerciales/",                                        destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/de-contar-personas-al-data-intelligence-en-espacios-fisicos/",                     destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/descubre-como-enviar-campanas-relevantes-con-flame-analytics/",                    destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/descubre-como-ser-un-hotel-inteligente-y-personalizar-la-experiencia-del-cliente/", destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/descubre-las-5-campanas-de-marketing-mas-exitosas-en-centros-comerciales/",        destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/descubre-las-7-claves-para-ser-un-hotel-inteligente/",                             destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/el-mall-del-futuro/",                                                              destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/el-merchandising-de-gestion/",                                                     destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/la-gestion-del-espacio-para-el-comercio-tradicional/",                             destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/la-transformacion-digital/",                                                       destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/las-10-claves-para-vender-mas-en-black-friday/",                                   destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/los-10-kpis-que-debes-medir-en-retail/",                                           destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/los-10-kpis-que-todo-centro-comercial-debe-medir/",                                destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/midiendo-la-experiencia-del-cliente/",                                             destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/modelo-tecnologico-para-ser-un-hotel-relevante/",                                  destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/vender-mejor-sin-vender-tu-vida/",                                                 destination: "/es/comunidad/", permanent: true },
      { source: "/es/whitepaper/video-intelligence-la-tecnologia-del-nuevo-retail/",                               destination: "/es/comunidad/", permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // 25 whitepapers — URL plana legacy WP → /<lang>/whitepaper/<slug>/
      // Estas URLs daban 404 post-cutover. Algunas con tráfico significativo:
      // - /en/what-to-look-for-in-your-best-shopping-mall/  → 58 clicks/200d, pos 3.1
      // - /en/how-to-drive-sales-in-shopping-malls-effective-tactics-for-success/  → 48 clicks/200d
      // - /es/los-trucos-de-los-supermercados-zonas-frias-y-zonas-calientes/  → 30 clicks/200d, pos 5.4
      // - /en/10-tips-to-improve-customer-satisfaction/  → mencionada en GSC
      // ══════════════════════════════════════════════════════════════════
      { source: "/en/leveraging-ai-powered-video-analytics-for-retail",                                 destination: "/en/whitepaper/leveraging-ai-powered-video-analytics-for-retail/",                                 permanent: true },
      { source: "/en/the-10-essential-kpis-for-retail-performance",                                     destination: "/en/whitepaper/the-10-essential-kpis-for-retail-performance/",                                     permanent: true },
      { source: "/en/10-lessons-for-a-successful-digital-transformation-in-retail",                    destination: "/en/whitepaper/10-lessons-for-a-successful-digital-transformation-in-retail/",                    permanent: true },
      { source: "/en/driving-foot-traffic-7-effective-marketing-strategies-for-shopping-centers",      destination: "/en/whitepaper/driving-foot-traffic-7-effective-marketing-strategies-for-shopping-centers/",      permanent: true },
      { source: "/en/5-keys-to-enhance-the-shopping-experience-in-your-center",                        destination: "/en/whitepaper/5-keys-to-enhance-the-shopping-experience-in-your-center/",                        permanent: true },
      { source: "/en/shop-in-shop-in-retail-what-is-this-and-why-it-matters",                          destination: "/en/whitepaper/shop-in-shop-in-retail-what-is-this-and-why-it-matters/",                          permanent: true },
      { source: "/en/how-to-boost-mall-revenues-through-advanced-analytics",                           destination: "/en/whitepaper/how-to-boost-mall-revenues-through-advanced-analytics/",                           permanent: true },
      { source: "/en/the-10-kpis-that-every-shopping-center-should-measure",                           destination: "/en/whitepaper/the-10-kpis-that-every-shopping-center-should-measure/",                           permanent: true },
      { source: "/en/the-5-most-successful-marketing-campaigns-of-2021-in-shopping-centers",           destination: "/en/whitepaper/the-5-most-successful-marketing-campaigns-of-2021-in-shopping-centers/",           permanent: true },
      { source: "/en/challenges-and-trends-of-shopping-centers-in-2023",                               destination: "/en/whitepaper/challenges-and-trends-of-shopping-centers-in-2023/",                               permanent: true },
      { source: "/en/7-video-analytics-use-cases-for-retail-and-shopping-centers",                     destination: "/en/whitepaper/7-video-analytics-use-cases-for-retail-and-shopping-centers/",                     permanent: true },
      { source: "/en/how-should-i-place-the-products-to-sell-more",                                    destination: "/en/whitepaper/how-should-i-place-the-products-to-sell-more/",                                    permanent: true },
      { source: "/en/10-tricks-to-make-offers-and-sell-more",                                          destination: "/en/whitepaper/10-tricks-to-make-offers-and-sell-more/",                                          permanent: true },
      { source: "/en/what-to-look-for-in-your-best-shopping-mall",                                     destination: "/en/whitepaper/what-to-look-for-in-your-best-shopping-mall/",                                     permanent: true },
      { source: "/en/supermarket-tricks-hot-and-cold-zones",                                           destination: "/en/whitepaper/supermarket-tricks-hot-and-cold-zones/",                                           permanent: true },
      { source: "/en/10-tips-to-improve-customer-satisfaction",                                        destination: "/en/whitepaper/10-tips-to-improve-customer-satisfaction/",                                        permanent: true },
      { source: "/en/how-to-drive-sales-in-shopping-malls-effective-tactics-for-success",              destination: "/en/whitepaper/how-to-drive-sales-in-shopping-malls-effective-tactics-for-success/",              permanent: true },
      { source: "/en/the-future-of-shopping-centers-adapting-to-changing-consumer-preferences",        destination: "/en/whitepaper/the-future-of-shopping-centers-adapting-to-changing-consumer-preferences/",        permanent: true },
      { source: "/es/la-ia-al-servicio-del-retail-descubre-el-poder-del-video-analytics",              destination: "/es/whitepaper/la-ia-al-servicio-del-retail-descubre-el-poder-del-video-analytics/",              permanent: true },
      { source: "/es/videoanalitica-con-inteligencia-artificial-para-centros-comerciales",             destination: "/es/whitepaper/videoanalitica-con-inteligencia-artificial-para-centros-comerciales/",             permanent: true },
      { source: "/es/guia-definitiva-para-retailers-preparando-la-campana-navidena-con-analitica-avanzada", destination: "/es/whitepaper/guia-definitiva-para-retailers-preparando-la-campana-navidena-con-analitica-avanzada/", permanent: true },
      { source: "/es/la-transformacion-de-centros-comerciales-con-datos-inteligentes",                 destination: "/es/whitepaper/la-transformacion-de-centros-comerciales-con-datos-inteligentes/",                 permanent: true },
      { source: "/es/10-lecciones-para-una-transformacion-digital-exitosa-en-retail",                  destination: "/es/whitepaper/10-lecciones-para-una-transformacion-digital-exitosa-en-retail/",                  permanent: true },
      { source: "/es/5-claves-para-impulsar-la-experiencia-de-compra-en-tu-centro-comercial",          destination: "/es/whitepaper/5-claves-para-impulsar-la-experiencia-de-compra-en-tu-centro-comercial/",          permanent: true },
      { source: "/es/los-trucos-de-los-supermercados-zonas-frias-y-zonas-calientes",                   destination: "/es/whitepaper/los-trucos-de-los-supermercados-zonas-frias-y-zonas-calientes/",                   permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // URLs legacy WP que daban 404
      // ══════════════════════════════════════════════════════════════════
      { source: "/es/blog",            destination: "/es/comunidad/",                      permanent: true },
      { source: "/en/blog",            destination: "/en/community/",                      permanent: true },
      { source: "/es/casos-de-exito",  destination: "/es/categoria/casos-de-exito/",       permanent: true },
      { source: "/en/case-studies",    destination: "/en/category/case-studies/",          permanent: true },
      { source: "/es/clienting",       destination: "/es/comunidad/",                      permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // Patrones WP que devolvían 404: feed, paginación, autor, about sin lang
      // ══════════════════════════════════════════════════════════════════
      // Feed RSS antiguo (Google/agregadores aún los pegan)
      { source: "/feed",                            destination: "/es/comunidad/",       permanent: true },
      { source: "/feed/:rest*",                     destination: "/es/comunidad/",       permanent: true },
      { source: "/es/feed",                         destination: "/es/comunidad/",       permanent: true },
      { source: "/es/feed/:rest*",                  destination: "/es/comunidad/",       permanent: true },
      { source: "/en/feed",                         destination: "/en/community/",       permanent: true },
      { source: "/en/feed/:rest*",                  destination: "/en/community/",       permanent: true },
      { source: "/comments/feed",                   destination: "/es/comunidad/",       permanent: true },
      { source: "/comments/feed/:rest*",            destination: "/es/comunidad/",       permanent: true },

      // Paginación WP /page/N/
      { source: "/page/:n",                         destination: "/es/comunidad/",       permanent: true },
      { source: "/page/:n/:rest*",                  destination: "/es/comunidad/",       permanent: true },
      { source: "/es/page/:n",                      destination: "/es/comunidad/",       permanent: true },
      { source: "/es/page/:n/:rest*",               destination: "/es/comunidad/",       permanent: true },
      { source: "/en/page/:n",                      destination: "/en/community/",       permanent: true },
      { source: "/en/page/:n/:rest*",               destination: "/en/community/",       permanent: true },

      // Author archive WP
      { source: "/author/:slug",                    destination: "/es/sobre-nosotros/",  permanent: true },
      { source: "/author/:slug/:rest*",             destination: "/es/sobre-nosotros/",  permanent: true },
      { source: "/es/author/:slug",                 destination: "/es/sobre-nosotros/",  permanent: true },
      { source: "/en/author/:slug",                 destination: "/en/about-us/",        permanent: true },

      // About-us sin prefijo de idioma
      { source: "/sobre-nosotros",                  destination: "/es/sobre-nosotros/",  permanent: true },
      { source: "/sobre-nosotros/:rest*",           destination: "/es/sobre-nosotros/",  permanent: true },
      { source: "/about-us",                        destination: "/en/about-us/",        permanent: true },
      { source: "/about-us/:rest*",                 destination: "/en/about-us/",        permanent: true },

      // ?p=<id> y ?page_id=<id> de WP — Google los descubre por sitemap viejo
      { source: "/", has: [{ type: "query", key: "p"      }], destination: "/es/",        permanent: true },
      { source: "/", has: [{ type: "query", key: "page_id" }], destination: "/es/",       permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // URLs WP cuyo snapshot HTML estático en public/ se borró el 09-jun
      // 2026 (causaban canonical="index.html"). Las redirigimos al equivalente
      // Next o al hub más cercano para no dejar 404s con tráfico residual.
      // ══════════════════════════════════════════════════════════════════
      // Compliance / legal — pendiente recrear página Next propia (Ley 2/2023).
      // Mientras tanto, redirect a la política de seguridad de la información.
      { source: "/es/sistema-interno-de-informacion",            destination: "/es/politica-de-seguridad-de-la-informacion/", permanent: true },
      { source: "/es/sistema-interno-de-informacion/:rest*",     destination: "/es/politica-de-seguridad-de-la-informacion/", permanent: true },
      // Programa Kit Consulting — sin equivalente directo. Redirect a contacto.
      { source: "/es/kit-consulting",                            destination: "/es/contacta/",                       permanent: true },
      { source: "/es/kit-consulting/:rest*",                     destination: "/es/contacta/",                       permanent: true },
      // Opt-out MAC tracking — privacidad.
      { source: "/es/opt-out-mac",                               destination: "/es/politica-de-privacidad/",         permanent: true },
      { source: "/es/opt-out-mac/:rest*",                        destination: "/es/politica-de-privacidad/",         permanent: true },
      // Comunidad / eventos
      { source: "/es/flame-community",                           destination: "/es/comunidad/",                      permanent: true },
      { source: "/es/flame-eventos-gracias",                     destination: "/es/flame-eventos/",                  permanent: true },
      { source: "/es/formulario-de-inscripcion-a-los-webinars-de-flame", destination: "/es/inscripcion-webinars/",   permanent: true },
      // Páginas "gracias" residuales → hub de gracias
      { source: "/es/gracias-old",                               destination: "/es/gracias/",                        permanent: true },
      { source: "/es/gracias-partner",                           destination: "/es/gracias/",                        permanent: true },
      { source: "/es/gracias-solicitud-video",                   destination: "/es/gracias/",                        permanent: true },
      { source: "/es/gracias-whitepaper",                        destination: "/es/gracias/",                        permanent: true },
      // EN: páginas borradas sin equivalente directo → community / contact-us
      { source: "/en/queue-analytics-2",                         destination: "/en/queue-analytic/",                 permanent: true },
      { source: "/en/thank-you-2",                               destination: "/en/thank-you-contact/",              permanent: true },
      { source: "/en/webinars",                                  destination: "/en/community/",                      permanent: true },
      { source: "/en/event-registration",                        destination: "/en/community/",                      permanent: true },
      { source: "/en/encuesta-flame-talks-2026",                 destination: "/en/community/",                      permanent: true },
      { source: "/en/flame-named-finalist-in-the-2023-mapic-awards-for-best-retail-innovation-solution", destination: "/en/community/", permanent: true },
      { source: "/en/flame-talks-2025-transforming-shopping-centers-innovation-data-experience-and-sustainability", destination: "/en/community/", permanent: true },
      { source: "/en/flame-webinar-registration",                destination: "/en/community/",                      permanent: true },
      { source: "/en/flame-webinar-the-10-kpis-that-every-shopping-center-should-measure", destination: "/en/community/", permanent: true },
      { source: "/en/intelligent-video-analytics-solution-for-retail", destination: "/en/solution-for-retail-sector/", permanent: true },
      { source: "/en/join-our-webinar-advanced-retail-solutions-moving-beyond-security", destination: "/en/community/", permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // Bloque adicional 2026-06-16 — 404s detectados en GSC (~450)
      // Cubre patrones legacy WP, slugs draft, snapshots y casos raros.
      // 141 nuevas reglas (sin duplicar las existentes).
      // ══════════════════════════════════════════════════════════════════
      { source: "/news/:path*",                                                destination: "/en/community/",  permanent: true },
      { source: "/news",                                                       destination: "/en/community/",  permanent: true },
      { source: "/press/:path*",                                               destination: "/en/community/",  permanent: true },
      { source: "/press",                                                      destination: "/en/community/",  permanent: true },
      { source: "/prensa/:path*",                                              destination: "/es/comunidad/",  permanent: true },
      { source: "/prensa",                                                     destination: "/es/comunidad/",  permanent: true },
      { source: "/proximos-webinars/:path*",                                   destination: "/es/comunidad/",  permanent: true },
      { source: "/proximos-webinars",                                          destination: "/es/comunidad/",  permanent: true },
      { source: "/webinars/:path*",                                            destination: "/es/comunidad/",  permanent: true },
      { source: "/webinars",                                                   destination: "/es/comunidad/",  permanent: true },
      { source: "/encuestas-flame",                                            destination: "/es/comunidad/",  permanent: true },
      { source: "/eventos-flame/:path*",                                       destination: "/es/flame-eventos/",  permanent: true },
      { source: "/eventos-flame",                                              destination: "/es/flame-eventos/",  permanent: true },
      { source: "/fr/:path*",                                                  destination: "/es/",  permanent: true },
      { source: "/fr",                                                         destination: "/es/",  permanent: true },
      { source: "/de/:path*",                                                  destination: "/es/",  permanent: true },
      { source: "/de",                                                         destination: "/es/",  permanent: true },
      { source: "/kullanim-kosullari/:path*",                                  destination: "/es/condiciones-de-uso/",  permanent: true },
      { source: "/kullanim-kosullari",                                         destination: "/es/condiciones-de-uso/",  permanent: true },
      { source: "/cerez-politikasi/:path*",                                    destination: "/es/politica-de-cookies/",  permanent: true },
      { source: "/cerez-politikasi",                                           destination: "/es/politica-de-cookies/",  permanent: true },
      { source: "/yardim/:path*",                                              destination: "/es/",  permanent: true },
      { source: "/yardim",                                                     destination: "/es/",  permanent: true },
      { source: "/poker",                                                      destination: "/es/",  permanent: true },
      { source: "/poker/:path*",                                               destination: "/es/",  permanent: true },
      { source: "/insights",                                                   destination: "/es/analitica-trafico/",  permanent: true },
      { source: "/download",                                                   destination: "/es/comunidad/",  permanent: true },
      { source: "/flame-analytics-solucion-para-hoteles",                      destination: "/es/hoteles/",  permanent: true },
      { source: "/flame-analytics-home-3",                                     destination: "/es/",  permanent: true },
      { source: "/flame-heatmap-client",                                       destination: "/es/",  permanent: true },
      { source: "/solution-for-museums",                                       destination: "/en/public-venues/",  permanent: true },
      { source: "/cuenta-personas-2",                                          destination: "/es/conteo-personas/",  permanent: true },
      { source: "/flame-channel-partners-program",                             destination: "/es/partners/",  permanent: true },
      { source: "/descargar-whitepaper-6",                                     destination: "/es/comunidad/",  permanent: true },
      { source: "/formulario-de-inscripcion-a-los-essentials-de-flame",        destination: "/es/inscripcion-en-eventos/",  permanent: true },
      { source: "/formulario-de-inscripcion-al-webinar-flame",                 destination: "/es/inscripcion-webinars/",  permanent: true },
      { source: "/es/:slug/index.html",                                        destination: "/es/:slug/",  permanent: true },
      { source: "/en/:slug/index.html",                                        destination: "/en/:slug/",  permanent: true },
      { source: "/es/traffic-insights",                                        destination: "/es/analitica-trafico/",  permanent: true },
      { source: "/es/celebrando-un-ano-increible-en-flame-analytics",          destination: "/es/comunidad/",  permanent: true },
      { source: "/es/conectar",                                                destination: "/es/connect/",  permanent: true },
      { source: "/es/viaje-del-cliente",                                       destination: "/es/recorrido-del-cliente/",  permanent: true },
      { source: "/es/angela-reina-",                                           destination: "/es/comunidad/",  permanent: true },
      { source: "/es/socios",                                                  destination: "/es/partners/",  permanent: true },
      { source: "/es/es-blog-analitica-video-cctv-inteligencia-negocio",       destination: "/es/analitica-de-video-cctv-inteligencia-negocio/",  permanent: true },
      { source: "/es/celebrando-un-ano-increible-en-flame-analytics-ð",        destination: "/es/comunidad/",  permanent: true },
      { source: "/en/pompeii-confia-en-la-analitica-retail-de-flame-analytics", destination: "/en/community/",  permanent: true },
      { source: "/en/location",                                                destination: "/en/people-counting/",  permanent: true },
      { source: "/en/occupancy",                                               destination: "/en/occupancy-management/",  permanent: true },
      { source: "/en/location-analytics",                                      destination: "/en/people-counting/",  permanent: true },
      { source: "/en/4-estrategias-para-retailers-casos-de-exito-y-soluciones-clave", destination: "/es/4-estrategias-para-retailers-casos-de-exito-y-soluciones-clave/",  permanent: true },
      { source: "/en/10-consejos-para-atraer-mas-clientes-al-punto-de-venta",  destination: "/es/10-consejos-para-atraer-mas-clientes-al-punto-de-venta/",  permanent: true },
      { source: "/en/cuenta-personas-2",                                       destination: "/en/people-counting/",  permanent: true },
      { source: "/en/privacy-2",                                               destination: "/en/privacy-policy/",  permanent: true },
      { source: "/en/contact",                                                 destination: "/en/contact-us/",  permanent: true },
      { source: "/en/interviews/retail-interviews",                            destination: "/en/category/interviews/",  permanent: true },
      { source: "/en/case-studies/:rest*",                                     destination: "/en/category/case-studies/",  permanent: true },
      { source: "/en/sectors/:rest*",                                          destination: "/en/solution-for-retail-sector/",  permanent: true },
      { source: "/en/blog/:rest*",                                             destination: "/en/community/",  permanent: true },
      { source: "/en/news/:rest*",                                             destination: "/en/community/",  permanent: true },
      { source: "/en/events/:rest*",                                           destination: "/en/community/",  permanent: true },
      { source: "/en/collaborators-blog/:rest*",                               destination: "/en/community/",  permanent: true },
      { source: "/2014",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2015",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2016",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2017",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2018",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2019",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2020",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2021",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2022",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2023",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2024",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2025",                                                                  destination: "/es/comunidad/",  permanent: true },
      { source: "/2014/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2014/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2014/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2014/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/2015/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2015/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2015/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2015/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/2016/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2016/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2016/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2016/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/2017/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2017/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2017/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2017/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/2018/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2018/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2018/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2018/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/2019/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2019/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2019/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2019/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/2020/:m",                                                    destination: "/es/comunidad/",  permanent: true },
      { source: "/2020/:m/:rest*",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2020/:m",                                               destination: "/es/comunidad/",  permanent: true },
      { source: "/blog/2020/:m/:rest*",                                        destination: "/es/comunidad/",  permanent: true },
      { source: "/es/10-tendencias-innovadoras-retail-2014",                   destination: "/es/comunidad/",  permanent: true },
      { source: "/es/7-cosas-que-puedes-y-debes-medir-en-retail",              destination: "/es/comunidad/",  permanent: true },
      { source: "/es/80-espanoles-prefiere-comprar-establecimientos-programas-fidelizacion", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/alberto-cordoba-la-oferta-es-tan-brutal-que-si-no-nos-diferenciamos-sera-imposible-enamorar-al-cliente", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/asun-ferro-el-pequeno-comercio-aun-no-mide-los-resultados-de-las-acciones-que-implanta", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/big-data-en-la-automocion-medir-y-mejorar-en-una-red-de-concesionarios", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/celestino-martinez-el-cliente-no-es-infiel-por-naturaleza-sino-que-siempre-trata-de-encontrar-el-maximo-valor", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/celestino-martinez-y-jonathan-solis-hablan-del-papel-de-la-tecnologia-en-la-evolucion-del-retail", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/como-hacer-crecer-tus-ventas-consejos-que-muchas-veces-olvidamos", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/como-se-consigue-la-omnicanalidad-en-retail",             destination: "/es/comunidad/",  permanent: true },
      { source: "/es/dahua-technology-nuevo-partner-de-video-analytics-de-flame", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/descubre-las-ventajas-del-wifi-marketing-en-hoteles",     destination: "/es/comunidad/",  permanent: true },
      { source: "/es/el-trafico-en-los-puntos-de-venta-cae-un-40-en-agosto",   destination: "/es/comunidad/",  permanent: true },
      { source: "/es/entender-al-consumidor-y-adaptarse-principales-retos-del-retail-en-el-futuro", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/eriberto-pavon-bermejo-el-dato-mas-importante-para-una-tienda-es-el-trafico-sin-clientes-que-entren-nada-mas-funciona", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-analytics-actor-relevante-en-el-sector-del-geomarketing", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-analytics-colabora-en-el-libro-100-ideas-para-el-retail-de-la-era-digital-de-marcos-alvarez", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-en-el-programa-emprende",                           destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-en-la-revista-dealermarket",                        destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-en-questionpro-analiticas-para-mejorar-la-experiencia-del-cliente-mas-alla-del-retail", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-estara-en-el-vi-foro-internacionales-sector-tic-organizado-por-asturex", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-habla-sobre-big-data-en-profesional-retail",        destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-retail-analytics-las-cuatro-patas-de-una-mesa",     destination: "/es/comunidad/",  permanent: true },
      { source: "/es/flame-se-va-a-silicon-valley-para-participar-en-el-tech-match", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/futuro_del_retail",                                       destination: "/es/comunidad/",  permanent: true },
      { source: "/es/la-ubicacion-de-tu-tienda-un-factor-primordial",          destination: "/es/comunidad/",  permanent: true },
      { source: "/es/los-expertos-en-retail-esperan-que-el-2022-sea-el-ano-de-la-reactivacion-economica-y-comercial", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/los-expertos-le-piden-al-2019",                           destination: "/es/comunidad/",  permanent: true },
      { source: "/es/manana-webinar-flame-analitica-para-retail-store-analytics", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/movilidad-y-omnichannel-dos-claves-en-el-retail",         destination: "/es/comunidad/",  permanent: true },
      { source: "/es/proximo-webinar-flame-analitica-big-data-y-engagement-marketing-avanzado-para-centros-comerciales", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/proyecto-spaces-sentiment-analysis-3s-ai",                destination: "/es/comunidad/",  permanent: true },
      { source: "/es/retail-companies-increase-hiring-25-spain-2013",          destination: "/es/comunidad/",  permanent: true },
      { source: "/es/shopper-funnel-tus-clientes-llegan-hasta-el-final",       destination: "/es/comunidad/",  permanent: true },
      { source: "/es/smart-restroom-management-optimizando-recursos-en-espacios-fisicos", destination: "/es/comunidad/",  permanent: true },
      { source: "/es/tecnologias-novedosas-para-los-restaurantes",             destination: "/es/comunidad/",  permanent: true },
      { source: "/es/video-flame",                                             destination: "/es/comunidad/",  permanent: true },
      { source: "/en/5-effective-tips-to-take-your-retail-business-global-in-2021", destination: "/en/community/",  permanent: true },
      { source: "/en/5-problems-retailers-must-fix-2014",                      destination: "/en/community/",  permanent: true },
      { source: "/en/5-ways-employee-training-and-engagement-in-retail-will-change", destination: "/en/community/",  permanent: true },
      { source: "/en/7-tips-to-create-a-customer-loyalty-program-for-a-shopping-mall", destination: "/en/community/",  permanent: true },
      { source: "/en/adapt-die-new-trends-omnichannel-retailing-comming",      destination: "/en/community/",  permanent: true },
      { source: "/en/flame-analytics-shines-at-dahua-partner-day-2023-in-ibiza-driving-innovation-in-retail-solutions", destination: "/en/community/",  permanent: true },
      { source: "/en/flame-y-su-solucion-de-wifi-marketing-en-la-cadena-hotelera-bb-hotels", destination: "/en/community/",  permanent: true },
      { source: "/en/free-tapa-spending-time-bar",                             destination: "/en/community/",  permanent: true },
      { source: "/en/hotel-marketing-increasingly-personalized-thanks-technology", destination: "/en/community/",  permanent: true },
      { source: "/en/how-technology-is-transforming-in-retail",                destination: "/en/community/",  permanent: true },
      { source: "/en/how-to-use-customer-behaviour-intelligence-in-a-retail-business", destination: "/en/community/",  permanent: true },
      { source: "/en/how-to-use-key-metrics-to-track-digital-marketing-success-of-retail-brands", destination: "/en/community/",  permanent: true },
      { source: "/en/retail-staff-training-tips-to-improve-customer-service-sales", destination: "/en/community/",  permanent: true },
      { source: "/en/webinar-transport-analytics-understanding-passenger-behaviour", destination: "/en/community/",  permanent: true },

      // ══════════════════════════════════════════════════════════════════
      // Fixes auditoría SE Ranking 2026-07-13 (aplicados 2026-07-16)
      // ══════════════════════════════════════════════════════════════════
      // Slugs de fichero de trabajo "es-blog-*/en-blog-*" que se colaron como
      // URLs (enlaces internos + un slug real ya renombrado). 301 al post real.
      { source: "/es/es-blog-cuenta-personas-retail-guia-completa",                   destination: "/es/cuenta-personas-retail-guia-completa/",                       permanent: true },
      { source: "/en/en-blog-cctv-analytics-turn-existing-cameras-business-intelligence", destination: "/en/cctv-analytics-turn-existing-cameras-business-intelligence/", permanent: true },
      { source: "/en/en-blog-people-counting-systems-complete-guide",                 destination: "/en/people-counting-systems-complete-guide/",                     permanent: true },
      // El post del CMS tenía el slug malformado: renombrado en Supabase el 2026-07-16.
      { source: "/en/en-blog-conversion-analytics-retail-measure-optimize",           destination: "/en/conversion-analytics-retail-measure-optimize/",               permanent: true },
      // Casos de éxito retirados (draft, sin equivalente vivo) → hub de casos de éxito
      { source: "/es/estepark-analitica-y-marketing-a-medida-de-sus-clientes",        destination: "/es/categoria/casos-de-exito/",  permanent: true },
      { source: "/es/optimizacion-de-experiencia-y-estrategia-de-marketing-en-abc-serrano", destination: "/es/categoria/casos-de-exito/", permanent: true },
      { source: "/en/optimizing-experience-and-marketing-strategy-at-abc-serrano",    destination: "/en/category/case-studies/",     permanent: true },
      // Producto legacy "Engage" (WP) → página de producto equivalente (marketing WiFi)
      { source: "/engage",            destination: "/es/marketing-wifi-para-invitados/", permanent: true },
      { source: "/engage/:rest*",     destination: "/es/marketing-wifi-para-invitados/", permanent: true },
      { source: "/es/engage",         destination: "/es/marketing-wifi-para-invitados/", permanent: true },
      { source: "/en/engage",         destination: "/en/guest-wifi-marketing/",          permanent: true },
      // Slug de categoría con idioma mezclado (categoria ES + case-studies EN)
      { source: "/en/categoria/case-studies", destination: "/en/category/case-studies/", permanent: true },

      // (raíz "/" → /es/ o /en/ según Accept-Language: ver middleware.ts)
    ];
  },
};

export default nextConfig;
