// Bordj Steel — real-time clay + edge 3D illustrations for the contact cards.
//
// PROVENANCE. Imported from the Claude Design project "High-detail 3D
// animations section" (Contact Cards 3D.dc.html + bordj-3d.js). The design
// document was authored against this repo — its card chrome was recreated from
// contact-info.tsx — so the six scene keys line up with the six departments in
// company-data.ts one for one.
//
// CHANGES ON IMPORT, all of them deliberate:
//   - `three` is an npm dependency here, not an unpkg import map. The design
//     canvas pulled three@0.184.0 from a CDN; this project self-hosts its
//     assets, so the same version is installed and the bare `three` specifier
//     below resolves through the bundler.
//   - exportGLB() is dropped. It was an authoring affordance ("Télécharger
//     6 x GLB") and its `three/addons/...` specifier does not resolve against
//     the npm package. replay() is kept: it costs nothing and is useful.
//   - Nothing else is edited. The scene geometry, materials, assembly timing,
//     hover behaviour and the shared-renderer blitting strategy are the
//     design's, unchanged.
//
// WHY ONE RENDERER. A browser caps live WebGL contexts (commonly 8-16) and this
// page wants six scenes. The module keeps ONE WebGLRenderer, draws each scene
// into it in turn and blits the result into that card's own 2D canvas, so the
// page uses a single context no matter how many cards exist.
//
// Reduced motion is honoured internally (see RM) and visibility is gated by an
// IntersectionObserver, so off-screen cards cost nothing.
import * as THREE from 'three';

const RED = 0xC1272D;
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const eo = t => 1 - Math.pow(1 - t, 3);
const eio = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const backOut = t => { const c = 1.6; return t <= 0 ? 0 : 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const seg = (t, a, b) => clamp((t - a) / (b - a));
const D2R = THREE.MathUtils.degToRad;
const RM = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const STYLES = {
  a: { clay: 0xdedad3, dark: 0xb9b3aa, paper: 0xf1efea, foam: 0xead6a6, zinc: 0xc9d0d7, raw: 0x6f6a64, galv: 0xdfe6ec,
       edge: 0x2a2724, edgeOp: .22, wire: RED, wireIdle: 0, wireHover: .26, ortho: false },
  b: { clay: 0xd6dbe1, dark: 0xa3adb9, paper: 0xf1f4f7, foam: 0xecd9ad, zinc: 0xc8d2dc, raw: 0x6c7480, galv: 0xe1e8ee,
       edge: 0x334155, edgeOp: .78, wire: 0x334155, wireIdle: .03, wireHover: .26, ortho: true },
};

/* ---------------- geometry helpers ---------------- */
const GC = new Map();
const gc = (k, f) => { if (!GC.has(k)) GC.set(k, f()); return GC.get(k); };
function mesh(geo, mat, name) { const m = new THREE.Mesh(geo, mat); m.name = name || mat.name; m.castShadow = true; m.receiveShadow = true; return m; }
function box(w, h, d, mat, name) { return mesh(gc(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d)), mat, name); }
function cyl(r, h, mat, name, s = 32, rTop) { return mesh(gc(`c${r},${h},${s},${rTop}`, () => new THREE.CylinderGeometry(rTop ?? r, r, h, s)), mat, name); }
function at(o, x, y, z) { o.position.set(x, y, z); return o; }
function rod(a, b, r, mat, name, s = 8) {
  const A = V(...a), B = V(...b), L = A.distanceTo(B);
  const m = mesh(gc(`r${r},${s}`, () => new THREE.CylinderGeometry(r, r, 1, s)), mat, name);
  m.scale.y = L; m.position.copy(A).add(B).multiplyScalar(.5);
  m.quaternion.setFromUnitVectors(V(0, 1, 0), B.clone().sub(A).normalize()); return m;
}
function shapeFrom(pts) { const s = new THREE.Shape(); pts.forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y))); s.closePath(); return s; }
const IPROF = (h, b, tw, tf) => { const hw = b / 2, hh = h / 2, t = tw / 2; return [[-hw, -hh], [hw, -hh], [hw, -hh + tf], [t, -hh + tf], [t, hh - tf], [hw, hh - tf], [hw, hh], [-hw, hh], [-hw, hh - tf], [-t, hh - tf], [-t, -hh + tf], [-hw, -hh + tf]]; };
const CPROF = (h, b, t) => [[-b / 2, -h / 2], [b / 2, -h / 2], [b / 2, -h / 2 + t], [-b / 2 + t, -h / 2 + t], [-b / 2 + t, h / 2 - t], [b / 2, h / 2 - t], [b / 2, h / 2], [-b / 2, h / 2]];
function profGeo(key, pts) { return gc('p' + key, () => { const g = new THREE.ExtrudeGeometry(shapeFrom(pts), { depth: 1, bevelEnabled: false }); g.translate(0, 0, -.5); return g; }); }
// Extruded profile between two points; `up` = direction the profile's local Y (web) should face.
function member(a, b, key, pts, mat, name, up) {
  const A = V(...a), B = V(...b), L = A.distanceTo(B);
  const m = mesh(profGeo(key, pts), mat, name); m.scale.z = L;
  const z = B.clone().sub(A).normalize();
  const u = (up ? up.clone() : (Math.abs(z.y) > .9 ? V(1, 0, 0) : V(0, 1, 0)));
  u.addScaledVector(z, -u.dot(z)).normalize();
  const x = new THREE.Vector3().crossVectors(u, z);
  m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, u, z));
  m.position.copy(A).add(B).multiplyScalar(.5); return m;
}
const I16 = ['I16', IPROF(.16, .09, .012, .016)], I10 = ['I10', IPROF(.1, .06, .009, .012)], I8 = ['I8', IPROF(.08, .05, .008, .01)], I22 = ['I22', IPROF(.22, .12, .014, .02)], I12 = ['I12', IPROF(.12, .07, .008, .012)];
const C9 = ['C9', CPROF(.09, .045, .008)];
const noLines = o => { o.userData.noLines = true; return o; };
const noExport = o => { o.userData.noExport = true; o.userData.noLines = true; return o; };

/* ---------------- assembly (build-up on scroll-in) ---------------- */
class Assembler {
  constructor() { this.items = []; this.end = 0; this.done = false; }
  add(o, delay, opt = {}) {
    const it = { o, delay, dur: opt.dur ?? .8, off: V(opt.dx || 0, opt.dy || 0, opt.dz || 0), pop: !!opt.pop, grow: opt.grow || null, base: o.position.clone(), bs: o.scale.clone() };
    this.items.push(it); this.end = Math.max(this.end, delay + it.dur); return o;
  }
  apply(t) {
    if (this.done) return;
    for (const it of this.items) {
      const p = clamp((t - it.delay) / it.dur), e = eo(p);
      it.o.visible = p > 0;
      it.o.position.copy(it.base).addScaledVector(it.off, 1 - e);
      if (it.pop) it.o.scale.copy(it.bs).multiplyScalar(Math.max(1e-4, backOut(p)));
      if (it.grow) { it.o.scale.copy(it.bs); it.o.scale[it.grow] *= Math.max(1e-4, e); }
    }
    if (t >= this.end) this.done = true;
  }
}

/* ---------------- materials ---------------- */
function std(name, color, rough, metal, extra = {}) {
  return new THREE.MeshStandardMaterial({ name, color, roughness: rough, metalness: metal, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, ...extra });
}
function makeMats(st) {
  return {
    clay: std('clay', st.clay, .86, 0), dark: std('clay_dark', st.dark, .8, .02), paper: std('paper', st.paper, .92, 0),
    red: std('accent_red', RED, .48, .05), foam: std('foam_core_PIR', st.foam, .95, 0),
    zinc: std('zinc_molten', st.zinc, .2, .92), raw: std('raw_steel', st.raw, .62, .35), ink: std('ink', 0x3a3a3a, .6, .1),
  };
}

/* ================= SCENES ================= */
const SCENES = {};

