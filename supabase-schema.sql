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

alter table public.leads enable row level security;

-- ============================================================
-- 2) Tabla event_registrations — inscripciones a Flame Talks / MAPIC / etc.
-- ============================================================
create table if not exists public.event_registrations (
  id            bigserial primary key,
  created_at    timestamptz default now() not null,
  nombre        text not null,
  empresa       text not null,
  email         text not null,
  cargo         text,
  sector        text,
  pais          text,
  mensaje       text,
  event_name    text not null,
  event_date    timestamptz,
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

create index if not exists events_created_at_idx  on public.event_registrations (created_at desc);
create index if not exists events_email_idx       on public.event_registrations (email);
create index if not exists events_event_name_idx  on public.event_registrations (event_name);
create index if not exists events_event_date_idx  on public.event_registrations (event_date desc);

alter table public.event_registrations enable row level security;

-- ============================================================
-- 3) Tabla webinar_registrations — inscripciones a webinars
-- ============================================================
create table if not exists public.webinar_registrations (
  id            bigserial primary key,
  created_at    timestamptz default now() not null,
  nombre        text not null,
  empresa       text not null,
  email         text not null,
  cargo         text,
  sector        text,
  pais          text,
  mensaje       text,
  webinar_name  text not null,
  webinar_date  timestamptz,
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

create index if not exists webinars_created_at_idx   on public.webinar_registrations (created_at desc);
create index if not exists webinars_email_idx        on public.webinar_registrations (email);
create index if not exists webinars_webinar_name_idx on public.webinar_registrations (webinar_name);
create index if not exists webinars_webinar_date_idx on public.webinar_registrations (webinar_date desc);

alter table public.webinar_registrations enable row level security;

-- ============================================================
-- 4) Tabla de auditoría de intentos de login al back office
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

-- ============================================================
-- Crear el usuario admin desde Auth > Users > Add user
-- Email: jrgarcia@flameanalytics.com
-- Password: el que JR elija. Confirmar email = true.
-- ============================================================
