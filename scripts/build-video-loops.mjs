#!/usr/bin/env node
/**
 * Turns a raw generated clip into a web-ready ambient loop.
 *
 * Input : .vid-work/<name>-raw.mp4   (as returned by the video model)
 * Output: public/media/loops/<name>.mp4  + public/media/loops/<name>.poster.webp
 *
 * WHY EACH STEP EXISTS — all three were measured on this project's own clips,
 * not assumed:
 *
 *   PING-PONG. The model does not produce a seamless loop: sampling the first
 *   and last frames of the galvanisation clip gave a mean absolute difference of
 *   20.9/255, which reads as a hard cut every 5 seconds. Playing the clip
 *   forward then reversed makes the seam mathematically identical, at the cost
 *   of doubling the duration. The reverse also compresses well, since it is the
 *   same frames.
 *
 *   H.264 ONLY, NO VP9. VP9 at crf 40 came out at 539 KB against H.264 crf 30 at
 *   463 KB on the same source — larger, for a slower encode and worse
 *   compatibility. There is no second <source> to add.
 *
 *   SCALE TO 960. These are ambient backgrounds behind a scrim, cropped by
 *   object-cover. 960px wide is already generous; the source is 1280x720.
 *
 * Result on the galvanisation clip: 6,657 KB raw -> 463 KB. 93% smaller.
 *
 * Usage:  node scripts/build-video-loops.mjs [name ...]
 *         (no args = every *-raw.mp4 in .vid-work)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const WORK = '.vid-work';
const OUT = path.join('public', 'media', 'loops');

/** Width to encode at. Height follows the source aspect, forced even for yuv420p. */
const WIDTH = 960;
/** Constant Rate Factor. 30 measured as the knee: 34 saved 170 KB but softened the metal. */
const CRF = 30;

const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
const kb = (p) => (statSync(p).size / 1024).toFixed(0);

function build(name) {
  const src = path.join(WORK, `${name}-raw.mp4`);
  if (!existsSync(src)) {
    console.error(`  ! missing ${src}`);
    return null;
  }

  const mp4 = path.join(OUT, `${name}.mp4`);
  const poster = path.join(OUT, `${name}.poster.webp`);

  // split -> reverse one branch -> concat = forward+reverse, a seam-free loop.
  const filter =
    `[0:v]scale=${WIDTH}:-2,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]`;

  ff([
    '-i', src,
    '-filter_complex', filter,
    '-map', '[v]',
    '-an',                          // ambient loops are silent by definition
    '-c:v', 'libx264',
    '-crf', String(CRF),
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',          // required for Safari/iOS playback
    '-movflags', '+faststart',      // moov atom first so it streams
    mp4,
  ]);

  // Poster = first frame, so the still a visitor sees before/instead of the
  // video is exactly where the motion begins. Encoded as WebP to match the rest
  // of the site's photography.
  ff(['-i', mp4, '-vframes', '1', '-c:v', 'libwebp', '-quality', '82', poster]);

  console.log(
    `  ${name.padEnd(18)} ${kb(src).padStart(6)} KB raw -> ${kb(mp4).padStart(5)} KB mp4 + ${kb(poster).padStart(4)} KB poster`,
  );
  return { name, mp4, poster };
}

const requested = process.argv.slice(2);
const names = requested.length
  ? requested
  : existsSync(WORK)
    ? readdirSync(WORK).filter((f) => f.endsWith('-raw.mp4')).map((f) => f.replace(/-raw\.mp4$/, ''))
    : [];

if (names.length === 0) {
  console.error(`No raw clips found in ${WORK}/. Expected <name>-raw.mp4`);
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
console.log(`Building ${names.length} loop(s) -> ${OUT}\n`);
const built = names.map(build).filter(Boolean);
console.log(`\nDone: ${built.length}/${names.length}`);
