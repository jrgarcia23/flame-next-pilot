import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Terms of Use · Flame Analytics",
  description: "General terms and conditions for the use of the Flame Analytics website.",
};

const body = `
<p><em>Placeholder — final legal copy pending from client. Replace with the official Terms of Use approved by Flame Analytics legal team.</em></p>

<p>These terms govern the use of the flameanalytics.com website, owned by <strong>Flame Analytics S.L.</strong></p>

<h2>1. Object</h2>
<p>The website provides information about Flame's products, services and content. Use of the site implies full acceptance of these terms.</p>

<h2>2. Authorized use</h2>
<p>You may navigate, consult and download content for personal, non-commercial use. Reproduction, distribution or modification of content without express written permission is prohibited.</p>

<h2>3. Intellectual property</h2>
<p>All content (texts, images, logos, software) is the property of Flame Analytics S.L. or its licensors and is protected by intellectual property laws.</p>

<h2>4. Liability</h2>
<p>Flame is not responsible for indirect damages arising from the use of the website, content errors or service interruptions due to causes beyond its control.</p>

<h2>5. Modifications</h2>
<p>Flame may modify these terms at any time, publishing the updated version on this page. Continued use of the site implies acceptance of the changes.</p>

<h2>6. Applicable law</h2>
<p>These terms are governed by Spanish law. Any dispute will be submitted to the courts of Madrid.</p>

<h2>7. Contact</h2>
<p>For questions about these terms, write to <a href="mailto:legal@flameanalytics.com">legal@flameanalytics.com</a>.</p>
`;

export default function TermsofuseEN() {
  return (
    <LegalTemplate
      enHref="/es/condiciones-de-uso/"
      title="Terms of Use"
      lastUpdate="May 19, 2026"
      bodyHtml={body}
      currentLang="en"
    />
  );
}
