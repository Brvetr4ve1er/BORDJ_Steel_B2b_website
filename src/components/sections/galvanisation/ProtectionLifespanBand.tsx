import { AnimatedWrapper } from '@/components/animated-wrapper';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';
import { galvanisationContent } from '@/config/galvanisation-data';

// ---------------------------------------------------------------------------
// Three shop-drawing style figures — one per protection quality.
// All colours come from WF; nothing invents metallurgical numbers.
// ---------------------------------------------------------------------------

// Layered cross-section: steel substrate + Fe-Zn alloys + outer zinc.
function AdherenceFigure() {
  const bx = 32;
  const bw = 160;
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Coupe des couches d'alliage zinc-fer"
    >
      <g strokeLinejoin="round" strokeLinecap="round" fontFamily={WF_FONT}>
        {/* Steel core */}
        <rect x={bx} y={140} width={bw} height={44} fill={WF.steel} stroke={WF.ink} strokeWidth={2} />
        {/* Fe-Zn intermetallic bands */}
        <rect x={bx} y={122} width={bw} height={18} fill={WF.steelDeep} stroke={WF.ink} strokeWidth={1.2} />
        <rect x={bx} y={108} width={bw} height={14} fill={WF.dim} stroke={WF.ink} strokeWidth={1.2} />
        {/* Pure zinc surface */}
        <rect x={bx} y={90} width={bw} height={18} fill={WF.zinc} stroke={WF.ink} strokeWidth={1.5} />

        {/* Leader lines to labels on the right */}
        <path d={`M ${bx + bw} 99 L 210 62`} stroke={WF.dim} strokeWidth={1} fill="none" />
        <circle cx={bx + bw} cy={99} r={2.2} fill={WF.dim} />
        <path d={`M ${bx + bw} 115 L 210 115`} stroke={WF.dim} strokeWidth={1} fill="none" />
        <circle cx={bx + bw} cy={115} r={2.2} fill={WF.dim} />
        <path d={`M ${bx + bw} 162 L 210 178`} stroke={WF.dim} strokeWidth={1} fill="none" />
        <circle cx={bx + bw} cy={162} r={2.2} fill={WF.dim} />

        {/* Labels */}
        <text x={214} y={65} fontSize={12} fontWeight={700} fill={WF.accent} textAnchor="start">
          Zinc de surface
        </text>
        <text x={214} y={118} fontSize={12} fontWeight={700} fill={WF.label} textAnchor="start">
          Alliages Fe-Zn
        </text>
        <text x={214} y={181} fontSize={12} fontWeight={700} fill={WF.label} textAnchor="start">
          Acier
        </text>

        {/* Bond arrow at the steel / alloy interface */}
        <path
          d={`M ${bx - 8} 132 L ${bx + 6} 132 M ${bx} 128 L ${bx + 6} 132 L ${bx} 136`}
          stroke={WF.accent}
          strokeWidth={1.5}
          fill="none"
        />
        <text x={bx - 10} y={128} fontSize={10} fontWeight={700} fill={WF.accent} textAnchor="end">
          Diffusion
        </text>
      </g>
    </svg>
  );
}

// Water droplet beading on a continuous zinc barrier.
function ImpermeabiliteFigure() {
  const bx = 32;
  const bw = 256;
  const barTop = 128;
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Revêtement étanche et continu"
    >
      <g strokeLinejoin="round" strokeLinecap="round" fontFamily={WF_FONT}>
        {/* Zinc coating */}
        <rect x={bx} y={barTop} width={bw} height={10} fill={WF.zinc} stroke={WF.ink} strokeWidth={1.5} />
        {/* Steel */}
        <rect x={bx} y={barTop + 10} width={bw} height={48} fill={WF.steel} stroke={WF.ink} strokeWidth={2} />

        {/* Beaded drops resting on the surface — signalling no penetration */}
        {[80, 140, 200, 260].map((x) => (
          <ellipse
            key={`bead-${x}`}
            cx={x}
            cy={barTop - 4}
            rx={10}
            ry={5}
            fill={WF.accent}
            fillOpacity={0.15}
            stroke={WF.accent}
            strokeWidth={1.5}
          />
        ))}

        {/* Falling drop with directional arrow */}
        <path d={`M 160 34 q -6 12 0 16 q 6 -4 0 -16 Z`} fill={WF.accent} stroke={WF.accent} strokeWidth={1} />
        <path
          d={`M 160 58 L 160 96 M 152 88 L 160 96 L 168 88`}
          stroke={WF.accent}
          strokeWidth={1.8}
          fill="none"
          strokeDasharray="3 3"
        />

        {/* Barrier annotation */}
        <text x={bx - 4} y={barTop + 6} fontSize={11} fontWeight={700} fill={WF.label} textAnchor="end">
          Barrière
        </text>
        <path
          d={`M ${bx - 2} ${barTop + 4} L ${bx + 4} ${barTop + 4}`}
          stroke={WF.label}
          strokeWidth={1}
          fill="none"
        />

        {/* Bottom caption */}
        <text x={160} y={185} fontSize={12} fontWeight={700} fill={WF.label} textAnchor="middle">
          Revêtement continu, sans porosité
        </text>
      </g>
    </svg>
  );
}