// 1 — Bureau Commercial: quotation desk with a scale model, calculator and a stamp that seals the devis.
SCENES.bureau = (g, m, A) => {
  const desk = at(box(3.8, .1, 2.5, m.dark, 'desk'), 0, .05, 0); g.add(desk); A.add(desk, 0, { pop: true, dur: .5 });
  const docs = new THREE.Group(); docs.name = 'devis_stack'; at(docs, -.78, .1, .12); docs.rotation.y = .16; g.add(docs);
  const jit = [[.0, .0, 0], [.03, -.02, .05], [-.02, .02, -.04], [.02, .01, .03], [-.03, -.01, -.02], [.01, .02, .02]];
  jit.forEach(([dx, dz, r], i) => { const s = at(box(1.05, .01, 1.48, m.paper, 'sheet'), dx, .005 + i * .011, dz); s.rotation.y = r; docs.add(s); A.add(s, .2 + i * .07, { dy: .9, dur: .5 }); });
  const top = new THREE.Group(); top.name = 'devis_top_sheet'; at(top, 0, .005 + 6 * .011, 0); docs.add(top);
  top.add(box(1.05, .01, 1.48, m.paper, 'sheet_top'));
  top.add(at(box(.1, .004, .1, m.red, 'logo_mark'), -.42, .007, -.6), at(box(.3, .004, .045, m.dark, 'header'), -.18, .007, -.62), at(box(.2, .004, .03, m.dark, 'header_ref'), .3, .007, -.62));
  // mini section drawing of an I-beam
  top.add(at(box(.16, .004, .02, m.ink, 'ibeam_flange'), -.32, .008, -.4), at(box(.16, .004, .02, m.ink, 'ibeam_flange'), -.32, .008, -.24), at(box(.02, .004, .14, m.ink, 'ibeam_web'), -.32, .008, -.32));
  [.62, .48, .55, .4].forEach((w, i) => top.add(at(box(w * .6, .003, .02, m.dark, 'text_line'), -.16 + w * .3, .007, -.42 + i * .055)));
  for (let r = 0; r < 6; r++) { const z = -.1 + r * .085; top.add(at(box(.84, .002, .004, m.dark, 'table_rule'), 0, .007, z - .04)); [[.28, -.27], [.1, .06], [.12, .3]].forEach(([w, x]) => top.add(at(box(w, .003, .02, m.dark, 'cell'), x, .007, z))); }
  top.add(at(box(.3, .005, .06, m.red, 'total_bar'), .27, .008, .6), at(box(.14, .004, .03, m.dark, 'total_label'), .02, .007, .6));
  const ink = noExport(mesh(new THREE.RingGeometry(.085, .125, 48), new THREE.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0, depthWrite: false }), 'stamp_ink'));
  ink.rotation.x = -Math.PI / 2; at(ink, .22, .0065, .3); top.add(ink);
  const inkIn = noExport(mesh(new THREE.CircleGeometry(.05, 32), ink.material, 'stamp_ink_core')); inkIn.rotation.x = -Math.PI / 2; at(inkIn, .22, .0065, .3); top.add(inkIn);
  A.add(top, .7, { dy: .9, dur: .5 });
  // pen
  const pen = new THREE.Group(); pen.name = 'pen'; at(pen, -.1, .125, .78); pen.rotation.y = .7; g.add(pen);
  const body = cyl(.022, .62, m.ink, 'pen_body', 24); body.rotation.z = Math.PI / 2; pen.add(body);
  const capP = cyl(.026, .17, m.red, 'pen_cap', 24); capP.rotation.z = Math.PI / 2; at(capP, .25, 0, 0); pen.add(capP);
  const tip = cyl(.022, .07, m.clay, 'pen_tip', 24, .004); tip.rotation.z = Math.PI / 2; at(tip, -.345, 0, 0); pen.add(tip);
  pen.add(at(box(.13, .008, .012, m.clay, 'pen_clip'), .24, .026, 0));
  A.add(pen, .95, { dy: .8, dur: .5 });
  // calculator
  const calc = new THREE.Group(); calc.name = 'calculator'; at(calc, .42, .1, .78); calc.rotation.y = -.25; g.add(calc);
  calc.add(at(box(.46, .05, .62, m.clay, 'calc_body'), 0, .025, 0), at(box(.36, .008, .12, m.ink, 'calc_display'), 0, .054, -.2));
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) calc.add(at(box(.07, .018, .06, r === 4 && c === 3 ? m.red : m.dark, 'calc_key'), -.135 + c * .09, .059, -.06 + r * .075));
  A.add(calc, 1.05, { dy: .8, dur: .5 });
  // scale model of a steel hall
  const model = new THREE.Group(); model.name = 'scale_model'; at(model, 1.08, .1, -.22); model.rotation.y = -.55; g.add(model);
  const mb = at(box(1.5, .04, 1.1, m.clay, 'model_base'), 0, .02, 0); model.add(mb); A.add(mb, .45, { pop: true, dur: .5 });
  const sp = .45, ev = .38, rg = .56;
  [-.44, -.22, 0, .22, .44].forEach((z, i) => {
    const f = new THREE.Group(); f.name = 'model_frame'; f.position.set(0, .04, 0); model.add(f);
    for (const sx of [-1, 1]) {
      f.add(at(box(.03, ev, .03, m.clay, 'model_column'), sx * sp, ev / 2, z));
      const r = rod([sx * sp, ev, z], [0, rg, z], .016, m.clay, 'model_rafter', 4); f.add(r);
    }
    A.add(f, .6 + i * .08, { grow: 'y', dur: .45 });
  });
  const roofN = V(Math.sin(Math.atan2(rg - ev, sp)), Math.cos(Math.atan2(rg - ev, sp)), 0);
  for (const sx of [-1, 1]) for (let k = 0; k < 4; k++) {
    const t = .08 + k * .28, x = lerp(sx * sp, 0, t), y = lerp(ev, rg, t) + .04 + .022;
    const p = at(box(.014, .014, .96, m.dark, 'model_purlin'), x, y, 0); model.add(p); A.add(p, 1.05 + k * .05, { pop: true, dur: .35 });
  }
  const ang = Math.atan2(rg - ev, sp);
  for (let k = 0; k < 2; k++) {
    const pn = new THREE.Group(); pn.name = 'model_roof_panel'; at(pn, .24, lerp(ev, rg, .48) + .04 + .04, -.24 + k * .48); pn.rotation.z = -ang; model.add(pn);
    pn.add(box(.52, .01, .46, m.clay, 'roof_sheet'));
    for (let q = 0; q < 5; q++) pn.add(at(box(.52, .012, .018, m.clay, 'roof_rib'), 0, .009, -.2 + q * .1));
    A.add(pn, 1.35 + k * .1, { dy: .5, dur: .45 });
  }
  for (const sx of [-1, 1]) { const b1 = rod([sx * sp, .05, -.44], [sx * sp, ev + .03, -.22], .007, m.red, 'model_bracing', 6), b2 = rod([sx * sp, ev + .03, -.44], [sx * sp, .05, -.22], .007, m.red, 'model_bracing', 6); model.add(b1, b2); A.add(b1, 1.3, { pop: true, dur: .3 }); A.add(b2, 1.32, { pop: true, dur: .3 }); }
  // stamp
  const stamp = new THREE.Group(); stamp.name = 'stamp'; g.add(stamp);
  stamp.add(at(cyl(.14, .016, m.ink, 'stamp_rubber', 48), 0, .008, 0), at(cyl(.15, .07, m.red, 'stamp_base', 48), 0, .051, 0), at(cyl(.045, .16, m.clay, 'stamp_neck', 24), 0, .166, 0));
  const knob = mesh(new THREE.SphereGeometry(.085, 32, 16), m.dark, 'stamp_knob'); at(knob, 0, .29, 0); stamp.add(knob);
  const rest = V(.0, .1, -.78); stamp.position.copy(rest);
  A.add(stamp, 1.5, { dy: 1.2, dur: .55 });
  const inkLocal = V(.22, .006, .3), tgt = V();
  return {
    cam: { target: [.15, .3, .05], dist: 7.2, elev: 36, azim: 20, size: 1.5 }, tile: [4.4, 3.1], shadow: 3,
    update({ t, h }) {
      top.position.x = .12 * h; model.rotation.y = -.55 + .5 * h;
      top.updateWorldMatrix(true, false); tgt.copy(inkLocal); top.localToWorld(tgt); g.worldToLocal(tgt);
      const P = 6, p = t % P; let pos = rest.clone(), lift = 0;
      if (p < 1) { const e = eio(seg(p, 0, 1)); pos.lerpVectors(rest, tgt, e); lift = Math.sin(e * Math.PI) * .25 + e * .2; }
      else if (p < 1.6) { pos.copy(tgt); lift = .2 * (1 - eio(seg(p, 1, 1.35))); }
      else if (p < 2.4) { pos.copy(tgt); lift = .2 * eio(seg(p, 1.6, 2.4)); }
      else if (p < 3.4) { const e = eio(seg(p, 2.4, 3.4)); pos.lerpVectors(tgt, rest, e); lift = .2 * (1 - e) + Math.sin(e * Math.PI) * .25; }
      stamp.position.copy(pos); stamp.position.y += lift;
      const press = p > 1.32 && p < 1.6 ? (p - 1.32) / .28 : 0; stamp.scale.set(1, 1 - .04 * Math.sin(press * Math.PI), 1);
      ink.material.opacity = p < 1.32 ? (p < .2 ? 0 : 0) : (p < 5.4 ? .85 : .85 * (1 - seg(p, 5.4, 6)));
    },
  };
};

