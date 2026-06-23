import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Information Security Policy · Flame Analytics",
  description: "Flame Analytics commitment to the security and confidentiality of the information of its clients and users.",
  alternates: {
    canonical: "/en/information-security/",
    languages: {
    en: "/en/information-security/",
    es: "/es/politica-de-seguridad-de-la-informacion/",
    "x-default": "/es/politica-de-seguridad-de-la-informacion/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/information-security/",
    siteName: "Flame Analytics",
    title: "Information Security Policy · Flame Analytics",
    description: "Flame Analytics commitment to the security and confidentiality of the information of its clients and users.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Information Security Policy · Flame Analytics",
    description: "Flame Analytics commitment to the security and confidentiality of the information of its clients and users.",
  },
};

const body = `
<p>At Flame Analytics, information security is a strategic commitment. This policy describes our principles and management framework.</p>

<h2>Controller</h2>
<ul>
<li><strong>Legal name</strong>: Flame Analytics S.L.</li>
<li><strong>Tax ID (CIF)</strong>: B52543691</li>
<li><strong>Address</strong>: Espacio Tecnológico Molinón, El Molinón 100, 33203 Gijón, Asturias, Spain</li>
<li><strong>Phone</strong>: +34 984 19 14 05</li>
<li><strong>Email</strong>: <a href="mailto:security@flameanalytics.com">security@flameanalytics.com</a></li>
</ul>

<h2>1. Scope</h2>
<p>This policy applies to all personnel, contractors and third parties with access to information systems and data managed by Flame.</p>

<h2>2. Principles</h2>
<ul>
<li><strong>Confidentiality</strong>: only authorized personnel access information.</li>
<li><strong>Integrity</strong>: information is accurate, complete and protected against unauthorized modification.</li>
<li><strong>Availability</strong>: systems remain available to authorized users when needed.</li>
</ul>

<h2>3. Certifications</h2>
<p>Flame holds <strong>ISO 27001</strong> certification and operates under GDPR compliance with EU-based data processing.</p>

<h2>4. Security measures</h2>
<p>Encryption in transit and at rest, role-based access, MFA, continuous monitoring, regular penetration testing and security incident response plans.</p>

<h2>5. Incident management</h2>
<p>Security incidents are managed under a documented procedure with notifications to the AEPD when applicable and to clients in less than 72 hours.</p>

<h2>6. Continuous training</h2>
<p>All personnel receive regular training in security and data protection, with policy reviews and security drills.</p>

<h2>7. Review</h2>
<p>This policy is reviewed annually and after any significant change in the business or threat environment.</p>

<h2>8. Contact</h2>
<p>For security incidents or notifications, write to <a href="mailto:security@flameanalytics.com">security@flameanalytics.com</a>.</p>
`;

export default function InformationsecurityEN() {
  return (
    <LegalTemplate
      enHref="/es/politica-de-seguridad-de-la-informacion/"
      title="Information Security Policy"
      lastUpdate="May 19, 2026"
      bodyHtml={body}
      currentLang="en"
    />
  );
}
