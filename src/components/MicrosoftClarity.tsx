"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export function MicrosoftClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    // Don't initialize if no project ID is configured
    if (!projectId) {
      return;
    }

    // Initialize Clarity with the project ID
    Clarity.init(projectId);
  }, [projectId]);

  // Don't render anything if no project ID is configured
  if (!projectId) {
    return null;
  }

  return null;
}
