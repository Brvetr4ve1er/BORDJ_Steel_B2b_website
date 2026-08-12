
import { AnimatedWrapper } from "./animated-wrapper";
import { companyData } from '@/config/company-data';
import { Award, Cog } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { AnimatedNumber } from "./animated-number";
import images from '@/app/lib/placeholder-images.json';
import { WF, WF_FONT } from './wireframes/wf-theme';
import type { ElementType } from "react";

const iconMap: { [key: string]: ElementType } = {
  Award,
  Cog,
};

export function VisionMission() {
  const { about } = companyData.pages;
  const { vision, mission, history, completedProjects } = about.content;
  const aboutImage = images.homepage.about;

  const VisionIcon = iconMap[vision.icon];
  const MissionIcon = iconMap[mission.icon];

  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper animation="zoom-in">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src={aboutImage.src}
                alt={aboutImage.alt}
                width={aboutImage.width}
                height={aboutImage.height}
                className="transition-transform duration-500 group-hover:scale-110 object-cover w-full h-full"
                data-ai-hint={aboutImage.aiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/*
                Shop-drawing measurement layer over the site photograph. Purely
                decorative — no fabricated dimensions. Sits below the "Projets
                Réalisés" callout (z-20) via z-10, and never intercepts pointer
                events so hover on the underlying image still works.
              */}
              <SiteMeasurementOverlay />

              {/*
                Anchored bottom-right, NOT centred. Centred, this callout landed
                squarely on the "BORDJ STEEL" signage in the photograph behind it
                and clipped the B, so the client's own sign read "ORDJ STEEL".
                The sign runs from the middle of the frame up toward the right,
                the compass sits bottom-left and the cartouche bottom-centre, so
                the bottom-right corner is the one quadrant with nothing in it —
                and the scrim is darkest there, which the white figures want.
              */}
              <div className="absolute inset-0 z-20 flex items-end justify-end p-4 sm:p-6">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                    <div className="absolute inset-0 bg-accent/80 backdrop-blur-sm rounded-xl transform -rotate-6 transition-transform duration-300 group-hover:rotate-0" />
                    {/* Type scaled with the plate. At the old 192px the figure was
                        text-6xl; in a 144px corner badge that overflowed its own
                        padding, and "Projets Réalisés" wrapped mid-word. */}
                    <div className="relative text-white text-center flex flex-col justify-center h-full px-3 py-2">
                        <div className="font-headline font-bold text-4xl sm:text-5xl leading-none flex items-center justify-center">
                            <AnimatedNumber value={completedProjects} />+
                        </div>
                        <p className="mt-1.5 text-[10px] sm:text-xs font-semibold uppercase leading-tight tracking-wide">
                            Projets Réalisés
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </AnimatedWrapper>

          <div className="space-y-10">
             <AnimatedWrapper animation="fade-in-stagger" className="mb-12">
                <h2 className="font-headline text-7xl leading-tight font-bold text-primary mb-4">
                    BORDJ <span className="text-accent">STEEL</span>
                </h2>
                <p className="text-lg text-muted-foreground">{history}</p>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide-up">
              <div className="flex items-start gap-6 border-l-4 border-accent pl-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center border-4 border-accent/20">
                    {VisionIcon && <VisionIcon className="w-8 h-8 text-accent" />}
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold text-primary mb-2">{vision.title}</h3>
                  <p className="text-lg">{vision.text}</p>
                </div>
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation="slide-up" staggerIndex={2}>
              <div className="flex items-start gap-6 border-l-4 border-accent pl-6">
                 <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-4 border-primary/20">
                    {MissionIcon && <MissionIcon className="w-8 h-8 text-primary" />}
                </div>
                <div>
                  <h3 className="font-headline text-3xl font-bold text-primary mb-2">{mission.title}</h3>
                  <p className="text-lg">{mission.text}</p>
                   <Button asChild size="lg" variant="destructive" className="bg-accent hover:bg-accent/90 mt-6 px-8 py-6 text-lg">
                    <Link href="/about/history">
                      En savoir plus sur notre politique QHSE
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * SVG overlay that turns the site photograph into a shop-drawing plate:
 * dashed grid, corner framing brackets, a decorative measurement bracket in
 * the top-left quadrant, a compass rose in the bottom-left, and a cartouche
 * at the bottom. No numeric figures are asserted — the top cartouche is
 * label-only, so nothing here fabricates a site area, capacity, or dimension.
 *
 * Animations run once on mount (draw-in brackets + fade grid/labels) and pin
 * to the final state; a `prefers-reduced-motion` media query overrides them.
 */
function SiteMeasurementOverlay() {
  // Layout in a 400x400 unit-space; container is aspect-square so the SVG
  // scales uniformly. The centred callout card occupies roughly the
  // (155-245, 155-245) region — every overlay element sits outside that box.
  const brackets = [
    // top-left: horizontal-then-vertical L
    { d: 'M 20 60 L 20 20 L 60 20', cls: 'vm-bracket vm-bracket-a' },
    // top-right
    { d: 'M 340 20 L 380 20 L 380 60', cls: 'vm-bracket vm-bracket-b' },
    // bottom-left
    { d: 'M 20 340 L 20 380 L 60 380', cls: 'vm-bracket vm-bracket-c' },
    // bottom-right
    { d: 'M 340 380 L 380 380 L 380 340', cls: 'vm-bracket vm-bracket-d' },
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <style>{`
        @keyframes vm-draw { to { stroke-dashoffset: 0; } }
        @keyframes vm-grid-fade { to { opacity: 0.3; } }
        @keyframes vm-elem-fade { to { opacity: 1; } }
        .vm-bracket {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: vm-draw 0.7s ease-out forwards;
        }
        .vm-bracket-a { animation-delay: 0.10s; }
        .vm-bracket-b { animation-delay: 0.22s; }
        .vm-bracket-c { animation-delay: 0.34s; }
        .vm-bracket-d { animation-delay: 0.46s; }
        .vm-grid {
          opacity: 0;
          animation: vm-grid-fade 1s ease-out 0.05s forwards;
        }
        .vm-frame {
          opacity: 0;
          animation: vm-elem-fade 0.9s ease-out 0.05s forwards;
        }
        .vm-dim,
        .vm-compass,
        .vm-cartouche {
          opacity: 0;
          animation: vm-elem-fade 0.7s ease-out 0.6s forwards;
        }
        .vm-cartouche { animation-delay: 0.8s; }
        @media (prefers-reduced-motion: reduce) {
          .vm-bracket {
            animation: none;
            stroke-dashoffset: 0;
          }
          .vm-grid { animation: none; opacity: 0.3; }
          .vm-frame,
          .vm-dim,
          .vm-compass,
          .vm-cartouche { animation: none; opacity: 1; }
        }
      `}</style>
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        role="presentation"
        aria-hidden="true"
      >
        {/* Dashed drafting frame just inside the image edges. */}
        <rect
          className="vm-frame"
          x={10}
          y={10}
          width={380}
          height={380}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.55}
        />

        {/* Faint dashed grid — every 80 units. Sits behind everything. */}
        <g className="vm-grid" stroke={WF.dim} strokeWidth={0.8} strokeDasharray="2 6" fill="none">
          <path d="M 80 20 L 80 380" />
          <path d="M 160 20 L 160 380" />
          <path d="M 240 20 L 240 380" />
          <path d="M 320 20 L 320 380" />
          <path d="M 20 80 L 380 80" />
          <path d="M 20 160 L 380 160" />
          <path d="M 20 240 L 380 240" />
          <path d="M 20 320 L 380 320" />
        </g>

        {/* Corner framing brackets — draw-in on mount. */}
        <g
          fill="none"
          stroke={WF.accent}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {brackets.map((b) => (
            <path key={b.d} className={b.cls} d={b.d} />
          ))}
        </g>

        {/* Decorative measurement bracket, top-left quadrant. */}
        <g className="vm-dim">
          <path
            d="M 40 78 L 40 90 M 150 78 L 150 90 M 40 84 L 150 84"
            fill="none"
            stroke={WF.dim}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <text
            x={95}
            y={72}
            textAnchor="middle"
            fontFamily={WF_FONT}
            fontSize={12}
            fontWeight={600}
            letterSpacing="0.08em"
            fill={WF.label}
          >
            H = plein cadre
          </text>
        </g>

        {/* Compass rose — bottom-left, drafting style. */}
        <g className="vm-compass" transform="translate(50,335)">
          <circle r={18} fill="none" stroke={WF.dim} strokeWidth={1} />
          <path
            d="M 0 -18 L 4 0 L 0 18 L -4 0 Z"
            fill={WF.ink}
            opacity={0.65}
          />
          <path
            d="M -18 0 L 0 -4 L 18 0 L 0 4 Z"
            fill="none"
            stroke={WF.dim}
            strokeWidth={1}
          />
          <text
            x={0}
            y={-24}
            textAnchor="middle"
            fontFamily={WF_FONT}
            fontSize={11}
            fontWeight={700}
            fill={WF.label}
          >
            N
          </text>
        </g>

        {/* Cartouche along the bottom, below the callout card zone. */}
        <text
          className="vm-cartouche"
          x={200}
          y={378}
          textAnchor="middle"
          fontFamily={WF_FONT}
          fontSize={10}
          fontWeight={600}
          letterSpacing="0.22em"
          fill={WF.labelMuted}
        >
          BORDJ STEEL — VUE DU SITE
        </text>
      </svg>
    </div>
  );
}
