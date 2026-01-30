"use client";

/**
 * CLIENT POLYFILLS — requestIdleCallback / cancelIdleCallback
 * Safari (especially iOS) did not support requestIdleCallback until Safari 15.4, so older iPhones
 * throw "Can't find variable: requestIdleCallback" and crash. This file defines a setTimeout-based
 * polyfill at module load (client-only) so all downstream code (video defer, 3D lazy load, animations)
 * can safely use requestIdleCallback. Rendered at top of layout body so the chunk loads first.
 * Do not run during SSR (typeof window === "undefined").
 */
function installRequestIdleCallbackPolyfill() {
  if (typeof window === "undefined") return;
  if (typeof window.requestIdleCallback !== "undefined") return;

  (window as Window & { requestIdleCallback: typeof requestIdleCallback; cancelIdleCallback: typeof cancelIdleCallback }).requestIdleCallback = function requestIdleCallbackPolyfill(
    cb: IdleRequestCallback,
    opts?: IdleRequestOptions
  ): number {
    const start = Date.now();
    const timeout = opts?.timeout ?? 50;
    return window.setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, timeout - (Date.now() - start)),
      });
    }, 1) as unknown as number;
  };

  (window as Window & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback = function cancelIdleCallbackPolyfill(
    id: number
  ): void {
    window.clearTimeout(id);
  };
}

installRequestIdleCallbackPolyfill();

/** Renders nothing; polyfill runs at module load above. */
export function ClientPolyfills() {
  return null;
}
