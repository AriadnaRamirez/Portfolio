const SHOT_FILE = /\/((desktop|mobile|before|after)-\d+\.webp)$/;

/** Downscaled copy under /sm/ (840px wide, 300px for phone shots). */
export function shotSm(src: string) {
  return SHOT_FILE.test(src) ? src.replace(SHOT_FILE, "/sm/$1") : src;
}

export function shotThumb(src: string) {
  return src.replace(/\/([^/]+\.webp)$/, "/thumbs/$1");
}

/** Warm the cache with the light copy the comparison slider actually shows. */
export function prefetchShot(src: string) {
  const img = new Image();
  img.src = shotSm(src);
}
