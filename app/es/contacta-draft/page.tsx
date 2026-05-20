import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";

export const metadata: Metadata = {
  title: "Contacto · Flame Analytics",
  description: "Habla con nuestro equipo de producto. Demo personalizada en 20 minutos, con un caso real de tu sector.",
};

export default function ContactaDraft() {
  return <ContactTemplate enHref="/en/contact-us/" />;
}
