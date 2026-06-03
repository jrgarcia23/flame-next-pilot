-- ============================================================
-- Flame Analytics — schema Supabase para el sistema de leads + admin
-- Ejecutar este SQL en el proyecto Supabase flame-leads una sola vez.
-- ============================================================

-- 1) Tabla principal de leads del formulario público
create table if not exists public.leads (
  id            bigserial primary key,
  created_at    timestamptz default now() not null,
  nombre        text not null,
  empresa       text not null,
  email         text not null,
  telefono      text,
  pais          text,
  sector        text,
  mensaje       text,
  pagina        text,
  page_url      text,
  page_path     text,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,
  gclid         text,
  fbclid        text,
  msclkid       text,
  source        text,
  medium        text,
  campaign      text,
  ga_client_id  text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx      on public.leads (email);
create index if not exists leads_pagina_idx     on public.leads (pagina);
create index if not exists leads_source_idx     on public.leads (source);

-- RLS: bloqueamos todo. Solo se accede vía service_role desde el server.
alter table public.leads enable row level security;
-- Sin policies = solo service_role puede leer/escribir. OK para admin.

-- ============================================================
-- 2) Tabla de auditoría de intentos de login al back office
-- Usada por checkLockout / recordAttempt en lib/admin-auth.ts
-- ============================================================
create table if not exists public.admin_auth_attempts (
  id            bigserial primary key,
  email         text not null,
  ip            text not null,
  success       boolean not null,
  attempted_at  timestamptz default now() not null
);

create index if not exists admin_auth_email_idx     on public.admin_auth_attempts (email, attempted_at desc);
create index if not exists admin_auth_ip_idx        on public.admin_auth_attempts (ip, attempted_at desc);
create index if not exists admin_auth_attempted_idx on public.admin_auth_attempts (attempted_at desc);

alter table public.admin_auth_attempts enable row level security;
-- Solo service_role.

-- ============================================================
-- 3) Crear el usuario admin de back office
-- Hacerlo desde el dashboard Supabase: Auth > Users > Add user
-- Email: jrgarcia@flameanalytics.com (o el que esté en ADMIN_ALLOWED_EMAILS)
-- Password: el que JR elija. Confirmar email = true.
-- ============================================================

-- Limpieza opcional (no usar en prod):
-- truncate public.leads;
-- truncate public.admin_auth_attempts;
