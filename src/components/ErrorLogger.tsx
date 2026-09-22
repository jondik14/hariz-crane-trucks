"use client";

import { useEffect } from "react";

export function ErrorLogger() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleError = (event: ErrorEvent) => {
      // Filter out unhelpful third-party script errors
      // "Script error." with no filename/line info is a cross-origin security restriction
      if (event.message === "Script error." && !event.filename) {
        return; // Ignore these - they're from third-party scripts (analytics, etc.)
      }
      
      // Also filter out common third-party script errors
      const thirdPartyDomains = [
        "googletagmanager.com",
        "google-analytics.com",
        "clarity.ms",
        "facebook.net",
        "doubleclick.net"
      ];
      
      if (event.filename && thirdPartyDomains.some(domain => event.filename.includes(domain))) {
        return; // Ignore errors from known third-party analytics scripts
      }
      
      console.error("Global error:", event.message, event.filename, event.lineno, event.colno, event.error?.stack ?? event.error);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Filter out common third-party promise rejections
      const reason = String(event.reason);
      if (reason.includes("clarity") || reason.includes("gtag") || reason.includes("analytics")) {
        return;
      }
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return null;
}
