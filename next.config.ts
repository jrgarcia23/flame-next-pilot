import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modo híbrido: páginas marketing siguen estáticas (default Next), /admin y /api son dinámicos.
  // Sin output:"export" para soportar route handlers y Supabase Auth con cookies (sistema leads).
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
