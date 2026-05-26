import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Política de privacidad · Flame Analytics",
  description: "Cómo Flame Analytics S.L. trata tus datos personales, con respeto al RGPD y por diseño.",
};

const body = `
<p><strong>Flame Analytics S.L.</strong>, con CIF B-XXXXXXXX y domicilio en Madrid (en adelante, "Flame"), es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.</p>

<h2>1. Datos que recopilamos</h2>
<p>Recogemos únicamente los datos personales que nos proporcionas voluntariamente a través de los formularios del sitio (nombre, email, empresa, cargo, país) y datos técnicos de navegación (IP, navegador, idioma) que tratamos de forma anónima para mejorar el servicio.</p>

<h2>2. Finalidad del tratamiento</h2>
<ul>
<li>Atender tus solicitudes de información, demos y soporte.</li>
<li>Enviarte comunicaciones comerciales relacionadas con Flame, si has dado consentimiento explícito.</li>
<li>Analizar el uso del sitio web de manera agregada y anónima.</li>
</ul>

<h2>3. Base legal</h2>
<p>El tratamiento se basa en <strong>tu consentimiento explícito</strong> y, en algunos casos, en el interés legítimo de Flame para mantener relaciones comerciales.</p>

<h2>4. Conservación de datos</h2>
<p>Conservamos tus datos durante el tiempo necesario para cumplir las finalidades indicadas y, en cualquier caso, mientras no solicites su supresión. Los datos analíticos agregados se conservan de forma indefinida.</p>

<h2>5. Destinatarios</h2>
<p>Tus datos no se ceden a terceros salvo cuando exista una obligación legal. Pueden ser procesados por proveedores de servicios contratados por Flame (alojamiento, email marketing, CRM) que cumplen los requisitos del RGPD.</p>

<h2>6. Derechos</h2>
<p>En cualquier momento puedes ejercer los derechos de <strong>acceso, rectificación, supresión, oposición, portabilidad y limitación</strong> del tratamiento dirigiendo un email a <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>.</p>
<p>También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>

<h2>7. Sin biometría</h2>
<p>El producto Flame procesa <strong>siluetas anónimas en vídeo</strong>, sin reconocimiento facial ni identificación individual. No utilizamos datos biométricos. Esto se aplica tanto a este sitio web como a los servicios que prestamos a nuestros clientes.</p>

<h2>8. Cambios en esta política</h2>
<p>Flame se reserva el derecho a modificar esta política para adaptarla a novedades legislativas o jurisprudenciales. Te recomendamos revisarla periódicamente.</p>
`;

export default function PoliticaPrivacidadDraft() {
  return (
    <LegalTemplate
      enHref="/en/privacy-policy/"
      title="Política de privacidad"
      lastUpdate="19 de mayo de 2026"
      bodyHtml={body}
    />
  );
}
