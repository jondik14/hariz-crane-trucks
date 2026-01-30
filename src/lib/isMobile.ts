/**
 * Client-only mobile detection (userAgent + matchMedia).
 * Call only after mount / in useEffect to avoid SSR issues.
 */
export function isMobileUserAgent(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(max-width: 1024px)").matches;
  } catch {
    return window.innerWidth < 1024;
  }
}

/** Combined: mobile viewport or mobile user agent (e.g. iPad in desktop width). */
export function isMobile(): boolean {
  return isMobileViewport() || isMobileUserAgent();
}
