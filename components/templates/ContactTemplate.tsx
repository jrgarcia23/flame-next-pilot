import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";

export default function ContactTemplate({ enHref }: { enHref: string }) {
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: "url('/wp-content/uploads/2026/01/Traffic2-1.png')",
          backgroundPosition: "center top", backgroundSize: "cover", backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(56px, 6vw, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgb(21 22 58 / 0.7) 0%, rgb(21 22 58 / 0.85) 60%, var(--color-navy) 100%)" }} />
        <div className="flame-container relative z-10 text-center">
          <h1 className="text-[clamp(40px,5.2vw,68px)] font-normal mx-auto mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)", maxWidth: "22ch" }}>
            Hablemos sobre <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>tu proyecto</span>
          </h1>
          <p className="mx-auto text-[clamp(17px,1.35vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch" }}>
            20 minutos con nuestro equipo de producto. Te explicamos cómo Flame se conecta a tus cámaras existentes y empieza a entregar datos en 7 días.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            {/* Info col */}
            <div className="flex flex-col gap-10">
              <div>
                <h2 className="text-[clamp(28px,2.6vw,36px)] font-normal mb-4" style={{ color: "var(--color-navy)", letterSpacing: "-0.015em", fontFamily: "var(--font-display)", lineHeight: 1.15 }}>
                  Demo personalizada
                </h2>
                <p className="text-[16px] leading-[1.65]" style={{ color: "var(--color-ink-2)" }}>
                  Te enseñamos Flame funcionando con un caso real similar al tuyo. Sin compromiso, sin venta dura, con un experto que conoce tu sector.
                </p>
              </div>
              <ul className="flex flex-col gap-5">
                {[
                  { icon: "calendar", title: "20 minutos en agenda", desc: "Reservas online. Te confirmamos hueco en menos de 24 h." },
                  { icon: "users",    title: "Caso real de tu sector", desc: "Un cliente similar al tuyo, mismo tipo de espacio." },
                  { icon: "convert",  title: "Roadmap y ROI estimado", desc: "Salimos de la llamada con números y siguientes pasos." },
                  { icon: "privacy",  title: "Cero spam", desc: "Solo te escribimos para coordinar la demo. Tu email no entra en ningún drip." },
                ].map((it) => (
                  <li key={it.title} className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center rounded-[12px]" style={{ width: 44, height: 44, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                      <Icon name={it.icon} className="w-5 h-5" />
                    </span>
                    <div>
                      <strong className="block text-[16px]" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em" }}>{it.title}</strong>
                      <span className="block text-[14.5px] mt-1" style={{ color: "var(--color-ink-2)" }}>{it.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t" style={{ borderColor: "var(--color-rule)" }}>
                <p className="text-[14px]" style={{ color: "var(--color-ink-3)" }}>
                  Si prefieres email: <a href="mailto:hello@flameanalytics.com" style={{ color: "var(--color-accent-deep)", fontWeight: 600 }}>hello@flameanalytics.com</a>
                </p>
                <p className="mt-2 text-[14px]" style={{ color: "var(--color-ink-3)" }}>
                  Oficinas: Madrid · Barcelona · Ciudad de México
                </p>
              </div>
            </div>

            {/* Form col */}
            <form className="rounded-2xl p-8" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)" }}>
              <h3 className="text-[22px] font-medium mb-6" style={{ color: "var(--color-navy)", letterSpacing: "-0.008em", fontFamily: "var(--font-display)" }}>
                Solicita una demo
              </h3>
              <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <input className="cf-in col-span-2" type="text" placeholder="Nombre y apellido" required />
                <input className="cf-in" type="email" placeholder="Email corporativo" required />
                <input className="cf-in" type="text" placeholder="Empresa" required />
                <input className="cf-in" type="text" placeholder="Cargo" />
                <select className="cf-in" defaultValue=""><option value="" disabled>Sector</option><option>Retail</option><option>Centros comerciales</option><option>Hostelería</option><option>Espacios públicos</option><option>Otro</option></select>
                <input className="cf-in col-span-2" type="text" placeholder="País" required />
                <select className="cf-in col-span-2" defaultValue=""><option value="" disabled>Número de ubicaciones</option><option>1</option><option>2-10</option><option>11-50</option><option>51-200</option><option>200+</option></select>
                <textarea className="cf-in col-span-2" placeholder="Cuéntanos brevemente qué buscas" rows={3}></textarea>
                <label className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2" style={{ color: "var(--color-ink-3)" }}>
                  <input type="checkbox" className="mt-1" style={{ accentColor: "var(--color-accent)" }} required />
                  <span>Acepto recibir comunicaciones de Flame y he leído la <a href="/es/politica-de-privacidad-draft/" style={{ color: "var(--color-accent-deep)", borderBottom: "1px solid currentColor" }}>política de privacidad</a>.</span>
                </label>
                <button type="button" className="col-span-2 mt-3 cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "var(--color-navy)", justifyContent: "center" }}>
                  Solicitar una demo <Icon name="arrow" className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 15.5px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          textarea.cf-in { min-height: 96px; resize: vertical; line-height: 1.5; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
