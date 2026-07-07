const REMOTE_FALLBACK =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop";

/** Resolves project image paths; uses remote fallback when local assets are not in public/. */
export function getProjectImageSrc(image: string): string {
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return REMOTE_FALLBACK;
}