// 2 — Charpente Métallique: portal-frame hall skeleton with purlins, girts and red X-bracing.
SCENES.charpente = (g, m, A) => {
  const top = .12, span = 1.8, eave = 1.38, ridge = 1.98, zs = [-1.6, -.8, 0, .8, 1.6];
  const slab = at(box(4.8, .12, 4.3, m.dark, 'slab'), 0, .06, 0); g.add(slab); A.add(slab, 0, { pop: true, dur: .55 });
  const rafters = [], purlins = [], bracing = [];
  zs.forEach((z, i) => {
    const d = .3 + i * .12;
    for (const sx of [-1, 1]) {
      const x = sx * span;
      const pad = at(box(.32, .03, .26, m.clay, 'footing'), x, top + .015, z); g.add(pad); A.add(pad, .12 + i * .05, { pop: true, dur: .4 });
      const col = new THREE.Group(); col.name = 'column'; g.add(col);
      col.add(member([x, top + .05, z], [x, eave + .04, z], ...I16, m.clay, 'column_IPE160', V(1, 0, 0)));
      col.add(at(box(.24, .02, .18, m.dark, 'base_plate'), x, top + .04, z));
      for (const bx of [-.085, .085]) for (const bz of [-.06, .06]) col.add(at(cyl(.011, .07, m.ink, 'anchor_bolt', 10), x + bx, top + .065, z + bz));
      col.add(at(box(.012, .13, .08, m.dark, 'stiffener'), x, eave - .05, z));
      A.add(col, d, { dy: 2.6, dur: .7 });
      const raf = new THREE.Group(); raf.name = 'rafter'; g.add(raf);
      raf.add(member([x, eave, z], [0, ridge, z], ...I16, m.clay, 'rafter_IPE160', V(0, 1, 0)));
      raf.add(at(box(.035, .3, .12, m.dark, 'haunch_plate'), x - sx * .07, eave - .03, z));
      raf.userData.base = raf.position.clone(); A.add(raf, d + .5, { dy: 1.8, dur: .7 }); rafters.push(raf);
    }
    const ap = at(box(.07, .24, .12, m.dark, 'apex_plate'), 0, ridge - .01, z); g.add(ap); ap.userData.base = ap.position.clone(); rafters.push(ap); A.add(ap, d + .7, { pop: true, dur: .4 });
  });
  const a = Math.atan2(ridge - eave, span);
  for (const sx of [-1, 1]) {
    const n = V(sx * Math.sin(a), Math.cos(a), 0);
    [.04, .25, .46, .67, .88].forEach((t, k) => {
      const P = V(lerp(sx * span, 0, t), lerp(eave, ridge, t), 0).addScaledVector(n, .08 + .046);
      const p = member([P.x, P.y, -1.78], [P.x, P.y, 1.78], ...C9, m.dark, 'purlin_C90', n);
      g.add(p); p.userData.base = p.position.clone(); purlins.push(p); A.add(p, 1.35 + k * .07 + (sx > 0 ? .03 : 0), { dz: -3.5, dur: .6 });
    });
    [.55, 1.0].forEach((y, k) => { const p = member([sx * (span + .09), top + y, -1.78], [sx * (span + .09), top + y, 1.78], ...C9, m.dark, 'girt_C90', V(sx, 0, 0)); g.add(p); A.add(p, 1.3 + k * .08, { dz: 3.5, dur: .6 }); });
    for (const [z0, z1] of [[zs[0], zs[1]], [zs[3], zs[4]]]) {
      const x = sx * (span - .0);
      const w1 = rod([x, top + .14, z0], [x, eave - .1, z1], .012, m.red, 'bracing_wall'), w2 = rod([x, top + .14, z1], [x, eave - .1, z0], .012, m.red, 'bracing_wall');
      const ra = V(lerp(sx * span, 0, .04), lerp(eave, ridge, .04), 0).addScaledVector(n, .095), rb = V(lerp(sx * span, 0, .9), lerp(eave, ridge, .9), 0).addScaledVector(n, .095);
      const r1 = rod([ra.x, ra.y, z0], [rb.x, rb.y, z1], .012, m.red, 'bracing_roof'), r2 = rod([ra.x, ra.y, z1], [rb.x, rb.y, z0], .012, m.red, 'bracing_roof');
      [w1, w2, r1, r2].forEach((b, q) => { g.add(b); bracing.push(b); A.add(b, 1.9 + q * .05, { pop: true, dur: .35 }); });
      [r1, r2].forEach(b => { b.userData.base = b.position.clone(); purlins.push(b); });
    }
  }
  const rc = member([0, ridge + .17, -1.8], [0, ridge + .17, 1.8], 'ridge', [[-.12, -.02], [0, .03], [.12, -.02], [.12, -.03], [0, .02], [-.12, -.03]], m.clay, 'ridge_cap', V(0, 1, 0));
  g.add(rc); rc.userData.base = rc.position.clone(); purlins.push(rc); A.add(rc, 2.0, { dy: .8, dur: .4 });
  return {
    cam: { target: [0, 1.0, 0], dist: 11.2, elev: 22, azim: 36, size: 2.15 }, tile: [5.6, 5], shadow: 3.6,
    update({ t, h }) {
      rafters.forEach(r => (r.position.y = r.userData.base.y + .08 * h));
      purlins.forEach(p => (p.position.y = p.userData.base.y + .22 * h));
      m.red.emissive.setRGB(.35 * h * (.6 + .4 * Math.sin(t * 5)), 0, 0);
    },
  };
};

// 3 — Panneaux Sandwich: palletised stack + a hero panel that separates into skins and PIR core.
SCENES.sandwich = (g, m, A) => {
  const L = 3.0, W = 1.0, th = .18, rib = .055, sk = .008;
  const pal = new THREE.Group(); pal.name = 'pallet'; g.add(pal);
  [-.4, 0, .4].forEach(z => pal.add(at(box(L + .1, .1, .12, m.dark, 'pallet_runner'), 0, .05, z)));
  for (let i = 0; i < 9; i++) pal.add(at(box(.14, .025, W + .14, m.clay, 'pallet_slat'), -1.44 + i * .36, .1125, 0));
  A.add(pal, 0, { pop: true, dur: .55 });
  const outline = []; outline.push([-W / 2, 0]);
  for (let i = 0; i < 4; i++) { const c = -W / 2 + W / 4 * (i + .5); outline.push([c - .08, 0], [c - .035, rib], [c + .035, rib], [c + .08, 0]); }
  outline.push([W / 2, 0]);
  const extr = (k, pts) => gc(k, () => { const geo = new THREE.ExtrudeGeometry(shapeFrom(pts), { depth: L, bevelEnabled: false }); geo.translate(0, 0, -L / 2); geo.rotateY(Math.PI / 2); return geo; });
  const skinG = extr('sw_skin', [...outline.map(([x, y]) => [x, y + sk]), ...outline.slice().reverse()]);
  const foamG = extr('sw_foam', [[-W / 2, -th], [W / 2, -th], ...outline.slice().reverse().map(([x, y]) => [x, y - .0005])]);
  function panel(name) {
    const p = new THREE.Group(); p.name = name;
    const topS = mesh(skinG, m.clay, 'skin_top_trapezoidal'), core = mesh(foamG, m.foam, 'core_PIR');
    const bot = new THREE.Group(); bot.name = 'skin_bottom'; bot.add(at(box(L, .007, W, m.clay, 'skin_bottom_sheet'), 0, -th - .0035, 0));
    for (let q = 0; q < 6; q++) bot.add(at(box(L, .004, .012, m.clay, 'skin_bottom_microrib'), 0, -th - .009, -.4 + q * .16));
    core.add(at(box(L, .06, .03, m.foam, 'tongue'), 0, -th / 2, -W / 2 - .015));
    p.add(topS, core, bot); return { p, topS, core, bot };
  }
  const H = th + rib + sk + .012;
  const p1 = panel('panel_1'); at(p1.p, 0, .125 + th + .01, 0); g.add(p1.p); A.add(p1.p, .35, { dy: 1.6, dur: .6 });
  const p2 = panel('panel_2'); at(p2.p, 0, .125 + th + .01 + H, 0); g.add(p2.p); A.add(p2.p, .55, { dy: 1.6, dur: .6 });
  const heroWrap = new THREE.Group(); heroWrap.name = 'hero_panel'; at(heroWrap, .15, .125 + th + .01 + 2 * H + .55, .05); heroWrap.rotation.set(0, .14, -.03); g.add(heroWrap);
  const hero = new THREE.Group(); heroWrap.add(hero);
  const ph = panel('panel_hero'); hero.add(ph.p);
  [ph.topS, ph.bot].forEach(o => (o.userData.base = o.position.clone()));
  const dim = new THREE.Group(); dim.name = 'dimension_e'; at(dim, L / 2 + .16, 0, W / 2 - .05); ph.core.add(dim);
  const red = m.red;
  dim.add(noLines(rod([0, -th + .02, 0], [0, -.02, 0], .006, red, 'dim_line', 6)));
  const ah = gc('arrowhead', () => new THREE.ConeGeometry(.022, .05, 16));
  const a1 = noLines(mesh(ah, red, 'dim_arrow')); at(a1, 0, -.025, 0); dim.add(a1);
  const a2 = noLines(mesh(ah, red, 'dim_arrow')); a2.rotation.z = Math.PI; at(a2, 0, -th + .025, 0); dim.add(a2);
  dim.add(noLines(at(box(.2, .005, .005, red, 'dim_ext'), -.08, 0, 0)), noLines(at(box(.2, .005, .005, red, 'dim_ext'), -.08, -th, 0)));
  A.add(heroWrap, .8, { dy: 2, dur: .7 }); A.add(dim, 1.5, { pop: true, dur: .4 });
  const hb = heroWrap.position.clone();
  return {
    cam: { target: [0, .6, 0], dist: 7.3, elev: 24, azim: 36, size: 1.4 }, tile: [4.2, 2.6], shadow: 2.6,
    update({ t, h }) {
      const p = (t % 7) / 7, pulse = Math.max(eio(seg(p, .12, .3)) * (1 - eio(seg(p, .62, .8))), 0);
      const e = Math.max(h, pulse);
      ph.topS.position.y = ph.topS.userData.base.y + e * .3;
      ph.bot.position.y = ph.bot.userData.base.y - e * .2;
      heroWrap.position.y = hb.y + Math.sin(t * 1.3) * .03 + e * .08;
    },
  };
};

