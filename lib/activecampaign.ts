// Alta de inscritos en ActiveCampaign (solo servidor).
// Las listas y la etiqueta de cada webinar se deciden aquí, nunca desde el navegador.
import "server-only";

type WebinarAcConfig = {
  /** El webinar_name enviado por el formulario empieza por este texto */
  match: string;
  /** Listas a las que se suscribe al inscrito (3 = Master Contact List, 9 = Webinar) */
  listIds: number[];
  /** Etiqueta que dispara el flujo de inscritos en AC */
  tagId: number;
  /** Flujo de inscritos: si no está activo, la web envía su propia confirmación */
  automationId: number;
  /** Idioma del auto-reply de respaldo si AC falla */
  lang: "en" | "es";
  /** Datos para el auto-reply de respaldo */
  when?: string;
  joinLinks?: { label: string; url: string }[];
};

const WEBINARS: WebinarAcConfig[] = [
  { match: "Beyond Connectivity", listIds: [3, 9], tagId: 42, automationId: 53, lang: "en",
    when: "Thursday 15 October 2026, 16:00 CEST (15:00 UK)",
    joinLinks: [
      { label: "Watch live on YouTube", url: "https://www.youtube.com/watch?v=jq_-DyIXUdc" },
      { label: "Watch live on LinkedIn", url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7508075909225250816/" },
    ] },
];

export function getWebinarAcConfig(webinarName: string): WebinarAcConfig | null {
  return WEBINARS.find((w) => webinarName.startsWith(w.match)) ?? null;
}

async function acFetch(path: string, body: unknown) {
  const base = process.env.ACTIVECAMPAIGN_API_URL; // p. ej. https://flameanalytics.api-us1.com/api/3
  const key = process.env.ACTIVECAMPAIGN_API_KEY;
  if (!base || !key) throw new Error("ActiveCampaign no configurado");
  const res = await fetch(`${base.replace(/\/$/, "")}${path}`, {
    method: "POST",
    headers: { "Api-Token": key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`AC ${path} ${res.status}`);
  return data;
}

/** true si el flujo de inscritos está activo en AC (status 1). Ante cualquier duda devuelve false. */
export async function isAutomationActive(id: number): Promise<boolean> {
  const base = process.env.ACTIVECAMPAIGN_API_URL;
  const key = process.env.ACTIVECAMPAIGN_API_KEY;
  if (!base || !key) return false;
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/automations/${id}`, {
      headers: { "Api-Token": key },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = await res.json();
    return String(data?.automation?.status) === "1";
  } catch {
    return false;
  }
}

/** Crea o actualiza el contacto, lo suscribe a las listas y le pone la etiqueta. Devuelve true si todo fue bien. */
export async function syncWebinarRegistration(
  cfg: WebinarAcConfig,
  p: { email: string; nombre: string }
): Promise<boolean> {
  const [firstName, ...rest] = p.nombre.trim().split(/\s+/);
  const { contact } = await acFetch("/contact/sync", {
    contact: { email: p.email, firstName: firstName || "", lastName: rest.join(" ") },
  });
  const contactId = contact?.id;
  if (!contactId) throw new Error("AC sin id de contacto");
  for (const list of cfg.listIds) {
    await acFetch("/contactLists", { contactList: { list, contact: contactId, status: 1 } });
  }
  // La etiqueta va al final: es la que dispara el flujo de inscritos, así el contacto ya está en las listas.
  await acFetch("/contactTags", { contactTag: { contact: contactId, tag: cfg.tagId } });
  return true;
}
