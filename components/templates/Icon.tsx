import * as React from "react";

const PATHS: Record<string, React.ReactNode> = {
  // generic
  arrow:        <path d="M5 12h14M13 6l6 6-6 6"/>,
  check:        <polyline points="5 12 10 17 19 7"/>,
  chevron:      <polyline points="6 9 12 15 18 9"/>,
  plus:         <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  // products
  traffic:      <><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-7"/></>,
  journey:      <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h6a4 4 0 0 1 4 4v6"/></>,
  connect:      <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="12" r="2.5"/><path d="M8.5 12h7"/><circle cx="12" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M12 8.5v7"/></>,
  // use cases
  count:        <><circle cx="9" cy="8" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="2.5"/><path d="M15 21v-2a3 3 0 0 1 3-3h2"/></>,
  convert:      <path d="M4 12h6l2-4 4 8 2-4h2"/>,
  behavior:     <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></>,
  occupancy:    <><circle cx="12" cy="12" r="9"/><path d="M8 12a4 4 0 0 0 8 0"/></>,
  queue:        <><circle cx="6" cy="12" r="2.5"/><circle cx="12" cy="12" r="2.5"/><circle cx="18" cy="12" r="2.5"/></>,
  restroom:     <><circle cx="9" cy="6" r="2"/><path d="M7 13l-1 8h6l-1-8M9 8v5"/><circle cx="17" cy="6" r="2"/><path d="M15 13l-1 8h6l-1-8M17 8v5"/></>,
  wifi:         <><path d="M2 9a18 18 0 0 1 20 0"/><path d="M5 12a13 13 0 0 1 14 0"/><path d="M8 15a8 8 0 0 1 8 0"/><circle cx="12" cy="19" r="1.5"/></>,
  corp:         <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M15 9v12"/></>,
  // sectors
  mall:         <><path d="M3 9l9-6 9 6v12H3z"/><path d="M9 21V13h6v8"/><path d="M3 9h18"/></>,
  retail:       <><path d="M3 7h18l-2 12H5z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/></>,
  venue:        <><path d="M3 21h18"/><path d="M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/><path d="M9 12h6"/></>,
  hotel:        <><path d="M3 21V8l9-5 9 5v13"/><path d="M9 21v-6h6v6"/><path d="M3 12h18"/></>,
  // metrics / steps
  clock:        <><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/></>,
  calendar:     <><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></>,
  compare:      <><path d="M4 17V7"/><path d="M20 17V7"/><path d="M12 21V3"/><path d="M2 20l2-3 2 3"/><path d="M18 20l2-3 2 3"/></>,
  dwell:        <><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/><circle cx="12" cy="12" r="1.5"/></>,
  ratio:        <><circle cx="7" cy="8" r="3"/><path d="M2 19v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/><circle cx="17" cy="13" r="2"/><line x1="14" y1="3" x2="21" y2="10"/></>,
  eye:          <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
  users:        <><circle cx="9" cy="8" r="3.5"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/><circle cx="18" cy="9" r="2.5"/><path d="M16 21v-2a3 3 0 0 1 3-3h2"/></>,
  grid:         <><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></>,
  trending:     <><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></>,
  // product features
  street:       <><path d="M5 21V5l14-2v18"/><path d="M9 8h6M9 12h6M9 16h6"/></>,
  demographics: <><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2M13 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/></>,
  vehicle:      <><path d="M3 16V11l2-5h14l2 5v5"/><path d="M3 16h18v3H3z"/><circle cx="7" cy="18.5" r="1.5"/><circle cx="17" cy="18.5" r="1.5"/></>,
  privacy:      <><path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></>,
  reports:      <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></>,
  integration:  <><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h6M6 9v6M18 9v6M9 18h6"/></>,
  alert:        <><path d="M12 2 2 22h20z"/><line x1="12" y1="9" x2="12" y2="14"/><circle cx="12" cy="17.5" r="0.5"/></>,
  layout:       <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></>,
};

export default function Icon({
  name, className = "", style,
}: { name: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      {PATHS[name] || null}
    </svg>
  );
}
