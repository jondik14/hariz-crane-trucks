"use client";

import { useEffect } from "react";

export function MicrosoftClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    // Don't initialize if no project ID is configured
    if (!projectId || typeof window === "undefined") {
      return;
    }

    // Initialize Clarity with error handling
    try {
      // Dynamic import to avoid SSR issues
      import("@microsoft/clarity").then((Clarity) => {
        if (Clarity.default?.init) {
          Clarity.default.init(projectId);
        }
      }).catch((error) => {
        console.warn("Failed to load Microsoft Clarity:", error);
      });
    } catch (error) {
      console.warn("Error initializing Microsoft Clarity:", error);
    }
  }, [projectId]);

  return null;
}
