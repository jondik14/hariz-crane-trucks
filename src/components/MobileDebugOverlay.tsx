"use client";

import { useEffect } from "react";
import { installMobileDebug } from "@/lib/debugMobile";

/**
 * Installs the on-device mobile debug overlay so errors appear on the phone screen.
 * Remove or gate behind env when done debugging.
 */
export function MobileDebugOverlay() {
  useEffect(() => {
    installMobileDebug();
  }, []);
  return null;
}
