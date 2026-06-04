import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Detailed information on data processing · Flame Analytics",
  description: "Extended information on personal data processing by Flame Analytics S.L., in compliance with GDPR.",
  alternates: {
    canonical: "/en/detailed-information/",
    languages: {
    en: "/en/detailed-information/",
    es: "/es/informacion-detallada/",
    "x-default": "/es/informacion-detallada/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/detailed-information/",
    siteName: "Flame Analytics",
    title: "Detailed information on data processing · Flame Analytics",
    description: "Extended information on personal data processing by Flame Analytics S.L., in compliance with GDPR.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Detailed information on data processing · Flame Analytics",
    description: "Extended information on personal data processing by Flame Analytics S.L., in compliance with GDPR.",
  },
};

const body = `
<p>In accordance with the General Data Protection Regulation (GDPR), we provide the following detailed information on how Flame Analytics S.L. processes your data.</p>

<h2>Data controller</h2>
<ul>
<li><strong>Legal name</strong>: Flame Analytics S.L.</li>
<li><strong>Tax ID (CIF)</strong>: B52543691</li>
<li><strong>Address</strong>: Espacio Tecnológico Molinón, El Molinón 100, 33203 Gijón, Asturias, Spain</li>
<li><strong>Phone</strong>: +34 984 19 14 05</li>
<li><strong>Email</strong>: <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a></li>
<li><strong>Data Protection Officer (DPO)</strong>: <a href="mailto:dpo@flameanalytics.com">dpo@flameanalytics.com</a></li>
</ul>

<h2>Specific purposes and legal basis</h2>
<h3>Contact form / demo request</h3>
<ul>
<li><strong>Purpose</strong>: handle your request and schedule a personalised demo.</li>
<li><strong>Legal basis</strong>: explicit consent and execution of pre-contractual measures.</li>
<li><strong>Retention</strong>: 3 years from the last contact or until you request erasure.</li>
</ul>

<h3>Newsletter / commercial communications</h3>
<ul>
<li><strong>Purpose</strong>: send you information about Flame, events, webinars and product updates.</li>
<li><strong>Legal basis</strong>: explicit consent (double opt-in).</li>
<li><strong>Retention</strong>: until you exercise your right of objection or unsubscribe.</li>
</ul>

<h3>Analytical cookies</h3>
<ul>
<li><strong>Purpose</strong>: measure website usage in an aggregated and anonymous way.</li>
<li><strong>Legal basis</strong>: explicit consent.</li>
<li><strong>Retention</strong>: depending on the cookie type, between 24 hours and 2 years.</li>
</ul>

<h2>Recipients and international transfers</h2>
<p>Flame may share your data with the following <strong>data processors</strong>, all bound by a written contract pursuant to article 28 GDPR:</p>
<ul>
<li>Hosting providers (servers in the EU).</li>
<li>Email marketing and CRM platforms (Brevo, HubSpot).</li>
<li>Anonymous analytics tools (Google Analytics 4 with IP anonymisation).</li>
</ul>
<p>No international transfers are carried out outside the EEA except to the United States, where providers are adhered to the <strong>EU-US Data Privacy Framework</strong>.</p>

<h2>Rights</h2>
<p>You can exercise the following rights at any time by writing to <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>:</p>
<ul>
<li><strong>Access</strong>: obtain confirmation of whether we process your data and, if so, a copy.</li>
<li><strong>Rectification</strong>: correct inaccurate or incomplete data.</li>
<li><strong>Erasure</strong>: request the deletion of your data.</li>
<li><strong>Objection</strong>: object to the processing on grounds relating to your particular situation.</li>
<li><strong>Restriction</strong>: request that we restrict processing in certain circumstances.</li>
<li><strong>Portability</strong>: receive your data in a structured, commonly used format.</li>
<li><strong>Not to be subject to automated decisions</strong>.</li>
</ul>

<h2>Right to lodge a complaint</h2>
<p>If you consider that the processing of your data does not comply with the regulations, you may file a complaint with the <strong>Spanish Data Protection Agency (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>.</p>
`;

export default function DetailedinformationEN() {
  return (
    <LegalTemplate
      enHref="/es/informacion-detallada/"
      title="Detailed information on data processing"
      lastUpdate="May 19, 2026"
      bodyHtml={body}
      currentLang="en"
    />
  );
}
