/** Canonicalize a URL or origin to https for HTTPS hosting / mixed-content safety. */
export function toHttpsUrl(urlOrOrigin: string): string {
  const trimmed = (urlOrOrigin || '').trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('http://')) return `https://${trimmed.slice('http://'.length)}`;
  // Protocol-relative
  if (trimmed.startsWith('//')) return `https:${trimmed}`;
  return trimmed;
}

/** Prefer https origin for share links even if the page was opened on http. */
export function httpsOrigin(origin: string = typeof window !== 'undefined' ? window.location.origin : ''): string {
  return toHttpsUrl(origin);
}
