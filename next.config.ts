import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo híbrido: páginas marketing siguen estáticas (default Next), /admin y /api son dinámicos.
  // Sin output:"export" para soportar route handlers y Supabase Auth con cookies (sistema leads).
  trailingSlash: true,
  images: { unoptimized: true },

  async redirects() {
    return [
      // ── Páginas "Conoce al equipo" — integradas en /sobre-nosotros y /about-us ──
      { source: "/es/sobre-nosotros/conoce-al-equipo/", destination: "/es/sobre-nosotros/", permanent: true },
      { source: "/en/about-us/meet-the-team/",          destination: "/en/about-us/",      permanent: true },

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
