/**
 * Which of the two imported illustration styles the contact cards use.
 *
 * Both come from the Claude Design project "High-detail 3D animations section"
 * and both are fully implemented — switching this constant switches the page.
 *
 *   'a'  Clay studio — perspective camera, warm clay materials, red wireframe
 *        edges on hover, floating over a drafting grid. Softer, more product
 *        render than drawing.
 *
 *   'b'  Technical diorama — orthographic/isometric, slate ink edges at full
 *        strength, cool grey tile, and a monospace caption in the corner.
 *        Reads as a measured drawing and sits closer to the rest of this site,
 *        which is why it is the default.
 *
 * The 3D is an enhancement layered over the flat SVG figures in
 * `components/contact/department-figures.tsx`; those remain the server-rendered
 * content. See `components/contact/contact-scene-3d.tsx`.
 */
export const CONTACT_SCENE_STYLE: 'a' | 'b' = 'b';

/**
 * Corner captions, shown in style 'b' only.
 *
 * These are published technical copy on a client's commercial site, so each one
 * is grounded in something this repo already states:
 *
 *   450 °C          galvanisation-data.ts, "Température du bain"
 *   PIR             company-data.ts, a real reference project supplied with
 *                   "panneaux sandwich classe M1(PIR)"
 *   1:200           describes the model in the drawing, not the product
 *
 * The design document's charpente caption read "Portique · IPE160 ·
 * contreventement". IPE is a beam type this company offers
 * (charpente-metallique-data.ts: "Profilé standard (IPE, HEA) ou PRS"), but the
 * SIZE — IPE160 — is stated nowhere in this project. A specific section size
 * reads as a spec claim to a buyer, so the number is dropped rather than
 * guessed. Restore it if the client confirms it.
 */
export const SCENE_CAPTIONS: Readonly<Record<string, string>> = {
  bureau: 'Devis · maquette 1:200',
  charpente: 'Portique · contreventement',
  sandwich: 'Panneau toiture · âme PIR',
  galva: 'Bain de zinc · 450 °C',
  ecoute: 'Réponse sous 24 h',
  montage: 'Montage · grue à tour',
};
