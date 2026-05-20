import type { Metadata } from "next";
import ThanksTemplate from "@/components/templates/ThanksTemplate";

export const metadata: Metadata = {
  title: "Gracias · Flame Analytics",
  description: "Hemos recibido tu solicitud. Te contactamos en menos de 24 horas.",
};

export default function GraciasDraft() {
  return (
    <ThanksTemplate
      enHref="/en/thank-you-2/"
      subtitle="Recibido"
      title="¡Gracias! Tu solicitud está en camino"
      body="Te contactamos en menos de 24 horas para agendar la demo. Mientras tanto, puedes explorar nuestros recursos o conocer al equipo."
      nextSteps={[
        { label: "Volver al inicio", href: "/es/home-draft/" },
        { label: "Explorar productos", href: "/es/analitica-trafico-draft/" },
      ]}
    />
  );
}
