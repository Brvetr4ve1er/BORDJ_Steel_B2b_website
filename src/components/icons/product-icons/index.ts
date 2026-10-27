import type { ComponentType } from 'react'

import CharpenteIcon from './CharpenteIcon'
import SandwichPanelIcon from './SandwichPanelIcon'
import GalvanisationIcon from './GalvanisationIcon'
import ChaudronnerieIcon from './ChaudronnerieIcon'

export { CharpenteIcon, SandwichPanelIcon, GalvanisationIcon, ChaudronnerieIcon }

export type ProductIconKey = 'HardHat' | 'Package' | 'Layers' | 'Cog' | 'Anchor'

// Keyed by the string names already used in src/config/company-data.ts so the
// consumer (ProductsPageContent) can plug this in without changing config.
// HardHat -> Charpente, Package/Layers -> Sandwich, Cog -> Galvanisation, Anchor -> Chaudronnerie
export const PRODUCT_ICON_BY_CONFIG_KEY: Partial<
  Record<ProductIconKey, ComponentType<{ className?: string; size?: number }>>
> = {
  HardHat: CharpenteIcon,
  Package: SandwichPanelIcon,
  Layers: SandwichPanelIcon,
  Cog: GalvanisationIcon,
  Anchor: ChaudronnerieIcon,
}
