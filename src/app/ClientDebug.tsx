"use client";

import { useEffect } from "react";

/**
 * Client-only debug: proves JS runs on mobile (banner) and captures errors (overlay).
 * Layout is server by default — this must be a client component so useEffect runs in the browser.
 * Remove or gate behind env when done debugging.
 */
export default function ClientDebug() {
  useEffect(() => {
    if (typeof document === "undefined" || !document.body) return;

    // 1) Always-visible banner — if you see this, client code is running
    const banner = document.createElement("div");
    banner.innerText = "DEBUG LOADED";
    banner.style.cssText =
      "position:fixed;top:0;left:0;right:0;z-index:2147483647;" +
      "background:#ff0;color:#000;padding:8px;font:14px monospace;";
    document.body.appendChild(banner);

    // 2) On phones: error log overlay (so we see something if JS errors before tab is killed)
    const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isPhone) return;

    const box = document.createElement("pre");
    box.style.cssText =
      "position:fixed;z-index:2147483646;left:0;right:0;bottom:0;max-height:45vh;overflow:auto;" +
      "background:rgba(0,0,0,.9);color:#0f0;font:11px/1.3 monospace;padding:8px;margin:0;white-space:pre-wrap;";
    box.textContent = "mobile debug:\n";
    document.body.appendChild(box);

    const log = (...args: unknown[]) => {
      const msg = args
        .map((a) =>
          a instanceof Error ? (a.stack || a.message) : String(a)
        )
        .join(" ");
      box.textContent += msg + "\n";
    };

    window.addEventListener("error", (e) =>
      log("ERROR:", e.message, e.error || "")
    );
    window.addEventListener("unhandledrejection", (e) =>
      log(
        "REJECTION:",
        e.reason instanceof Error ? e.reason.stack : e.reason
      )
    );

    const orig = console.error;
    console.error = (...args: unknown[]) => {
      log("console.error:", ...args);
      orig(...args);
    };
  }, []);

  return null;
}
