"use client";

import { useEffect } from "react";

export function ErrorLogger() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", {
        reason: event.reason,
        promise: event.promise,
      });
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