// 4 — Galvanisation: zinc kettle with heated burners, gantry hoists dipping a jig of beams — raw in, galvanised out.
SCENES.galva = (g, m, A, st) => {
  const TX = 3.6, TZ = 1.3, TH = .8, TW = .08, ZY = .7;
  const galv = m.raw.clone(); galv.name = 'steel_workpiece';
  const tank = new THREE.Group(); tank.name = 'zinc_kettle'; g.add(tank);
  const floor = at(box(TX, .06, TZ, m.dark, 'kettle_floor'), 0, .03, 0); tank.add(floor); A.add(floor, 0, { pop: true, dur: .5 });
  const walls = [at(box(TX, TH, TW, m.dark, 'kettle_wall'), 0, TH / 2, TZ / 2 - TW / 2), at(box(TX, TH, TW, m.dark, 'kettle_wall'), 0, TH / 2, -TZ / 2 + TW / 2),
    at(box(TW, TH, TZ - 2 * TW, m.dark, 'kettle_wall'), TX / 2 - TW / 2, TH / 2, 0), at(box(TW, TH, TZ - 2 * TW, m.dark, 'kettle_wall'), -TX / 2 + TW / 2, TH / 2, 0)];
  walls.forEach((w, i) => { tank.add(w); A.add(w, .1 + i * .08, { dy: 1.2, dur: .5 }); });
  const rims = [at(box(TX + .1, .04, .14, m.clay, 'kettle_rim'), 0, TH + .02, TZ / 2 - .03), at(box(TX + .1, .04, .14, m.clay, 'kettle_rim'), 0, TH + .02, -TZ / 2 + .03),
    at(box(.14, .04, TZ - .2, m.clay, 'kettle_rim'), TX / 2 - .02, TH + .02, 0), at(box(.14, .04, TZ - .2, m.clay, 'kettle_rim'), -TX / 2 + .02, TH + .02, 0)];
  rims.forEach(r => { tank.add(r); A.add(r, .5, { pop: true, dur: .4 }); });
  for (let x = -1.6; x <= 1.61; x += .4) for (const sz of [-1, 1]) { const s = at(box(.05, TH - .12, .04, m.clay, 'stiffener'), x, TH / 2, sz * (TZ / 2 + .02)); tank.add(s); A.add(s, .55 + (x + 1.6) * .05, { pop: true, dur: .3 }); }
  for (let i = 0; i < 4; i++) { const b = cyl(.05, .1, m.red, 'burner_port', 24); b.rotation.x = Math.PI / 2; at(b, -1.2 + i * .8, .26, TZ / 2 + .07); tank.add(b); A.add(b, .8 + i * .05, { pop: true, dur: .3 }); }
  for (const sz of [-1, 1]) { const hs = noLines(at(box(TX - 2 * TW, .014, .012, m.red, 'heat_band'), 0, ZY + .01, sz * (TZ / 2 - TW - .006))); tank.add(hs); A.add(hs, .9, { pop: true, dur: .3 }); }
  const zg = new THREE.PlaneGeometry(TX - 2 * TW, TZ - 2 * TW, 72, 24); zg.rotateX(-Math.PI / 2);
  const zinc = noLines(mesh(zg, m.zinc, 'zinc_bath_surface')); zinc.castShadow = false; at(zinc, 0, ZY, 0); tank.add(zinc); A.add(zinc, .7, { dy: -.6, dur: .7 });
  const zp = zg.attributes.position, zx = new Float32Array(zp.count), zz = new Float32Array(zp.count);
  for (let i = 0; i < zp.count; i++) { zx[i] = zp.getX(i); zz[i] = zp.getZ(i); }
  // gantry
  const GX = 2.35, GH = 2.7;
  for (const sx of [-1, 1]) {
    const leg = new THREE.Group(); leg.name = 'gantry_leg'; g.add(leg);
    for (const sz of [-1, 1]) { leg.add(at(box(.1, GH, .1, m.clay, 'gantry_post'), sx * GX, GH / 2, sz * .72)); leg.add(at(box(.22, .02, .22, m.dark, 'post_base_plate'), sx * GX, .01, sz * .72)); leg.add(rod([sx * GX, GH - .55, sz * .72], [sx * GX, GH - .05, sz * .2], .02, m.clay, 'knee_brace')); }
    leg.add(at(box(.14, .14, 1.6, m.clay, 'gantry_crossbeam'), sx * GX, GH + .07, 0));
    leg.add(rod([sx * GX, .6, -.72], [sx * GX, 1.8, .72], .014, m.red, 'leg_bracing'), rod([sx * GX, .6, .72], [sx * GX, 1.8, -.72], .014, m.red, 'leg_bracing'));
    A.add(leg, .9 + (sx > 0 ? .1 : 0), { dy: 2.5, dur: .7 });
  }
  const MY = GH + .14 + .11;
  const mainB = member([-GX - .12, MY, 0], [GX + .12, MY, 0], ...I22, m.clay, 'runway_beam_IPE220', V(0, 1, 0)); g.add(mainB); A.add(mainB, 1.3, { dy: 1.5, dur: .6 });
  const HY = MY - .11 - .1;
  for (const hx of [-1.15, 1.15]) {
    const hz = new THREE.Group(); hz.name = 'electric_hoist'; g.add(hz);
    hz.add(at(box(.24, .16, .2, m.red, 'hoist_body'), hx, HY, 0), at(box(.08, .12, .22, m.dark, 'hoist_motor'), hx + .16, HY, 0));
    for (const wx of [-.07, .07]) for (const wz of [-.07, .07]) { const w = cyl(.025, .02, m.ink, 'trolley_wheel', 16); w.rotation.x = Math.PI / 2; at(w, hx + wx, MY - .09, wz); hz.add(w); }
    A.add(hz, 1.55, { pop: true, dur: .4 });
  }
  const top = 1.95, bottom = .7;
  const jigWrap = new THREE.Group(); jigWrap.name = 'jig'; g.add(jigWrap); const jig = new THREE.Group(); jigWrap.add(jig);
  jig.add(member([-1.45, 0, 0], [1.45, 0, 0], ...I10, m.dark, 'jig_traverse', V(0, 1, 0)));
  for (const hx of [-1.15, 1.15]) jig.add(at(box(.05, .1, .05, m.red, 'lifting_lug'), hx, .08, 0));
  [-.3, 0, .3].forEach(z => {
    jig.add(member([-1.25, -.34, z], [1.25, -.34, z], ...I12, galv, 'workpiece_IPE120', V(0, 1, 0)));
    for (const x of [-1.0, 1.0]) jig.add(rod([x, -.04, 0], [x, -.28, z], .006, m.ink, 'hanging_wire', 6));
  });
  jig.position.y = top; A.add(jigWrap, 1.7, { dy: 1.5, dur: .6 });
  const cableG = gc('cable_unit', () => { const c = new THREE.CylinderGeometry(.01, .01, 1, 8); c.translate(0, -.5, 0); return c; });
  const cables = [-1.15, 1.15].map(hx => { const c = mesh(cableG, m.ink, 'hoist_cable'); at(c, hx, HY - .08, 0); g.add(c); A.add(c, 2.1, { pop: true, dur: .3 }); return c; });
  const sphG = gc('drop', () => new THREE.SphereGeometry(1, 12, 8));
  const bubbles = Array.from({ length: 18 }, (_, i) => { const b = noExport(mesh(sphG, m.zinc, 'bubble')); b.scale.setScalar(.018 + (i % 4) * .006); b.userData.p = [(Math.random() - .5) * 2.4, (Math.random() - .5) * .8, Math.random() * 6]; g.add(b); b.visible = false; return b; });
  const drips = Array.from({ length: 12 }, (_, i) => { const d = noExport(mesh(sphG, galv, 'drip')); d.scale.set(.012, .02, .012); d.userData.p = [(Math.random() - .5) * 2.3, [-.3, 0, .3][i % 3], Math.random()]; g.add(d); d.visible = false; return d; });
  const cRaw = new THREE.Color(st.raw), cGalv = new THREE.Color(st.galv);
  const setGalv = k => { galv.color.copy(cRaw).lerp(cGalv, k); galv.metalness = lerp(.35, .9, k); galv.roughness = lerp(.62, .28, k); };
  const state = { jy: top };
  const fn = {
    cam: { target: [0, 1.25, 0], dist: 11.2, elev: 20, azim: 32, size: 2.05 }, tile: [5.6, 2.9], shadow: 3.4,
    update({ t, h }) {
      const P = 9, p = t % P; let jy = top, k = 1, dwell = 0, hold = 0;
      if (p < .7) { k = 1 - seg(p, 0, .7); }
      else if (p < 2.4) { k = 0; jy = lerp(top, bottom, eio(seg(p, .7, 2.4))); }
      else if (p < 4.2) { k = 0; jy = bottom; dwell = Math.sin(seg(p, 2.4, 4.2) * Math.PI); }
      else if (p < 6) { const e = eio(seg(p, 4.2, 6)); jy = lerp(bottom, top, e); k = clamp(seg(p, 4.6, 5.6)); }
      else { hold = Math.sin(seg(p, 6, 9) * Math.PI); }
      setGalv(k); jig.position.y = jy; state.jy = jy;
      cables.forEach(c => (c.scale.y = Math.max(.01, (HY - .08) - (jy + .13))));
      const amp = .012 * (1 + h) + dwell * .02;
      for (let i = 0; i < zp.count; i++) zp.setY(i, amp * Math.sin(zx[i] * 5 + t * 2.2) * Math.cos(zz[i] * 6 + t * 1.6) + dwell * .018 * Math.sin(Math.hypot(zx[i] * 1.2, zz[i] * 3) * 14 - t * 9));
      zp.needsUpdate = true; zg.computeVertexNormals();
      bubbles.forEach(b => { const [x, z, ph] = b.userData.p; b.visible = dwell > .05; b.position.set(x, ZY + Math.abs(Math.sin(t * 4 + ph)) * .09 * dwell, z); });
      drips.forEach(d => { const [x, z, ph] = d.userData.p; const f = (t * 1.1 + ph) % 1; d.visible = hold > .15 && jy > 1.5; d.position.set(x, (jy - .4) - f * f * ((jy - .4) - ZY), z); });
    },
  };
  return fn;
};

