# Media pipeline

All site photography lives in `public/media/` as high-resolution WebP. Nothing is
hotlinked from a third-party host any more.

## How it works

**One high-quality source per image, Next.js does the rest.** Each file in
`public/media/` is a single WebP master. `next/image` resizes and re-encodes it per
request, so a phone gets a small AVIF and a desktop gets a large one — visitors never
download the master. That is why there is no `.avif` twin on disk: shipping both would
double repo weight for zero delivery benefit.

Delivery is configured in `next.config.ts`:

- `images.formats: ['image/avif', 'image/webp']` — AVIF is served where supported.
  Measured on a 1920px hero: **AVIF 200 KB vs WebP 275 KB vs JPEG 296 KB (−32%)**.
- `images.minimumCacheTTL: 31536000` — optimised derivatives cache for a year.
- `remotePatterns` contains only `placehold.co` (the dev fallback for an unresolved
  project image key).

## How the library was produced

1. **Inventory** — every image reference in `src/` was extracted and probed for its
   true resolution and weight.
2. **Acquire the best available source.** The site had been using Pinterest's `/736x/`
   thumbnails; `/originals/` and `/1200x/` variants are far larger. **31 images were
   re-fetched from a higher-resolution original** — e.g. a portfolio shot went from
   735×556 to 2368×1792, and a chaudronnerie hero from 736×414 to 2560×1440. Unsplash
   URLs were re-requested at `w=2400` (they had been requesting 640–1080px for
   full-bleed heroes), preserving each URL's own crop parameters.
3. **Resize + sharpen** — Lanczos3 down to a longest-edge budget matched to how each
   image actually renders (1920 heroes, 1200 blog cards, 800 team portraits, 900
   product part photos), with a mild unsharp mask to recover micro-contrast lost to
   resampling.
4. **Encode** WebP q82 + generate a 16px `blurDataURL` placeholder, stored alongside
   `width`/`height` in `src/app/lib/placeholder-images.json`.

**Upscaling is capped at 2× native.** Past that you manufacture blur, not detail — so
where no larger original existed, the image is served at its true resolution rather
than being stretched into a bigger, softer file.

## Adding or replacing an image

Drop a WebP (or run the source through the same resize/sharpen recipe) into
`public/media/`, then reference it as `/media/<name>.webp`. If it belongs in
`placeholder-images.json`, include `width`, `height` and ideally a `blurDataUrl` so
the layout is reserved and the load is progressive.

Do **not** re-add `dangerouslyAllowSVG` to `next.config.ts`. It was removed once the
last remote SVG logo went away; no image passed to `next/image` is an SVG today (the
one SVG avatar is rendered through the `<Logo />` component, bypassing the optimizer).
Re-enabling it lets the optimizer serve attacker-controlled SVG.

## ⚠️ Image provenance — needs client action

Most of this photography originated as **Pinterest and stock URLs** that predate this
work; it is almost certainly not Bordj Steel's own material. Self-hosting makes the
site robust and fast, but it does not confer a licence — and it makes the usage more
concrete than hotlinking did.

Before this site goes to a wider audience the client should replace the photography
with their own: they manufacture the product, so real plant, project and team photos
would be both legally clean and far more persuasive than stock. The file names in
`public/media/` map 1:1 to the references in `src/config/`, so swapping in real photos
is a drop-in replacement.
