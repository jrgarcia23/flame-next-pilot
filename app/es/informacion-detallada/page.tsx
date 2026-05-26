import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Información detallada sobre el tratamiento de datos · Flame Analytics",
  description: "Información ampliada sobre el tratamiento de datos personales por Flame Analytics S.L., conforme al RGPD.",
};

const body = `
<p>Conforme al Reglamento General de Protección de Datos (RGPD), te facilitamos la siguiente información detallada sobre cómo Flame Analytics S.L. trata tus datos.</p>

<h2>Responsable del tratamiento</h2>
<ul>
<li><strong>Razón social</strong>: Flame Analytics S.L.</li>
<li><strong>CIF</strong>: B-XXXXXXXX</li>
<li><strong>Dirección</strong>: Madrid, España</li>
<li><strong>Email</strong>: <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a></li>
<li><strong>Delegado de Protección de Datos (DPO)</strong>: <a href="mailto:dpo@flameanalytics.com">dpo@flameanalytics.com</a></li>
</ul>

<h2>Finalidades específicas y base legal</h2>
<h3>Formulario de contacto / solicitud de demo</h3>
<ul>
<li><strong>Finalidad</strong>: gestionar tu solicitud y agendar la demo personalizada.</li>
<li><strong>Base legal</strong>: consentimiento explícito y ejecución de medidas precontractuales.</li>
<li><strong>Conservación</strong>: 3 años desde el último contacto o hasta que solicites su supresión.</li>
</ul>

<h3>Newsletter / comunicaciones comerciales</h3>
<ul>
<li><strong>Finalidad</strong>: enviarte información sobre Flame, eventos, webinars y novedades de producto.</li>
<li><strong>Base legal</strong>: consentimiento explícito (doble opt-in).</li>
<li><strong>Conservación</strong>: hasta que ejerzas tu derecho de oposición o te des de baja.</li>
</ul>

<h3>Cookies analíticas</h3>
<ul>
<li><strong>Finalidad</strong>: medir el uso del sitio de manera agregada y anónima.</li>
<li><strong>Base legal</strong>: consentimiento explícito.</li>
<li><strong>Conservación</strong>: según el tipo de cookie, entre 24 horas y 2 años.</li>
</ul>

<h2>Destinatarios y transferencias internacionales</h2>
<p>Flame puede compartir tus datos con los siguientes <strong>encargados del tratamiento</strong>, todos con contrato firmado conforme al artículo 28 del RGPD:</p>
<ul>
<li>Proveedores de alojamiento (servidores en la UE).</li>
<li>Plataformas de email marketing y CRM (Brevo, HubSpot).</li>
<li>Herramientas de analítica anónima (Google Analytics 4 con anonimización IP).</li>
</ul>
<p>No se realizan transferencias internacionales fuera del EEE salvo a Estados Unidos, donde los proveedores están adheridos al <strong>EU-US Data Privacy Framework</strong>.</p>

<h2>Derechos</h2>
<p>Puedes ejercer los siguientes derechos en cualquier momento dirigiéndote a <a href="mailto:privacy@flameanalytics.com">privacy@flameanalytics.com</a>:</p>
<ul>
<li><strong>Acceso</strong>: obtener confirmación de si tratamos datos tuyos y, en su caso, una copia.</li>
<li><strong>Rectificación</strong>: corregir datos inexactos o incompletos.</li>
<li><strong>Supresión</strong>: solicitar la eliminación de tus datos.</li>
<li><strong>Oposición</strong>: oponerte al tratamiento por motivos relacionados con tu situación particular.</li>
<li><strong>Limitación</strong>: solicitar que limitemos el tratamiento en determinados supuestos.</li>
<li><strong>Portabilidad</strong>: recibir tus datos en formato estructurado y de uso común.</li>
<li><strong>No ser objeto de decisiones automatizadas</strong>.</li>
</ul>

<h2>Reclamación ante la Autoridad de Control</h2>
<p>Si consideras que el tratamiento de tus datos no se ajusta a la normativa, puedes presentar reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>: <a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>.</p>
`;

export default function InformacionDetalladaDraft() {
  return (
    <LegalTemplate
      enHref="/en/detailed-information/"
      title="Información detallada sobre el tratamiento de datos"
      lastUpdate="19 de mayo de 2026"
      bodyHtml={body}
    />
  );
}
