import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Privacy Policy · Flame Analytics",
  description: "How Flame Analytics S.L. processes your personal data, with GDPR respect and by design.",
};

const body = `
<p><em>Placeholder — final legal copy pending from client. Replace with the official Privacy Policy approved by Flame Analytics legal team.</em></p>

<p><strong>Flame Analytics S.L.</strong> (hereinafter "Flame") is the controller of the personal data collected through this website.</p>

<h2>1. Data we collect</h2>
<p>We collect only the personal data you voluntarily provide through forms on the site (name, email, company, role, country) and technical browsing data (IP, browser, language) processed anonymously to improve the service.</p>

<h2>2. Purpose of processing</h2>
<ul>
<li>Handle your information, demo and support requests.</li>
<li>Send you commercial communications related to Flame, with your explicit consent.</li>
<li>Analyze website usage in aggregate, anonymous form.</li>
</ul>

<h2>3. Legal basis</h2>
<p>Processing is based on <strong>your explicit consent</strong> and, in some cases, on Flame's legitimate interest in maintaining commercial relationships.</p>

<h2>4. Data retention</h2>
<p>We keep your data only as long as needed for the stated purpose, or as required by law. You can request deletion at any time.</p>

<h2>5. Recipients</h2>
<p>We do not share your data with third parties except for technical service providers (hosting, email, CRM) bound by confidentiality and equivalent data protection agreements.</p>

<h2>6. International transfers</h2>
<p>Some service providers operate outside the EU. In those cases, transfers are protected by Standard Contractual Clauses approved by the European Commission.</p>

<h2>7. Your rights</h2>
<p>You may exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>.</p>

<h2>8. Authority</h2>
<p>If you believe your rights have not been duly addressed, you may file a complaint with the Spanish Data Protection Agency (AEPD), <a href="https://www.aepd.es" target="_blank">www.aepd.es</a>.</p>
`;

export default function PrivacypolicyEN() {
  return (
    <LegalTemplate
      enHref="/es/politica-de-privacidad/"
      title="Privacy Policy"
      lastUpdate="May 19, 2026"
      bodyHtml={body}
      currentLang="en"
    />
  );
}
