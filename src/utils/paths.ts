const configuredBase = import.meta.env.BASE_URL.replace(/\/+$/, '');

/**
 * Prefix an internal route or public asset with Astro's configured base path.
 * Page routes receive the same trailing-slash form used by Astro's generated
 * canonicals and sitemap, while file URLs keep their original form. Absolute
 * external URLs, protocol links, query strings, and hash links pass through.
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
  const suffixIndex = normalized.search(/[?#]/);
  const pathname = suffixIndex === -1 ? normalized : normalized.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? '' : normalized.slice(suffixIndex);
  const isFilePath = /\.[^/]+$/.test(pathname);
  const normalizedPath = pathname !== '/' && !pathname.endsWith('/') && !isFilePath
    ? `${pathname}/${suffix}`
    : normalized;

  if (!configuredBase) return normalizedPath;
  if (normalizedPath === configuredBase) return `${configuredBase}/`;
  if (normalizedPath.startsWith(`${configuredBase}/`)) return normalizedPath;

  return `${configuredBase}${normalizedPath}`;
}

/** Remove Astro's configured base before matching a pathname to route data. */
export function withoutBase(pathname: string): string {
  if (!configuredBase) return pathname;
  if (pathname === configuredBase) return '/';
  if (pathname.startsWith(`${configuredBase}/`)) return pathname.slice(configuredBase.length);
  return pathname;
}
