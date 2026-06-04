import type { Metadata } from "next";
import ThanksTemplate from "@/components/templates/ThanksTemplate";

export const metadata: Metadata = {
  title: "Gracias · Flame Analytics",
  description: "Hemos recibido tu solicitud. Te contactamos en menos de 24 horas.",
  alternates: {
    canonical: "/es/gracias/",
    languages: {
    es: "/es/gracias/",
    "x-default": "/es/gracias/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/gracias/",
    siteName: "Flame Analytics",
    title: "Gracias · Flame Analytics",
    description: "Hemos recibido tu solicitud. Te contactamos en menos de 24 horas.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracias · Flame Analytics",
    description: "Hemos recibido tu solicitud. Te contactamos en menos de 24 horas.",
  },
};

export default function GraciasDraft() {
  return (
    <ThanksTemplate
      enHref="/en/thank-you-2/"
      subtitle="Recibido"
      title="¡Gracias! Tu solicitud está en camino"
      body="Te contactamos en menos de 24 horas para agendar la demo. Mientras tanto, puedes explorar nuestros recursos o conocer al equipo."
      nextSteps={[
        { label: "Volver al inicio", href: "/es/" },
        { label: "Explorar productos", href: "/es/analitica-trafico/" },
      ]}
    />
  );
}
