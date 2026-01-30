"use client";

import Script from "next/script";

/**
 * Load Microsoft Clarity via script tag only (no npm package import).
 * This avoids any React/hydration issues on mobile that the @microsoft/clarity package can cause.
 */
export function MicrosoftClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!projectId) {
    return null;
  }

  return (
    <Script
      id="clarity-script"
      strategy="afterInteractive"
      src={`https://www.clarity.ms/tag/${projectId}`}
    />
  );
}
