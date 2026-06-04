import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Gracias por contactar · Flame Analytics",
  description: "Hemos recibido tu mensaje. Te respondemos en 24 h laborables.",
  alternates: {
    canonical: "/es/gracias-contacto/",
    languages: {
    es: "/es/gracias-contacto/",
    "x-default": "/es/gracias-contacto/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/gracias-contacto/",
    siteName: "Flame Analytics",
    title: "Gracias por contactar · Flame Analytics",
    description: "Hemos recibido tu mensaje. Te respondemos en 24 h laborables.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracias por contactar · Flame Analytics",
    description: "Hemos recibido tu mensaje. Te respondemos en 24 h laborables.",
  },
};

export default function GraciasContacto() {
  return (
    <ThankYouTemplate
      currentLang="es" enHref="/en/thank-you-contact/"
      heroImage="/wp-content/uploads/2026/01/Traffic2-1.png"
      eyebrow="Mensaje recibido"
      title="Gracias por" titleHl="contactarnos"
      body="Hemos recibido tu mensaje. Te respondemos en menos de 24 horas laborables. Si tu solicitud es urgente puedes escribirnos directamente a hello@flameanalytics.com."
      primaryCta={{ label: "Volver al inicio", href: "/es/" }}
      secondaryCta={{ label: "Conoce el equipo", href: "/es/sobre-nosotros/" }}
    />
  );
}