// 5 — Écoute Client: headset on a stand, desk phone with coiled cord, 24h dial and emitted signal rings.
SCENES.ecoute = (g, m, A) => {
  const desk = at(cyl(1.95, .12, m.dark, 'desk_disc', 96), 0, .06, 0); g.add(desk); A.add(desk, 0, { pop: true, dur: .55 });
  const T = .12;
  const stand = new THREE.Group(); stand.name = 'headset_stand'; at(stand, -.72, 0, .1); stand.rotation.y = .5; g.add(stand);
  stand.add(at(cyl(.3, .04, m.clay, 'stand_base', 48), 0, T + .02, 0), at(cyl(.03, 1.14, m.clay, 'stand_post', 24), 0, T + .6, 0));
  const hb = cyl(.035, .32, m.dark, 'stand_hanger', 24); hb.rotation.x = Math.PI / 2; at(hb, 0, 1.3, 0); stand.add(hb);
  A.add(stand, .25, { grow: 'y', dur: .6 });
  const headWrap = new THREE.Group(); headWrap.name = 'headset'; at(headWrap, -.72, .955, .1); headWrap.rotation.y = .5; g.add(headWrap);
  const head = new THREE.Group(); headWrap.add(head);
  head.add(mesh(new THREE.TorusGeometry(.42, .03, 16, 96, Math.PI), m.clay, 'headband'));
  const pad = mesh(new THREE.TorusGeometry(.405, .046, 16, 48, Math.PI * .5), m.dark, 'headband_pad'); pad.rotation.z = Math.PI * .25; head.add(pad);
  for (const sx of [-1, 1]) {
    head.add(at(box(.035, .07, .06, m.dark, 'slider'), sx * .42, .02, 0), at(box(.03, .14, .06, m.clay, 'yoke'), sx * .44, -.09, 0));
    const cup = cyl(.16, .09, m.clay, 'earcup_shell', 48); cup.rotation.z = Math.PI / 2; at(cup, sx * .5, -.17, 0); head.add(cup);
    const capE = cyl(.115, .025, sx < 0 ? m.red : m.dark, 'earcup_cap', 48); capE.rotation.z = Math.PI / 2; at(capE, sx * .555, -.17, 0); head.add(capE);
    const cush = mesh(new THREE.TorusGeometry(.115, .045, 16, 48), m.dark, 'ear_cushion'); cush.rotation.y = Math.PI / 2; at(cush, sx * .44, -.17, 0); head.add(cush);
  }
  const boom = new THREE.CatmullRomCurve3([V(-.52, -.25, .07), V(-.49, -.4, .2), V(-.38, -.49, .33), V(-.2, -.52, .4)]);
  head.add(mesh(new THREE.TubeGeometry(boom, 48, .013, 10), m.ink, 'mic_boom'));
  const mic = mesh(new THREE.CapsuleGeometry(.035, .07, 8, 20), m.red, 'mic_capsule'); at(mic, -.17, -.52, .41); mic.quaternion.setFromUnitVectors(V(0, 1, 0), boom.getTangent(1)); head.add(mic);
  A.add(headWrap, .7, { dy: 1.6, dur: .7 });
  const rings = [0, 1, 2].map(i => { const r = noExport(mesh(gc('ringT', () => new THREE.TorusGeometry(1, .012, 8, 96)), new THREE.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0, depthWrite: false }), 'signal_ring')); r.castShadow = false; at(r, -.1, -.54, .45); r.rotation.y = .2; head.add(r); return r; });
  // 24h dial
  const clock = new THREE.Group(); clock.name = 'dial_24h'; at(clock, .78, 0, -.35); clock.rotation.y = -.38; g.add(clock);
  clock.add(at(box(.56, .06, .3, m.clay, 'dial_foot'), 0, T + .03, 0), at(box(.09, .22, .07, m.clay, 'dial_support'), 0, T + .16, 0));
  const dial = new THREE.Group(); at(dial, 0, T + .9, 0); clock.add(dial);
  const body = cyl(.62, .1, m.clay, 'dial_body', 96); body.rotation.x = Math.PI / 2; dial.add(body);
  const face = cyl(.56, .012, m.paper, 'dial_face', 96); face.rotation.x = Math.PI / 2; at(face, 0, 0, .053); dial.add(face);
  const bez = mesh(new THREE.TorusGeometry(.6, .035, 16, 96), m.dark, 'dial_bezel'); at(bez, 0, 0, .05); dial.add(bez);
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2, big = i % 6 === 0, L = big ? .1 : .05; const tk = box(big ? .02 : .01, L, .008, big ? m.ink : m.dark, 'dial_tick'); at(tk, Math.sin(a) * (.5 - L / 2), Math.cos(a) * (.5 - L / 2), .062); tk.rotation.z = -a; dial.add(tk); }
  const hourP = new THREE.Group(); at(hourP, 0, 0, .066); dial.add(hourP); hourP.add(at(box(.026, .28, .008, m.ink, 'hour_hand'), 0, .1, 0));
  const sweep = new THREE.Group(); at(sweep, 0, 0, .074); dial.add(sweep); sweep.add(at(box(.012, .5, .006, m.red, 'sweep_hand'), 0, .17, 0));
  const hub = cyl(.035, .03, m.red, 'dial_hub', 24); hub.rotation.x = Math.PI / 2; at(hub, 0, 0, .08); dial.add(hub);
  A.add(clock, .45, { dy: 1.4, dur: .6 }); dial.rotation.x = 0;
  // desk phone + coiled cord
  const phone = new THREE.Group(); phone.name = 'desk_phone'; at(phone, .22, T, .78); phone.rotation.y = .22; g.add(phone);
  phone.add(at(box(.64, .1, .46, m.clay, 'phone_base'), 0, .05, 0));
  const kp = new THREE.Group(); at(kp, .12, .12, .02); kp.rotation.x = -.28; phone.add(kp); kp.add(box(.34, .03, .32, m.clay, 'keypad_deck'));
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) kp.add(at(box(.07, .02, .055, r === 3 && c === 2 ? m.red : m.dark, 'phone_key'), -.09 + c * .09, .022, -.11 + r * .075));
  const hs = new THREE.Group(); hs.name = 'handset'; at(hs, -.17, .16, 0); hs.rotation.y = Math.PI / 2; phone.add(hs);
  const hcap = mesh(new THREE.CapsuleGeometry(.04, .32, 8, 20), m.dark, 'handset_grip'); hcap.rotation.z = Math.PI / 2; hs.add(hcap);
  for (const sx of [-1, 1]) { const e = cyl(.065, .06, m.dark, 'handset_cup', 32); at(e, sx * .21, -.025, 0); hs.add(e); }
  class Coil extends THREE.Curve { constructor(a, b, r, n) { super(); this.a = a; this.b = b; this.r = r; this.n = n; this.d = b.clone().sub(a); this.u = V(0, 1, 0).cross(this.d).normalize(); if (this.u.lengthSq() < .1) this.u = V(1, 0, 0); this.w = this.d.clone().cross(this.u).normalize(); }
    getPoint(t, o = new THREE.Vector3()) { const a = t * this.n * Math.PI * 2, sag = Math.sin(t * Math.PI) * -.06; return o.copy(this.a).addScaledVector(this.d, t).addScaledVector(this.u, Math.cos(a) * this.r).addScaledVector(this.w, Math.sin(a) * this.r).add(V(0, sag, 0)); } }
  phone.add(mesh(new THREE.TubeGeometry(new Coil(V(-.33, .05, .2), V(-.17, .13, .25), .022, 14), 360, .006, 6), m.ink, 'coiled_cord'));
  A.add(phone, .55, { dy: 1.2, dur: .6 });
  const hwb = headWrap.position.clone();
  return {
    cam: { target: [0, .66, .05], dist: 7.5, elev: 17, azim: 14, size: 1.36 }, tile: [4.1, 4.1], shadow: 2.6,
    update({ t, h }) {
      headWrap.position.y = hwb.y + .16 * h + Math.sin(t * 1.4) * .012;
      head.rotation.y = .45 * h; head.rotation.z = Math.sin(t * .9) * .02;
      sweep.rotation.z = -t * (Math.PI * 2 / 8); hourP.rotation.z = -t * (Math.PI * 2 / 96);
      rings.forEach((r, i) => { const p = ((t * (1 + h)) / 2.4 + i / 3) % 1; r.scale.setScalar(.05 + p * .65); r.material.opacity = (1 - p) * .9 * (p > .02 ? 1 : 0); });
    },
  };
};

