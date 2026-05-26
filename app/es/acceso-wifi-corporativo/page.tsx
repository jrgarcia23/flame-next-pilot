import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Acceso WiFi corporativo · Flame Analytics",
  description: "Conectividad segura y gestionada para empleados y visitantes. Credenciales temporales, permisos granulares y trazabilidad por dispositivo.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Acceso WiFi corporativo · Flame Analytics",
  metaDescription: "Control de acceso inteligente para entornos de trabajo conectados.",
  heroTitle: "Acceso WiFi corporativo",
  heroBgImage: "/wp-content/uploads/2026/01/corporate_wifi-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Flame Connect te permite controlar cómo los usuarios acceden a tu WiFi corporativo, ya sean empleados, visitantes o socios. Otorga acceso al instante a través de la app, registra cada conexión y mantén el control total sobre permisos, credenciales y seguridad.",
  heroBullets: ["Login con SSO", "Credenciales temporales", "Trazabilidad completa", "Roles por departamento"],
  imageBigSrc: "/wp-content/uploads/2026/01/Corporate_Wifi_Access_recorte.png",
  imageBigAlt: "Flame Corporate Wifi Access",
  bigSectionTitle: "Acceso seguro,",
  bigSectionTitleHl: "gestión simple",
  bigSectionPara1: "Flame Corporate WiFi ofrece a las organizaciones control total sobre la conectividad. Gestiona credenciales, asigna permisos temporales y automatiza el acceso de usuarios mediante APIs.",
  bigSectionPara2: "Proporciona un acceso WiFi seguro para invitados y empleados, todo desde una plataforma unificada.",
  bigSectionBullets: ["Gestión de credenciales", "Permisos temporales", "Automatización por API", "Acceso unificado"],
  benefitsTitle: "del acceso WiFi corporativo",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Tu WiFi es infraestructura crítica. Trátala como tal: segura, auditable y centralmente gestionada.",
  benefits: [
    { icon: "users",     title: "Simplifica la gestión",                       desc: "Gestiona empleados y visitantes con credenciales temporales y control automatizado desde una plataforma central." },
    { icon: "privacy",   title: "Seguridad y cumplimiento",                    desc: "Sólo usuarios autorizados acceden, con logs detallados para auditoría y trazabilidad por dispositivo." },
    { icon: "wifi",      title: "Acceso para visitantes sin fricción",         desc: "Codes temporales por SMS/email o login social. Caducan automáticamente al finalizar la visita." },
    { icon: "compare",   title: "Insights de uso",                              desc: "Conoce qué áreas concentran más uso de red, cuándo y por qué tipo de usuario. Datos para dimensionar la infraestructura." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Datos para IT, seguridad y operaciones: desde el uso de cada SSID hasta el equipo en cada turno.",
  metrics: [
    { icon: "wifi",     title: "Usuarios activos",       desc: "Empleados y visitantes conectados ahora mismo." },
    { icon: "ratio",    title: "Carga por punto de acceso", desc: "Saturación de cada AP para planificar la red." },
    { icon: "alert",    title: "Alertas de seguridad",   desc: "Intentos de acceso fallidos o no autorizados." },
    { icon: "users",    title: "Empleados vs. visitantes", desc: "Quién consume la red en cada momento." },
    { icon: "reports",  title: "Logs auditables",        desc: "Registro completo para cumplimiento normativo." },
    { icon: "compare",  title: "Tráfico por área",       desc: "Qué zonas necesitan más capacidad de red." },
  ],
  testimonialsIdx: [3, 1, 2],
  faqs: [
    { q: "¿Cómo se autentica al empleado?",                                a: "Mediante <strong>SSO con tu directorio existente</strong> (Active Directory, Azure AD, Google Workspace, Okta) o credenciales locales con MFA. El acceso se renueva automáticamente con el ciclo de vida del empleado." },
    { q: "¿Y los visitantes externos?",                                    a: "Reciben un <strong>código temporal por SMS o email</strong>, válido durante el tiempo de la visita (configurable). El responsable interno puede crear el acceso desde la app móvil con un par de clicks." },
    { q: "¿Es compatible con mi infraestructura WiFi actual?",             a: "Sí. Flame soporta los principales fabricantes (Cisco, Aruba, Ruckus, Cambium, Ubiquiti, etc.) mediante <strong>RADIUS, WPA2/3 Enterprise o redirect HTTPS</strong>. Si tu red ya da WiFi corporativo, el switch es transparente." },
    { q: "¿Qué logs guarda y cuánto tiempo?",                              a: "Conexión, dispositivo, MAC anonimizada, tiempo de uso y AP utilizado. Retención configurable (90 días por defecto). Auditable y exportable para cumplimiento normativo." },
    { q: "¿Cumple el RGPD y la directiva NIS2?",                            a: "Sí. Flame Connect implementa principios de <strong>privacidad por diseño</strong>: MAC randomization compatible, minimización de datos, derecho al olvido y registro de actividades de tratamiento (RAT)." },
    { q: "¿Cuánto cuesta para 100 empleados?",                              a: "El pricing es por <strong>número de access points</strong>, no por usuario. Para una oficina de 100 empleados con ~10 APs, suele estar entre 200-400 €/mes. Pricing por volumen para multi-sede." },
  ],
  ctaStripBold: "WiFi corporativo: del caos a control total.",
  ctaStripLight: "Implementación en 1-2 semanas.",
};

export default function AccesoWifiCorporativoDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/corporate-wifi-access/" />;
}
