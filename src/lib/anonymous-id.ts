/**
 * Generate or retrieve a persistent anonymous visitor ID.
 * Stored in localStorage so it survives page reloads and tab closes.
 */
export function getOrCreateAnonId(): string {
  const key = "anon_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