// 6 — Réalisation et Montage: lattice tower crane slewing and placing a beam into a two-storey frame.
SCENES.montage = (g, m, A) => {
  const top = .1;
  const slab = at(box(4.8, .1, 3.9, m.dark, 'site_slab'), 0, .05, 0); g.add(slab); A.add(slab, 0, { pop: true, dur: .5 });
  const MX = -1.5, MZ = .45, MH = 3.0, hw = .15, base = top + .12;
  const fnd = at(box(.62, .12, .62, m.clay, 'crane_foundation'), MX, top + .06, MZ); g.add(fnd); A.add(fnd, .15, { pop: true, dur: .4 });
  const mast = new THREE.Group(); mast.name = 'crane_mast'; at(mast, MX, base, MZ); g.add(mast);
  for (const x of [-hw, hw]) for (const z of [-hw, hw]) mast.add(at(box(.03, MH, .03, m.clay, 'mast_chord'), x, MH / 2, z));
  const n = 10, s = MH / n, R = .008;
  for (let i = 0; i < n; i++) {
    const y0 = i * s, y1 = y0 + s, f = i % 2 ? -1 : 1;
    mast.add(rod([-hw * f, y0, hw], [hw * f, y1, hw], R, m.clay, 'mast_lacing', 6), rod([hw * f, y0, -hw], [-hw * f, y1, -hw], R, m.clay, 'mast_lacing', 6),
      rod([hw, y0, -hw * f], [hw, y1, hw * f], R, m.clay, 'mast_lacing', 6), rod([-hw, y0, hw * f], [-hw, y1, -hw * f], R, m.clay, 'mast_lacing', 6));
    for (const [a, b] of [[[-hw, y1, hw], [hw, y1, hw]], [[-hw, y1, -hw], [hw, y1, -hw]], [[hw, y1, -hw], [hw, y1, hw]], [[-hw, y1, -hw], [-hw, y1, hw]]]) mast.add(rod(a, b, R, m.clay, 'mast_strut', 6));
  }
  A.add(mast, .3, { grow: 'y', dur: 1.1 });
  const UY = base + MH;
  const upper = new THREE.Group(); upper.name = 'crane_slewing_part'; at(upper, MX, UY, MZ); g.add(upper);
  upper.add(at(cyl(.22, .1, m.dark, 'slewing_ring', 40), 0, .05, 0));
  upper.add(at(box(.22, .2, .2, m.clay, 'operator_cab'), .08, .2, .26), at(box(.006, .1, .16, m.ink, 'cab_window'), .195, .23, .26));
  const J0 = .15, J1 = 2.95, jb = .14, jt = .36, jz = .1;
  for (const z of [-jz, jz]) upper.add(rod([J0, jb, z], [J1, jb, z], .012, m.clay, 'jib_chord_bottom', 6));
  upper.add(rod([J0, jt, 0], [J1 - .15, jt, 0], .012, m.clay, 'jib_chord_top', 6));
  for (let x = J0; x < J1 - .2; x += .25) {
    const xb = x + .125, xc = x + .25;
    for (const z of [-jz, jz]) upper.add(rod([x, jb, z], [xb, jt, 0], .006, m.clay, 'jib_lacing', 5), rod([xb, jt, 0], [xc, jb, z], .006, m.clay, 'jib_lacing', 5));
    upper.add(rod([x, jb, -jz], [x, jb, jz], .006, m.clay, 'jib_strut', 5));
  }
  for (const z of [-jz, jz]) upper.add(rod([-J0, jb, z], [-1.05, jb, z], .012, m.clay, 'counterjib_chord', 6));
  upper.add(at(box(.95, .02, .26, m.dark, 'counterjib_deck'), -.6, jb, 0));
  [-.75, -.88, -1.01].forEach(x => upper.add(at(box(.12, .26, .24, m.dark, 'counterweight'), x, jb + .14, 0)));
  for (const x of [-.12, .12]) for (const z of [-.12, .12]) upper.add(rod([x, .12, z], [0, .78, 0], .01, m.clay, 'apex_leg', 6));
  upper.add(rod([0, .78, 0], [2.0, jt, 0], .006, m.ink, 'jib_tie', 5), rod([0, .78, 0], [-1.02, jb + .02, 0], .006, m.ink, 'counterjib_tie', 5));
  A.add(upper, 1.35, { dy: 1.2, dur: .6 });
  const trolley = new THREE.Group(); trolley.name = 'trolley'; upper.add(trolley);
  trolley.add(at(box(.16, .06, .26, m.red, 'trolley_frame'), 0, .1, 0));
  const cable = mesh(gc('cable_unit', () => { const c = new THREE.CylinderGeometry(.01, .01, 1, 8); c.translate(0, -.5, 0); return c; }), m.ink, 'hoist_rope'); upper.add(cable);
  const hook = new THREE.Group(); hook.name = 'hook_block'; upper.add(hook);
  hook.add(at(box(.1, .12, .08, m.red, 'hook_sheave'), 0, 0, 0));
  const hk = mesh(new THREE.TorusGeometry(.04, .012, 8, 24, Math.PI * 1.4), m.ink, 'hook'); hk.rotation.z = Math.PI * .8; at(hk, 0, -.1, 0); hook.add(hk);
  // building frame
  const tA = -.45, tB = .3, rA = 1.3, rB = 2.3;
  const polar = (t, r) => V(MX + r * Math.cos(t), 0, MZ - r * Math.sin(t));
  const B = polar(tB, rB), Ap = polar(tA, rA);
  const bld = new THREE.Group(); bld.name = 'building_frame'; at(bld, B.x, top, B.z); bld.rotation.y = tB; g.add(bld);
  const L1 = .7, L2 = 1.4, cx = .5, cz = .45; let k = 0;
  for (const x of [-cx, cx]) for (const z of [-cz, cz]) { const c = member([x, 0, z], [x, L2 + .04, z], ...I8, m.clay, 'column_HEA80', V(1, 0, 0)); bld.add(c); A.add(c, .3 + k++ * .1, { dy: 2, dur: .6 }); }
  for (const y of [L1, L2]) {
    for (const z of [-cz, cz]) { const b = member([-cx, y, z], [cx, y, z], ...I8, m.clay, 'beam_IPE80', V(0, 1, 0)); bld.add(b); A.add(b, .8 + y * .3, { pop: true, dur: .4 }); }
    for (const x of [-cx, cx]) { const b = member([x, y, -cz], [x, y, cz], ...I8, m.clay, 'beam_IPE80', V(0, 1, 0)); bld.add(b); A.add(b, .85 + y * .3, { pop: true, dur: .4 }); }
  }
  const sec = member([0, L1, -cz], [0, L1, cz], ...I8, m.clay, 'secondary_beam', V(0, 1, 0)); bld.add(sec); A.add(sec, 1.1, { pop: true, dur: .4 });
  const deck = new THREE.Group(); deck.name = 'composite_deck'; at(deck, 0, L1 + .05, 0); bld.add(deck);
  deck.add(box(1.0, .015, .9, m.dark, 'deck_sheet')); for (let q = 0; q < 7; q++) deck.add(at(box(1.0, .012, .03, m.dark, 'deck_rib'), 0, .012, -.39 + q * .13));
  A.add(deck, 1.3, { dz: 1.2, dur: .5 });
  for (const [a, b] of [[[-cx, .04, -cz], [cx, L1 - .04, -cz]], [[cx, .04, -cz], [-cx, L1 - .04, -cz]], [[-cx, L1 + .04, -cz], [cx, L2 - .04, -cz]], [[cx, L1 + .04, -cz], [-cx, L2 - .04, -cz]]]) { const r = rod(a, b, .01, m.red, 'bracing'); bld.add(r); A.add(r, 1.4, { pop: true, dur: .3 }); }
  // beam stack + load
  const stk = new THREE.Group(); stk.name = 'beam_stack'; at(stk, Ap.x, top, Ap.z); stk.rotation.y = tA; g.add(stk);
  for (const [y, zo] of [[.04, -.06], [.04, .06], [.12, 0]]) stk.add(member([zo, y, -.45], [zo, y, .45], ...I8, m.clay, 'stock_beam', V(0, 1, 0)));
  stk.add(at(box(.3, .03, .08, m.dark, 'dunnage'), 0, .015, -.3), at(box(.3, .03, .08, m.dark, 'dunnage'), 0, .015, .3));
  A.add(stk, 1.6, { dy: .8, dur: .5 });
  const load = new THREE.Group(); load.name = 'load_beam'; g.add(load);
  load.add(member([0, -.3, -.45], [0, -.3, .45], ...I8, m.red, 'load_beam_IPE80', V(0, 1, 0)));
  const slings = new THREE.Group(); slings.add(rod([0, -.04, 0], [0, -.26, -.32], .005, m.ink, 'sling', 5), rod([0, -.04, 0], [0, -.26, .32], .005, m.ink, 'sling', 5)); load.add(slings);
  const hyTop = 2.55, hyPick = top + .2 + .3, hyDrop = top + L2 + .3 + .045;
  const dropPos = V(B.x, hyDrop, B.z), pickPos = V(Ap.x, hyPick, Ap.z);
  const fn = {
    cam: { target: [.1, 1.72, .1], dist: 11.8, elev: 16, azim: 18, size: 2.2 }, tile: [5.6, 4.6], shadow: 3.8,
    update({ t }) {
      const P = 12, p = t % P; let th = tA, r = rA, hy = hyTop, att = false, placed = false, sc = 1;
      if (p < 1.2) hy = lerp(hyTop, hyPick, eio(seg(p, 0, 1.2)));
      else if (p < 1.6) { hy = hyPick; att = p > 1.4; }
      else if (p < 3) { hy = lerp(hyPick, hyTop, eio(seg(p, 1.6, 3))); att = true; }
      else if (p < 5.5) { const e = eio(seg(p, 3, 5.5)); th = lerp(tA, tB, e); r = lerp(rA, rB, e); att = true; }
      else if (p < 7.2) { th = tB; r = rB; hy = lerp(hyTop, hyDrop, eio(seg(p, 5.5, 7))); att = true; }
      else if (p < 8.4) { th = tB; r = rB; hy = lerp(hyDrop, hyTop, eio(seg(p, 7.4, 8.4))); placed = true; }
      else if (p < 11) { const e = eio(seg(p, 8.4, 11)); th = lerp(tB, tA, e); r = lerp(rB, rA, e); placed = true; }
      else if (p < 11.5) { placed = true; sc = 1 - seg(p, 11, 11.5); }
      else sc = backOut(seg(p, 11.5, 12));
      upper.rotation.y = th;
      trolley.position.x = r; hook.position.set(r, hy - UY, 0);
      cable.position.set(r, .08, 0); cable.scale.y = Math.max(.01, (UY + .08) - (hy + .06));
      if (att) { load.position.set(MX + r * Math.cos(th), hy - .06, MZ - r * Math.sin(th)); load.rotation.y = th; }
      else if (placed) { load.position.copy(dropPos).y -= .06; load.rotation.y = tB; }
      else { load.position.copy(pickPos).y -= .06; load.rotation.y = tA; }
      slings.visible = att; load.scale.setScalar(Math.max(1e-4, sc));
    },
  };
  fn.update({ t: 0 });
  return fn;
};

