/**
 * Temporary on-device crash overlay for mobile.
 * Shows errors on the phone screen so you can see the actual crash reason without a Mac.
 * Remove or gate behind a flag (e.g. NODE_ENV === "development") before production.
 */
export function installMobileDebug(): void {
  if (typeof window === "undefined") return;

  const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (!isPhone) return;

  const box = document.createElement("pre");
  box.style.cssText =
    "position:fixed;z-index:99999;left:0;right:0;bottom:0;max-height:50vh;overflow:auto;" +
    "background:rgba(0,0,0,.85);color:#0f0;font:12px/1.4 monospace;padding:10px;margin:0;white-space:pre-wrap;";
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
}
