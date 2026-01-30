"use client";

/** Full-page error fallback with refresh button. Client Component so onClick is valid. */
export function ErrorFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <h1 className="text-2xl font-black text-[#2a1c2f] mb-4">Something went wrong</h1>
      <p className="text-zinc-600 mb-6 text-center">Please refresh the page to try again.</p>
      <button
        type="button"
        onClick={() => typeof window !== "undefined" && window.location.reload()}
        className="bg-amber-500 hover:bg-amber-600 text-[#2a1c2f] font-black px-8 py-4 rounded-xl transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );
}
