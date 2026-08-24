"use client";

/**
 * HeroVideo — vídeo demo del hero de la home con dieta de peso:
 *
 * - UNA sola <source> mp4 (antes webm 5,3 MB + mp4 3,9 MB: los dos se
 *   descargaban y duplicaban el peso de la home móvil).
 * - preload="none" + poster WebP ligero (52 KB): el poster pinta el hero
 *   al instante sin descargar ni un byte de vídeo.
 * - La descarga/reproducción arranca cuando el vídeo entra en viewport
 *   (mismo patrón IntersectionObserver + fallback por timeout que usa
 *   AnimatedDashboardImage.tsx). En desktop entra en view de inmediato,
 *   así que el comportamiento percibido no cambia; en móvil el mp4 no
 *   se descarga hasta que el usuario llega al vídeo.
 */

import { useEffect, useRef } from "react";

export default function HeroVideo({
  srcMp4,
  poster,
}: {
  srcMp4: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      // play() con preload="none" dispara la descarga y reproduce.
      // Si el navegador bloquease el autoplay, se queda el poster (inocuo).
      video.play().catch(() => {});
    };
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px 200px 0px", threshold: 0.1 }
    );
    obs.observe(video);
    // Fallback: si el observer no dispara (scroll raro, tamaños extraños),
    // arrancamos a los 4 s para no dejar el vídeo congelado en el poster.
    const fallback = window.setTimeout(start, 4000);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="w-full h-auto block"
      preload="none"
      poster={poster}
      loop
      muted
      playsInline
      controlsList="nodownload"
      style={{ aspectRatio: "1280 / 720" }}
    >
      <source src={srcMp4} type="video/mp4" />
    </video>
  );
}
