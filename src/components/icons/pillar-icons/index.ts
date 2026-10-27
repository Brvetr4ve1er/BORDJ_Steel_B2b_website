import type { ComponentType } from 'react'

import PrsGirderIcon from './PrsGirderIcon'
import EnergyPylonIcon from './EnergyPylonIcon'
import OverheadCraneIcon from './OverheadCraneIcon'
import AssemblyLineIcon from './AssemblyLineIcon'

export { PrsGirderIcon, EnergyPylonIcon, OverheadCraneIcon, AssemblyLineIcon }

/**
 * The pillar ids declared in `src/config/charpente-metallique-data.ts`
 * (`charpenteMetalliqueData.pillars[].id`). Keeping the union here rather than
 * a bare `string` means a pillar added to the config without artwork is a
 * compile error in `PILLAR_ICON_BY_ID`, not a blank card in production.
 */
export type PillarIconKey = 'prs' | 'supports' | 'ponts-roulants' | 'automobile'

export type PillarIconComponent = ComponentType<{ className?: string; size?: number }>

/** Total map — every pillar id resolves to its own drawing. */
export const PILLAR_ICON_BY_ID: Record<PillarIconKey, PillarIconComponent> = {
  prs: PrsGirderIcon,
  supports: EnergyPylonIcon,
  'ponts-roulants': OverheadCraneIcon,
  automobile: AssemblyLineIcon,
}
