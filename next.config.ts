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

      // (raíz "/" → /es/ o /en/ según Accept-Language: ver middleware.ts)
    ];
  },
};

export default nextConfig;
