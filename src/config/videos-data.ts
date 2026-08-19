/**
 * The company's own video content.
 *
 * Sourced from the Bordj Steel YouTube channel (@bordjsteel7213, channel id
 * UCgzucjIJs21M-FOz_fSmoOQ) via its public RSS feed. At the time of writing the
 * channel holds exactly one video — that is not an omission here, it is the
 * whole channel.
 *
 * OWNERSHIP MATTERS ON THIS PAGE. A search for Bordj Steel video also surfaces
 * "bordj steel unité de galvanisation a chaud" (dfx8nTn9xJI), which looks like
 * company footage but is uploaded by a private individual
 * (youtube.com/@abdelazizBrakhlia-dz). It is deliberately NOT listed: presenting
 * a third party's video as the company's own media on the company's own site
 * would misrepresent both of them. Only add entries verified via the oEmbed
 * endpoint as `author_name: "bordj steel"`:
 *
 *   https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json
 *
 * Posters are self-hosted, never hotlinked from i.ytimg.com. The project
 * deliberately removed third-party image hotlinks and
 * tests/media-integrity.test.ts fails if new ones appear.
 */
export type CompanyVideo = {
  /** YouTube video id. */
  readonly id: string;
  /** Title as published on the channel. */
  readonly title: string;
  /** One line of French context. Describes the video, invents nothing about it. */
  readonly description: string;
  /** ISO date the video was published to the channel. */
  readonly published: string;
  /** Self-hosted poster under /media. */
  readonly poster: string;
};

export const channelUrl = 'https://www.youtube.com/@bordjsteel7213';

export const companyVideos: readonly CompanyVideo[] = [
  {
    id: 'McmW8zlIMws',
    title: 'Unité charpente métallique',
    description: "Visite de l'unité de charpente métallique, publiée par Bordj Steel.",
    published: '2015-06-08',
    poster: '/media/video-charpente-poster.webp',
  },
];
