import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Thank you for contacting us · Flame Analytics",
  description: "We've received your message. We'll get back to you within 24 business hours.",
  alternates: {
    canonical: "/en/thank-you-contact/",
    languages: {
    en: "/en/thank-you-contact/",
    "x-default": "/en/thank-you-contact/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/thank-you-contact/",
    siteName: "Flame Analytics",
    title: "Thank you for contacting us · Flame Analytics",
    description: "We've received your message. We'll get back to you within 24 business hours.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank you for contacting us · Flame Analytics",
    description: "We've received your message. We'll get back to you within 24 business hours.",
  },
};

export default function ThankYouContact() {
  return (
    <ThankYouTemplate
      currentLang="en" enHref="/es/gracias-contacto/"
      heroImage="/wp-content/uploads/2026/01/Traffic2-1.png"
      eyebrow="Message received"
      title="Thanks for" titleHl="reaching out"
      body="We've received your message. We'll get back to you within 24 business hours. If it's urgent, you can also email us at hello@flameanalytics.com."
      primaryCta={{ label: "Back to home", href: "/en/" }}
      secondaryCta={{ label: "Meet the team", href: "/en/about-us/" }}
    />
  );
}
