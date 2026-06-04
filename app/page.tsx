// Fallback de la raíz. El middleware.ts ya redirige a /es/ o /en/ según Accept-Language,
// pero si por cualquier motivo el middleware no se ejecuta (p.ej. archivo estático sin middleware),
// este page.tsx sirve un redirect noscript a /en/ como default.
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Flame Analytics",
  description: "Empowering physical spaces.",
};

export default function RootPage() {
  redirect("/en/");
}
