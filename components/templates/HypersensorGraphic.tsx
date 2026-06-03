/* ============================================================
   HypersensorGraphic — PNG original + overlay SVG con líneas animadas
   El PNG (Group-281-1-1.png) tiene los iconos, el HyperSensor central y el FLAME dashboard.
   El SVG superpuesto traza paths transparentes alineados con las líneas dotted del PNG
   y las anima con stroke-dashoffset, dando sensación de flujo de datos.
   viewBox elegido con la misma aspect ratio que el PNG (~1000 × 720).
   ============================================================ */
export default function HypersensorGraphic() {
  return (
    <div className="hyp-gfx" aria-hidden>
      {/* PNG original — todos los iconos, el HyperSensor central y el FLAME dashboard */}
      <img
        src="/wp-content/uploads/2026/01/Group-281-1-1.png"
        alt=""
        className="hyp-png"
      />
      {/* Overlay SVG — solo las líneas animadas, alineadas con las del PNG */}
      <svg viewBox="0 0 1000 720" xmlns="http://www.w3.org/2000/svg" className="hyp-overlay" preserveAspectRatio="none">
        {/* 4 INPUTS hacia el HyperSensor (centro a ~580, 360). Misma curvatura y dirección que el PNG. */}
        <path className="flow-in" d="M 305 175 Q 420 220 540 360" />
        <path className="flow-in" d="M 285 360 Q 410 360 555 380" />
        <path className="flow-in" d="M 355 545 Q 450 470 560 400" />
        <path className="flow-in" d="M 510 640 Q 540 530 575 410" />
        {/* 3 OUTPUTS desde el HyperSensor hacia el FLAME dashboard (derecha). */}
        <path className="flow-out" d="M 605 365 Q 720 270 840 200" />
        <path className="flow-out" d="M 605 380 Q 720 380 840 380" />
        <path className="flow-out" d="M 605 400 Q 720 510 840 560" />
      </svg>

      <style>{`
        .hyp-gfx { position: relative; width: 100%; }
        .hyp-png { display: block; width: 100%; height: auto; }
        .hyp-overlay {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }
        .flow-in, .flow-out {
          fill: none;
          stroke-linecap: round;
          stroke-width: 2;
          stroke-dasharray: 4 9;
        }
        .flow-in {
          stroke: #31B1F8;
          opacity: 0.95;
          animation: hyp-flow 1.6s linear infinite;
        }
        .flow-out {
          stroke: #31B1F8;
          opacity: 0.95;
          animation: hyp-flow 1.2s linear infinite;
        }
        @keyframes hyp-flow {
          to { stroke-dashoffset: -26; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-in, .flow-out { animation: none; }
        }
      `}</style>
    </div>
  );
}
