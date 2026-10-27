// Enrichment band for the Panneaux Sandwichs page: shop-drawing cross-section
// showing the thermal role of the sandwich construction — outer skin exposed
// to the heat flux, PUR foam core cutting the flux, inner skin held cool.
// The conductivity callout is read from `sandwichHeroStats` in config so the
// figure cannot drift from the rest of the page.
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';
import { sandwichHeroStats } from '@/config/sandwich-panels-data';

export function ThermalPerformanceBand() {
  const conductivity = sandwichHeroStats.find(
    (stat) => stat.label === 'Conductivité',
  );

  // Geometry — viewBox is 800 x 340. All values are in SVG user units.
  const x0 = 200;
  const x1 = 600;
  const yCoreTop = 155;
  const yCoreBot = 225;
  const yRibTop = yCoreTop - 16;
  const yInnerBot = yCoreBot + 8;
  const ribs = 6;
  const ribW = (x1 - x0) / ribs;

  // Ribbed outer skin: valley → up-ramp → plateau → down-ramp → valley,
  // repeated across the panel width.
  const ribPoints: Array<[number, number]> = [[x0, yCoreTop]];
  for (let i = 0; i < ribs; i++) {
    const xs = x0 + i * ribW;
    ribPoints.push([xs + ribW * 0.3, yCoreTop]);
    ribPoints.push([xs + ribW * 0.4, yRibTop]);
    ribPoints.push([xs + ribW * 0.7, yRibTop]);
    ribPoints.push([xs + ribW * 0.8, yCoreTop]);
    ribPoints.push([xs + ribW, yCoreTop]);
  }
  const outerSkinPath =
    'M ' +
    ribPoints.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');

  const arrowXs = [270, 400, 530];

  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Performance thermique
              </p>
              <h2 className="mt-3 font-headline text-3xl font-bold text-primary md:text-4xl">
                Isolation continue, du bardage à la chambre froide
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                L&apos;âme en mousse polyuréthane, prise entre deux peaux acier,
                coupe le flux thermique sans discontinuité — un mur unique pour
                la toiture, le bardage et l&apos;enceinte réfrigérée.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-8 md:p-10">
              <svg
                viewBox="0 0 800 340"
                className="mx-auto block h-auto w-full max-w-4xl"
                role="img"
                aria-label="Coupe transversale d'un panneau sandwich : flux thermique arrêté par l'âme en mousse polyuréthane"
              >
                {/* --- Outer face heading + heat arrows (brand red) --- */}
                <text
                  x={400}
                  y={30}
                  textAnchor="middle"
                  fontFamily={WF_FONT}
                  fontSize={13}
                  fontWeight={700}
                  fill={WF.accent}
                  letterSpacing="0.18em"
                >
                  FACE EXTÉRIEURE — FLUX THERMIQUE
                </text>
                <g
                  stroke={WF.accent}
                  strokeWidth={2}
                  strokeLinecap="round"
                  fill="none"
                >
                  {arrowXs.map((x) => (
                    <g key={`heat-${x}`}>
                      <path d={`M ${x} 50 L ${x} 120`} />
                      <path d={`M ${x - 7} 110 L ${x} 120 L ${x + 7} 110`} />
                    </g>
                  ))}
                </g>

                {/* --- Panel body: foam core, inner skin, outer ribbed skin --- */}
                <rect
                  x={x0}
                  y={yCoreTop}
                  width={x1 - x0}
                  height={yCoreBot - yCoreTop}
                  fill={WF.foam}
                />
                <rect
                  x={x0}
                  y={yCoreBot}
                  width={x1 - x0}
                  height={yInnerBot - yCoreBot}
                  fill={WF.steel}
                />
                <path
                  d={outerSkinPath}
                  fill="none"
                  stroke={WF.ink}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d={
                    `M ${x0} ${yCoreBot} L ${x1} ${yCoreBot} ` +
                    `M ${x0} ${yInnerBot} L ${x1} ${yInnerBot} ` +
                    `M ${x0} ${yCoreTop} L ${x0} ${yInnerBot} ` +
                    `M ${x1} ${yCoreTop} L ${x1} ${yInnerBot}`
                  }
                  fill="none"
                  stroke={WF.ink}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />

                {/* --- Core callout: material + conductivity value (from config) --- */}
                <text
                  x={400}
                  y={192}
                  textAnchor="middle"
                  fontFamily={WF_FONT}
                  fontSize={15}
                  fontWeight={700}
                  fill={WF.label}
                >
                  Âme mousse PUR
                </text>
                {conductivity ? (
                  <text
                    x={400}
                    y={214}
                    textAnchor="middle"
                    fontFamily={WF_FONT}
                    fontSize={14}
                    fontWeight={700}
                    fill={WF.accent}
                  >
                    {`λ ${conductivity.value}`}
                  </text>
                ) : null}

                {/* --- Inner face label --- */}
                <path
                  d={`M ${x0} ${yInnerBot + 24} L ${x1} ${yInnerBot + 24}`}
                  stroke={WF.dim}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  fill="none"
                />
                <text
                  x={400}
                  y={yInnerBot + 48}
                  textAnchor="middle"
                  fontFamily={WF_FONT}
                  fontSize={13}
                  fontWeight={700}
                  fill={WF.label}
                  letterSpacing="0.18em"
                >
                  FACE INTÉRIEURE — ISOLATION CONTINUE
                </text>
                <text
                  x={400}
                  y={yInnerBot + 68}
                  textAnchor="middle"
                  fontFamily={WF_FONT}
                  fontSize={12}
                  fontWeight={500}
                  fill={WF.labelMuted}
                >
                  Pas de pont thermique entre les peaux
                </text>
              </svg>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
