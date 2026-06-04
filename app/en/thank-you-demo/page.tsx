import type { Metadata } from "next";
import ThankYouTemplate from "@/components/templates/ThankYouTemplate";

export const metadata: Metadata = {
  title: "Thank you for requesting a demo · Flame Analytics",
  description: "We've received your demo request. We'll contact you within 24 business hours.",
  alternates: {
    canonical: "/en/thank-you-demo/",
    languages: {
    en: "/en/thank-you-demo/",
    "x-default": "/en/thank-you-demo/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/thank-you-demo/",
    siteName: "Flame Analytics",
    title: "Thank you for requesting a demo · Flame Analytics",
    description: "We've received your demo request. We'll contact you within 24 business hours.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank you for requesting a demo · Flame Analytics",
    description: "We've received your demo request. We'll contact you within 24 business hours.",
  },
};

export default function ThankYouDemo() {
  return (
    <ThankYouTemplate
      currentLang="en" enHref="/en/thank-you-demo/"
      heroImage="/wp-content/uploads/2026/01/Traffic2-1.png"
      eyebrow="Request received"
      title="Thank you for requesting your" titleHl="demo"
      body="We've received your request. Our product team will get back to you within 24 business hours to coordinate the personalized demo."
      primaryCta={{ label: "Explore the platform", href: "/en/" }}
      secondaryCta={{ label: "Read the community", href: "/en/community/" }}
      nextSteps={[
        { icon: "calendar", title: "Email confirmation",  desc: "You'll receive a proposed slot within 24 business hours." },
        { icon: "users",    title: "20-minute demo",       desc: "We show Flame running with a real case similar to yours, no hard sell." },
      ]}
    />
  );
}
