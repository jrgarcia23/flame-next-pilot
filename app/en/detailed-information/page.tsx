import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Detailed information on data processing · Flame Analytics",
  description: "Detailed information on the processing of personal data at Flame Analytics, in compliance with GDPR.",
};

const body = `
<p><em>Placeholder — final legal copy pending from client. Replace with the official detailed information approved by Flame Analytics legal team.</em></p>

<p>In compliance with articles 13 and 14 of the General Data Protection Regulation, we provide detailed information on the processing of your personal data.</p>

<h2>Data controller</h2>
<p><strong>Flame Analytics S.L.</strong> · CIF B-XXXXXXXX · Address: Madrid, Spain · Email: <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a></p>

<h2>Purposes</h2>
<ul>
<li>Handle commercial and support requests received through forms.</li>
<li>Send commercial communications about products, events and content with your consent.</li>
<li>Analyze website usage in anonymous, aggregate form.</li>
</ul>

<h2>Legal basis</h2>
<p>Explicit consent (commercial communications) and legitimate interest (commercial inquiries, technical analytics).</p>

<h2>Retention</h2>
<p>The data is kept for as long as necessary to fulfill the stated purposes and during the legal liability periods, after which it is deleted or anonymized.</p>

<h2>Recipients</h2>
<p>We do not transfer data to third parties except for service providers (hosting, email, CRM, BI) bound by data protection contracts. International transfers are protected by Standard Contractual Clauses.</p>

<h2>Rights</h2>
<p>Access, rectification, erasure, objection, restriction, portability and not to be subject to automated decisions. Exercisable by writing to <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>, accompanied by an ID.</p>

<h2>Authority</h2>
<p>Spanish Data Protection Agency (AEPD) · <a href="https://www.aepd.es" target="_blank">www.aepd.es</a></p>
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
