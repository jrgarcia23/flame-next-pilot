import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Política de cookies · Flame Analytics",
  description: "Tipos de cookies que usamos en flameanalytics.com y cómo gestionarlas.",
};

const body = `
<p>Esta política explica qué son las cookies, cuáles usamos en <strong>flameanalytics.com</strong>, con qué finalidad y cómo puedes gestionarlas o desactivarlas.</p>

<h2>1. Qué son las cookies</h2>
<p>Las cookies son pequeños archivos que se descargan en tu dispositivo al visitar un sitio web. Permiten al sitio recordar tu acción y preferencia (idioma, sesión, configuración) durante un periodo de tiempo.</p>

<h2>2. Tipos de cookies que utilizamos</h2>
<ul>
<li><strong>Técnicas</strong> (siempre activas): necesarias para el funcionamiento del sitio.</li>
<li><strong>Preferencias</strong>: recuerdan opciones como idioma o región.</li>
<li><strong>Analíticas</strong>: nos permiten conocer cómo se usa el sitio (de forma agregada y anónima).</li>
<li><strong>Marketing</strong>: si das consentimiento, sirven para ofrecerte publicidad relevante.</li>
</ul>

<h2>3. Gestión del consentimiento</h2>
<p>Al entrar en el sitio te mostramos un banner para que decidas qué categorías aceptas. Puedes <strong>cambiar tu decisión en cualquier momento</strong> desde el enlace "Gestionar cookies" en el footer.</p>

<h2>4. Cookies de terceros</h2>
<p>El sitio puede usar servicios de terceros (Google Analytics, Meta, LinkedIn Insight Tag) que instalan sus propias cookies. Estos servicios solo se activan tras tu consentimiento explícito.</p>

<h2>5. Desactivar cookies</h2>
<p>Puedes desactivar las cookies desde la configuración de tu navegador. Ten en cuenta que algunas funcionalidades del sitio pueden no operar correctamente.</p>

<h2>6. Contacto</h2>
<p>Para cualquier duda sobre esta política, escríbenos a <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>.</p>
`;

export default function PoliticaCookiesDraft() {
  return (
    <LegalTemplate
      enHref="/en/cookie-policy/"
      title="Política de cookies"
      lastUpdate="19 de mayo de 2026"
      bodyHtml={body}
    />
  );
}
