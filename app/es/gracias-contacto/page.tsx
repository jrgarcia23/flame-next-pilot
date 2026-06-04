import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Gracias por contactar · Flame Analytics",
  description: "Hemos recibido tu mensaje. Te respondemos en 24 h laborables.",
  robots: { index: false, follow: true },
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
