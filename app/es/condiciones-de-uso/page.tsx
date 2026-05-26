import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Condiciones de uso · Flame Analytics",
  description: "Condiciones generales de uso del sitio web de Flame Analytics.",
};

const body = `
<p>El uso de este sitio web (flameanalytics.com) implica la aceptación de las presentes condiciones por parte del usuario.</p>

<h2>1. Identificación del titular</h2>
<p><strong>Flame Analytics S.L.</strong>, con CIF B-XXXXXXXX y domicilio en Madrid, es titular del sitio web flameanalytics.com.</p>

<h2>2. Acceso al sitio</h2>
<p>El acceso al sitio es gratuito y libre. Algunas áreas pueden requerir registro previo. El usuario se compromete a usar el sitio de buena fe y a no realizar acciones que pongan en riesgo su funcionamiento.</p>

<h2>3. Propiedad intelectual</h2>
<p>Todos los contenidos del sitio (textos, imágenes, código, marca) son propiedad de Flame Analytics o de terceros con los que existe acuerdo. Queda prohibida su reproducción, distribución o modificación sin autorización expresa.</p>

<h2>4. Responsabilidad</h2>
<p>Flame se esfuerza por mantener la información del sitio actualizada y precisa, pero no garantiza la inexistencia de errores. Flame no será responsable de los daños derivados del uso del sitio cuando deriven de causas ajenas.</p>

<h2>5. Enlaces a terceros</h2>
<p>El sitio puede contener enlaces a sitios web de terceros. Flame no controla ni asume responsabilidad sobre los contenidos de dichos sitios.</p>

<h2>6. Modificación de las condiciones</h2>
<p>Flame se reserva el derecho a modificar estas condiciones en cualquier momento. Las modificaciones serán efectivas desde su publicación.</p>

<h2>7. Legislación aplicable</h2>
<p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Madrid.</p>
`;

export default function CondicionesUsoDraft() {
  return (
    <LegalTemplate
      enHref="/en/terms-of-use/"
      title="Condiciones de uso"
      lastUpdate="19 de mayo de 2026"
      bodyHtml={body}
    />
  );
}
