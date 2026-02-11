/**
 * Normalize slug by removing trailing slash
 * Ensures cache tag matches between webhook and cached data
 */
export function normalizeSlug(slug: string): string {
  return slug.replace(/\/$/, '');
}

/**
 * Convert Storyblok slug to Next.js path
 * e.g., "pages/services" -> "/services"
 */
export function slugToPath(slug: string): string {
  // Remove 'pages/' prefix if exists
  const pathSlug = slug.startsWith('pages/') ? slug.slice(6) : slug;
  // Handle home page: "home" or empty -> "/"
  if (!pathSlug || pathSlug === 'home') {
    return '/';
  }
  // Ensure leading slash for other pages
  return `/${pathSlug}`;
}
