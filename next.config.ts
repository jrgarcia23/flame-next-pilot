import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo híbrido: páginas marketing siguen estáticas (default Next), /admin y /api son dinámicos.
  // Sin output:"export" para soportar route handlers y Supabase Auth con cookies (sistema leads).
  trailingSlash: true,
  images: { unoptimized: true },

  async redirects() {
    return [
      // ══════════════════════════════════════════════════════════════════
      // SEO 301s — preservar URLs históricas WP (Google Search Console)
      // ══════════════════════════════════════════════════════════════════

      // ── URLs legacy con prefijo de categoría (formato WP "category-base") ──
      // El demo redirigía /<categoria>/<slug>/ y /<lang>/<categoria>/<slug>/ a /<lang>/<slug>/.
      // Cuando el demo se apague, replicamos esos 301s para no perder los enlaces externos
      // (LinkedIn, prensa, etc.) que aún apuntan al formato antiguo.
      // EJ: linkedin.com → flameanalytics.com/blog/los-trucos-... → /es/los-trucos-.../
      { source: "/blog/:slug",                       destination: "/es/:slug/",                           permanent: true },
      { source: "/entrevistas/:slug",                destination: "/es/:slug/",                           permanent: true },
      { source: "/casos-de-exito/:slug",             destination: "/es/:slug/",                           permanent: true },
      { source: "/corporativo/:slug",                destination: "/es/:slug/",                           permanent: true },
      { source: "/webinars-es-cat/:slug",            destination: "/es/:slug/",                           permanent: true },
      { source: "/eventos/:slug",                    destination: "/es/:slug/",                           permanent: true },
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
      { source: "/en/case-studies/:slug",            destination: "/en/:slug/",                           permanent: true },
      { source: "/en/corporate/:slug",               destination: "/en/:slug/",                           permanent: true },
      { source: "/en/webinars/:slug",                destination: "/en/:slug/",                           permanent: true },
      { source: "/en/tips-retail/:slug",             destination: "/en/:slug/",                           permanent: true },
      { source: "/en/retail/:slug",                  destination: "/en/:slug/",                           permanent: true },
      { source: "/en/shopping-malls/:slug",          destination: "/en/:slug/",                           permanent: true },
      { source: "/en/hospitality-blog/:slug",        destination: "/en/:slug/",                           permanent: true },

      // ── Formato fecha (YYYY/MM/slug) — algunos WP los usan ──
      { source: "/es/:year(\\d{4})/:month(\\d{2})/:slug",      destination: "/es/:slug/", permanent: true },
      { source: "/en/:year(\\d{4})/:month(\\d{2})/:slug",      destination: "/en/:slug/", permanent: true },
      // Fecha sin idioma (formato WP default histórico)
      { source: "/:year(\\d{4})/:month(\\d{2})/:slug",         destination: "/es/:slug/", permanent: true },
      { source: "/:year(\\d{4})/:slug",                        destination: "/es/:slug/", permanent: true },

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
      { source: "/en/category/:path*",                         destination: "/en/community/",                       permanent: true },

      // /wp-content/uploads paths sueltos sin extensión (raros, sin contenido)
      { source: "/wp-content/uploads/:rest*",                  destination: "/es/comunidad/",                       permanent: false, has: [{ type: "header", key: "accept", value: "(?!.*image).*" }] },

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
      { source: "/demographics/:path*",                        destination: "/es/customer-behavior/",               permanent: true },
      { source: "/flame-covid/:path*",                         destination: "/es/",                                 permanent: true },
      { source: "/formulario-de-inscripcion-a-los-webinars-de-flame/",  destination: "/es/inscripcion-webinars/",   permanent: true },
      { source: "/contact",                                    destination: "/es/contacta/",                        permanent: true },
      { source: "/es/contact",                                 destination: "/es/contacta/",                        permanent: true },
      { source: "/en/campaigns/:path*",                        destination: "/en/community/",                       permanent: true },
      { source: "/en/retail-sector/:path*",                    destination: "/en/solution-for-retail-sector/",      permanent: true },
      { source: "/es/product/:path*",                          destination: "/es/sobre-nosotros/",                  permanent: true },

      // Posts ES que estaban indexados/backlinkeados y NO migraron (slug original).
      // En vez de 404 → comunidad (mejor para SEO + UX que perder).
      { source: "/es/pedro-reig-la-fidelidad-ha-muerto-y-hay-que-asumirlo/",                                        destination: "/es/categoria/entrevistas/",  permanent: true },
      { source: "/es/manuel-amat-la-tecnologia-en-retail-genera-una-relacion-de-amor-odio/",                       destination: "/es/categoria/entrevistas/",  permanent: true },
      { source: "/es/raul-g-serapio-el-cliente-no-es-fiel-si-quieres-fidelidad-mejor-comprate-un-perro/",          destination: "/es/categoria/entrevistas/",  permanent: true },
      { source: "/es/eduardo-suarez-hoy-en-dia-no-podemos-vivir-de-espaldas-a-los-avances-tecnologicos/",          destination: "/es/categoria/entrevistas/",  permanent: true },
      { source: "/es/webinar-video-intelligence-tecnologia-para-el-nuevo-retail/",                                 destination: "/es/categoria/webinars-es-cat/", permanent: true },
      { source: "/es/webinar-la-ia-al-servicio-del-retail-descubre-el-poder-de-la-videoanalitica/",                destination: "/es/categoria/webinars-es-cat/", permanent: true },
      { source: "/es/ratio-de-conversion-en-retail-que-es-y-como-mejorarlo/",                                      destination: "/es/categoria/blog/",         permanent: true },

      // Posts EN que estaban indexados/backlinkeados y NO migraron.
      { source: "/en/personalization-in-marketing-creating-tailored-experiences-for-your-customers/",              destination: "/en/category/blog/",          permanent: true },
      { source: "/en/innovative-strategies-leveraging-big-data-analytics-to-optimize-customer-acquisition-processes/", destination: "/en/category/blog/",      permanent: true },
      { source: "/en/boost-your-retail-business-with-real-time-analytics-top-trends-and-strategies-for-2024/",     destination: "/en/category/blog/",          permanent: true },
      { source: "/en/alain-afflelou-relies-on-flame-analytics-for-his-stores-in-spain/",                           destination: "/en/category/case-studies/",  permanent: true },
      { source: "/en/how-to-collect-customer-data-the-right-way-in-retail-sector/",                                destination: "/en/category/blog/",          permanent: true },
      { source: "/en/the-future-of-shopping-centers-adapting-to-changing-consumer-behaviors-and-technological-advancements/", destination: "/en/the-future-of-shopping-malls-experience-sustainability-and-data/", permanent: true },
      { source: "/en/we-support-our-customers-and-community/",                                                     destination: "/en/community/",              permanent: true },
      { source: "/en/the-role-of-artificial-intelligence-in-retail-analytics-should-workers-worry-about-ai/",      destination: "/en/category/blog/",          permanent: true },

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
      { source: "/es/comunidad/webinars/",           destination: "/es/categoria/webinars-es-cat/",      permanent: true },
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

      // (raíz "/" → /es/ o /en/ según Accept-Language: ver middleware.ts)
    ];
  },
};

export default nextConfig;
