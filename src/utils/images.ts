import type { ImageMetadata } from 'astro';
import { withBase } from './paths';

export interface PublicImage {
  src: string;
  width: number;
  height: number;
  format: 'jpeg' | 'png' | 'webp';
  public: true;
}

export type SiteImage = ImageMetadata | PublicImage;

export const publicImage = (
  src: string,
  width: number,
  height: number,
  format: PublicImage['format'],
): PublicImage => ({ src, width, height, format, public: true });

export const imageSrc = (image: SiteImage): string =>
  'public' in image ? withBase(image.src) : image.src;
