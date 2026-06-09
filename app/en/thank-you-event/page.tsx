import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Thank you for registering · Flame Analytics",
  description: "Your event registration is confirmed.",
  alternates: {
    canonical: "/en/thank-you-event/",
    languages: {
    en: "/en/thank-you-event/",
    "x-default": "/en/thank-you-event/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/thank-you-event/",
    siteName: "Flame Analytics",
    title: "Thank you for registering · Flame Analytics",
    description: "Your event registration is confirmed.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank you for registering · Flame Analytics",
    description: "Your event registration is confirmed.",
  },
};

export default function ThankYouEvent() {
  return (
    <ThankYouTemplate
      currentLang="en" enHref="/es/gracias-evento/"
      heroImage="/wp-content/uploads/2026/04/6-1.jpg"
      eyebrow="Seat reserved"
      title="See you at the" titleHl="event!"
      body="Your registration is confirmed. We'll email you the logistics (time, venue, agenda) and a reminder 24 h and 2 h before the event."
      primaryCta={{ label: "See all events", href: "/en/flame-events/" }}
      secondaryCta={{ label: "Back to home", href: "/en/" }}
      nextSteps={[
        { icon: "calendar", title: "Email confirmation", desc: "You'll receive the event details in your inbox in a few minutes." },
        { icon: "users",    title: "Free cancellation",   desc: "You can cancel up to 48 h before without any commitment." },
      ]}
    />
  );
}
