-- Tabla de etiquetado de casos de éxito (sector / producto / caso de uso) en el CMS.
-- Ejecutar UNA vez en el editor SQL de Supabase (proyecto Flame). Luego poblar con
-- scripts/casos-exito/upsert-tags.mjs. Clave = nombre (hay 3 casos aún sin slug).

create table if not exists public.case_study_tags (
  nombre        text primary key,
  slug          text        not null default '',
  sector        text[]      not null default '{}',
  productos     text[]      not null default '{}',
  casos_de_uso  text[]      not null default '{}',
  prioridad     int         not null default 0,
  pendiente     boolean     not null default false,
  nota          text        not null default '',
  updated_at    timestamptz not null default now()
);

alter table public.case_study_tags enable row level security;

-- Lectura pública (los tags no son datos sensibles; SSR con service_role igualmente bypassa RLS).
drop policy if exists "case_study_tags_read" on public.case_study_tags;
create policy "case_study_tags_read" on public.case_study_tags for select using (true);

-- La escritura queda solo para service_role (que bypassa RLS). No se crean políticas de escritura para anon.
