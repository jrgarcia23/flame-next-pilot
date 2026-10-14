// Cabeceras alternas azul/blanco del listado del blog (JR, 14-oct-2026).
// Solo cambian la MINIATURA de los listados (/es/categoria/blog/, /en/category/blog/,
// bloque Blog de comunidad y relacionados). NO tocan "hero": og:image y la cabecera del
// propio post siguen igual, así no se rompen og:image cacheadas.
// Plantilla y textos: _local/_global/clientes/flame/disenos/blog-covers-2026-10/alternancia/ (repo esconzeta-mc).
// Regla: en el orden del listado, impar = azul, par = blanca (empieza en azul).
// OJO: cada post nuevo que entra arriba desplaza la paridad del resto.

const BASE = "/wp-content/uploads/2026/10/alternas/";

// clave: `<lang>/<slug>` -> fichero
const COVER_OVERRIDES: Record<string, string> = {
  "en/the-5-retail-blind-spots-that-data-can-reveal": "en-the-5-retail-blind-spots-that-data-can-reveal-blanca.webp", // #4 BLANCA
  "en/from-data-to-decisions-how-data-driven-retail-builds-smarter-stores": "en-from-data-to-decisions-how-data-driven-retail-bu-azul.webp", // #5 AZUL
  "en/conversion-analytics-retail-measure-optimize": "en-conversion-analytics-retail-measure-optimize-blanca.webp", // #8 BLANCA
  "en/gdpr-video-analytics-compliance-guide-shopping-malls": "en-gdpr-video-analytics-compliance-guide-shopping-m-azul.webp", // #9 AZUL
  "en/smart-restroom-management-optimizing-resources-in-physical-spaces": "en-smart-restroom-management-optimizing-resources-i-blanca.webp", // #12 BLANCA
  "en/how-video-analytics-is-revolutionizing-the-retail-experience": "en-how-video-analytics-is-revolutionizing-the-retai-azul.webp", // #13 AZUL
  "en/benchmarking-performance-kpis-shopping-center": "en-benchmarking-performance-kpis-shopping-center-blanca.webp", // #14 BLANCA
  "en/ai-powered-personalization-for-shopping-malls": "en-ai-powered-personalization-for-shopping-malls-azul.webp", // #15 AZUL
  "en/privacy-by-design-buiding-trust-through-transparent-data-practices": "en-privacy-by-design-buiding-trust-through-transpar-blanca.webp", // #16 BLANCA
  "en/flame-traffic-the-future-of-foot-traffic-analytics": "en-flame-traffic-the-future-of-foot-traffic-analyti-azul.webp", // #17 AZUL
  "en/the-benefits-of-measuring-foot-traffic-in-shops-and-malls": "en-the-benefits-of-measuring-foot-traffic-in-shops-blanca.webp", // #18 BLANCA
  "en/the-future-of-retail-is-real-time-how-data-is-powering-smarter-stores": "en-the-future-of-retail-is-real-time-how-data-is-po-azul.webp", // #19 AZUL
  "en/how-shopping-malls-are-reinventing-themselves-through-data-and-experience": "en-how-shopping-malls-are-reinventing-themselves-th-blanca.webp", // #20 BLANCA
  "en/the-ethics-of-ai-surveillance-in-commercial-spaces": "en-the-ethics-of-ai-surveillance-in-commercial-spac-azul.webp", // #21 AZUL
  "en/from-cameras-to-insights-leveraging-computer-vision-in-malls": "en-from-cameras-to-insights-leveraging-computer-vis-blanca.webp", // #22 BLANCA
  "en/7-ways-to-grow-your-retail-business-and-take-things-to-the-next-level": "en-7-ways-to-grow-your-retail-business-and-take-thi-azul.webp", // #23 AZUL
  "en/ai-ar-a-must-in-customer-experience-for-retail-sector": "en-ai-ar-a-must-in-customer-experience-for-retail-s-blanca.webp", // #24 BLANCA
  "en/brick-and-mortar-marketing-5-tactics-you-should-always-apply-to-your-strategy": "en-brick-and-mortar-marketing-5-tactics-you-should-azul.webp", // #25 AZUL
  "en/3-customer-retention-strategies-for-a-small-business": "en-3-customer-retention-strategies-for-a-small-busi-blanca.webp", // #26 BLANCA
  "en/the-future-of-shopping-malls-experience-sustainability-and-data": "en-the-future-of-shopping-malls-experience-sustaina-azul.webp", // #27 AZUL
  "en/5-ways-video-analytics-is-transforming-retail-stores": "en-5-ways-video-analytics-is-transforming-retail-st-blanca.webp", // #28 BLANCA
  "en/comparing-shopping-mall-footfall-how-to-know-if-your-data-is-good": "en-comparing-shopping-mall-footfall-how-to-know-if-azul.webp", // #29 AZUL
  "en/how-shopping-malls-can-attract-and-retain-generation-z": "en-how-shopping-malls-can-attract-and-retain-genera-blanca.webp", // #30 BLANCA
  "en/the-importance-of-analytics-in-the-physical-world": "en-the-importance-of-analytics-in-the-physical-worl-azul.webp", // #31 AZUL
  "en/2024-retail-innovations-how-technology-is-revolutionizing-the-shopping-experience": "en-2024-retail-innovations-how-technology-is-revolu-blanca.webp", // #32 BLANCA
  "en/retail-trends-to-watch-in-2025": "en-retail-trends-to-watch-in-2025-azul.webp", // #33 AZUL
  "en/holiday-campaigns-using-advanced-analytics": "en-holiday-campaigns-using-advanced-analytics-blanca.webp", // #34 BLANCA
  "en/from-people-counting-to-data-intelligence": "en-from-people-counting-to-data-intelligence-azul.webp", // #35 AZUL
  "en/20-kpis-for-shopping-centers-for-improvement": "en-20-kpis-for-shopping-centers-for-improvement-blanca.webp", // #36 BLANCA
  "en/the-power-of-ai-in-shopping-centers": "en-the-power-of-ai-in-shopping-centers-azul.webp", // #37 AZUL
  "en/effective-marketing-campaigns-in-malls-using-location-based-marketing": "en-effective-marketing-campaigns-in-malls-using-loc-blanca.webp", // #38 BLANCA
  "en/7-tools-every-marketer-should-use-to-automate-workflows": "en-7-tools-every-marketer-should-use-to-automate-wo-azul.webp", // #39 AZUL
  "en/data-analytics-for-shopping-centers": "en-data-analytics-for-shopping-centers-blanca.webp", // #40 BLANCA
  "en/people-counting-shopping-center": "en-people-counting-shopping-center-azul.webp", // #41 AZUL
  "en/retailment-the-future-of-shopping": "en-retailment-the-future-of-shopping-blanca.webp", // #42 BLANCA
  "en/the-role-of-technology-in-customer-loyalty-management-in-malls": "en-the-role-of-technology-in-customer-loyalty-manag-azul.webp", // #43 AZUL
  "en/future-of-retail-analytics-how-analytics-can-help-physical-stores-thrive": "en-future-of-retail-analytics-how-analytics-can-hel-blanca.webp", // #44 BLANCA
  "en/top-10-shopping-mall-innovation-features-transforming-experiences": "en-top-10-shopping-mall-innovation-features-transfo-azul.webp", // #45 AZUL
  "en/shopper-tracking-insights-unveiling-the-science-of-retail-analytics": "en-shopper-tracking-insights-unveiling-the-science-blanca.webp", // #46 BLANCA
  "en/measuring-the-roi-of-personalization-in-retail-metrics-and-strategies": "en-measuring-the-roi-of-personalization-in-retail-m-azul.webp", // #47 AZUL
  "en/ar-in-retail-bridging-the-gap-between-online-and-offline-shopping": "en-ar-in-retail-bridging-the-gap-between-online-and-blanca.webp", // #48 BLANCA
  "en/6-smart-hotel-technology-trends-whats-next-in-hospitality-innovation": "en-6-smart-hotel-technology-trends-whats-next-in-ho-azul.webp", // #49 AZUL
  "en/technologys-impact-on-in-store-communication-strategies": "en-technologys-impact-on-in-store-communication-str-blanca.webp", // #50 BLANCA
  "en/gathering-insights-best-practices-in-data-collection-methods": "en-gathering-insights-best-practices-in-data-collec-azul.webp", // #51 AZUL
  "en/expanding-your-retail-empire-when-to-open-a-second-location-and-how-to-do-it-right": "en-expanding-your-retail-empire-when-to-open-a-seco-blanca.webp", // #52 BLANCA
  "en/increasing-customer-engagement-the-power-of-guest-wifi-marketing": "en-increasing-customer-engagement-the-power-of-gues-azul.webp", // #53 AZUL
  "en/customer-data-collection-in-shopping-malls": "en-customer-data-collection-in-shopping-malls-blanca.webp", // #54 BLANCA
  "en/challenges-and-trends-for-shopping-centers-in-2024": "en-challenges-and-trends-for-shopping-centers-in-20-azul.webp", // #55 AZUL
  "en/how-big-data-and-ai-are-changing-the-game-for-marketing-in-hospitality-industry": "en-how-big-data-and-ai-are-changing-the-game-for-ma-blanca.webp", // #56 BLANCA
  "en/4-ways-to-combine-physical-and-digital-retail-strategies-for-a-seamless-brick-and-click-operation": "en-4-ways-to-combine-physical-and-digital-retail-st-azul.webp", // #57 AZUL
  "en/the-latest-innovations-to-be-introduced-in-shopping-malls-in-2024": "en-the-latest-innovations-to-be-introduced-in-shopp-blanca.webp", // #58 BLANCA
  "en/marketing-strategies-to-improve-store-sales-during-christmas": "en-marketing-strategies-to-improve-store-sales-duri-azul.webp", // #59 AZUL
  "en/retail-point-of-sale-software-the-cornerstone-of-in-store-analytics": "en-retail-point-of-sale-software-the-cornerstone-of-blanca.webp", // #60 BLANCA
  "es/jon-mielgo-cmo-de-alain-afflelou-el-futuro-del-retail-no-sera-elegir-entre-tecnologia-o-personas": "es-jon-mielgo-cmo-de-alain-afflelou-el-futuro-del-r-azul.webp", // #1 AZUL
  "es/la-innovacion-que-realmente-funciona-es-la-que-suma-a-la-experiencia-del-cliente-y-facilita-el-traba": "es-la-innovacion-que-realmente-funciona-es-la-que-s-blanca.webp", // #2 BLANCA
  "es/flame-talks-2026-del-dato-al-agente-de-ia-para-crecer-juntos": "es-flame-talks-2026-del-dato-al-agente-de-ia-para-c-azul.webp", // #7 AZUL
  "es/mejor-sistema-conteo-personas-2026-comparativa": "es-mejor-sistema-conteo-personas-2026-comparativa-blanca.webp", // #8 BLANCA
  "es/gestion-red-tiendas-visibilidad-cadena-retail": "es-gestion-red-tiendas-visibilidad-cadena-retail-azul.webp", // #9 AZUL
  "es/flame-talks-2026-4a-edicion-centros-comerciales-y-retail-del-dato-al-agente-de-ia-para-crecer-juntos": "es-flame-talks-2026-4a-edicion-centros-comerciales-blanca.webp", // #10 BLANCA
  "es/inteligencia-artificial-retail-analitica-tienda-fisica": "es-inteligencia-artificial-retail-analitica-tienda-azul.webp", // #11 AZUL
  "es/campanas-marketing-centros-comerciales": "es-campanas-marketing-centros-comerciales-blanca.webp", // #12 BLANCA
  "es/rgpd-video-analitica-compliance-centros-comerciales": "es-rgpd-video-analitica-compliance-centros-comercia-azul.webp", // #13 AZUL
  "es/flame-analytics-vuelve-a-retail-forum-2026-innovacion-y-videonalitica-para-transformar-el-retail": "es-flame-analytics-vuelve-a-retail-forum-2026-innov-blanca.webp", // #16 BLANCA
  "es/flame-implanta-su-solucion-de-wifi-marketing-en-la-cadena-hotelera-bb-hotels": "es-flame-implanta-su-solucion-de-wifi-marketing-en-azul.webp", // #17 AZUL
  "es/queue-analytics-eficiencia-y-satisfaccion-en-el-sector-retail": "es-queue-analytics-eficiencia-y-satisfaccion-en-el-blanca.webp", // #18 BLANCA
  "es/flame-analytics-regresa-a-nrf-2026-en-nueva-york": "es-flame-analytics-regresa-a-nrf-2026-en-nueva-york-azul.webp", // #19 AZUL
  "es/black-friday-2025-impulsa-ventas-con-datos-y-analitica-avanzada": "es-black-friday-2025-impulsa-ventas-con-datos-y-ana-blanca.webp", // #20 BLANCA
  "es/flame-analytics-mapic-2025-vuelta-al-mayor-evento-internacional-retail-y-centroscomerciales": "es-flame-analytics-mapic-2025-vuelta-al-mayor-event-azul.webp", // #21 AZUL
  "es/gestion_inteligente_para_centros_comerciales_eficiencia_operativa_y_optimizacion_de_recursos_en_tiempo_real": "es-gestioninteligenteparacentroscomercialeseficienc-blanca.webp", // #22 BLANCA
  "es/4-estrategias-para-retailers-casos-de-exito-y-soluciones-clave": "es-4-estrategias-para-retailers-casos-de-exito-y-so-azul.webp", // #23 AZUL
  "es/beneficios-de-la-inteligencia-artificial-en-el-analisis-del-customer-journey": "es-beneficios-de-la-inteligencia-artificial-en-el-a-blanca.webp", // #24 BLANCA
  "es/los-10-kpis-que-todo-centro-comercial-debe-medir": "es-los-10-kpis-que-todo-centro-comercial-debe-medir-azul.webp", // #25 AZUL
  "es/modelos-de-prediccion-en-retail-como-anticipar-la-demanda-optimizar-staff-y-medir-el-impacto-de-las-promociones": "es-modelos-de-prediccion-en-retail-como-anticipar-l-blanca.webp", // #26 BLANCA
  "es/mapas-de-calor-descubre-como-el-flujo-de-clientes-transforma-tu-centro-comercial": "es-mapas-de-calor-descubre-como-el-flujo-de-cliente-azul.webp", // #27 AZUL
  "es/las-metricas-clave-para-el-exito-en-retail": "es-las-metricas-clave-para-el-exito-en-retail-blanca.webp", // #28 BLANCA
  "es/flame-organiza-la-mesa-redonda-transformando-el-retail-datos-ia-e-innovacion-en-centros-comerciales-en-limitless-2025": "es-flame-organiza-la-mesa-redonda-transformando-el-azul.webp", // #29 AZUL
  "es/flame-analytics-seleccionada-como-una-de-las-13-empresas-de-ia-mas-innovadoras-de-espana": "es-flame-analytics-seleccionada-como-una-de-las-13-blanca.webp", // #30 BLANCA
  "es/resumen-flame-talks-2025-transformando-centros-comerciales": "es-resumen-flame-talks-2025-transformando-centros-c-azul.webp", // #31 AZUL
  "es/ana-almagro-los-centros-comerciales-se-estan-consolidando-como-lugares-de-vida": "es-ana-almagro-los-centros-comerciales-se-estan-con-blanca.webp", // #32 BLANCA
  "es/webinar-la-ia-al-servicio-del-retail-descubre-el-poder-de-la-videoanalitica": "es-webinar-la-ia-al-servicio-del-retail-descubre-el-azul.webp", // #33 AZUL
  "es/flame-talks-2025-transformando-centros-comerciales-innovacion-datos-experiencia-y-sostenibilidad": "es-flame-talks-2025-transformando-centros-comercial-blanca.webp", // #34 BLANCA
  "es/7-claves-para-construir-un-comercio-de-exito-y-trascendencia": "es-7-claves-para-construir-un-comercio-de-exito-y-t-azul.webp", // #35 AZUL
  "es/flame-analytics-en-nrf-25": "es-flame-analytics-en-nrf-25-blanca.webp", // #36 BLANCA
  "es/transformacion-del-retail-fusion-de-innovacion-tecnologia-y-analitica-en-la-era-digital": "es-transformacion-del-retail-fusion-de-innovacion-t-azul.webp", // #37 AZUL
  "es/flame-y-trison-organizan-una-jornada-para-directivos-del-retail-en-madrid": "es-flame-y-trison-organizan-una-jornada-para-direct-blanca.webp", // #38 BLANCA
  "es/nuevas-tecnologias-que-mejoran-la-medicion-de-trafico-en-los-espacios-comerciales": "es-nuevas-tecnologias-que-mejoran-la-medicion-de-tr-azul.webp", // #39 AZUL
  "es/la-reinvencion-de-la-tienda-fisica-mucho-mas-que-un-espacio-de-venta": "es-la-reinvencion-de-la-tienda-fisica-mucho-mas-que-blanca.webp", // #40 BLANCA
  "es/manual-de-experiencia-de-cliente-biblia-para-empleados": "es-manual-de-experiencia-de-cliente-biblia-para-emp-azul.webp", // #41 AZUL
  "es/descubriendo-la-revolucion-en-retail-con-cristina-delgado-women-in-retail": "es-descubriendo-la-revolucion-en-retail-con-cristin-blanca.webp", // #42 BLANCA
  "es/marina-nieto-lo-phygital-es-el-futuro-y-los-servicos-nuestros-mayores-aliados": "es-marina-nieto-lo-phygital-es-el-futuro-y-los-serv-azul.webp", // #43 AZUL
  "es/irene-cuadrado-la-tecnologia-te-acerca-a-los-clientes-y-te-permite-detectar-necesidades": "es-irene-cuadrado-la-tecnologia-te-acerca-a-los-cli-blanca.webp", // #44 BLANCA
  "es/wifi-marketing-transformando-la-conexion-en-centros-comerciales-en-oportunidades-de-marketing": "es-wifi-marketing-transformando-la-conexion-en-cent-azul.webp", // #45 AZUL
  "es/visual-merchandising-sostenible-ideas-para-una-tienda-eco-friendly": "es-visual-merchandising-sostenible-ideas-para-una-t-blanca.webp", // #46 BLANCA
  "es/triunfo-de-el-ingenio-reconocimiento-para-el-proyecto-igenio-de-flame-analytics": "es-triunfo-de-el-ingenio-reconocimiento-para-el-pro-azul.webp", // #47 AZUL
  "es/resumen-flame-talks-2024-reflexiones-sobre-el-futuro-de-los-centros-comerciales": "es-resumen-flame-talks-2024-reflexiones-sobre-el-fu-blanca.webp", // #48 BLANCA
  "es/elevando-la-experiencia-de-compra-en-intu-xanadu-la-transformacion-digital-de-flame-analytics": "es-elevando-la-experiencia-de-compra-en-intu-xanadu-azul.webp", // #49 AZUL
  "es/flame-analytics-lider-en-retail-technology-destacado-en-el-landscape-de-cascadia": "es-flame-analytics-lider-en-retail-technology-desta-blanca.webp", // #50 BLANCA
  "es/claves-experiencia-de-compra-centro-comercial": "es-claves-experiencia-de-compra-centro-comercial-azul.webp", // #51 AZUL
  "es/flame-talks-2024-explorando-pasado-desafiando-presente-creando-futuro": "es-flame-talks-2024-explorando-pasado-desafiando-pr-blanca.webp", // #52 BLANCA
  "es/centro-comercial-alcala-magna-solucion-de-wifi-marketing-de-flame": "es-centro-comercial-alcala-magna-solucion-de-wifi-m-azul.webp", // #53 AZUL
  "es/jose-antonio-tecnologia-para-la-innovacion-de-los-puntos-fisicos": "es-jose-antonio-tecnologia-para-la-innovacion-de-lo-blanca.webp", // #54 BLANCA
  "es/igone-castillo-exito-en-tu-tienda-retail": "es-igone-castillo-exito-en-tu-tienda-retail-azul.webp", // #55 AZUL
  "es/descubre-como-el-uso-de-kpis-puede-potenciar-tus-ventas": "es-descubre-como-el-uso-de-kpis-puede-potenciar-tus-blanca.webp", // #56 BLANCA
  "es/patricia-fuentes-la-tecnologia-permitira-mejorar-la-experiencia-y-la-atencion-al-cliente": "es-patricia-fuentes-la-tecnologia-permitira-mejorar-azul.webp", // #57 AZUL
  "es/carlos-palacios-la-base-del-exito-del-retail-esta-asociado-a-la-relacion-que-mantengan-con-el-cliente": "es-carlos-palacios-la-base-del-exito-del-retail-est-blanca.webp", // #58 BLANCA
  "es/cristina-munoz-la-clave-para-establecer-una-buena-relacion-con-los-clientes-es-conocer-sus-necesidades": "es-cristina-munoz-la-clave-para-establecer-una-buen-azul.webp", // #59 AZUL
  "es/como-la-ia-esta-transformando-la-forma-en-que-hacemos-presentaciones": "es-como-la-ia-esta-transformando-la-forma-en-que-ha-blanca.webp", // #60 BLANCA
};

export function listingCover(lang: string, slug: string): string | null {
  const f = COVER_OVERRIDES[`${lang}/${slug}`];
  return f ? BASE + f : null;
}

/** Devuelve el post con la miniatura de listado sustituida si tiene cabecera alterna. */
export function withListingCover<T extends { lang: string; slug: string; thumbnail?: string }>(p: T): T {
  const c = listingCover(p.lang, p.slug);
  return c ? { ...p, thumbnail: c } : p;
}
