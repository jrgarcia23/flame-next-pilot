import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Gracias por inscribirte al evento · Flame Analytics",
  description: "Tu inscripción al evento Flame está confirmada.",
  robots: { index: false, follow: true },
};

export default function GraciasEvento() {
  return (
    <ThankYouTemplate
      currentLang="es" enHref="/en/thank-you-event/"
      eyebrow="Plaza reservada"
      title="¡Nos vemos en el" titleHl="evento!"
      body="Tu inscripción está registrada. Te enviaremos por email los detalles logísticos (hora, ubicación, agenda) y un recordatorio 24 h y 2 h antes del evento."
      primaryCta={{ label: "Ver todos los eventos", href: "/es/flame-eventos/" }}
      secondaryCta={{ label: "Volver al inicio", href: "/es/" }}
      nextSteps={[
        { icon: "calendar", title: "Confirmación por email", desc: "Recibes los detalles logísticos en tu bandeja en pocos minutos." },
        { icon: "users",    title: "Cancelación libre",       desc: "Puedes cancelar sin compromiso hasta 48 h antes del evento." },
      ]}
    />
  );
}
