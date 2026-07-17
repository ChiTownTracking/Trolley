const configuredBase = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Prefix an internal route or public asset with Astro's configured base path.
 * Absolute external URLs, protocol links, query strings, and hash links pass
 * through unchanged. Paths already carrying the base are not prefixed twice.
 */
export function withBase(path: string): string {
  if (
    !path ||
    path.startsWith('#') ||
    path.startsWith('?') ||
    path.startsWith('//') ||
    /^[a-z][a-z\d+.-]*:/i.test(path)
  ) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (!configuredBase) return normalized;
  if (normalized === configuredBase) return `${configuredBase}/`;
  if (normalized.startsWith(`${configuredBase}/`)) return normalized;

  return `${configuredBase}${normalized}`;
}

/** Remove Astro's configured base before matching a pathname to route data. */
export function withoutBase(pathname: string): string {
  if (!configuredBase) return pathname;
  if (pathname === configuredBase) return '/';
  if (pathname.startsWith(`${configuredBase}/`)) return pathname.slice(configuredBase.length);
  return pathname;
}
