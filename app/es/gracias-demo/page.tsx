import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Gracias por solicitar la demo · Flame Analytics",
  description: "Hemos recibido tu solicitud de demo. Te contactamos en 24 h laborables.",
  alternates: {
    canonical: "/es/gracias-demo/",
    languages: {
    es: "/es/gracias-demo/",
    "x-default": "/es/gracias-demo/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/gracias-demo/",
    siteName: "Flame Analytics",
    title: "Gracias por solicitar la demo · Flame Analytics",
    description: "Hemos recibido tu solicitud de demo. Te contactamos en 24 h laborables.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracias por solicitar la demo · Flame Analytics",
    description: "Hemos recibido tu solicitud de demo. Te contactamos en 24 h laborables.",
  },
};

export default function GraciasDemo() {
  return (
    <ThankYouTemplate
      currentLang="es" enHref="/en/thank-you-demo/"
      heroImage="/wp-content/uploads/2026/01/Traffic2-1.png"
      eyebrow="Solicitud recibida"
      title="Gracias por solicitar tu" titleHl="demo"
      body="Hemos recibido tu solicitud. Nuestro equipo de producto se pondrá en contacto contigo en las próximas 24 horas laborables para coordinar la demo personalizada."
      primaryCta={{ label: "Explorar la plataforma", href: "/es/" }}
      secondaryCta={{ label: "Leer la comunidad", href: "/es/comunidad/" }}
      nextSteps={[
        { icon: "calendar", title: "Confirmación por email", desc: "Recibirás un email con la propuesta de hueco en menos de 24 h laborables." },
        { icon: "users",    title: "Demo de 20 minutos",      desc: "Te enseñamos Flame funcionando con un caso real similar al tuyo, sin venta dura." },
      ]}
    />
  );
}