/* ---------------- renderer, environment ---------------- */
let R = null, envTex = null;
function renderer() {
  if (R) return R;
  R = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  R.setClearColor(0x000000, 0); R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFShadowMap;
  R.toneMapping = THREE.NeutralToneMapping; R.toneMappingExposure = 1; R.outputColorSpace = THREE.SRGBColorSpace;
  return R;
}
function getEnv(r) {
  if (envTex) return envTex;
  const s = new THREE.Scene(), geo = new THREE.SphereGeometry(10, 32, 16), pos = geo.attributes.position, cols = [];
  for (let i = 0; i < pos.count; i++) { const y = pos.getY(i) / 10, v = lerp(.25, 1, (y + 1) / 2); cols.push(v, v, v * .98); }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  s.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })));
  const sb = (x, y, z, w, h, i) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(i, i, i), side: THREE.DoubleSide })); p.position.set(x, y, z); p.lookAt(0, 0, 0); s.add(p); };
  sb(0, 8, 0, 9, 9, 2.6); sb(7, 3, 5, 4, 6, 1.8); sb(-7, 2.5, -3, 3, 5, 1.1); sb(-2, 2, 8, 6, 2, 1.2);
  const pm = new THREE.PMREMGenerator(r); envTex = pm.fromScene(s, .04).texture; pm.dispose(); return envTex;
}

/* ---------------- card ---------------- */
const edgeCache = new Map(), wireCache = new Map();
function decorate(root, lineMat, wireMat) {
  const list = []; root.traverse(o => { if (o.isMesh && !o.userData.noLines) list.push(o); });
  for (const o of list) {
    const gid = o.geometry.uuid;
    if (!edgeCache.has(gid)) edgeCache.set(gid, new THREE.EdgesGeometry(o.geometry, 28));
    if (!wireCache.has(gid)) wireCache.set(gid, new THREE.WireframeGeometry(o.geometry));
    const e = new THREE.LineSegments(edgeCache.get(gid), lineMat); e.name = 'edges'; e.userData.helper = true; e.raycast = () => {};
    const w = new THREE.LineSegments(wireCache.get(gid), wireMat); w.name = 'wire'; w.userData.helper = true; w.raycast = () => {};
    o.add(e, w);
  }
}

