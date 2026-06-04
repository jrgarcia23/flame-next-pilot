import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";

export const metadata: Metadata = {
  title: "Contact · Flame Analytics",
  description: "Talk to our product team. Personalised demo in 20 minutes, with a real case from your sector.",
  alternates: {
    canonical: "/en/contact-us/",
    languages: {
    en: "/en/contact-us/",
    es: "/es/contacta/",
    "x-default": "/es/contacta/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/contact-us/",
    siteName: "Flame Analytics",
    title: "Contact · Flame Analytics",
    description: "Talk to our product team. Personalised demo in 20 minutes, with a real case from your sector.",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Traffic2-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Flame Analytics",
    description: "Talk to our product team. Personalised demo in 20 minutes, with a real case from your sector.",
    images: ["/wp-content/uploads/2026/01/Traffic2-1.png"],
  },
};

export default function ContactUsEn() {
  return <ContactTemplate enHref="/es/contacta/" currentLang="en" />;
}
