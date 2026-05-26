import type { Metadata } from "next";
import LegalTemplate from "@/components/templates/LegalTemplate";

export const metadata: Metadata = {
  title: "Política de seguridad de la información · Flame Analytics",
  description: "Compromiso de Flame Analytics con la seguridad y privacidad de la información de clientes, usuarios y empleados.",
};

const body = `
<p>Flame Analytics considera la seguridad de la información como un elemento estratégico de su actividad. Esta política establece los principios sobre los que se sustenta su <strong>Sistema de Gestión de la Seguridad de la Información (SGSI)</strong>.</p>

<h2>1. Compromiso de la dirección</h2>
<p>La dirección de Flame se compromete a:</p>
<ul>
<li>Proteger la confidencialidad, integridad y disponibilidad de la información gestionada.</li>
<li>Cumplir la legislación vigente (RGPD, LOPDGDD, LSSI) y los estándares aplicables.</li>
<li>Asignar los recursos necesarios para la mejora continua del SGSI.</li>
</ul>

<h2>2. Principios</h2>
<ul>
<li><strong>Privacidad por diseño</strong>: el producto Flame no usa biometría ni identifica individualmente a las personas.</li>
<li><strong>Cifrado</strong> en tránsito (TLS 1.2+) y en reposo (AES-256) de todos los datos.</li>
<li><strong>Control de acceso</strong> por roles, con autenticación multifactor para personal interno.</li>
<li><strong>Auditoría continua</strong> de accesos, cambios de configuración y eventos de seguridad.</li>
<li><strong>Backups distribuidos</strong> con tests periódicos de restauración.</li>
<li><strong>Formación</strong> regular en seguridad para todo el equipo.</li>
</ul>

<h2>3. Gestión de incidentes</h2>
<p>Flame mantiene un proceso documentado de gestión de incidentes que incluye detección, respuesta, contención, erradicación y revisión post-incidente. Los clientes son notificados sin demora injustificada cuando un incidente afecta a sus datos.</p>

<h2>4. Cumplimiento normativo</h2>
<p>El SGSI de Flame está alineado con los marcos de referencia <strong>ISO 27001</strong> y los principios del <strong>RGPD</strong>. Los datos personales se procesan únicamente en servidores ubicados en la Unión Europea.</p>

<h2>5. Revisión</h2>
<p>Esta política se revisa anualmente y siempre que se produzca un cambio significativo en el contexto regulatorio, técnico u organizativo.</p>

<h2>6. Contacto</h2>
<p>Para consultas sobre esta política o sobre el SGSI: <a href="mailto:security@flameanalytics.com">security@flameanalytics.com</a>.</p>
`;

export default function PoliticaSeguridadInfoDraft() {
  return (
    <LegalTemplate
      enHref="/en/information-security/"
      title="Política de seguridad de la información"
      lastUpdate="19 de mayo de 2026"
      bodyHtml={body}
    />
  );
}
