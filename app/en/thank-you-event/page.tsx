import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Thank you for registering · Flame Analytics",
  description: "Your event registration is confirmed.",
  robots: { index: false, follow: true },
};

export default function ThankYouEvent() {
  return (
    <ThankYouTemplate
      currentLang="en" enHref="/en/thank-you-event/"
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