class Card {
  constructor(cv) {
    this.canvas = cv; this.ctx = cv.getContext('2d'); this.styleKey = cv.dataset.style === 'b' ? 'b' : 'a'; this.st = STYLES[this.styleKey]; this.key = cv.dataset.scene;
    this.el = cv.closest('[data-card]') || cv.parentElement;
    Object.assign(this, { h: 0, ht: 0, mx: 0, my: 0, tmx: 0, tmy: 0, visible: false, t0: null, lt: 0, frames: 0 });
    this.build(); this.bind();
  }
  build() {
    const st = this.st, scene = new THREE.Scene(); this.scene = scene;
    scene.environment = envTex; scene.environmentIntensity = .5;
    const m = makeMats(st); this.m = m;
    const root = new THREE.Group(); root.name = `bordj_steel_${this.key}`; scene.add(root); this.root = root;
    this.A = new Assembler();
    this.def = SCENES[this.key](root, m, this.A, st);
    this.lineMat = new THREE.LineBasicMaterial({ color: st.edge, transparent: true, opacity: st.edgeOp });
    this.wireMat = new THREE.LineBasicMaterial({ color: st.wire, transparent: true, opacity: st.wireIdle, depthWrite: false });
    decorate(root, this.lineMat, this.wireMat);
    const S = this.def.shadow || 3.5;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b2a6, .85));
    const key = new THREE.DirectionalLight(0xffffff, 2.3); key.position.set(4, 8, 5); key.castShadow = true;
    Object.assign(key.shadow.camera, { left: -S, right: S, top: S, bottom: -S, near: .5, far: 30 });
    key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -.0004; key.shadow.normalBias = .02; key.shadow.radius = 4;
    const tgt = V(...this.def.cam.target); key.target.position.set(tgt.x, 0, tgt.z); key.position.add(V(tgt.x, 0, tgt.z)); scene.add(key, key.target);
    const fill = new THREE.DirectionalLight(0xfff4ec, .55); fill.position.set(-6, 3, -2); scene.add(fill);
    if (st.ortho) {
      const [tw, td] = this.def.tile || [5, 4];
      const tile = new THREE.Group(); tile.name = 'tile'; scene.add(tile);
      const tm = std('tile', 0xf3f5f8, .95, 0);
      const tb = at(box(tw, .16, td, tm, 'tile'), 0, -.081, 0); tile.add(tb);
      tb.add(new THREE.LineSegments(new THREE.EdgesGeometry(tb.geometry), this.lineMat));
      const pts = [], step = .25;
      for (let x = -tw / 2 + step; x < tw / 2 - 1e-3; x += step) pts.push(x, .002, -td / 2, x, .002, td / 2);
      for (let z = -td / 2 + step; z < td / 2 - 1e-3; z += step) pts.push(-tw / 2, .002, z, tw / 2, .002, z);
      const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      tile.add(new THREE.LineSegments(gg, new THREE.LineBasicMaterial({ color: 0xc9d1db, transparent: true, opacity: .9 })));
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: .1 })); sh.rotation.x = -Math.PI / 2; sh.position.y = -.161; sh.receiveShadow = true; scene.add(sh);
      this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -50, 100);
    } else {
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: .16 })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0; sh.receiveShadow = true; scene.add(sh);
      this.camera = new THREE.PerspectiveCamera(26, 1.5, .1, 100);
    }
  }
  bind() {
    const el = this.el;
    el.addEventListener('mouseenter', () => (this.ht = 1));
    el.addEventListener('mouseleave', () => { this.ht = 0; this.tmx = 0; this.tmy = 0; });
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); this.tmx = clamp((e.clientX - r.left) / r.width) * 2 - 1; this.tmy = clamp((e.clientY - r.top) / r.height) * 2 - 1; });
  }
  frame(now, dt, o, motion, sp, r) {
    const cv = this.canvas, dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(2, Math.round(cv.clientWidth * dpr)), h = Math.max(2, Math.round(cv.clientHeight * dpr));
    let dirty = false;
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; dirty = true; }
    const k = 1 - Math.exp(-dt * 6);
    const settling = Math.abs(this.ht - this.h) + Math.abs(this.tmx - this.mx) + Math.abs(this.tmy - this.my) > .002;
    this.h += (this.ht - this.h) * k; this.mx += (this.tmx - this.mx) * k; this.my += (this.tmy - this.my) * k;
    if (this.t0 === null) this.t0 = now;
    if (!motion && !dirty && !settling && this.frames > 2 && this.lastEdges === o.edges) return;
    this.lastEdges = o.edges; this.frames++;
    this.A.apply(motion ? (now - this.t0) * Math.max(.5, sp) : 1e9);
    if (this.A.done) { if (motion) this.lt += dt * sp * (1 + .8 * this.h); this.def.update && this.def.update({ t: this.lt, h: this.h, dt }); }
    const edges = o.edges !== false;
    this.lineMat.opacity = this.st.edgeOp; this.lineMat.visible = edges;
    this.wireMat.opacity = lerp(this.st.wireIdle, this.st.wireHover, this.h); this.wireMat.visible = edges && this.wireMat.opacity > .005;
    const c = this.def.cam, cam = this.camera, aspect = w / h, T = V(...c.target);
    const sway = motion ? Math.sin(now * .22 * sp) * 11 : 0;
    const az = D2R(c.azim + (this.st.ortho ? 9 : 0) + sway + this.mx * 9), el = D2R(c.elev + (this.st.ortho ? 8 : 0) - this.my * 5);
    if (this.st.ortho) {
      const s = c.size * 1.42 * (1 - .06 * this.h) * Math.max(1, 1.5 / aspect);
      cam.left = -s * aspect; cam.right = s * aspect; cam.top = s; cam.bottom = -s; cam.updateProjectionMatrix();
      cam.position.set(T.x + 20 * Math.cos(el) * Math.sin(az), T.y + 20 * Math.sin(el), T.z + 20 * Math.cos(el) * Math.cos(az));
    } else {
      const d = c.dist * (1 - .07 * this.h) * Math.max(1, 1.5 / aspect);
      cam.aspect = aspect; cam.updateProjectionMatrix();
      cam.position.set(T.x + d * Math.cos(el) * Math.sin(az), T.y + d * Math.sin(el), T.z + d * Math.cos(el) * Math.cos(az));
    }
    cam.lookAt(T);
    const rs = r.getSize(new THREE.Vector2());
    if (rs.x !== w || rs.y !== h) r.setSize(w, h, false);
    r.render(this.scene, cam);
    this.ctx.clearRect(0, 0, w, h); this.ctx.drawImage(r.domElement, 0, 0, w, h);
  }
}

/* ---------------- loop / public api ---------------- */
let cards = [], raf = 0, last = 0, getOpts = () => ({}), io = null, scanT = 0;
function scan() {
  cards = cards.filter(c => c.canvas.isConnected);
  document.querySelectorAll('canvas[data-scene]').forEach(cv => {
    if (cv.__bj || !SCENES[cv.dataset.scene]) return;
    try { const c = new Card(cv); cv.__bj = c; cards.push(c); io.observe(cv); } catch (e) { console.error('[bordj-3d]', cv.dataset.scene, e); }
  });
}
function tick(nowMs) {
  raf = requestAnimationFrame(tick);
  const now = nowMs / 1000, dt = Math.min(.05, last ? now - last : .016); last = now;
  const o = getOpts() || {}, motion = o.motion !== false && !RM, sp = o.speed ?? 1, r = renderer();
  for (const c of cards) if (c.visible) c.frame(now, dt, o, motion, sp, r);
}
export function start(fn) {
  if (fn) getOpts = fn;
  const r = renderer(); getEnv(r);
  if (!io) io = new IntersectionObserver(es => es.forEach(e => { const c = e.target.__bj; if (c) c.visible = e.isIntersecting; }), { threshold: .15 });
  scan(); clearInterval(scanT); scanT = setInterval(scan, 1000);
  if (!raf) raf = requestAnimationFrame(tick);
}
export function stop() { cancelAnimationFrame(raf); raf = 0; clearInterval(scanT); }
export function replay() { cards.forEach(c => { c.t0 = null; c.lt = 0; c.A.done = false; }); }