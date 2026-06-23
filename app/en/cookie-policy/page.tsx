import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Cookie Policy · Flame Analytics",
  description: "How Flame Analytics uses cookies and similar technologies on this site.",
  alternates: {
    canonical: "/en/cookie-policy/",
    languages: {
    en: "/en/cookie-policy/",
    es: "/es/politica-de-cookies/",
    "x-default": "/es/politica-de-cookies/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/cookie-policy/",
    siteName: "Flame Analytics",
    title: "Cookie Policy · Flame Analytics",
    description: "How Flame Analytics uses cookies and similar technologies on this site.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy · Flame Analytics",
    description: "How Flame Analytics uses cookies and similar technologies on this site.",
  },
};

const body = `
<p>This Cookie Policy explains what cookies are, what types we use on flameanalytics.com, and how you can manage them.</p>

<h2>Data controller</h2>
<ul>
<li><strong>Legal name</strong>: Flame Analytics S.L.</li>
<li><strong>Tax ID (CIF)</strong>: B52543691</li>
<li><strong>Address</strong>: Espacio Tecnológico Molinón, El Molinón 100, 33203 Gijón, Asturias, Spain</li>
<li><strong>Phone</strong>: +34 984 19 14 05</li>
<li><strong>Email</strong>: <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a></li>
</ul>

<h2>1. What are cookies?</h2>
<p>Cookies are small text files stored on your device when you visit a website. They serve different purposes: keeping you logged in, remembering preferences, measuring usage or showing relevant ads.</p>

<h2>2. Types of cookies we use</h2>
<ul>
<li><strong>Strictly necessary</strong>: required for the site to work (session, security, language). Cannot be disabled.</li>
<li><strong>Analytics</strong>: aggregate measurement of site usage (Google Analytics, internal). Anonymous data, only with your consent.</li>
<li><strong>Marketing</strong>: measure campaign effectiveness and show relevant content. Only with your consent.</li>
</ul>

<h2>3. Third-party cookies</h2>
<p>Some cookies are set by third-party services (Google, LinkedIn, HubSpot) for embedded content or analytics. They are subject to their own privacy policies.</p>

<h2>4. Managing cookies</h2>
<p>You can accept, configure or reject non-essential cookies through the banner shown on first visit. You can change your preferences at any time from the link in the footer.</p>

<h2>5. Browser settings</h2>
<p>You can also block or delete cookies from your browser. Note that disabling strictly necessary cookies may affect the site's operation.</p>

<h2>6. Contact</h2>
<p>For questions about this policy, write to <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>.</p>
`;

export default function CookiepolicyEN() {
  return (
    <LegalTemplate
      enHref="/es/politica-de-cookies/"
      title="Cookie Policy"
      lastUpdate="May 19, 2026"
      bodyHtml={body}
      currentLang="en"
    />
  );
}
