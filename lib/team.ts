// Datos del equipo Flame (13 miembros, orden del demo).
// Fotos servidas desde Supabase Storage CDN (los ficheros nunca se migraron a public/;
// daban 4XX — auditoría SE Ranking 2026-07-13).

export type TeamMember = {
  name: string;
  roleEs: string;
  roleEn: string;
  photo: string;
};

export const TEAM: TeamMember[] = [
  { name: "Jonathan Solís",        roleEs: "CEO",                                roleEn: "CEO",                                  photo: "/media/2026/01/ceo2.webp" },
  { name: "David Zapico",          roleEs: "CTO",                                roleEn: "CTO",                                  photo: "/media/2026/01/David-Flame-analytics-1-e1715850381974.webp" },
  { name: "Laura Álvarez",         roleEs: "Growth Marketing Manager",           roleEn: "Growth Marketing Manager",             photo: "/media/2026/01/Laura-1.webp" },
  { name: "Óscar García Marín",    roleEs: "Gestor de cuentas estratégicas",     roleEn: "Strategic Account Manager",            photo: "/media/2026/01/Oscar-1.webp" },
  { name: "Jorge Sariego",         roleEs: "Sales Development Representative",   roleEn: "Sales Development Representative",     photo: "/media/2026/01/Jorge-1.webp" },
  { name: "Ramón Martínez Pérez",  roleEs: "Jefe de Operaciones",                roleEn: "Head of Operations",                   photo: "/media/2026/01/ramon-1.webp" },
  { name: "Álvaro García-Hoz",     roleEs: "Country Manager Reino Unido",        roleEn: "Country Manager UK",                   photo: "/media/2026/01/Captura-de-pantalla-2022-09-14-a-las-9.27.38.webp" },
  { name: "Carlos Gómez",          roleEs: "CCO",                                roleEn: "CCO",                                  photo: "/media/2026/01/Carlos-1.webp" },
  { name: "Elena Sampedro",        roleEs: "Key Account Manager",                roleEn: "Key Account Manager",                  photo: "/media/2026/01/Elena-1.webp" },
  { name: "Arturo Rodríguez del Amo", roleEs: "Socio inversor y asesor",         roleEn: "Investor & Advisor",                   photo: "/media/2026/01/equipo.webp" },
  { name: "Fernando Colunga",      roleEs: "Socio inversor y asesor",            roleEn: "Investor & Advisor",                   photo: "/media/2026/01/fernando-colunga2.webp" },
  { name: "Esteban Tognini",       roleEs: "Director General para América",      roleEn: "General Manager Americas",             photo: "/media/2026/01/Esteban_Tognini-1.webp" },
  { name: "Gerardo Casares",       roleEs: "Socio inversor y asesor",            roleEn: "Investor & Advisor",                   photo: "/media/2026/01/IMG_6529.webp" },
];
