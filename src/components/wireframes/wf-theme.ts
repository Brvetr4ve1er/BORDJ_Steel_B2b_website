// Shared visual tokens for the product wireframes so every figure reads as one
// technical-drawing system.
export const WF = {
  ink: '#334155', // slate-700 — primary geometry lines
  accent: '#C1272D', // brand red — the highlighted / interactive dimension
  dim: '#94a3b8', // slate-400 — dimension lines & ticks
  label: '#475569', // slate-600 — text labels
  labelMuted: '#94a3b8',
  steel: '#cbd5e1', // slate-300 — steel skins
  steelDeep: '#94a3b8',
  foam: '#fef3c7', // amber-100 — insulating core
  zinc: '#dbeafe', // blue-100 — molten zinc bath
  fill: '#f1f5f9', // slate-100 — neutral body fill
} as const;

export const WF_FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
