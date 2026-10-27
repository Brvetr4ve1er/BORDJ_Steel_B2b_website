// Shared visual tokens for the product wireframes so every figure reads as one
// technical-drawing system.
export const WF = {
  ink: '#334155', // slate-700 — primary geometry lines
  accent: '#C1272D', // brand red — the highlighted / interactive dimension
  dim: '#94a3b8', // slate-400 — dimension lines & ticks
  label: '#475569', // slate-600 — text labels
  // Darker than it looks like it should be, and deliberately NOT the same hex as
  // `dim` and `steelDeep` any more. This one is ink for text — roughly 28 figure
  // labels — and at #94a3b8 it measured 2.56:1, well under the 4.5:1 that text
  // needs. Measured on every ground these figures actually sit on: 5.43:1 on
  // white, 4.98:1 on bg-secondary #F5F5F5, 4.95:1 on WF.fill. The two tokens
  // below keep the lighter value because they are strokes and fills, where
  // flattening them would collapse the drawings' tonal hierarchy.
  labelMuted: '#5b6b82',
  steel: '#cbd5e1', // slate-300 — steel skins
  steelDeep: '#94a3b8',
  foam: '#fef3c7', // amber-100 — insulating core
  zinc: '#dbeafe', // blue-100 — molten zinc bath
  fill: '#f1f5f9', // slate-100 — neutral body fill
} as const;

export const WF_FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
