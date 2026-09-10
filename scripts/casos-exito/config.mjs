// Configuración maestra del rollout de casos de éxito al nuevo formato.
// Un registro por caso. Los slugs marcados isNew:true no existen en blog.json
// y necesitan fila en el CMS (Supabase) para que la ruta resuelva.
//
// status: "published" (los existentes, JR autorizó) | "draft" (net-new B&B y Aena).
// relTitle: título corto para las tarjetas "Otros casos de éxito".
// related: 3 ids de casos a enlazar (mismo sector primero).

export const CASES = {
  alain: {
    sector: "Retail óptico", status: "published", done: true,
    es: { slug: "alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana",
          relTitle: "Alain Afflelou confía en la analítica de Flame para sus tiendas" },
    en: { slug: "alain-afflelou-relies-on-flame-analytics-for-people-counting-across-its-stores-in-spain",
          relTitle: "Alain Afflelou relies on Flame Analytics across its stores" },
  },
  multiopticas: {
    sector: "Retail óptico", status: "published", done: true,
    es: { slug: "multiopticas-convierte-el-trafico-en-tienda-en-decisiones-de-negocio",
          relTitle: "MultiÓpticas convierte el tráfico en tienda en decisiones" },
    en: { slug: "multiopticas-turns-in-store-footfall-into-business-decisions",
          relTitle: "MultiÓpticas turns in-store footfall into decisions" },
  },
  cbre: {
    sector: "Centros comerciales", status: "published",
    es: { slug: "caso-de-exito-potenciando-la-fidelizacion-en-centros-comerciales-en-cbre-espana",
          relTitle: "CBRE digitaliza la fidelización en sus centros comerciales" },
    en: { slug: "case-study-enhancing-customer-loyalty-in-shopping-centers-with-cbre-spain-and-connect-mall-edition",
          relTitle: "CBRE digitalizes loyalty across its shopping centers" },
    related: ["el-ingenio", "marineda", "merlin"],
  },
  caixaforum: {
    sector: "Cultura", status: "published",
    es: { slug: "transformando-la-experiencia-en-caixaforum-con-videoanalitica",
          relTitle: "CaixaForum transforma la experiencia con videoanalítica" },
    en: { slug: "caixaforum-video-analytics-visitor-experience", isNew: true,
          relTitle: "CaixaForum transforms visitor experience with video analytics" },
    related: ["casa-encendida", "oasiz", "cbre"],
  },
  "el-ingenio": {
    sector: "Centros comerciales", status: "published",
    es: { slug: "centro-comercial-el-ingenio-caso-de-exito-flame-analytics", isNew: true,
          relTitle: "El Ingenio impulsa la experiencia del visitante con datos" },
    en: { slug: "success-in-el-ingenio-recognition-for-the-igenio-project-of-flame-analytics",
          relTitle: "El Ingenio boosts visitor experience with data" },
    related: ["marineda", "zenia", "cbre"],
  },
  decathlon: {
    sector: "Retail deportivo", status: "published",
    es: { slug: "decathlon-medir-y-mejorar-en-el-sector-retail",
          relTitle: "Decathlon mide y mejora la experiencia en tienda" },
    en: { slug: "decathlon-measure-and-improve-in-the-retail-sector",
          relTitle: "Decathlon measures and improves the in-store experience" },
    related: ["alain", "multiopticas", "havaianas"],
  },
  "ferial-plaza": {
    sector: "Centros comerciales", status: "published",
    es: { slug: "optimizacion-de-experiencia-de-clientes-en-cc-ferial-plaza-con-flame-analytics",
          relTitle: "Ferial Plaza optimiza la experiencia de sus visitantes" },
    en: { slug: "ferial-plaza-shopping-center-customer-experience-flame-analytics", isNew: true,
          relTitle: "Ferial Plaza optimizes its visitor experience" },
    related: ["marineda", "zenia", "el-ingenio"],
  },
  havaianas: {
    sector: "Retail de moda", status: "published",
    es: { slug: "havainas-elige-flame-analytics-para-la-digitalizacion-de-sus-tiendas",
          relTitle: "Havaianas digitaliza la analítica de sus tiendas" },
    en: { slug: "havaianas-store-digitalization-flame-analytics", isNew: true,
          relTitle: "Havaianas digitalizes its store analytics" },
    related: ["decathlon", "pompeii", "alain"],
  },
  ikea: {
    sector: "Retail", status: "published",
    es: { slug: "ikea-confia-en-flame-analytics-para-la-analitica-indoor-de-sus-nuevos-centros-en-latinoamerica",
          relTitle: "IKEA confía en Flame para la analítica indoor en Latinoamérica" },
    en: { slug: "ikea-relies-on-flame-analytics-for-the-indoor-analytics-of-its-new-centers-in-latin-america",
          relTitle: "IKEA relies on Flame for indoor analytics in Latin America" },
    related: ["decathlon", "alain", "multiopticas"],
  },
  "casa-encendida": {
    sector: "Cultura", status: "published",
    es: { slug: "la-casa-encendida-una-experiencia-segura-con-flame-analytics",
          relTitle: "La Casa Encendida, una experiencia segura con Flame" },
    en: { slug: "la-casa-encendida-a-safe-experience-with-flame-analytics",
          relTitle: "La Casa Encendida, a safe experience with Flame" },
    related: ["caixaforum", "oasiz", "cbre"],
  },
  marineda: {
    sector: "Centros comerciales", status: "published",
    es: { slug: "centro-comercial-marineda-city-nuevo-cliente-de-flame-analytics",
          relTitle: "Marineda City conecta con sus visitantes con datos" },
    en: { slug: "marineda-city-shopping-center-flame-analytics", isNew: true,
          relTitle: "Marineda City connects with visitors through data" },
    related: ["zenia", "el-ingenio", "oasiz"],
  },
  merlin: {
    sector: "Real estate", status: "published",
    es: { slug: "impulsando-la-transformacion-digital-historia-de-exito-de-flame-analytics-en-merlin-properties",
          relTitle: "Merlin Properties impulsa su transformación digital" },
    en: { slug: "driving-digital-transformation-flame-analytics-success-story-with-merlin-properties",
          relTitle: "Merlin Properties drives its digital transformation" },
    related: ["cbre", "marineda", "oasiz"],
  },
  oasiz: {
    sector: "Centros comerciales", status: "published",
    es: { slug: "oasiz-madrid-cuenta-con-flame-analytics-para-identificar-y-conectar-con-sus-clientes-de-forma-agil",
          relTitle: "Oasiz Madrid identifica y conecta con sus clientes" },
    en: { slug: "oasiz-madrid-implements-flame-analytics-to-identify-and-connect-with-its-customers-in-an-agile-way",
          relTitle: "Oasiz Madrid identifies and connects with its customers" },
    related: ["marineda", "zenia", "cbre"],
  },
  pompeii: {
    sector: "Retail de moda", status: "published",
    es: { slug: "pompeii-uso-del-big-data-en-el-sector-retail",
          relTitle: "Pompeii transforma su retail con datos de tráfico" },
    en: { slug: "pompeii-retail-analytics-case-study",
          relTitle: "Pompeii powers in-store decisions with retail analytics" },
    related: ["havaianas", "decathlon", "alain"],
  },
  repsol: {
    sector: "Estaciones de servicio", status: "published",
    es: { slug: "caso-de-exito-repsol-y-flame-analytics-transforman-la-experiencia-en-1000-gasolineras",
          relTitle: "Repsol transforma la experiencia en 1.000 estaciones" },
    en: { slug: "success-story-repsol-and-flame-analytics-transform-the-experience-in-1000-gas-stations",
          relTitle: "Repsol transforms the experience in 1,000 gas stations" },
    related: ["alain", "multiopticas", "decathlon"],
  },
  zenia: {
    sector: "Centros comerciales", status: "published",
    es: { slug: "el-centro-comercial-zenia-boulevard-nuevo-cliente-de-flame-analytics",
          relTitle: "Zenia Boulevard conecta con sus visitantes con Flame" },
    en: { slug: "zenia-boulevard-shopping-center-flame-analytics", isNew: true,
          relTitle: "Zenia Boulevard connects with its visitors with Flame" },
    related: ["marineda", "oasiz", "el-ingenio"],
  },
  "bb-hotels": {
    sector: "Hoteles", status: "draft", netNew: true,
    es: { slug: "b-b-hotels-analitica-de-afluencia-flame-analytics", isNew: true,
          relTitle: "B&B Hotels analiza la afluencia con Flame Analytics" },
    en: { slug: "b-b-hotels-footfall-analytics-flame-analytics", isNew: true,
          relTitle: "B&B Hotels analyzes footfall with Flame Analytics" },
    related: ["alain", "cbre", "multiopticas"],
  },
  aena: {
    sector: "Transporte y aeropuertos", status: "draft", netNew: true,
    es: { slug: "aena-analitica-de-pasajeros-en-aeropuertos-flame-analytics", isNew: true,
          relTitle: "Aena analiza el flujo de pasajeros con Flame" },
    en: { slug: "aena-passenger-analytics-airports-flame-analytics", isNew: true,
          relTitle: "Aena analyzes passenger flow with Flame" },
    related: ["cbre", "merlin", "multiopticas"],
  },
};

// Categoría del CMS por idioma.
export const CATEGORY = {
  es: { slug: "casos-de-exito", name: "Casos de éxito" },
  en: { slug: "case-studies", name: "Case Studies" },
};
