// Metadata por categoría: imagen hero + frase identificadora.
// Si un slug no está aquí, se usa el fallback (Connect img + texto genérico).

export type CategoryMeta = {
  heroImg: string;
  taglineEs: string;
  taglineEn: string;
};

export const CATEGORY_FALLBACK: CategoryMeta = {
  heroImg: "/wp-content/uploads/2026/01/Connect-1-1.png",
  taglineEs: "Análisis y conocimiento aplicado al espacio físico desde Flame Analytics.",
  taglineEn: "Analysis and applied knowledge for physical spaces from Flame Analytics.",
};

export const CATEGORY_META: Record<string, CategoryMeta> = {
  // ES
  "blog":               { heroImg: "/wp-content/uploads/2026/01/Traffic2-1.png",          taglineEs: "Artículos sobre analítica del espacio físico, retail y centros comerciales.", taglineEn: "Articles on physical space analytics, retail and shopping malls." },
  "entrevistas":        { heroImg: "/wp-content/uploads/2026/01/Partners-1-scaled-1.png", taglineEs: "Conversaciones con líderes del retail y los centros comerciales.",          taglineEn: "Conversations with retail and shopping mall leaders." },
  "casos-de-exito":     { heroImg: "/wp-content/uploads/2026/01/Industries_Retail-1.png", taglineEs: "Historias reales de cómo nuestros clientes miden, deciden y mejoran.",       taglineEn: "Real stories of how our clients measure, decide and improve." },
  "webinars-es-cat":    { heroImg: "/wp-content/uploads/2026/01/Connect-1-1.png",         taglineEs: "Sesiones en vídeo con expertos del sector.",                                taglineEn: "Recorded sessions with industry experts." },
  "tips-retail":        { heroImg: "/wp-content/uploads/2026/01/Customer_behavior-1-scaled-1.png", taglineEs: "Consejos prácticos para mejorar resultados en tu negocio.",       taglineEn: "Practical tips to improve results in your business." },
  "consejos":           { heroImg: "/wp-content/uploads/2026/01/Customer_behavior-1-scaled-1.png", taglineEs: "Consejos prácticos para mejorar resultados en tu negocio.",       taglineEn: "Practical tips to improve results in your business." },
  "corporativo":        { heroImg: "/wp-content/uploads/2026/01/Partners2-scaled-1.png",  taglineEs: "Novedades, reconocimientos y prensa de Flame Analytics.",                   taglineEn: "Flame Analytics news, recognition and press." },
  "retail-blog":        { heroImg: "/wp-content/uploads/2026/01/Industries_Retail-1.png", taglineEs: "Tendencias y análisis del sector retail.",                                  taglineEn: "Trends and analysis from the retail sector." },
  "retail-entrevistas": { heroImg: "/wp-content/uploads/2026/01/Partners-1-scaled-1.png", taglineEs: "Entrevistas a referentes del sector retail.",                               taglineEn: "Interviews with retail sector leaders." },
  "retail-casos":       { heroImg: "/wp-content/uploads/2026/01/Industries_Retail-1.png", taglineEs: "Casos de éxito de tiendas y cadenas retail.",                               taglineEn: "Success stories from retail stores and chains." },
  "eventos":            { heroImg: "/wp-content/uploads/2026/04/6-1.jpg",                 taglineEs: "Próximos y pasados eventos de Flame Talks y la industria.",                  taglineEn: "Upcoming and past Flame Talks and industry events." },
  // EN
  "interviews":         { heroImg: "/wp-content/uploads/2026/01/Partners-1-scaled-1.png", taglineEs: "Conversaciones con líderes del retail.",                                    taglineEn: "Conversations with retail leaders." },
  "case-studies":       { heroImg: "/wp-content/uploads/2026/01/Industries_Retail-1.png", taglineEs: "Casos de éxito reales de Flame.",                                           taglineEn: "Real Flame customer success stories." },
  "webinars":           { heroImg: "/wp-content/uploads/2026/01/Connect-1-1.png",         taglineEs: "Sesiones en vídeo con expertos del sector.",                                taglineEn: "Recorded sessions with industry experts." },
  "tips":               { heroImg: "/wp-content/uploads/2026/01/Customer_behavior-1-scaled-1.png", taglineEs: "Consejos prácticos para tu negocio.",                              taglineEn: "Practical tips for your business." },
  "retail":             { heroImg: "/wp-content/uploads/2026/01/Industries_Retail-1.png", taglineEs: "Análisis del sector retail.",                                               taglineEn: "Retail sector analysis." },
  "retail-interviews":  { heroImg: "/wp-content/uploads/2026/01/Partners-1-scaled-1.png", taglineEs: "Entrevistas con líderes del retail.",                                       taglineEn: "Interviews with retail leaders." },
  "retail-case-studies":{ heroImg: "/wp-content/uploads/2026/01/Industries_Retail-1.png", taglineEs: "Casos de éxito en retail.",                                                 taglineEn: "Retail success stories." },
  "shopping-malls":     { heroImg: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png", taglineEs: "Tendencias y análisis de centros comerciales.",                     taglineEn: "Shopping mall trends and analysis." },
  "shopping-malls-interviews": { heroImg: "/wp-content/uploads/2026/01/Partners-1-scaled-1.png", taglineEs: "Entrevistas con líderes de centros comerciales.",                  taglineEn: "Interviews with shopping mall leaders." },
  "shopping-malls-case-studies": { heroImg: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png", taglineEs: "Casos de éxito en centros comerciales.",                taglineEn: "Shopping mall success stories." },
  "hospitality-blog":   { heroImg: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png", taglineEs: "Inteligencia para el sector hostelero.",                              taglineEn: "Intelligence for the hospitality sector." },
  "corporate":          { heroImg: "/wp-content/uploads/2026/01/Partners2-scaled-1.png",  taglineEs: "Novedades y prensa de Flame.",                                              taglineEn: "Flame news and press." },
};

export function getCategoryMeta(slug: string): CategoryMeta {
  return CATEGORY_META[slug] || CATEGORY_FALLBACK;
}

export const POSTS_PER_PAGE = 20; // 5 filas × 4 cols