// Impact arrow absorbed by the layered coating — no crack, no penetration.
function ResistanceFigure() {
  const bx = 32;
  const bw = 256;
  const barTop = 118;
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      role="img"
      aria-label="Résistance aux chocs et à l'abrasion"
    >
      <g strokeLinejoin="round" strokeLinecap="round" fontFamily={WF_FONT}>
        {/* Zinc outer + Fe-Zn alloy under it */}
        <rect x={bx} y={barTop - 10} width={bw} height={10} fill={WF.zinc} stroke={WF.ink} strokeWidth={1.2} />
        <rect x={bx} y={barTop} width={bw} height={8} fill={WF.dim} stroke={WF.ink} strokeWidth={1.2} />
        {/* Steel */}
        <rect x={bx} y={barTop + 8} width={bw} height={48} fill={WF.steel} stroke={WF.ink} strokeWidth={2} />

        {/* Impact arrow from above */}
        <path
          d={`M 160 34 L 160 100 M 150 90 L 160 100 L 170 90`}
          stroke={WF.accent}
          strokeWidth={2.5}
          fill="none"
        />
        <text x={172} y={50} fontSize={12} fontWeight={700} fill={WF.accent} textAnchor="start">
          Choc
        </text>

        {/* Shock ripples spreading across the surface — dashed to suggest dissipation */}
        <path d={`M 128 114 A 32 10 0 0 1 192 114`} stroke={WF.accent} strokeWidth={1.2} strokeDasharray="3 3" fill="none" />
        <path d={`M 108 120 A 52 14 0 0 1 212 120`} stroke={WF.dim} strokeWidth={1} strokeDasharray="3 3" fill="none" />

        {/* Abrasion tick on the outer zinc — surface mark, no crack through */}
        <path
          d={`M 240 ${barTop - 10} L 244 ${barTop - 6} M 240 ${barTop - 6} L 244 ${barTop - 10}`}
          stroke={WF.ink}
          strokeWidth={1.2}
          fill="none"
        />

        {/* Bottom caption */}
        <text x={160} y={185} fontSize={12} fontWeight={700} fill={WF.label} textAnchor="middle">
          Alliages plus durs que l&apos;acier
        </text>
      </g>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export function ProtectionLifespanBand() {
  // Anchor the band to the durability figure that already lives in the hero
  // stats — keeps this section in sync if the config changes.
  const lifespanStat = galvanisationContent.hero.stats.find(
    (s) => s.title === 'Durée de vie'
  );

  const qualities = [
    {
      key: 'adherence',
      title: 'Adhérence',
      text: "Liaison métallurgique fer-zinc formée dans le bain, plus solide qu'un simple dépôt de surface.",
      figure: <AdherenceFigure />,
    },
    {
      key: 'impermeabilite',
      title: 'Imperméabilité',
      text: "Revêtement continu qui isole l'acier de l'humidité et des agents agressifs.",
      figure: <ImpermeabiliteFigure />,
    },
    {
      key: 'resistance',
      title: 'Résistance mécanique',
      text: "Couches intermétalliques dures qui encaissent chocs et abrasion sans écaillage.",
      figure: <ResistanceFigure />,
    },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <AnimatedWrapper animation="slide-up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                Longévité du revêtement
              </p>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary leading-tight">
                Trois qualités qui prolongent la vie de la pièce
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                La galvanisation à chaud ne dépose pas seulement du zinc, elle le
                lie à l&apos;acier. Le revêtement obtenu combine adhérence, imperméabilité
                et résistance mécanique — sans entretien.
              </p>
            </div>
            {lifespanStat && (
              <div className="flex items-baseline gap-3 border-l-4 border-accent pl-5 shrink-0">
                <span className="font-headline text-5xl md:text-6xl font-bold text-accent leading-none">
                  {lifespanStat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground max-w-[7rem]">
                  {lifespanStat.title}
                </span>
              </div>
            )}
          </div>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {qualities.map((q, i) => (
            <AnimatedWrapper key={q.key} animation="fade-in-stagger" staggerIndex={i}>
              <div className="h-full bg-secondary border border-border rounded-lg p-6 flex flex-col">
                <div className="w-full aspect-[8/5] mb-6 rounded-md bg-background border border-border overflow-hidden">
                  {q.figure}
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  {q.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  {q.text}
                </p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
