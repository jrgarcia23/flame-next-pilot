import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";

export const metadata: Metadata = {
  title: "Contact · Flame Analytics",
  description: "Talk to our product team. Personalised demo in 20 minutes, with a real case from your sector.",
};

export default function ContactUsEn() {
  return <ContactTemplate enHref="/es/contacta/" currentLang="en" />;
}
