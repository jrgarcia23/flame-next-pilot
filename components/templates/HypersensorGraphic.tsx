/* ============================================================
   HypersensorGraphic — gráfico animado del flujo de datos
   Iconos (Video AI, People Counting, WiFi/BLE, IoT) → HyperSensor central → FLAME dashboard
   Líneas SVG con stroke-dashoffset animado (flujo entrante a 1.6s, saliente a 1.2s)
   ============================================================ */
export default function HypersensorGraphic() {
  return (
    <div className="hyp-gfx" aria-hidden>
      <svg viewBox="0 0 1000 720" xmlns="http://www.w3.org/2000/svg" className="hyp-svg">
        {/* Líneas con flujo: 4 INPUT → HyperSensor (con clase 'flow-in') + 1 OUTPUT → Dashboard (clase 'flow-out') */}
        <path className="flow-in" d="M 270 175 Q 380 220 500 380" />
        <path className="flow-in" d="M 250 360 Q 380 360 500 380" />
        <path className="flow-in" d="M 320 545 Q 410 470 500 400" />
        <path className="flow-in" d="M 470 640 Q 500 530 520 410" />
        <path className="flow-out" d="M 590 380 Q 720 360 830 360" />

        {/* === NODO VIDEO AI === */}
        <g transform="translate(220, 130)">
          <circle r="44" fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
          {/* Camera icon */}
          <g transform="translate(-14, -10) scale(1.4)" fill="#31B1F8">
            <rect x="0" y="0" width="20" height="14" rx="2" />
            <polygon points="20,3 28,0 28,14 20,11" />
          </g>
          <text x="0" y="68" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-body)" fontWeight="600">Video AI</text>
        </g>

        {/* === NODO PEOPLE COUNTING === */}
        <g transform="translate(200, 350)">
          <circle r="44" fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
          {/* Person in box icon */}
          <g transform="translate(-14, -14)">
            <rect x="0" y="0" width="28" height="28" rx="3" fill="none" stroke="#31B1F8" strokeWidth="2" />
            <circle cx="14" cy="11" r="3.5" fill="#31B1F8" />
            <path d="M 7 24 Q 14 18 21 24" fill="none" stroke="#31B1F8" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          <text x="0" y="68" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-body)" fontWeight="600">People Counting</text>
        </g>

        {/* === NODO WIFI / BLE === */}
        <g transform="translate(270, 555)">
          <circle r="44" fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
          {/* WiFi arcs icon */}
          <g transform="translate(-14, -8)">
            <path d="M 0 8 Q 14 -10 28 8" fill="none" stroke="#31B1F8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 5 14 Q 14 4 23 14" fill="none" stroke="#31B1F8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="14" cy="20" r="2.5" fill="#31B1F8" />
          </g>
          <text x="0" y="68" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-body)" fontWeight="600">WiFi / BLE</text>
        </g>

        {/* === NODO IoT === */}
        <g transform="translate(440, 660)">
          <circle r="44" fill="rgb(255 255 255 / 0.07)" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
          {/* Chip icon */}
          <g transform="translate(-14, -14)" fill="none" stroke="#31B1F8" strokeWidth="2" strokeLinecap="round">
            <rect x="4" y="4" width="20" height="20" rx="2" />
            <rect x="9" y="9" width="10" height="10" fill="#31B1F8" stroke="none" rx="1" />
            <line x1="9" y1="0" x2="9" y2="4" /><line x1="14" y1="0" x2="14" y2="4" /><line x1="19" y1="0" x2="19" y2="4" />
            <line x1="9" y1="24" x2="9" y2="28" /><line x1="14" y1="24" x2="14" y2="28" /><line x1="19" y1="24" x2="19" y2="28" />
            <line x1="0" y1="9" x2="4" y2="9" /><line x1="0" y1="14" x2="4" y2="14" /><line x1="0" y1="19" x2="4" y2="19" />
            <line x1="24" y1="9" x2="28" y2="9" /><line x1="24" y1="14" x2="28" y2="14" /><line x1="24" y1="19" x2="28" y2="19" />
          </g>
          <text x="0" y="68" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="var(--font-body)" fontWeight="600">IoT</text>
        </g>

        {/* === NODO CENTRAL: HYPERSENSOR === */}
        <g transform="translate(550, 390)">
          {/* halo glow */}
          <circle r="76" fill="rgb(49 177 248 / 0.08)" />
          <circle r="62" fill="rgb(49 177 248 / 0.14)" />
          <circle r="50" fill="#1f2160" stroke="rgb(49 177 248 / 0.5)" strokeWidth="1.5" />
          {/* Cloud + flame drop icon */}
          <g transform="translate(0, -8)">
            <path d="M -22 4 Q -22 -10 -8 -10 Q -4 -18 4 -16 Q 16 -18 20 -6 Q 24 4 14 8 L -12 8 Q -22 8 -22 4 Z" fill="#fff" />
            <path d="M 0 -16 Q -6 -8 -3 -2 Q 0 2 3 -2 Q 6 -8 0 -16 Z" fill="#31B1F8" />
          </g>
          {/* labels */}
          <text x="0" y="22" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="var(--font-display)" fontWeight="600">HyperSensor®</text>
          <text x="0" y="40" textAnchor="middle" fill="rgb(49 177 248 / 0.9)" fontSize="10" fontFamily="var(--font-body)" fontWeight="600" letterSpacing="1.5">AI POWERED</text>
        </g>

        {/* === FLAME DASHBOARD (derecha) === */}
        <g transform="translate(840, 110)">
          {/* tarjeta dashboard */}
          <rect x="0" y="0" width="160" height="500" rx="12" fill="rgb(49 177 248 / 0.18)" stroke="rgb(49 177 248 / 0.42)" strokeWidth="1" />
          {/* FLAME logo */}
          <g transform="translate(80, 30)">
            <text textAnchor="middle" fill="#fff" fontSize="20" fontWeight="700" fontFamily="var(--font-display)" letterSpacing="2">FLAME</text>
          </g>
          {/* stat boxes */}
          {([
            { y: 70, label: "654.983", sub: "Traffic" },
            { y: 165, label: "36.547", sub: "Visits" },
            { y: 260, label: "56.347", sub: "Conv." },
            { y: 355, label: "457.633", sub: "Dwell" },
          ]).map((s, i) => (
            <g key={i} transform={`translate(15, ${s.y})`}>
              <rect x="0" y="0" width="130" height="68" rx="6" fill="rgb(255 255 255 / 0.18)" />
              <text x="65" y="38" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="700" fontFamily="var(--font-display)">{s.label}</text>
              <text x="65" y="56" textAnchor="middle" fill="rgb(255 255 255 / 0.7)" fontSize="10" fontFamily="var(--font-body)" letterSpacing="1">{s.sub}</text>
            </g>
          ))}
          {/* mini bar chart */}
          <g transform="translate(15, 430)">
            {[20, 35, 28, 50, 38, 60, 45].map((h, i) => (
              <rect key={i} x={i * 18} y={60 - h} width="12" height={h} rx="2" fill="rgb(255 255 255 / 0.65)" />
            ))}
          </g>
        </g>
      </svg>

      <style>{`
        .hyp-gfx { width: 100%; height: 100%; display: block; }
        .hyp-svg { width: 100%; height: auto; display: block; overflow: visible; }
        .flow-in, .flow-out {
          fill: none;
          stroke: rgb(255 255 255 / 0.55);
          stroke-width: 1.4;
          stroke-dasharray: 3 7;
          stroke-linecap: round;
        }
        .flow-in {
          animation: hyp-flow-in 1.6s linear infinite;
        }
        .flow-out {
          stroke: rgb(49 177 248 / 0.85);
          stroke-width: 1.7;
          animation: hyp-flow-out 1.2s linear infinite;
        }
        @keyframes hyp-flow-in {
          to { stroke-dashoffset: -20; }
        }
        @keyframes hyp-flow-out {
          to { stroke-dashoffset: -20; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flow-in, .flow-out { animation: none; }
        }
      `}</style>
    </div>
  );
}
