import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Thank you for registering · Flame Analytics",
  description: "Your webinar registration is confirmed. The access link arrives via email.",
  robots: { index: false, follow: true },
};

export default function ThankYouWebinar() {
  return (
    <ThankYouTemplate
      currentLang="en" enHref="/en/thank-you-webinar/"
      heroImage="/wp-content/uploads/2026/01/Connect-1-1.png"
      eyebrow="Registration confirmed"
      title="See you at the" titleHl="webinar!"
      body="Your registration is confirmed. We'll send the access link by email + a reminder 24 h and 1 h before. If you can't attend live, we'll send you the recording."
      primaryCta={{ label: "More webinars", href: "/en/flame-webinar-registration/" }}
      secondaryCta={{ label: "Back to home", href: "/en/" }}
      nextSteps={[
        { icon: "calendar", title: "Access link",         desc: "The Zoom/Meet link arrives in your email in a few minutes." },
        { icon: "reports",  title: "Recording guaranteed", desc: "If you can't attend live, we'll send the recording the next day." },
      ]}
    />
  );
}
