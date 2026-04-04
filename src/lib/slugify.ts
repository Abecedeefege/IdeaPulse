/**
 * Generate a URL-friendly slug from a title string.
 * Optionally append a short suffix (e.g. last 6 chars of UUID) for uniqueness.
 */
export function generateSlug(title: string, idSuffix?: string): string {
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // strip non-word chars (except spaces & hyphens)
    .replace(/[\s_]+/g, "-") // spaces/underscores → hyphens
    .replace(/-+/g, "-") // collapse consecutive hyphens
    .replace(/^-|-$/g, ""); // trim leading/trailing hyphens

  // Max 80 chars before suffix
  if (slug.length > 80) {
    slug = slug.slice(0, 80).replace(/-$/, "");
  }

  if (!slug) {
    slug = "idea";
  }

  if (idSuffix) {
    const suffix = idSuffix.replace(/-/g, "").slice(-6);
    slug = `${slug}-${suffix}`;
  }

  return slug;
}
