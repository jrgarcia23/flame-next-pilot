import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Gracias por inscribirte al webinar · Flame Analytics",
  description: "Tu inscripción al webinar está confirmada. Recibes el enlace de acceso por email.",
  robots: { index: false, follow: true },
};

export default function GraciasWebinar() {
  return (
    <ThankYouTemplate
      currentLang="es" enHref="/en/thank-you-webinar/"
      eyebrow="Inscripción registrada"
      title="¡Nos vemos en el" titleHl="webinar!"
      body="Tu inscripción está confirmada. Te enviaremos el enlace de acceso por email + un recordatorio 24 h y 1 h antes. Si no puedes asistir en directo, te haremos llegar la grabación."
      primaryCta={{ label: "Ver más webinars", href: "/es/inscripcion-webinars/" }}
      secondaryCta={{ label: "Volver al inicio", href: "/es/" }}
      nextSteps={[
        { icon: "calendar", title: "Enlace de acceso",   desc: "El link de Zoom/Meet llega a tu email en pocos minutos." },
        { icon: "reports",  title: "Grabación garantizada", desc: "Si no puedes asistir en directo, te enviamos la grabación al día siguiente." },
      ]}
    />
  );
}
