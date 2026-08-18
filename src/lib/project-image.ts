const REMOTE_FALLBACK =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop";

/** Resolves project image paths; uses remote fallback only when no usable source is set. */
export function getProjectImageSrc(image?: string | null): string {
  const src = image?.trim();
  if (!src) {
    return REMOTE_FALLBACK;
  }
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  return REMOTE_FALLBACK;
}
