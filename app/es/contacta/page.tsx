import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";

export const metadata: Metadata = {
  title: "Contacto · Flame Analytics",
  description: "Habla con nuestro equipo de producto. Demo personalizada en 20 minutos, con un caso real de tu sector.",
  alternates: {
    canonical: "/es/contacta/",
    languages: {
    es: "/es/contacta/",
    en: "/en/contact-us/",
    "x-default": "/es/contacta/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/contacta/",
    siteName: "Flame Analytics",
    title: "Contacto · Flame Analytics",
    description: "Habla con nuestro equipo de producto. Demo personalizada en 20 minutos, con un caso real de tu sector.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Traffic2-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto · Flame Analytics",
    description: "Habla con nuestro equipo de producto. Demo personalizada en 20 minutos, con un caso real de tu sector.",
    images: ["/wp-content/uploads/2026/01/Traffic2-1.png"],
  },
};

export default function ContactaDraft() {
  return <ContactTemplate enHref="/en/contact-us/" />;
}
